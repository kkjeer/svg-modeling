import { NECK, Neck } from "../../../data/base/person/neck-data";
import { PersonRig } from "../../../rigs/base/person-rig";
import { HEAD_DIRECTION_RANGES, PERSON_COLORS } from "../../../utils/constants";
import { getLinearGradient } from "../../../utils/gradient";
import {
  addArr,
  deepCopy,
  getDirection,
  getEndpoint,
  getUrl,
  reflectAndReverse,
  scale1D,
  scaleOffset,
  shiftUpToCubic,
  shiftVec,
} from "../../../utils/misc";
import { DirectionRanges } from "../../../utils/types";
import { PersonBaseModel } from "./person-base";

export class NeckModel extends PersonBaseModel {
  protected directionRanges: DirectionRanges = HEAD_DIRECTION_RANGES;

  protected neck: Neck = NECK;

  protected color: string = PERSON_COLORS.skin;
  protected topColor: string = PERSON_COLORS.neck;
  protected gradientOffset: number = 45;
  protected gradientId: string = "neckgradient";

  public draw(rig: PersonRig) {
    super.draw(rig);

    this.gradients[this.gradientId] = {
      id: this.gradientId,
      stops: [
        { offset: 0, color: this.topColor },
        { offset: this.gradientOffset, color: this.color },
      ],
      direction: "vertical",
    };

    if (!this.isSide(this.direction)) {
      this.drawFront();
      return this.elts;
    }

    return this.elts;
  }

  protected setDirection() {
    this.direction = getDirection(this.directionRanges, this.rig.neck.rotation);
  }

  protected getNeckStyle() {
    return this.getStyle(
      this.rig.neck,
      this.direction,
      -this.directionRanges.left[1],
      -this.directionRanges.right[0],
    );
  }

  protected gradient() {
    return getLinearGradient(this.color, "neckgradient", [
      { offset: 0, color: this.topColor },
      { offset: this.gradientOffset, color: this.color },
    ]);
  }

  protected drawFront() {
    const { position } = this.rig.neck;
    const style = this.getNeckStyle();

    const data = this.frontPoints();
    let points: number[][] = [];
    this.drawPoints(data, addArr(points));

    this.elts["neck"] = this.path(points, position, {
      fill: getUrl(this.gradientId),
      style,
    });
  }

  protected frontPoints() {
    let { shoulder, side, top, extension = [] } = deepCopy(this.neck);

    // straight across to top left corner
    let leftTop = scale1D(getEndpoint(top), -1, 1);
    // straight down along left side
    let leftSide = scale1D(getEndpoint(side), -1, 1);
    // down and left to inside of left shoulder
    let leftShoulder = reflectAndReverse([shoulder, side])[0];
    // down and in to extend neck downward
    let leftExtension: number[] = [];
    if (extension.length > 0) {
      leftExtension = scale1D(getEndpoint(extension), -1, 1);
    }

    const { left, right } = deepCopy(this.rig.neck);

    shoulder = shiftVec(shoulder, right.shoulder);
    side = shiftUpToCubic(side, right.side);
    top = shiftVec(top, right.top);

    // positive rig x-values will move the left side of the neck outwards (to the left)
    // to make it so that positive x-values will move the left side of the neck to the right, remove scaleOffset
    leftTop = shiftVec(leftTop, scaleOffset(left.top, -1));
    leftSide = shiftVec(
      leftSide,
      scaleOffset({ x: left.side.x2, y: left.side.y2 }, -1),
    );
    leftShoulder = shiftUpToCubic(
      leftShoulder,
      scaleOffset(
        {
          x0: left.side.x1,
          y0: left.side.y1,
          x1: left.side.x0,
          y1: left.side.y0,
          x2: left.shoulder.x,
          y2: left.shoulder.y,
        },
        -1,
      ),
    );

    return {
      shoulder,
      side,
      top,
      leftTop,
      leftSide,
      leftShoulder,
      leftExtension,
      extension,
    };
  }
}
