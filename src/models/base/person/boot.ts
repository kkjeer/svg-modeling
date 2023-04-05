import { Boot, BOOT, CUFF, Cuff } from "../../../data/base/person/boot-data";
import { PersonRig } from "../../../rigs/base/person-rig";
import {
  addArr,
  deepCopy,
  flip1D,
  getEndpoint,
  reflectAndReverse,
  scale1D,
  shift1D,
  shiftUpToCubic,
} from "../../../utils/misc";
import { Side } from "../../../utils/types";
import { PersonBaseModel } from "./person-base";

export class BootModel extends PersonBaseModel {
  protected boot: Boot = BOOT;
  protected cuff: Cuff | null = CUFF;

  protected color: string = "#121212";
  protected cuffColor: string = "#1f1f1f";

  protected filter: string = "";
  protected cuffFilter: string = "";

  // bring the inner side of each boot inwards so it's not perfectly symmetrical with the outer side
  protected innerShift: number = 0.3;
  protected shiftInnerCuff: boolean = false;

  public draw(rig: PersonRig) {
    super.draw(rig);

    this.drawFront("right");
    this.drawFront("left");

    return this.elts;
  }

  protected setBootDirection(side: Side) {
    const { rotation } =
      side === "right" ? this.rig.rightBoot : this.rig.leftBoot;
    this.direction = this.getDirection(this.directionRanges, rotation);
  }

  protected getBootStyle(side: Side) {
    const rig = side === "right" ? this.rig.rightBoot : this.rig.leftBoot;
    return this.getStyle(
      rig,
      this.direction,
      -this.directionRanges.left[1],
      -this.directionRanges.right[0],
    );
  }

  protected drawFront(side: Side) {
    this.setBootDirection(side);
    const { position } =
      side === "right" ? this.rig.rightBoot : this.rig.leftBoot;
    const style = this.getBootStyle(side);

    const data = this.bootFront(side);
    const points: number[][] = [];
    this.drawPoints(data, addArr(points));

    this.elts[`${side}boot`] = this.path(points, position, {
      fill: this.color,
      filter: this.filter,
      style,
    });

    const cuffData = this.cuffFront(side);
    if (!cuffData) return;
    const cuffPoints: number[][] = [];
    this.drawPoints(cuffData, addArr(cuffPoints));
    this.elts[`${side}bootcuff`] = this.path(cuffPoints, position, {
      fill: this.cuffColor,
      filter: this.cuffFilter,
      style,
    });
  }

