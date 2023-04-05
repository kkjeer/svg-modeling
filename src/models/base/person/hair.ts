import { PersonRig } from "../../../rigs/base/person-rig";
import { addArr } from "../../../utils/misc";
import { SVGRenderBase } from "../../../utils/types";
import { PersonBaseModel } from "./person-base";

export type LineArray = { [key: string]: number[] }[];

export class HairModel extends PersonBaseModel {
  protected color: string = "#000000";
  protected filter: string = "";

  protected lineColor: string = "#cccccc";
  protected lineThickness: number = 1;

  protected debug: boolean = false;

  public draw(rig: PersonRig) {
    super.draw(rig);

    return this.elts;
  }

  public drawBangs(rig: PersonRig) {
    this.rig = rig;

    this.bangs();
    this.bangLines();

    return this.elts;
  }

  public drawBackdrop(rig: PersonRig) {
    this.rig = rig;

    this.backdrop();
    this.backdropLines();

    return this.elts;
  }

  // individual drawing methods (can be overridden if necessary but not likely to be)

  protected bangs() {
    this.drawHair("hairbangs", this.bangsData());
  }

  protected bangLines() {
    this.drawLines("hairbanglines", this.bangLinesData());
  }

  protected backdrop() {
    this.drawHair("hairbackdrop", this.backdropData());
  }

  protected backdropLines() {
    this.drawLines("hairbackdroplines", this.backdropLinesData());
  }

  // individual drawing helpers

  protected drawHair(id: string, data: { [key: string]: number[] }) {
    const { position } = this.rig.face.center;
    const style = this.getHairStyle();
    const points: number[][] = [];
    this.drawPoints(data, addArr(points));
    const props: Partial<SVGRenderBase> = {
      style,
    };
    if (this.debug) {
      props.stroke = this.color;
      props.thickness = 1;
    } else {
      props.fill = this.color;
      props.filter = this.filter;
    }
    this.elts[id] = this.path(points, position, props);
  }

  protected drawLines(id: string, datas: { [key: string]: number[] }[]) {
    for (const i in datas) {
      this.drawLine(`${id}${i}`, datas[i]);
    }
  }

  protected drawLine(
    id: string,
    data: { [key: string]: number[] },
    thickness: number = this.lineThickness,
    color: string = this.lineColor,
    linecap: "butt" | "round" | "square" = "butt",
  ) {
    const { position } = this.rig.face.center;
    const style = this.getHairStyle();
    const points: number[][] = [];
    this.drawPoints(data, addArr(points));
    const props: Partial<SVGRenderBase> = {
      stroke: color,
      thickness,
      strokeLinecap: linecap,
      style,
    };
    this.elts[id] = this.path(points, position, props);
  }

  // data methods (most likely to be overridden)

  protected bangsData(): { [key: string]: number[] } {
    return {};
  }

  protected bangLinesData(): { [key: string]: number[] }[] {
    return [];
  }

  protected backdropData(): { [key: string]: number[] } {
    return {};
  }

  protected backdropLinesData(): { [key: string]: number[] }[] {
    return [];
  }

  // style methods

  protected getHairStyle() {
    const rig = this.rig.face.center;
    return this.getStyle(
      rig,
      "front",
      -this.directionRanges.left[1],
      -this.directionRanges.right[0],
    );
  }
}
