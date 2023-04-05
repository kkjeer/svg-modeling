import { TORSO, Torso } from "../../../data/base/person/torso-data";
import { PersonRig, TorsoRig } from "../../../rigs/base/person-rig";
import {
  addArr,
  adjustScale,
  combineRigs,
  deepCopy,
  flip1D,
  flipCubic,
  reverse1D,
  reverseCubic,
  scale1D,
  shiftUpToCubic,
  shiftVec,
} from "../../../utils/misc";
import { emptyCubic, emptyQuad, Quad, Subset } from "../../../utils/types";
import { PersonBaseModel } from "./person-base";

export class TorsoModel extends PersonBaseModel {
  protected torso: Torso = TORSO;

  protected color: string = "#272727";
  protected filter: string = "";
  protected overlayColor: string = "";
  protected overlayFilter: string = "";
  protected overlayThickness: number | undefined = undefined;

  protected initialRig: Subset<TorsoRig> | undefined = undefined;

  public draw(rig: PersonRig) {
    super.draw(rig);

    this.drawFront();

    return this.elts;
  }

  protected setTorsoDirection() {
    const { rotation } = this.rig.torso;
    this.direction = this.getDirection(this.directionRanges, rotation);
  }

  protected getTorsoStyle() {
    return this.getStyle(
      this.rig.torso,
      this.direction,
      -this.directionRanges.left[1],
      -this.directionRanges.right[0],
    );
  }

  protected drawFront() {
    this.setTorsoDirection();
    const { position } = this.rig.torso;
    let style = this.getTorsoStyle();
    const data = this.getFrontPointsData();

    this.backgroundFront(data);

    const points = this.getFrontPointsArr();
    const doOverlay = this.overlayColor || this.overlayFilter;
    const bgStyle =
      doOverlay && this.overlayThickness
        ? adjustScale(style, -this.overlayThickness)
        : style;
    this.elts["torso"] = this.path(points, position, {
      fill: this.color,
      filter: this.filter,
      style: bgStyle,
    });
    if (doOverlay) {
      this.elts["torsooverlay"] = this.path(points, position, {
        fill: this.overlayColor,
        filter: this.overlayFilter,
        style,
      });
    }

    this.detailsFront(data);
  }

  protected detailsFront(data: ReturnType<typeof this.getFrontPointsData>) {}

  protected backgroundFront(data: ReturnType<typeof this.getFrontPointsData>) {}

  protected getFrontPointsArr(): number[][] {
    const data = this.getFrontPointsData();
    const points: number[][] = [];
    this.drawPoints(data, addArr(points));
    return points;
  }

