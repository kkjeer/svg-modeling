import {
  BottomEyelash,
  BOTTOM_EYELASH,
  EYE,
  Eye,
  IRIS,
  Iris,
  TopEyelash,
  TOP_EYELASH,
} from "../../../data/base/person/eye-data";
import { PersonRig } from "../../../rigs/base/person-rig";
import { PERSON_COLORS } from "../../../utils/constants";
import {
  addArr,
  deepCopy,
  getEndpoint,
  getStartpoint,
  scale1D,
  scale2D,
  shift1D,
  shift2D,
  shiftEndpoint,
  shiftUpToCubic,
} from "../../../utils/misc";
import { Side } from "../../../utils/types";
import { HeadModel } from "./head";

export class EyeModel extends HeadModel {
  // eye white
  protected white: Eye = EYE;
  // iris
  protected iris: Iris = IRIS;
  // eyelashes
  protected bottomEyelash: BottomEyelash = BOTTOM_EYELASH;
  protected topEyelash: TopEyelash = TOP_EYELASH;

  // colors
  protected faceColor = PERSON_COLORS.skin;
  protected whiteColor = "#ffffff";
  protected eyelashColor = "#000000";
  protected irisColor: string = "#2222ff";

  // extend of iris covers
  protected coverWidth: number | undefined = 0.5;
  protected coverHeight: number | undefined = 1.5;

  public draw(rig: PersonRig) {
    super.draw(rig);

    if (this.direction === "back") {
      return this.elts;
    }

    if (this.direction === "front") {
      this.drawFrontEye("right");
      this.drawFrontEye("left");
      return this.elts;
    }

    // TODO: right and left head directions

    return this.elts;
  }

  protected drawFrontEye(side: Side) {
    const { position } = this.rig.face.center;
    const style = this.getHeadStyle();

    const { white, cover, bottomEyelash, topEyelash } =
      this.eyeFrontPoints(side);

    // white of eye
    this.elts[`${side}eyewhite`] = this.path(white, position, {
      fill: this.whiteColor,
      style,
    });

    // iris
    const { iris, pupil, dot } = this.irisFrontPoints(side);
    this.elts[`${side}eyeiris`] = this.circle(
      iris.r,
      iris.x,
      iris.y,
      position,
      {
        fill: this.irisColor,
        style,
      },
    );
    this.elts[`${side}eyepupil`] = this.circle(
      pupil.r,
      pupil.x,
      pupil.y,
      position,
      {
        fill: "black",
        style,
      },
    );
    this.elts[`${side}eyedot`] = this.circle(dot.r, dot.x, dot.y, position, {
      fill: "white",
      style,
    });

    // iris covers
    for (const key in cover) {
      this.elts[`${side}${key}iriscover`] = this.path(
        (cover as any)[key],
        position,
        {
          fill: this.faceColor,
          style,
        },
      );
    }

    // eyelashes
    this.elts[`${side}bottomeyelash`] = this.path(bottomEyelash, position, {
      fill: this.eyelashColor,
      style,
    });
    this.elts[`${side}topeyelash`] = this.path(topEyelash, position, {
      fill: this.eyelashColor,
      style,
    });
  }

  protected eyeFrontPoints(side: Side) {
    const white = this.whiteFrontPoints(side);
    let whitePoints: number[][] = [];
    this.drawPoints(white, addArr(whitePoints));

    const bottomCover = this.bottomCoverPoints(side, white);
    let bottomCoverPoints: number[][] = [];
    this.drawPoints(bottomCover, addArr(bottomCoverPoints));

    const outerCover = this.outerCoverPoints(side, white);
    let outerCoverPoints: number[][] = [];
    this.drawPoints(outerCover, addArr(outerCoverPoints));

    const topCover = this.topCoverPoints(side, white);
    let topCoverPoints: number[][] = [];
    this.drawPoints(topCover, addArr(topCoverPoints));

    const innerCover = this.innerCoverPoints(side, white);
    let innerCoverPoints: number[][] = [];
    this.drawPoints(innerCover, addArr(innerCoverPoints));

    const bottomEyelash = this.bottomEyelashFrontPoints(side);
    let bottomEyelashPoints: number[][] = [];
    this.drawPoints(bottomEyelash, addArr(bottomEyelashPoints));

    const topEyelash = this.topEyelashFrontPoints(side);
    let topEyelashPoints: number[][] = [];
    this.drawPoints(topEyelash, addArr(topEyelashPoints));

    return {
      white: whitePoints,
      cover: {
        bottom: bottomCoverPoints,
        outer: outerCoverPoints,
        top: topCoverPoints,
        inner: innerCoverPoints,
      },
      bottomEyelash: bottomEyelashPoints,
      topEyelash: topEyelashPoints,
    };
  }

