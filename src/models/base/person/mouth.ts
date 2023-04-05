import {
  Lip,
  LOWER_LIP,
  LipSide,
  UPPER_LIP,
  UPPER_LIP_SIDE,
  LOWER_LIP_SIDE,
} from "../../../data/base/person/mouth-data";
import type {
  MouthRig,
  PersonRig,
  UpperLipRig,
} from "../../../rigs/base/person-rig";
import {
  addArr,
  deepCopy,
  shift1D,
  shiftEndpoint,
  shiftPenultimate,
  shiftStartpoint,
  vecContainsNonZero,
} from "../../../utils/misc";
import { HeadModel } from "./head";

export class MouthModel extends HeadModel {
  // lips
  protected upperLip: Lip = UPPER_LIP;
  protected lowerLip: Lip = LOWER_LIP;
  protected upperLipSide: LipSide = UPPER_LIP_SIDE;
  protected lowerLipSide: LipSide = LOWER_LIP_SIDE;

  // colors
  protected upperLipColor: string = "#ae5654";
  protected lowerLipColor: string = "#bd6461";
  protected mouthColor = "#581b2d";

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

    const { upperLipPoints, lowerLipPoints, mouthPoints } = info;

    if (this.isMouthOpen()) {
      this.elts["mouth"] = this.path(mouthPoints, position, {
        fill: this.mouthColor,
        style,
      });
    }
    this.elts["lowerlip"] = this.path(lowerLipPoints, position, {
      fill: this.lowerLipColor,
      stroke: this.lowerLipColor,
      thickness: 0.2,
      style,
    });
    this.elts["upperlip"] = this.path(upperLipPoints, position, {
      fill: this.upperLipColor,
      stroke: this.upperLipColor,
      thickness: 0.2,
      style,
    });

