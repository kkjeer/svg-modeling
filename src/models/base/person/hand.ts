import { HAND, Hand } from "../../../data/base/person/hand-data";
import { PersonRig } from "../../../rigs/base/person-rig";
import { PERSON_COLORS } from "../../../utils/constants";
import {
  addArr,
  deepCopy,
  scale1D,
  scaleData1D,
  shiftTubePropsFinger,
  shiftUpToCubic,
  shiftVec,
} from "../../../utils/misc";
import { Tube } from "../../../utils/tube";
import { Side } from "../../../utils/types";
import { PersonBaseModel } from "./person-base";

const DEBUG_TUBE = false;

export class HandModel extends PersonBaseModel {
  protected hand: Hand = HAND;

  protected color: string = PERSON_COLORS.skin;

  public draw(rig: PersonRig) {
    super.draw(rig);

    this.drawFront("right", rig);
    this.drawFront("left", rig);

    return this.elts;
  }

  protected setHandDirection(side: Side) {
    const { rotation } =
      side === "right" ? this.rig.rightHand : this.rig.leftHand;
    this.direction = this.getDirection(this.directionRanges, rotation);
  }

  protected getHandStyle(side: Side) {
    const rig = side === "right" ? this.rig.rightHand : this.rig.leftHand;
    return this.getStyle(
      rig,
      this.direction,
      -this.directionRanges.left[1],
      -this.directionRanges.right[0],
    );
  }

  public drawFront(side: Side, rig: PersonRig) {
    this.rig = rig;
    this.setHandDirection(side);
    const { position } =
      side === "right" ? this.rig.rightHand : this.rig.leftHand;
    const style = this.getHandStyle(side);

    if (side === "right" && DEBUG_TUBE) {
      // const curve = [0.0, 0.0, 5.0, 2.0, 10.0, 4.0, 5.0, 6.0];
      const curve = [0.0, 0.0, 10.0, 10.0, -10.0, 20.0, 0.0, 30.0];
      const radii = [
        { radius: 2.5, t: 0.0 },
        { radius: 3.0, t: 0.33 },
        { radius: 3.0, t: 0.67 },
        { radius: 2.5, t: 1.0 },
      ];
      const tube = new Tube().curve(curve).radii(radii).mode("tangent");
      const data = tube.data();
      const points: number[][] = [];
      this.drawPoints(data, addArr(points));

      const origin = { x: 10, y: 50 };

      this.debugTube(curve, radii, origin, `${side}handtube`);
      this.elts[`${side}handtube`] = this.path(points, origin, {
        stroke: "red",
        thickness: 1,
      });
    }

    const arr = this.getFrontPointsArr(side);
    this.elts[`${side}hand`] = this.path(arr, position, {
      fill: this.color,
      style,
    });

    return this.elts;
  }

  protected getFrontPointsArr(side: Side): number[][] {
    const data = this.getFrontPointsData(side);
    const points: number[][] = [];
    this.drawPoints(data, addArr(points));
    return points;
  }

  protected getFrontPointsData(side: Side) {
    let {
      pinkyWrist,
      pinkyPalm,
      pinky,
      pinkyInset,
      ring,
      ringInset,
      middle,
      middleInset,
      index,
      indexInset,
      thumb,
      thumbWrist,
    } = deepCopy(this.hand);

    const rig = deepCopy(
      side === "right" ? this.rig.rightHand : this.rig.leftHand,
    );

    // rig tube parts
    pinky = shiftTubePropsFinger(pinky, rig.pinky);
    ring = shiftTubePropsFinger(ring, rig.ring);
    middle = shiftTubePropsFinger(middle, rig.middle);
    index = shiftTubePropsFinger(index, rig.index);
    thumb = shiftTubePropsFinger(thumb, rig.thumb);

    let pinkyTube = new Tube().props(pinky);
    let pinkyData = pinkyTube.renameData("pinky", true);

    let ringData = new Tube().props(ring).renameData("ring");
    let { ringstart, ...ringRest } = ringData;

    let prInset = [...pinkyInset, ...ringstart];

    let middleData = new Tube().props(middle).renameData("middle");
    let { middlestart, ...middleRest } = middleData;

    let rmInset = [...ringInset, ...middlestart];

    let indexData = new Tube().props(index).renameData("index");
    let { indexstart, ...indexRest } = indexData;

    let miInset = [...middleInset, ...indexstart];

    let thumbData = new Tube().props(thumb).renameData("thumb");
    let { thumbstart, ...thumbRest } = thumbData;

    let itInset = [...indexInset, ...thumbstart];

    // rig non-tube parts
    pinkyWrist = shiftVec(pinkyWrist, rig.pinkyWrist);
    pinkyPalm = shiftUpToCubic(pinkyPalm, rig.pinkyPalm);
    prInset = shiftUpToCubic(prInset, rig.pinkyInset);
    rmInset = shiftUpToCubic(rmInset, rig.ringInset);
    miInset = shiftUpToCubic(miInset, rig.middleInset);
    itInset = shiftUpToCubic(itInset, rig.indexInset);
    thumbWrist = shiftUpToCubic(thumbWrist, rig.thumbWrist);

    if (side === "left") {
      pinkyWrist = scale1D(pinkyWrist, -1, 1);
      pinkyPalm = scale1D(pinkyPalm, -1, 1);
      pinkyData = scaleData1D(pinkyData, -1);
      prInset = scale1D(prInset, -1, 1);
      ringRest = scaleData1D(ringRest, -1);
      rmInset = scale1D(rmInset, -1, 1);
      middleRest = scaleData1D(middleRest, -1);
      miInset = scale1D(miInset, -1, 1);
      indexRest = scaleData1D(indexRest, -1);
      itInset = scale1D(itInset, -1, 1);
      thumbRest = scaleData1D(thumbRest, -1);
      thumbWrist = scale1D(thumbWrist, -1, 1);
    }

    return {
      pinkyWrist,
      pinkyPalm,
      ...pinkyData,
      prInset,
      ...ringRest,
      rmInset,
      ...middleRest,
      miInset,
      ...indexRest,
      itInset,
      ...thumbRest,
      thumbWrist,
    };
  }
}
