import { LEG, Leg } from "../../../data/base/person/leg-data";
import { LegRig, PersonRig } from "../../../rigs/base/person-rig";
import {
  addArr,
  deepCopy,
  getEndpoint,
  reflectAndReverse,
  scale1D,
  shift1D,
  shiftUpToCubic,
} from "../../../utils/misc";
import { Side } from "../../../utils/types";
import { PersonBaseModel } from "./person-base";

export class LegModel extends PersonBaseModel {
  protected leg: Leg = LEG;

  protected color: string = "#181818";

  public draw(rig: PersonRig) {
    super.draw(rig);

    this.frontPoints("right");
    this.frontPoints("left");

    return this.elts;
  }

  protected setLegDirection(side: Side) {
    const { rotation } =
      side === "right" ? this.rig.rightLeg : this.rig.leftLeg;
    this.direction = this.getDirection(this.directionRanges, rotation);
  }

  protected getLegStyle(side: Side) {
    const rig = (
      side === "right" ? this.rig.rightLeg : this.rig.leftLeg
    ) as LegRig;
    return this.getStyle(
      rig,
      this.direction,
      -this.directionRanges.left[1],
      -this.directionRanges.right[0],
    );
  }

  protected frontPoints(side: Side) {
    this.setLegDirection(side);
    const { position } =
      side === "right" ? this.rig.rightLeg : this.rig.leftLeg;
    const style = this.getLegStyle(side);

    const data = this.legFront(side);
    const points: number[][] = [];
    this.drawPoints(data, addArr(points));

    this.elts[`${side}leg`] = this.path(points, position, {
      fill: this.color,
      style,
    });
  }

  protected legFront(side: Side) {
    let { hip, thigh, knee, calf } = deepCopy(this.leg);

    let innerCalf = scale1D(getEndpoint(calf), -1, 1);
    let innerKnee = reflectAndReverse([knee, calf])[0];
    let innerThigh = reflectAndReverse([thigh, knee])[0];
    let innerHip = reflectAndReverse([hip, thigh])[0];

    const { outer, inner } = deepCopy(
      side === "right" ? this.rig.rightLeg : this.rig.leftLeg,
    ) as LegRig;

    hip = shift1D(hip, outer.hip.x, outer.hip.y);
    thigh = shiftUpToCubic(thigh, outer.thigh);
    knee = shiftUpToCubic(knee, outer.knee);
    calf = shiftUpToCubic(calf, outer.calf);

    innerCalf = shift1D(innerCalf, inner.calf.x2, inner.calf.y2);
    innerKnee = shiftUpToCubic(innerKnee, {
      x0: inner.calf.x1,
      y0: inner.calf.y1,
      x1: inner.calf.x0,
      y1: inner.calf.y0,
      x2: inner.knee.x2,
      y2: inner.knee.y2,
    });
    innerThigh = shiftUpToCubic(innerThigh, {
      x0: inner.knee.x1,
      y0: inner.knee.y1,
      x1: inner.knee.x0,
      y1: inner.knee.y0,
      x2: inner.thigh.x2,
      y2: inner.thigh.y2,
    });
    innerHip = shiftUpToCubic(innerHip, {
      x0: inner.thigh.x1,
      y0: inner.thigh.y1,
      x1: inner.thigh.x0,
      y1: inner.thigh.y0,
      x2: inner.hip.x,
      y2: inner.hip.y,
    });

    return {
      hip,
      thigh,
      knee,
      calf,
      innerCalf,
      innerKnee,
      innerThigh,
      innerHip,
    };
  }
}