  protected whiteFrontPoints(side: Side): Eye {
    let { corner, outerBottom, outerTop, top, innerTop, innerBottom } =
      deepCopy(this.white);

    const rig = deepCopy(
      side === "left" ? this.rig.leftEye : this.rig.rightEye,
    );

    corner = shift1D(corner, rig.corner.x, rig.corner.y);
    outerBottom = shiftUpToCubic(outerBottom, rig.outerBottom);
    outerTop = shiftUpToCubic(outerTop, rig.outerTop);
    top = shiftUpToCubic(top, rig.top);
    innerTop = shiftUpToCubic(innerTop, rig.innerTop);
    innerBottom = shiftUpToCubic(innerBottom, rig.innerBottom);
    innerBottom = shiftEndpoint(innerBottom, {
      x: rig.corner.x,
      y: rig.corner.y,
    });

    if (side === "left") {
      corner = scale1D(corner, -1, 1);
      outerBottom = scale1D(outerBottom, -1, 1);
      outerTop = scale1D(outerTop, -1, 1);
      top = scale1D(top, -1, 1);
      innerTop = scale1D(innerTop, -1, 1);
      innerBottom = scale1D(innerBottom, -1, 1);
    }

    return { corner, outerBottom, outerTop, top, innerTop, innerBottom };
  }

  protected bottomEyelashFrontPoints(side: Side) {
    let {
      corner,
      outerBottom,
      outerTop,
      thickness = 0.05,
    } = deepCopy(this.bottomEyelash);

    // move inward from the outer top corner
    let innerTop = deepCopy(
      this.bottomEyelash.innerTop ?? [
        outerTop[0] - thickness,
        outerTop[1] - thickness,
      ],
    );
    if (outerTop.length < 2) {
      innerTop = [];
    }

    // go down and inward to point next to outer bottom corner
    let innerBottom: number[] = [];
    if (this.bottomEyelash.innerBottom) {
      innerBottom = deepCopy(this.bottomEyelash.innerBottom);
    }
    if (outerTop.length > 2) {
      for (let i = outerTop.length - 2; i >= 0; i -= 2) {
        innerBottom.push(outerTop[i]);
        innerBottom.push(outerTop[i + 1] - thickness);
      }
    }
    innerBottom.push(outerBottom[outerBottom.length - 2]);
    innerBottom.push(outerBottom[outerBottom.length - 1] - thickness);

    // from the inner bottom corner to the inner edge of the starting point (bottom outer corner)
    let innerCorner: number[] = [];
    if (this.bottomEyelash.innerCorner) {
      innerCorner = deepCopy(this.bottomEyelash.innerCorner);
    }
    if (outerBottom.length >= 4) {
      for (let i = outerBottom.length - 4; i >= 0; i -= 2) {
        innerCorner.push(outerBottom[i]);
        innerCorner.push(outerBottom[i + 1] - thickness);
      }
    }
    innerCorner.push(corner[corner.length - 2] + thickness);
    innerCorner.push(corner[corner.length - 1] - thickness);

    const rig = side === "left" ? this.rig.leftEye : this.rig.rightEye;
    corner = shift1D(corner, rig.corner.x, rig.corner.y);
    outerBottom = shiftUpToCubic(outerBottom, rig.outerBottom);
    outerTop = shiftUpToCubic(outerTop, rig.outerTop);
    innerTop = shiftUpToCubic(innerTop, rig.outerTop);
    innerBottom = shiftUpToCubic(innerBottom, {
      x0: rig.outerTop.x1,
      y0: rig.outerTop.y1,
      x1: rig.outerTop.x0,
      y1: rig.outerTop.y0,
      x2: rig.outerBottom.x2,
      y2: rig.outerBottom.y2,
    });
    innerCorner = shiftUpToCubic(innerCorner, {
      x0: rig.outerBottom.x1,
      y0: rig.outerBottom.y1,
      x1: rig.outerBottom.x0,
      y1: rig.outerBottom.y0,
      x2: rig.corner.x,
      y2: rig.corner.y,
    });

    if (side === "left") {
      corner = scale1D(corner, -1, 1);
      outerBottom = scale1D(outerBottom, -1, 1);
      outerTop = scale1D(outerTop, -1, 1);
      innerTop = scale1D(innerTop, -1, 1);
      innerBottom = scale1D(innerBottom, -1, 1);
      innerCorner = scale1D(innerCorner, -1, 1);
    }

    return {
      corner,
      outerBottom,
      outerTop,
      innerTop,
      innerBottom,
      innerCorner,
    };
  }