  protected bootFront(side: Side) {
    let { top, ankle, toesSide, toes, cuff = [] } = deepCopy(this.boot);

    if (side === "left") {
      top = scale1D(top, -1, 1);
      ankle = scale1D(ankle, -1, 1);
      toesSide = scale1D(toesSide, -1, 1);
      toes = scale1D(toes, -1, 1);
      cuff = scale1D(cuff, -1, 1);
    }

    let innerToesSide = reflectAndReverse([toesSide, toes])[0];
    let innerAnkle = reflectAndReverse([ankle, toesSide])[0];
    let innerTop = reflectAndReverse([top, ankle])[0];

    const delta = (side === "right" ? 1 : -1) * this.innerShift;
    innerToesSide = shift1D(innerToesSide, delta, 0);
    innerAnkle = shift1D(innerAnkle, delta, 0);
    innerTop = shift1D(innerTop, delta, 0);

    const { outer, inner } =
      side === "right" ? this.rig.rightBoot : this.rig.leftBoot;

    top = shift1D(top, outer.top.x, outer.top.y);
    ankle = shiftUpToCubic(ankle, outer.ankle);
    toesSide = shiftUpToCubic(toesSide, outer.toesSide);
    toes = shiftUpToCubic(toes, outer.toes);

    innerToesSide = shiftUpToCubic(innerToesSide, {
      x0: inner.toes.x1,
      y0: inner.toes.y1,
      x1: inner.toes.x0,
      y1: inner.toes.y0,
      x2: inner.toesSide.x2,
      y2: inner.toesSide.y2,
    });
    innerAnkle = shiftUpToCubic(innerAnkle, {
      x0: inner.toesSide.x1,
      y0: inner.toesSide.y1,
      x1: inner.toesSide.x0,
      y1: inner.toesSide.y0,
      x2: inner.ankle.x2,
      y2: inner.ankle.y2,
    });
    innerTop = shiftUpToCubic(innerTop, {
      x0: inner.ankle.x1,
      y0: inner.ankle.y1,
      x1: inner.ankle.x0,
      y1: inner.ankle.y0,
      x2: inner.top.x,
      y2: inner.top.y,
    });

    if (!cuff || cuff.length <= 0) {
      return {
        top,
        ankle,
        toesSide,
        toes,
        innerToesSide,
        innerAnkle,
        innerTop,
      };
    }

    // from top center to outer top corner
    let outerCuff: number[] = [];
    for (let i = cuff.length - 2; i >= 0; i -= 2) {
      outerCuff.push(-cuff[i]);
      outerCuff.push(cuff[i + 1]);
    }
    outerCuff = [...outerCuff, ...getEndpoint(top)];

    cuff = shift1D(cuff, delta, 0);
    cuff = shiftUpToCubic(cuff, inner.cuff);
    outerCuff = shiftUpToCubic(outerCuff, {
      x0: outer.cuff.x2,
      y0: outer.cuff.y2,
      x1: outer.cuff.x1,
      y1: outer.cuff.y1,
      x2: 0,
      y2: 0,
    });

    return {
      top,
      ankle,
      toesSide,
      toes,
      innerToesSide,
      innerAnkle,
      innerTop,
      cuff,
      outerCuff,
    };
  }

  protected cuffFront(side: Side) {
    if (!this.cuff) {
      return null;
    }

    let {
      bottomCenter,
      outerBottom,
      mid,
      outerTop,
      back,
      topCenter,
      innerBack = [],
      innerTop = [],
      innerMid = [],
      innerBottom = [],
      innerBottomCenter = [],
    } = deepCopy(this.cuff);

    if (side === "left") {
      bottomCenter = scale1D(bottomCenter, -1, 1);
      outerBottom = scale1D(outerBottom, -1, 1);
      mid = scale1D(mid, -1, 1);
      outerTop = scale1D(outerTop, -1, 1);
      back = scale1D(back, -1, 1);
      topCenter = scale1D(topCenter, -1, 1);

      innerBack = scale1D(innerBack, -1, 1);
      innerTop = scale1D(innerTop, -1, 1);
      innerMid = scale1D(innerMid, -1, 1);
      innerBottom = scale1D(innerBottom, -1, 1);
      innerBottomCenter = scale1D(innerBottomCenter, -1, 1);
    }

    if (innerBack.length < 1) {
      innerBack = flip1D(topCenter, back);
    }
    if (innerTop.length < 1) {
      innerTop = flip1D(back, outerTop);
    }
    if (innerMid.length < 1) {
      innerMid = flip1D(outerTop, mid);
    }
    if (innerBottom.length < 1) {
      innerBottom = flip1D(mid, outerBottom);
    }
    if (innerBottomCenter.length < 1) {
      innerBottomCenter = flip1D(outerBottom, bottomCenter);
    }

    if (this.shiftInnerCuff) {
      const delta = (side === "right" ? 1 : -1) * this.innerShift;
      innerBack = shift1D(innerBack, delta, 0);
      innerTop = shift1D(innerTop, delta, 0);
      innerMid = shift1D(innerMid, delta, 0);
      innerBottom = shift1D(innerBottom, delta, 0);
      innerBottomCenter = shift1D(innerBottomCenter, delta, 0);
    }

    return {
      bottomCenter,
      outerBottom,
      mid,
      outerTop,
      back,
      topCenter,
      innerBack,
      innerTop,
      innerMid,
      innerBottom,
      innerBottomCenter,
    };
  }
}
