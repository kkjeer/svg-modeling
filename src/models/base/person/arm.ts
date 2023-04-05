import { ARM, Arm } from "../../../data/base/person/arm-data";
import { PersonRig } from "../../../rigs/base/person-rig";
import {
  addArr,
  deepCopy,
  getEndpoint,
  reflectAndReverse,
  reverseCubic,
  scale1D,
  shift1D,
  shiftEndpoint,
  shiftUpToCubic,
} from "../../../utils/misc";
import { Side } from "../../../utils/types";
import { PersonBaseModel } from "./person-base";

export class ArmModel extends PersonBaseModel {
  protected arm: Arm = ARM;

  protected color: string = "#333333";
  protected filter: string = "";

  public draw(rig: PersonRig) {
    super.draw(rig);
    this.drawFront("right", rig);
    this.drawFront("left", rig);
    return this.elts;
  }

  protected setArmDirection(side: Side) {
    const { rotation } =
      side === "right" ? this.rig.rightArm : this.rig.leftArm;
    this.direction = this.getDirection(this.directionRanges, rotation);
  }

  protected getArmStyle(side: Side) {
    const rig = side === "right" ? this.rig.rightArm : this.rig.leftArm;
    return this.getStyle(
      rig,
      this.direction,
      -this.directionRanges.left[1],
      -this.directionRanges.right[0],
    );
  }

  public drawFront(side: Side, rig: PersonRig) {
    this.rig = rig;
    this.setArmDirection(side);
    const { position } =
      side === "right" ? this.rig.rightArm : this.rig.leftArm;
    const style = this.getArmStyle(side);

    const points = this.getFrontPointsArr(side);
    this.elts[`${side}arm`] = this.path(points, position, {
      fill: this.color,
      filter: this.filter,
      style,
    });
    return this.elts;
  }

  public drawUpperFront(side: Side, rig: PersonRig) {
    this.rig = rig;
    this.setArmDirection(side);
    const { position } =
      side === "right" ? this.rig.rightArm : this.rig.leftArm;
    const style = this.getArmStyle(side);

    let { shoulder, upperArm, innerUpperArm, innerShoulder, shoulderConnect } =
      this.getFrontPointsData(side);
    upperArm = shiftEndpoint(upperArm, { x: 0, y: 0.25 });
    innerUpperArm = getEndpoint(innerUpperArm);
    innerUpperArm = shiftEndpoint(innerUpperArm, { x: 0, y: 0.25 });
    const points: number[][] = [];
    this.drawPoints(
      {
        shoulder,
        upperArm,
        innerUpperArm,
        innerShoulder,
        shoulderConnect,
      },
      addArr(points),
    );
    this.elts[`${side}upperarm`] = this.path(points, position, {
      fill: this.color,
      filter: this.filter,
      style,
    });
    return this.elts;
  }

  public drawLowerFront(side: Side, rig: PersonRig) {
    this.rig = rig;
    this.setArmDirection(side);
    const { position } =
      side === "right" ? this.rig.rightArm : this.rig.leftArm;
    const style = this.getArmStyle(side);

    const { upperArm, elbow, wrist, wristConnect, innerElbow, innerUpperArm } =
      this.getFrontPointsData(side);
    const points: number[][] = [];
    this.drawPoints(
      { upperArm, elbow, wrist, wristConnect, innerElbow, innerUpperArm },
      addArr(points),
    );
    this.elts[`${side}lowerarm`] = this.path(points, position, {
      fill: this.color,
      filter: this.filter,
      style,
    });
    return this.elts;
  }

  public getFrontPointsArr(side: Side) {
    const data = this.getFrontPointsData(side);
    const points: number[][] = [];
    this.drawPoints(data, addArr(points));
    return points;
  }

  public getFrontPointsData(side: Side) {
    let { outer, inner, wristConnect, shoulderConnect } = deepCopy(this.arm);
    let { shoulder, upperArm, elbow, wrist } = outer;

    let innerElbow = reflectAndReverse([inner.elbow, inner.wrist])[0];
    innerElbow = scale1D(innerElbow, -1, 1);
    let innerUpperArm = reflectAndReverse([inner.upperArm, inner.elbow])[0];
    innerUpperArm = scale1D(innerUpperArm, -1, 1);
    let innerShoulder = reflectAndReverse([inner.shoulder, inner.upperArm])[0];
    innerShoulder = scale1D(innerShoulder, -1, 1);

    wristConnect = [...wristConnect, ...getEndpoint(inner.wrist)];
    shoulderConnect = [...shoulderConnect, ...getEndpoint(outer.shoulder)];

    const rig = deepCopy(
      side === "right" ? this.rig.rightArm : this.rig.leftArm,
    );

    shoulder = shift1D(shoulder, rig.outer.shoulder.x, rig.outer.shoulder.y);
    upperArm = shiftUpToCubic(upperArm, rig.outer.upperArm);
    elbow = shiftUpToCubic(elbow, rig.outer.elbow);
    wrist = shiftUpToCubic(wrist, rig.outer.wrist);

    wristConnect = shiftUpToCubic(wristConnect, {
      ...rig.wristConnect,
      x2: rig.inner.wrist.x2,
      y2: rig.inner.wrist.y2,
    });

    innerElbow = shiftUpToCubic(
      innerElbow,
      reverseCubic(rig.inner.wrist, rig.inner.elbow),
    );
    innerUpperArm = shiftUpToCubic(
      innerUpperArm,
      reverseCubic(rig.inner.elbow, rig.inner.upperArm),
    );
    innerShoulder = shiftUpToCubic(
      innerShoulder,
      reverseCubic(rig.inner.upperArm, rig.inner.shoulder),
    );

    shoulderConnect = shiftUpToCubic(shoulderConnect, {
      ...rig.shoulderConnect,
      x2: rig.outer.shoulder.x,
      y2: rig.outer.shoulder.y,
    });

    if (side === "left") {
      shoulder = scale1D(shoulder, -1, 1);
      upperArm = scale1D(upperArm, -1, 1);
      elbow = scale1D(elbow, -1, 1);
      wrist = scale1D(wrist, -1, 1);
      wristConnect = scale1D(wristConnect, -1, 1);
      innerElbow = scale1D(innerElbow, -1, 1);
      innerUpperArm = scale1D(innerUpperArm, -1, 1);
      innerShoulder = scale1D(innerShoulder, -1, 1);
      shoulderConnect = scale1D(shoulderConnect, -1, 1);
    }

    return {
      shoulder,
      upperArm,
      elbow,
      wrist,
      wristConnect,
      innerElbow,
      innerUpperArm,
      innerShoulder,
      shoulderConnect,
    };
  }
}