  protected topEyelashFrontPoints(side: Side): TopEyelash {
    let {
      outerTop,
      top,
      innerTop,
      innerBottom = [],
      innerBottomEdge = [],
      innerTopEdge,
      topEdge,
      lashStart,
      lashes,
      outerTopEdge,
    } = deepCopy(this.topEyelash);

    const rig = side === "left" ? this.rig.leftEye : this.rig.rightEye;
    outerTop = shiftEndpoint(outerTop, {
      x: rig.outerTop.x2,
      y: rig.outerTop.y2,
    });
    top = shiftUpToCubic(top, rig.top);
    innerTop = shiftUpToCubic(innerTop, rig.innerTop);
    innerBottom = shiftUpToCubic(innerBottom, rig.innerBottom);
    innerBottomEdge = shiftUpToCubic(innerBottomEdge, rig.innerBottom);
    innerTopEdge = shiftUpToCubic(innerTopEdge, {
      x0: rig.innerBottom.x1,
      y0: rig.innerBottom.y1,
      x1: rig.innerBottom.x0,
      y1: rig.innerBottom.y0,
      x2: rig.innerTop.x2,
      y2: rig.innerTop.y2,
    });
    topEdge = shiftUpToCubic(topEdge, {
      x0: rig.innerTop.x1,
      y0: rig.innerTop.y1,
      x1: rig.innerTop.x0,
      y1: rig.innerTop.y0,
      x2: rig.top.x2,
      y2: rig.top.y2,
    });
    lashStart = shiftUpToCubic(lashStart, {
      x0: rig.top.x1,
      y0: rig.top.y1,
      x1: rig.top.x0,
      y1: rig.top.y0,
      x2: rig.outerTop.x2,
      y2: rig.outerTop.y2,
    });
    lashes = shift2D(lashes, rig.outerTop.x2, rig.outerTop.y2);
    outerTopEdge = shiftEndpoint(outerTopEdge, {
      x: rig.outerTop.x2,
      y: rig.outerTop.y2,
    });

    if (side === "left") {
      outerTop = scale1D(outerTop, -1, 1);
      top = scale1D(top, -1, 1);
      innerTop = scale1D(innerTop, -1, 1);
      innerBottom = scale1D(innerBottom, -1, 1);
      innerBottomEdge = scale1D(innerBottomEdge, -1, 1);
      innerTopEdge = scale1D(innerTopEdge, -1, 1);
      topEdge = scale1D(topEdge, -1, 1);
      lashStart = scale1D(lashStart, -1, 1);
      lashes = scale2D(lashes, -1, 1);
      outerTopEdge = scale1D(outerTopEdge, -1, 1);
    }

    return {
      outerTop,
      top,
      innerTop,
      innerBottom,
      innerBottomEdge,
      innerTopEdge,
      topEdge,
      lashStart,
      lashes,
      outerTopEdge,
    };
  }

  protected irisFrontPoints(side: Side) {
    const iris = {
      r: this.iris.radius,
      x: this.iris.x,
      y: this.iris.y,
    };

    const { x, y } = deepCopy(this.rig.irises.position);
    const { x: dx, y: dy } = deepCopy(this.rig.irises.dot);

    if (side === "left") {
      iris.x *= -1;
    }

    iris.x += x;
    iris.y += y;

    const pupil = {
      ...iris,
      r: this.iris.pupilRadius ?? 0.63 * iris.r,
    };

    const dot = {
      r: this.iris.dotRadius ?? 0.22 * iris.r,
      x: pupil.x + 0.7,
      y: pupil.y - 0.34,
    };
    dot.x += dx;
    dot.y += dy;

    return { iris, pupil, dot };
  }

