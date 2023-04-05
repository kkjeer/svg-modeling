import {
  Face,
  FACE,
  FaceSide,
  FACE_SIDE,
} from "../../../data/base/person/face-data";
import type { PersonRig } from "../../../rigs/base/person-rig";
import { PERSON_COLORS } from "../../../utils/constants";
import {
  addArr,
  deepCopy,
  move,
  reflectAndReverse,
  shiftUpToCubic,
} from "../../../utils/misc";
import { HeadModel } from "./head";

export class FaceModel extends HeadModel {
  protected face: Face = FACE;
  protected faceSide: FaceSide = FACE_SIDE;

  protected color: string = PERSON_COLORS.skin;

  public draw(rig: PersonRig) {
    super.draw(rig);

    const { position } = this.rig.face.center;

    const style = this.getHeadStyle();

    const points = !this.isSide(this.direction)
      ? this.frontPoints()
      : this.sidePoints();

    this.elts["face"] = this.path(points, position, {
      fill: this.color,
      style,
    });

    // this.elts["facedebug"] = {
    //   type: "circle",
    //   r: (0.4 * this.width) / 100,
    //   x: (eye.x * this.width) / 100,
    //   y: (eye.y * this.height) / 100,
    //   style,
    //   fill: "black",
    // };

    return this.elts;
  }

  protected frontPoints() {
    const points: number[][] = [];
    const addPoints = addArr(points);

    const { chin: chinRig, jaw: jawRig } = this.rig.face;
    const chinBottom = chinRig.y ?? 0;

    let { chin, jaw, temple, forehead } = deepCopy(this.face);

    chin[1] += chinBottom;

    jaw = shiftUpToCubic(jaw, jawRig);

    addPoints(move(chin));
    addPoints(jaw);
    addPoints(temple);
    addPoints(forehead);
    addPoints(reflectAndReverse([chin, jaw, temple, forehead]));

    return points;
  }

  protected sidePoints() {
    const points: number[][] = [];
    const addPoints = addArr(points);

    const chinBottom = this.rig.face.chin.y ?? 0;

    const {
      chin,
      lipBottom,
      lipCorner,
      lipTop,
      noseBottom,
      noseTop,
      forehead,
      headBack,
      earInnerTop,
      earInnerBottom,
      chinEnd,
    } = deepCopy(this.faceSide);

    chin[1] += chinBottom;
    for (let i = 0; i < lipBottom.length; i += 2) {
      lipBottom[i + 1] += chinBottom;
    }
    for (let idx = 0; idx < lipCorner.length; ++idx) {
      for (let i = 0; i < lipCorner[idx].length; i += 2) {
        if (idx < lipCorner.length - 1 || i + 1 < lipCorner[idx].length - 1) {
          lipCorner[idx][i + 1] += chinBottom;
        }
      }
    }
    for (const idx in chinEnd) {
      for (let i = 0; i < chinEnd[idx].length; i += 2) {
        chinEnd[idx][i + 1] += chinBottom;
      }
    }

    addPoints(move(chin));
    addPoints(lipBottom);
    addPoints(lipCorner);
    addPoints(lipTop);
    addPoints(noseBottom);
    addPoints(noseTop);
    addPoints(forehead);
    addPoints(headBack);
    addPoints(earInnerTop);
    addPoints(earInnerBottom);
    addPoints(chinEnd);

    return points;
  }
}
