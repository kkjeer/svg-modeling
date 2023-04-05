import { PersonRig } from "../../rigs/base/person-rig";
import { prefixKeys } from "../../utils/misc";
import { HairModel } from "../base/person/hair";

export class JynxHairModel extends HairModel {
  constructor(width: number, height: number) {
    super(width, height);

    this.color = "#840406";
    this.lineColor = "#540406";
    this.lineThickness = 1;

    // this.debug = true;
  }

  backdropData = () => {
    const leftOuterCurl = {
      start: [-11.8, 10.8],
      curl: [-11.0, 11.4, -10.6, 11.4, -10.2, 10.8],
      chin: [-10.0, 9.0, -10.0, 7.8],
      jaw: [-10.0, 5.0, -11.6, 3.4, -11.6, 2.2],
      eyebrow: [-12.0, 1.6, -12.2, -1.4, -11.7, -2.8],
      temple: [-11.7, -4.0, -9.2, -6.0, -8.0, -6.5],
    };

    const top = {
      left: [-7.0, -6.9, -6.0, -7.1, -2.2, -7.4],
      bumpLeft: [-1.6, -8.6, 0.0, -8.9, 2.4, -8.9],
      bumpTop: [5.5, -8.8, 6.9, -8.2],
      bumpRight: [7.8, -8.0, 10.0, -6.5],
    };

    const right = {
      eyebrow: [10.9, -5.7, 11.4, -2.8],
      jaw: [11.4, 0.0, 11.1, 2.2],
      chin: [10.9, 5.2, 10.3, 6.8, 10.4, 8.2],
      down: [10.2, 10.2, 10.6, 11.2, 10.6, 13.2],
    };

    const innerRight = {
      bottom: [5.2, 13.2],
      up: [4.0, 11.2, 4.0, 7.0],
      behindHead: [-8.5, 3.8],
    };

    const leftInnerCurl = {
      down: [-7.8, 6.0, -7.8, 9.0, -8.7, 11.0],
      bottom: [-8.9, 11.6, -9.6, 11.7, -10.4, 11.8],
      tip: [-11.2, 11.8, -11.8, 10.8],
    };

    return {
      ...prefixKeys(leftOuterCurl, "leftoutercurl"),
      ...prefixKeys(top, "top"),
      ...prefixKeys(right, "right"),
      ...prefixKeys(innerRight, "innerRight"),
      ...prefixKeys(leftInnerCurl, "leftInnerCurl"),
    };
  };

  drawBangs(rig: PersonRig) {
    super.drawBangs(rig);

    this.drawHair("ponytail", this.ponytailData());

    return this.elts;
  }

  bangsData = () => {
    const left = {
      start: [-10.0, 1.8],
      eyebrow: [-9.6, -0.4, -8.8, -2.0],
      temple: [-8.4, -2.8, -6.8, -3.6],
      point: [-6.9, -3.2, -6.6, -2.9],
      top: [-4.0, -4.8, -0.2, -4.8],
    };
    const top = {
      bigPoint: [-0.4, -4.0, -2.2, -3.8],
      bigPointEnd: [1.4, -3.9, 1.8, -4.6],
      littlePoint: [2.1, -4.2, 1.6, -3.8],
      littlePointEnd: [3.6, -3.8, 5.2, -4.4, 5.8, -4.2],
    };
    const right = {
      temple: [6.2, -4.2, 7.0, -3.8],
      eyebrow: [8.6, -2.8, 8.8, -2.0],
      jaw: [9.6, -0.4, 10.0, 1.8],
    };
    const extension = {
      topRight: [9.5, -5.8],
      top: [4.8, -6.6, 0.0, -6.6],
      topLeft: [-4.8, -6.6, -9.2, -5.5],
      end: [-9.8, -4.8, -10.0, 1.8],
    };
    return {
      ...prefixKeys(left, "left"),
      ...prefixKeys(top, "top"),
      ...prefixKeys(right, "right"),
      ...prefixKeys(extension, "extension"),
    };
  };

  protected ponytailData() {
    const outside = {
      start: [10.6, 12.0],
    };
    const point1 = {
      down: [10.6, 12.7, 10.7, 14.0],
      up: [10.3, 13.4, 10.0, 13.0],
    };
    const point2 = {
      down: [10.0, 14.5, 9.2, 15.0],
      up: [9.0, 14.5, 8.4, 13.2],
    };
    const point3 = {
      down: [8.2, 14.5, 7.5, 14.8],
      up: [7.5, 14.5, 7.0, 13.4],
    };
    const point4 = {
      down: [6.9, 14.0, 6.5, 14.5],
      up: [6.5, 14.0, 6.0, 13.2],
    };
    const inside = {
      // up: [6.5, 13.0, 5.2, 12.2],
      end: [5.6, 12.8, 5.0, 12.2, 4.4, 11.0],
    };
    return {
      ...prefixKeys(outside, "outside"),
      ...prefixKeys(point1, "point1"),
      ...prefixKeys(point2, "point2"),
      ...prefixKeys(point3, "point3"),
      ...prefixKeys(point4, "point4"),
      ...prefixKeys(inside, "inside"),
    };
  }

  protected ponytailDataOld() {
    const point1 = {
      start: [11.1, 12.9],
      up: [10.4, 12.3, 10.2, 12.0],
    };
    const point2 = {
      down: [10.2, 12.7, 9.7, 13.2],
      up: [9.5, 12.7, 8.9, 12.2],
    };
    const point3 = {
      down: [8.9, 12.7, 8.0, 13.4],
      up: [7.8, 12.7, 7.2, 12.1],
    };
    const point4 = {
      down: [7.0, 12.7, 6.4, 13.2],
      up: [4.7, 12.0, 4.4, 10.9],
      end: [10.4, 10.8],
    };
    return {
      ...prefixKeys(point1, "point1"),
      ...prefixKeys(point2, "point2"),
      ...prefixKeys(point3, "point3"),
      ...prefixKeys(point4, "point4"),
    };
  }
}
