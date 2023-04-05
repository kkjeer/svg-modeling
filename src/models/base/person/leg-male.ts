import { LEG, Leg } from "../../../data/base/person/leg-male-data";
import { LegMaleRig, PersonRig } from "../../../rigs/base/person-rig";
import {
  addArr,
  deepCopy,
  getEndpoint,
  getStartpoint,
  reverse1D,
  reverseCubic,
  scale1D,
  scaleOffset,
  shiftUpToCubic,
  shiftVec,
} from "../../../utils/misc";
import { emptyCubic, emptyQuad, emptyVec } from "../../../utils/types";
import { PersonBaseModel } from "./person-base";

export class LegMaleModel extends PersonBaseModel {
  protected leg: Leg = LEG;

  protected color: string = "#181818";

  public draw(rig: PersonRig) {
    super.draw(rig);

    this.setLegDirection();

    this.drawFront();

    return this.elts;
  }

  protected drawFront() {
    const position = this.getPosition();
    const style = this.getLegStyle();

    const points = this.frontPoints();

    this.elts["legs"] = this.path(points, position, {
      fill: this.color,
      style,
    });
  }

  protected setLegDirection() {
    const rotation = this.getRotation();
    if (!rotation) {
      console.error("male leg has no defined rotation");
      return;
    }
    this.direction = this.getDirection(this.directionRanges, rotation);
  }

  protected getLegStyle() {
    const position = this.getPosition();
    if (!position) {
      console.error("male leg has no defined position");
      return {};
    }
    const rotation = this.getRotation();
    if (!rotation) {
      console.error("male leg has no defined rotation");
      return {};
    }
    return this.getStyle(
      { position, rotation },
      this.direction,
      -this.directionRanges.left[1],
      -this.directionRanges.right[0],
    );
  }

  protected getPosition() {
    const { leftLeg, rightLeg } = this.rig;
    if (!leftLeg || !rightLeg) {
      return emptyVec(true);
    }
    const position = leftLeg.position ?? rightLeg.position;
    return position;
  }

  protected getRotation() {
    const { leftLeg, rightLeg } = this.rig;
    if (!leftLeg || !rightLeg) {
      return emptyVec(true);
    }
    const rotation = leftLeg.rotation ?? rightLeg.rotation;
    return rotation;
  }

  protected frontPoints() {
    const data = this.frontData();
    const points: number[][] = [];
    this.drawPoints(data, addArr(points));
    return points;
  }