    return this.elts;
  }

  protected isMouthOpen() {
    const { upperLip, lowerLip } = this.rig.mouth as MouthRig;
    return (
      vecContainsNonZero(upperLip.left) ||
      vecContainsNonZero(upperLip.center) ||
      vecContainsNonZero(upperLip.right) ||
      vecContainsNonZero(lowerLip.center)
    );
  }

  protected frontPoints() {
    const upperLipPoints: number[][] = [];
    const lowerLipPoints: number[][] = [];
    const mouthPoints: number[][] = [];
    const addUpperLipPoints = addArr(upperLipPoints);
    const addLowerLipPoints = addArr(lowerLipPoints);
    const addMouthPoints = addArr(mouthPoints);

    const upper = this.upperLipPoints();
    this.drawPoints(upper, addUpperLipPoints);

    const lower = this.lowerLipPoints();
    this.drawPoints(lower, addLowerLipPoints);

    // mouth background
    if (this.isMouthOpen()) {
      // start at left corner of lower lip
      addMouthPoints(this.move(lower.left));
      // go right across top lower lip
      addMouthPoints(lower.center);
      addMouthPoints(lower.right);
      // go to right corner of upper lip
      addMouthPoints(upper.innerRight);
      // go right across bottom upper lip, to left corner of upper lip
      addMouthPoints(upper.bottomCenter);
      addMouthPoints(upper.innerLeft);
      addMouthPoints(upper.left);
    }

    return {
      upperLipPoints,
      lowerLipPoints,
      mouthPoints,
    };
  }

  protected sidePoints() {
    let upperLipPoints: number[][] = [];
    let lowerLipPoints: number[][] = [];
    let mouthPoints: number[][] = [];
    const addUpperLipPoints = addArr(upperLipPoints);
    const addLowerLipPoints = addArr(lowerLipPoints);

    // side upper lip
    const upper = this.upperLipSidePoints();
    this.drawPoints(upper, addUpperLipPoints);

    // side lower lip
    const lower = this.lowerLipSidePoints();
    this.drawPoints(lower, addLowerLipPoints);

    return {
      upperLipPoints,
      lowerLipPoints,
      mouthPoints,
    };
  }

  protected frontLipPoints(
    lipData: Lip,
    lipRig: UpperLipRig,
  ): Omit<Lip, "color"> {
    const lip = deepCopy(lipData);
    const {
      left: offLeft,
      leftOut: offLeftOut,
      leftIn: offLeftIn,
      center: offCenter,
      rightIn: offRightIn,
      rightOut: offRightOut,
      right: offRight,
    } = lipRig;

    // start at outer left corner
    let left = lip.left;
    left = shiftStartpoint(left, offLeft);

    // from left corner to top center
    let center = lip.center;
    center = shiftEndpoint(center, offCenter);
    center = shiftPenultimate(center, offLeftIn);
    center = shiftStartpoint(center, offLeftOut);

    // from center to outer right corner
    let right = lip.right;
    right = shiftEndpoint(right, offRight);
    right = shiftPenultimate(right, offRightOut);
    right = shiftStartpoint(right, offRightIn);

    // from outer right corner to inner right corner
    let innerRight = lip.innerRight;
    innerRight = shiftEndpoint(innerRight, offRight);

    // from inner right corner to bottom center
    let bottomCenter = lip.bottomCenter;
    bottomCenter = shiftEndpoint(bottomCenter, offCenter);
    bottomCenter = shiftPenultimate(bottomCenter, offRightIn);
    bottomCenter = shiftStartpoint(bottomCenter, offRightOut);

    // from bottom center to inner left corner
    let innerLeft = lip.innerLeft;
    innerLeft = shiftEndpoint(innerLeft, offLeft);
    innerLeft = shiftPenultimate(innerLeft, offLeftOut);
    innerLeft = shiftStartpoint(innerLeft, offLeftIn);

    return {
      left,
      center,
      right,
      innerRight,
      bottomCenter,
      innerLeft,
    };
  }

  protected upperLipPoints(): Omit<Lip, "color"> {
    return this.frontLipPoints(
      this.upperLip,
      (this.rig.mouth as MouthRig).upperLip,
    );
  }

  protected lowerLipPoints(): Omit<Lip, "color"> {
    return this.frontLipPoints(this.lowerLip, {
      ...(this.rig.mouth as MouthRig).upperLip,
      ...(this.rig.mouth as MouthRig).lowerLip,
    });
  }

  protected sideLipPoints(lipData: LipSide, mouthRig: UpperLipRig) {
    let { left, right, bottomRight, bottomLeft } = deepCopy(lipData);
    const isRight = this.direction === "right";
    const offEnd = isRight ? mouthRig.left : mouthRig.right;
    const offOut = isRight ? mouthRig.leftOut : mouthRig.rightOut;
    const offIn = isRight ? mouthRig.leftIn : mouthRig.rightIn;

    // start at left corner
    left = shiftStartpoint(left, offEnd);

    // right to top right corner (outer edge of face)
    right = shiftEndpoint(right, mouthRig.center);
    right = shiftPenultimate(right, offIn);
    right = shiftStartpoint(right, offOut);

    // down to bottom right corner (along outer edge of face)
    bottomRight = shift1D(bottomRight, mouthRig.center.x, mouthRig.center.y);

    // left to bottom left corner
    bottomLeft = shiftEndpoint(bottomLeft, offEnd);
    bottomLeft = shiftPenultimate(bottomLeft, offOut);
    bottomLeft = shiftStartpoint(bottomLeft, offIn);

    return {
      left,
      right,
      bottomRight,
      bottomLeft,
    };
  }

  protected upperLipSidePoints(): LipSide {
    return this.sideLipPoints(
      this.upperLipSide,
      (this.rig.mouth as MouthRig).upperLip,
    );
  }

  protected lowerLipSidePoints(): LipSide {
    return this.sideLipPoints(this.lowerLipSide, {
      ...(this.rig.mouth as MouthRig).upperLip,
      ...(this.rig.mouth as MouthRig).lowerLip,
    });
  }
}
