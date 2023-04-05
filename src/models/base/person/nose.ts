import {
  Nose,
  NOSE,
  NoseSide,
  NoseTip,
  NoseTipSide,
  NOSE_SIDE,
  NOSE_TIP,
  NOSE_TIP_SIDE,
} from "../../../data/base/person/nose-data";
import {
  addArr,
  deepCopy,
  getEndpoint,
  shiftEndpoint,
  shiftPenultimate,
  shiftStartpoint,
  shift1D,
} from "../../../utils/misc";
import type { PersonRig } from "../../../rigs/base/person-rig";
import { HeadModel } from "./head";
import { PERSON_COLORS } from "../../../utils/constants";

export class NoseModel extends HeadModel {
  protected nose: Nose = NOSE;
  protected noseTip: NoseTip = NOSE_TIP;
  protected noseSide: NoseSide = NOSE_SIDE;
  protected noseTipSide: NoseTipSide = NOSE_TIP_SIDE;

  protected color: string = PERSON_COLORS.nose;
  protected tipColor: string = PERSON_COLORS.noseTip;

  public draw(rig: PersonRig) {
    super.draw(rig);

    if (this.direction === "back") {
      return this.elts;
    }

    const { position } = this.rig.face.center;
    const style = this.getHeadStyle();

    const info = !this.isSide(this.direction)
      ? this.frontPoints()
      : this.sidePoints();

    const { points, tipPoints } = info;

    this.elts["nose"] = this.path(points, position, {
      fill: this.color,
      style,
    });
    this.elts["nosetip"] = this.path(tipPoints, position, {
      fill: this.tipColor,
      style,
    });

    return this.elts;
  }

  protected frontPoints() {
    const points: number[][] = [];
    const addPoints = addArr(points);
    let tipPoints: number[][] = [];
    const addTipPoints = addArr(tipPoints);

    const { rotation } = this.rig.face.center;
    const xRot = rotation?.x ?? 0;
    const yRot = rotation?.y ?? 0;

    let { topLeft, left, right, topRight } = deepCopy(this.nose);
    let { rightToLeft } = deepCopy(this.noseTip);

    // Modify the left and right sides of the nose, and the bottom curve, based on the y-rotation of the head
    // Maximum amount by which the bottom corners of the nose can shift outward
    const maxCornerDeltaX = 0.8;
    // Maximum amount by which the bottom corners of the nose can shift inward
    const maxInwardDeltaX =
      getEndpoint(right)[0] - getEndpoint(topRight)[0] - 0.2;
    const leftRotPercentage = yRot / this.directionRanges.left[1];
    const rightRotPercentage = yRot / this.directionRanges.right[0];
    if (leftRotPercentage > 0 && leftRotPercentage <= 1.0) {
      // bring the left side of the nose out
      const shiftX = -leftRotPercentage * maxCornerDeltaX;
      left = shiftEndpoint(left, { x: shiftX });
      left = shiftPenultimate(left, { x: 0.75 * shiftX });
      right = shiftPenultimate(right, { x: 0.5 * shiftX });

      // bring the right side of the nose in
      const inwardX = -leftRotPercentage * maxInwardDeltaX;
      topRight = shiftStartpoint(topRight, { x: 0.5 * inwardX });
      right = shiftEndpoint(right, { x: inwardX });
    }
    if (rightRotPercentage > 0 && rightRotPercentage <= 1.0) {
      // bring the right side of the nose out
      const shiftX = rightRotPercentage * maxCornerDeltaX;
      right = shiftEndpoint(right, { x: shiftX });
      topRight = shiftStartpoint(topRight, { x: 0.75 * shiftX });
      right = shiftPenultimate(right, { x: 0.5 * shiftX });

      const inwardX = rightRotPercentage * maxInwardDeltaX;
      left = shiftStartpoint(left, { x: 0.5 * inwardX });
      left = shiftEndpoint(left, { x: inwardX });
    }

    // Modify the bottom nose curve (from left to right) and the nose tip curve
    // based on the x-rotation of the head
    const maxDeltaY = 0.5;
    const xRotPercentage = xRot / 90;
    if (xRotPercentage > 0 && xRotPercentage <= 1.0) {
      const shiftY = -xRotPercentage * maxDeltaY;
      left = shiftEndpoint(left, { y: shiftY });
      right = shift1D(right, 0, shiftY);
      rightToLeft = shift1D(rightToLeft, 0, -0.75 * shiftY);
    }

    addPoints(this.move(topLeft));
    addPoints(left);
    addPoints(right);
    addPoints(topRight);

    const bottomCurve = [
      ...rightToLeft,
      left[left.length - 2],
      left[left.length - 1],
    ];
    addTipPoints(this.move([left[left.length - 2], left[left.length - 1]]));
    addTipPoints(right);
    addTipPoints(bottomCurve);

    return {
      points,
      tipPoints,
    };
  }

  protected sidePoints() {
    const points: number[][] = [];
    const addPoints = addArr(points);
    let tipPoints: number[][] = [];
    const addTipPoints = addArr(tipPoints);

    const { bottom, tip, corner, top, bottomEnd } = deepCopy(this.noseSide);
    addPoints(this.move(bottom));
    addPoints(tip);
    addPoints(corner);
    addPoints(top);
    addPoints(bottomEnd);

    const {
      corner: tipCorner,
      bottom: tipBottom,
      topEnd,
    } = deepCopy(this.noseTipSide);
    addTipPoints(this.move(bottom));
    addTipPoints(tip);
    addTipPoints(tipCorner);
    addTipPoints(tipBottom);
    addTipPoints(topEnd);

    return { points, tipPoints };
  }
}