  protected frontData() {
    let { outer, inner, bottom, waist } = deepCopy(this.leg);

    // go down outside of right leg
    let rightOuterHip = outer.hip;
    let rightOuterThigh = outer.thigh;
    let rightOuterKnee = outer.knee;
    let rightOuterCalf = outer.calf;
    let rightOuterAnkle = outer.ankle;

    // go left across bottom of right leg
    let rightInnerAnkle = [...bottom, ...getEndpoint(inner.ankle)];
    // go up inside of right leg
    let rightInnerCalf = reverse1D(inner.ankle, inner.calf);
    let rightInnerKnee = reverse1D(inner.calf, inner.knee);
    let rightInnerThigh = reverse1D(inner.knee, inner.thigh);
    let innerHip = reverse1D(inner.thigh, inner.hip);

    // go down inside of left leg
    let leftInnerThigh = scale1D(inner.thigh, -1, 1);
    let leftInnerKnee = scale1D(inner.knee, -1, 1);
    let leftInnerCalf = scale1D(inner.calf, -1, 1);
    let leftInnerAnkle = scale1D(inner.ankle, -1, 1);

    // go left across bottom of left leg
    let leftOuterAnkle: number[] = [];
    if (bottom.length > 2) {
      for (let i = bottom.length - 2; i >= 0; i -= 2) {
        leftOuterAnkle.push(bottom[i]);
        leftOuterAnkle.push(bottom[i + 1]);
      }
    }
    leftOuterAnkle.push(outer.ankle[outer.ankle.length - 2]);
    leftOuterAnkle.push(outer.ankle[outer.ankle.length - 1]);
    leftOuterAnkle = scale1D(leftOuterAnkle, -1, 1);
    // go up outside of left leg
    let leftOuterCalf = scale1D(reverse1D(outer.ankle, outer.calf), -1, 1);
    let leftOuterKnee = scale1D(reverse1D(outer.calf, outer.knee), -1, 1);
    let leftOuterThigh = scale1D(reverse1D(outer.knee, outer.thigh), -1, 1);
    let leftOuterHip = scale1D(reverse1D(outer.thigh, outer.hip), -1, 1);

    // go right across waistline
    let waistLine = [...waist, ...getStartpoint(outer.hip)];

    // rigging
    const rightRig = deepCopy(this.rig.rightLeg) as LegMaleRig;
    const leftRig = deepCopy(this.rig.leftLeg) as LegMaleRig;

    // rigging: go down outside of right leg
    rightOuterHip = shiftVec(rightOuterHip, rightRig.outer.hip);
    rightOuterThigh = shiftUpToCubic(rightOuterThigh, rightRig.outer.thigh);
    rightOuterKnee = shiftUpToCubic(rightOuterKnee, rightRig.outer.knee);
    rightOuterCalf = shiftUpToCubic(rightOuterCalf, rightRig.outer.calf);
    rightOuterAnkle = shiftUpToCubic(rightOuterAnkle, rightRig.outer.ankle);

    // rigging: go across bottom of leg from right outer ankle to right inner ankle
    rightInnerAnkle = shiftUpToCubic(rightInnerAnkle, {
      ...rightRig.inner.ankle,
      ...rightRig.bottom,
    });
    // rigging: go up inside of right leg
    rightInnerCalf = shiftUpToCubic(
      rightInnerCalf,
      reverseCubic(rightRig.inner.ankle, rightRig.inner.calf),
    );
    rightInnerKnee = shiftUpToCubic(
      rightInnerKnee,
      reverseCubic(rightRig.inner.calf, rightRig.inner.knee),
    );
    rightInnerThigh = shiftUpToCubic(
      rightInnerThigh,
      reverseCubic(rightRig.inner.knee, rightRig.inner.thigh),
    );
    innerHip = shiftUpToCubic(
      innerHip,
      reverseCubic(rightRig.inner.thigh, leftRig.inner.hip ?? emptyCubic()),
    );

    // rigging: go down inside of left leg
    leftInnerThigh = shiftUpToCubic(
      leftInnerThigh,
      scaleOffset(leftRig.inner.thigh),
    );
    leftInnerKnee = shiftUpToCubic(
      leftInnerKnee,
      scaleOffset(leftRig.inner.knee),
    );
    leftInnerCalf = shiftUpToCubic(
      leftInnerCalf,
      scaleOffset(leftRig.inner.calf),
    );
    leftInnerAnkle = shiftUpToCubic(
      leftInnerAnkle,
      scaleOffset(leftRig.outer.ankle),
    );

    // rigging: go across bottom of left leg from inner ankle to outer ankle
    leftOuterAnkle = shiftUpToCubic(
      leftOuterAnkle,
      scaleOffset({
        x0: leftRig.bottom.x1,
        y0: leftRig.bottom.y1,
        x1: leftRig.bottom.x0,
        y1: leftRig.bottom.y0,
        x2: leftRig.outer.ankle.x2,
        y2: leftRig.outer.ankle.y2,
      }),
    );
    // rigging: go up outside of left leg
    leftOuterCalf = shiftUpToCubic(
      leftOuterCalf,
      scaleOffset(reverseCubic(leftRig.outer.ankle, leftRig.outer.calf)),
    );
    leftOuterKnee = shiftUpToCubic(
      leftOuterKnee,
      scaleOffset(reverseCubic(leftRig.outer.calf, leftRig.outer.knee)),
    );
    leftOuterThigh = shiftUpToCubic(
      leftOuterThigh,
      scaleOffset(reverseCubic(leftRig.outer.knee, leftRig.outer.thigh)),
    );
    leftOuterHip = shiftUpToCubic(
      leftOuterHip,
      scaleOffset(reverseCubic(leftRig.outer.thigh, leftRig.outer.hip)),
    );

    // rigging: go across waistline
    waistLine = shiftUpToCubic(waistLine, {
      ...(leftRig.waist ?? emptyQuad()),
      x2: rightRig.outer.hip.x,
      y2: rightRig.outer.hip.y,
    });

    return {
      rightOuterHip,
      rightOuterThigh,
      rightOuterKnee,
      rightOuterCalf,
      rightOuterAnkle,
      rightInnerAnkle,
      rightInnerCalf,
      rightInnerKnee,
      rightInnerThigh,
      innerHip,
      leftInnerThigh,
      leftInnerKnee,
      leftInnerCalf,
      leftInnerAnkle,
      leftOuterAnkle,
      leftOuterCalf,
      leftOuterKnee,
      leftOuterThigh,
      leftOuterHip,
      waistLine,
    };
  }
}
