import { getDirection } from "../../../utils/misc";
import type { PersonRig } from "../../../rigs/base/person-rig";
import { PersonBaseModel } from "./person-base";

export class HeadModel extends PersonBaseModel {
  public draw(rig: PersonRig) {
    this.rig = rig;
    this.setDirection();

    return this.elts;
  }

  protected setDirection() {
    this.direction = getDirection(
      this.directionRanges,
      this.rig.face.center.rotation,
      this.rig.face.direction,
    );
  }

  protected getHeadStyle() {
    return this.getStyle(
      this.rig.face.center,
      this.direction,
      -this.directionRanges.left[1],
      -this.directionRanges.right[0],
    );
  }
}