  protected getFrontPointsData() {
    let {
      bottomCenter,
      hem,
      hip,
      waist,
      area,
      shoulder,
      neck,
      collarUp = [],
      collarIn = [],
      collarDown = [],
      inset = [],
    } = deepCopy(this.torso);

    // left side

    // left inset (if the inset exists)
    let leftInset: number[] = [];
    if (inset.length > 0) {
      if (collarDown.length > 0) {
        leftInset = scale1D(reverse1D(inset, collarDown), -1, 1);
      } else {
        leftInset = scale1D(reverse1D(inset, neck), -1, 1);
      }
    }

    // left collar (if the collar exists)
    let leftCollarDown: number[] = [];
    if (collarDown.length > 0) {
      if (collarIn.length > 0) {
        leftCollarDown = flip1D(collarDown, collarIn);
      } else if (collarUp.length > 0) {
        leftCollarDown = flip1D(collarDown, collarUp);
      }
    }
    let leftCollarIn: number[] = [];
    if (collarIn.length > 0) {
      if (collarUp.length > 0) {
        leftCollarIn = flip1D(collarIn, collarUp);
      } else {
        leftCollarIn = flip1D(collarIn, neck);
      }
    }
    let leftCollarUp: number[] = [];
    if (collarUp.length > 0) {
      leftCollarUp = flip1D(collarUp, neck);
    }

    // continue left side
    let leftNeck = flip1D(neck, shoulder);
    let leftShoulder = flip1D(shoulder, area);
    let leftArea = flip1D(area, waist);
    let leftWaist = flip1D(waist, hip);
    let leftHip = flip1D(hip, hem);
    let leftHem = flip1D(hem, bottomCenter);

    // rigging

    const {
      right,
      left,
      bottomCenter: bottomCenterRig,
      topCenter,
    } = deepCopy(combineRigs(this.rig.torso, this.initialRig));

    // rigging: right side
    bottomCenter = shiftVec(bottomCenter, bottomCenterRig);
    hem = shiftUpToCubic(hem, right.hem);
    hip = shiftUpToCubic(hip, right.hip);
    waist = shiftUpToCubic(waist, right.waist);
    area = shiftUpToCubic(area, right.area);
    shoulder = shiftUpToCubic(shoulder, right.shoulder);
    neck = shiftUpToCubic(neck, right.neck);
    collarUp = shiftUpToCubic(collarUp, right.collarUp ?? emptyCubic());
    collarIn = shiftUpToCubic(collarIn, right.collarIn ?? emptyCubic());
    collarDown = shiftUpToCubic(collarDown, right.collarDown ?? emptyCubic());
    const insetRig = (inset: Quad | undefined) => ({
      ...(inset ?? emptyQuad()),
      x2: topCenter?.x ?? 0,
      y2: topCenter?.y ?? 0,
    });
    inset = shiftUpToCubic(inset, insetRig(right.inset));

    // rigging: left side
    const leftInsetRigEnd = () => {
      if (collarDown.length > 0) {
        return left.collarDown;
      }
      return left.neck;
    };
    leftInset = shiftUpToCubic(
      leftInset,
      flipCubic(insetRig(left.inset), leftInsetRigEnd() ?? emptyCubic()),
    );
    const leftCollarDownRigEnd = () => {
      if (collarIn.length > 2) {
        return left.collarIn;
      }
      return left.collarUp;
    };
    leftCollarDown = shiftUpToCubic(
      leftCollarDown,
      flipCubic(
        left.collarDown ?? emptyCubic(),
        leftCollarDownRigEnd() ?? emptyCubic(),
      ),
    );
    const leftCollarInRigEnd = () => {
      if (collarUp.length > 2) {
        return left.collarUp;
      }
      return left.neck;
    };
    leftCollarIn = shiftUpToCubic(
      leftCollarIn,
      flipCubic(
        left.collarIn ?? emptyCubic(),
        leftCollarInRigEnd() ?? emptyCubic(),
      ),
    );
    leftCollarUp = shiftUpToCubic(
      leftCollarUp,
      flipCubic(left.collarUp ?? emptyCubic(), left.neck),
    );
    leftNeck = shiftUpToCubic(leftNeck, flipCubic(left.neck, left.shoulder));
    leftShoulder = shiftUpToCubic(
      leftShoulder,
      flipCubic(left.shoulder, left.area),
    );
    leftArea = shiftUpToCubic(leftArea, flipCubic(left.area, left.waist));
    leftWaist = shiftUpToCubic(leftWaist, flipCubic(left.waist, left.hip));
    leftHip = shiftUpToCubic(leftHip, flipCubic(left.hip, left.hem));
    leftHem = shiftUpToCubic(leftHem, reverseCubic(left.hem, bottomCenterRig));

    return {
      bottomCenter,
      hem,
      hip,
      waist,
      area,
      shoulder,
      neck,
      collarUp,
      collarIn,
      collarDown,
      inset,
      leftInset,
      leftCollarDown,
      leftCollarIn,
      leftCollarUp,
      leftNeck,
      leftShoulder,
      leftArea,
      leftWaist,
      leftHip,
      leftHem,
    };
  }
}
