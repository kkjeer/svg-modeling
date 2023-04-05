import { EYEBROW, Eyebrow } from "../../../data/base/person/eyebrow-male-data";
import { EyebrowMaleRig, PersonRig } from "../../../rigs/base/person-rig";
import {
  addArr,
  deepCopy,
  scale1D,
  shift1D,
  shiftUpToQuad,
} from "../../../utils/misc";
import { Side } from "../../../utils/types";
import { HeadModel } from "./head";

export class EyebrowMaleModel extends HeadModel {
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
    let {
      corner,
      bottomCenter,
      outerBottom,
      outerTop,
      topCenter,
      innerTop,
      innerBottom,
    } = deepCopy(this.eyebrow);

    const { inner, center, outer } = deepCopy(
      side === "left" ? this.rig.leftEyebrow : this.rig.rightEyebrow,
    ) as EyebrowMaleRig;

    corner = shift1D(corner, inner.x, inner.y);

    // from inner bottom corner to bottom center
    bottomCenter = shiftUpToQuad(bottomCenter, center);

    // from bottom center to outer bottom corner
    outerBottom = shiftUpToQuad(outerBottom, outer);

    // from outer bottom corner to outer top corner
    outerTop = shiftUpToQuad(outerTop, outer);

    // from outer top corner to top center
    topCenter = shiftUpToQuad(topCenter, {
      x0: outer.x0,
      y0: outer.y0,
      x1: center.x1,
      y1: center.y1,
    });

    // from top center to inner top corner
    innerTop = shiftUpToQuad(innerTop, {
      x0: center.x0,
      y0: center.y0,
      x1: inner.x,
      y1: inner.y,
    });

    // from inner top corner to inner bottom corner
    innerBottom = shift1D(innerBottom, inner.x, inner.y);

    if (side === "left") {
      corner = scale1D(corner, -1, 1);
      bottomCenter = scale1D(bottomCenter, -1, 1);
      outerBottom = scale1D(outerBottom, -1, 1);
      outerTop = scale1D(outerTop, -1, 1);
      topCenter = scale1D(topCenter, -1, 1);
      innerTop = scale1D(innerTop, -1, 1);
      innerBottom = scale1D(innerBottom, -1, 1);
    }

    return {
      corner,
      bottomCenter,
      outerBottom,
      outerTop,
      topCenter,
      innerTop,
      innerBottom,
    };
  }
}
