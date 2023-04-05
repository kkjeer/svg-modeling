import { EAR, Ear } from "../../../data/base/person/ear-data";
import { PersonRig } from "../../../rigs/base/person-rig";
import { PERSON_COLORS } from "../../../utils/constants";
import {
  addArr,
  deepCopy,
  scale1D,
  shiftUpToQuad,
  shiftVec,
} from "../../../utils/misc";
import { emptyVec, Side, Vec } from "../../../utils/types";
import { PersonBaseModel } from "./person-base";

export class EarModel extends PersonBaseModel {
  protected ear: Ear = EAR;

  protected color: string = PERSON_COLORS.skin;

  protected initialRotation: Vec = { x: 0, y: 30, z: 0 };

  public draw(rig: PersonRig) {
    super.draw(rig);

    this.drawEar("right", rig);
    this.drawEar("left", rig);

    return this.elts;
  }

  public drawEar(side: Side, rig: PersonRig) {
    this.rig = rig;
    const { position } = this.rig.face.center;
    const style = this.getEarStyle(side);
    const points = this.frontPoints(side);

    this.elts[`${side}ear`] = this.path(points, position, {
      fill: this.color,
      style,
    });

    return this.elts;
  }

  protected frontPoints(side: Side) {
    const data = this.frontData(side);
    const points: number[][] = [];
    this.drawPoints(data, addArr(points));
    return points;
  }

  protected frontData(side: Side) {
    let { innerTop, outerTop, outerBottom, innerBottom } = deepCopy(this.ear);

    const rig = deepCopy(
      side === "right" ? this.rig.rightEar : this.rig.leftEar,
    );
    if (rig) {
      innerTop = shiftVec(innerTop, rig.innerTop);
      innerBottom = shiftUpToQuad(innerBottom, rig.innerBottom);
      outerBottom = shiftUpToQuad(outerBottom, rig.outerBottom);
      outerTop = shiftUpToQuad(outerTop, rig.outerTop);
    }

    if (side === "left") {
      innerTop = scale1D(innerTop, -1, 1);
      outerTop = scale1D(outerTop, -1, 1);
      outerBottom = scale1D(outerBottom, -1, 1);
      innerBottom = scale1D(innerBottom, -1, 1);
    }

    return {
      innerTop,
      outerTop,
      outerBottom,
      innerBottom,
    };
  }

  protected getEarStyle(side: Side) {
    const position = this.rig.face.center.position;
    const rotation = this.rig.face.center.rotation ?? emptyVec(true);
    const scale = this.getScale({ position, rotation }, "front");
    const transformOrigin = this.transformOrigin(position);
    const rotX = rotation.x + this.initialRotation.x;
    const rotY = rotation.y + this.initialRotation.y;
    const rotZ = (rotation.z ?? 0) + (this.initialRotation.z ?? 0);
    const rotationStr = `rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`;
    return {
      transform: `${scale} ${rotationStr}`,
      transformOrigin,
    };
  }
}
