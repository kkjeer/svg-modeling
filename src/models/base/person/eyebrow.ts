import { EYEBROW, Eyebrow } from "../../../data/base/person/eyebrow-data";
import { EyebrowRig, PersonRig } from "../../../rigs/base/person-rig";
import {
  addArr,
  deepCopy,
  scale1D,
  shift1D,
  shiftUpToCubic,
} from "../../../utils/misc";
import { Side } from "../../../utils/types";
import { HeadModel } from "./head";

export class EyebrowModel extends HeadModel {
  protected eyebrow: Eyebrow = EYEBROW;

  // colors
  protected color: string = "#000000";

  public draw(rig: PersonRig) {
    super.draw(rig);

    if (this.direction === "back") {
      return this.elts;
    }

    if (this.direction === "front") {
      this.drawFrontEyebrow("right");
      this.drawFrontEyebrow("left");
      return this.elts;
    }

    // TODO: right and left head directions

    return this.elts;
  }

  protected drawFrontEyebrow(side: Side) {
    const { position } = this.rig.face.center;
    const style = this.getHeadStyle();

    const eyebrow = this.eyebrowFrontPoints(side);
    const eyebrowPoints: number[][] = [];
    this.drawPoints(eyebrow, addArr(eyebrowPoints));

    this.elts[`${side}eyebrow`] = this.path(eyebrowPoints, position, {
      fill: this.color,
      style,
    });
  }

  protected eyebrowFrontPoints(side: Side) {
    let { corner, outerBottom, outerTop, innerTop, innerBottom } = deepCopy(
      this.eyebrow,
    );

    const { inner, outer } = deepCopy(
      side === "left" ? this.rig.leftEyebrow : this.rig.rightEyebrow,
    ) as EyebrowRig;

    corner = shift1D(corner, inner.x, inner.y);

    // from bottom center to outer bottom corner
    outerBottom = shiftUpToCubic(outerBottom, outer);

    // from outer bottom corner to outer top corner
    outerTop = shiftUpToCubic(outerTop, outer);

    // from outer top corner to inner top corner
    innerTop = shiftUpToCubic(innerTop, {
      x0: outer.x1,
      y0: outer.y1,
      x1: outer.x0,
      y1: outer.y0,
      x2: inner.x,
      y2: inner.y,
    });

    // from inner top corner to inner bottom corner
    innerBottom = shift1D(innerBottom, inner.x, inner.y);

    if (side === "left") {
      corner = scale1D(corner, -1, 1);
      outerBottom = scale1D(outerBottom, -1, 1);
      outerTop = scale1D(outerTop, -1, 1);
      innerTop = scale1D(innerTop, -1, 1);
      innerBottom = scale1D(innerBottom, -1, 1);
    }

    return {
      corner,
      outerBottom,
      outerTop,
      innerTop,
      innerBottom,
    };
  }
}