  ////// COVERS FOR IRIS //////

  protected bottomCoverPoints(side: Side, white: Eye) {
    const { corner, outerBottom } = deepCopy(white);

    const d = 1.5 * this.iris.radius;
    const dxOut = (side === "right" ? 1 : -1) * (this.coverWidth ?? d);
    const dyOut = this.coverHeight ?? d;
    const dxIn = (side === "right" ? 1 : -1) * d;
    const dyIn = d;

    const outerEndpoint = getEndpoint(outerBottom);
    const outerTopEdge: number[] = [outerEndpoint[0] + dxOut, outerEndpoint[1]];
    const outerBottomEdge: number[] = [
      outerTopEdge[0],
      outerEndpoint[1] + dyOut,
    ];
    const cornerStartpoint = getStartpoint(corner);
    const innerBottomEdge = [
      cornerStartpoint[0] - dxIn,
      cornerStartpoint[1] + dyIn,
    ];
    const innerTopEdge = [cornerStartpoint[0] - dxIn, cornerStartpoint[1]];

    return {
      corner,
      outerBottom,
      outerTopEdge,
      outerBottomEdge,
      innerBottomEdge,
      innerTopEdge,
    };
  }

  protected outerCoverPoints(side: Side, white: Eye) {
    const { outerBottom, outerTop } = deepCopy(white);
    outerBottom[outerBottom.length - 1] += 0.1;
    outerTop[outerTop.length - 1] -= 0.1;

    const d = 1.5 * this.iris.radius;
    const dx = (side === "right" ? 1 : -1) * (this.coverWidth ?? d);

    const bottomEndpoint = getEndpoint(outerBottom);
    const topEndpoint = getEndpoint(outerTop);

    const outerTopEdge = [topEndpoint[0] + dx, topEndpoint[1]];
    const outerBottomEdge = [bottomEndpoint[0] + dx, bottomEndpoint[1]];

    return {
      bottomEndpoint,
      outerTop,
      outerTopEdge,
      outerBottomEdge,
    };
  }

  protected topCoverPoints(side: Side, white: Eye) {
    const { outerTop, top, innerTop } = deepCopy(white);

    const d = 1.5 * this.iris.radius;
    const dxOut = (side === "right" ? 1 : -1) * (this.coverWidth ?? d);
    const dyOut = this.coverHeight ?? d;
    const dxIn = (side === "right" ? 1 : -1) * d;
    const dyIn = d;

    const outerEndpoint = getEndpoint(outerTop);
    const innerEndpoint = getEndpoint(innerTop);

    const innerBottomEdge = [innerEndpoint[0] - dxIn, innerEndpoint[1]];
    const innerTopEdge = [innerEndpoint[0] - dxIn, innerEndpoint[1] - dyIn];
    const outerTopEdge = [outerEndpoint[0] + dxOut, outerEndpoint[1] - dyOut];
    const outerBottomEdge = [outerEndpoint[0] + dxOut, outerEndpoint[1]];

    return {
      outerEndpoint,
      top,
      innerTop,
      innerBottomEdge,
      innerTopEdge,
      outerTopEdge,
      outerBottomEdge,
    };
  }

  protected innerCoverPoints(side: Side, white: Eye) {
    const { innerTop, innerBottom } = deepCopy(white);
    innerTop[innerTop.length - 1] -= 0.1;
    innerBottom[innerBottom.length - 1] += 0.1;

    const d = 1.5 * this.iris.radius;
    const dx = (side === "right" ? 1 : -1) * d;

    const topEndpoint = getEndpoint(innerTop);
    const bottomEndpoint = getEndpoint(innerBottom);

    const innerBottomEdge = [bottomEndpoint[0] - dx, bottomEndpoint[1]];
    const innerTopEdge = [topEndpoint[0] - dx, topEndpoint[1]];

    return {
      topEndpoint,
      innerBottom,
      innerBottomEdge,
      innerTopEdge,
    };
  }
}
