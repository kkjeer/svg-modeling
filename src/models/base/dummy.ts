import { Path } from "../../utils/path";
import { Model } from "./model";

export class Dummy extends Model {
  constructor(width: number, height: number) {
    super(width, height);
    this.elts["dummy-1"] = {
      type: "path",
      d: new Path(this.width, this.height)
        .move(10, 20)
        .line(20, 25)
        .line(20, 45)
        .line(10, 40)
        .stop(),
      fill: "red",
    };
    this.elts["dummy-2"] = {
      type: "path",
      d: new Path(this.width, this.height).move(12, 40).line(18, 10).stop(),
      stroke: "purple",
      thickness: 3,
    };
  }
}
