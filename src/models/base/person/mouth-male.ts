import { UpperLip, UPPER_LIP } from "../../../data/base/person/mouth-male-data";
import { MouthMaleRig, PersonRig } from "../../../rigs/base/person-rig";
import { addArr, deepCopy, shift1D, shiftUpToCubic } from "../../../utils/misc";
import { HeadModel } from "./head";

export class MouthMaleModel extends HeadModel {
  // lips
  protected upperLip: UpperLip = UPPER_LIP;

  // mouth (background)
  protected mouthColor = "#581b2d";

  public draw(rig: PersonRig) {
    super.draw(rig);

    if (this.direction === "back") {
      return this.elts;
    }

    const { position } = this.rig.face.center;
    const style = this.getHeadStyle();

    if (this.direction === "front") {
      const { upperLipPoints } = this.frontPoints();
      this.elts["upperlip"] = this.path(upperLipPoints, position, {
        stroke: this.upperLip.color,
        thickness: this.upperLip.thickness,
        style,
      });
    }

    return this.elts;
  }

  protected frontPoints() {
    const upperLipPoints: number[][] = [];
    const addUpperLipPoints = addArr(upperLipPoints);

    const upper = this.frontUpperLip();
    this.drawPoints(upper, addUpperLipPoints);

    return {
      upperLipPoints,
    };
  }

  protected frontUpperLip() {
    const upperLip = deepCopy(this.upperLip);

    const { upperLip: rig } = deepCopy(this.rig.mouth as MouthMaleRig);

    let left = upperLip.left;
    left = shift1D(left, rig.left.x, rig.left.y);

    let center = upperLip.center;
    center = shiftUpToCubic(center, rig.center);

    let right = upperLip.right;
    right = shiftUpToCubic(right, rig.right);

    return { left, center, right };
  }
}
