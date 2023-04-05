import { Ear } from "../base/person/ear-data";
import { BottomEyelash, Eye, Iris, TopEyelash } from "../base/person/eye-data";
import { Eyebrow } from "../base/person/eyebrow-male-data";
import { Face } from "../base/person/face-data";
import { UpperLip } from "../base/person/mouth-male-data";

export const MORTUS_FACE: Face = {
  chin: [0.0, 8.6],
  jaw: [3.7, 8.5, 5.85, 6.8, 7.7, 5.1],
  temple: [9.7, 2.0, 9.7, -3.4, 9.0, -4.0],
  forehead: [7.7, -5.6, 4.2, -6.4, 0.6, -6.4],
};

export const MORTUS_FACE_OLD: Face = {
  chin: [0.0, 8.6],
  jaw: [-5.4, 8.4, -8.4, 4.8, -9.0, 1.8],
  temple: [-9.7, -2.0, -9.2, -3.4, -8.7, -4.0],
  forehead: [-7.4, -5.6, -4.2, -6.4, -0.6, -6.4],
};

export const halfFrown = {
  left: [-2.6, 6.2],
  center: [-1.3, 6.0, 0.4, 6.0],
  right: [1.3, 6.0, 2.6, 6.3],
};

export const halfSmile = {
  left: [-1.8, 5.9],
  center: [-0.8, 6.0, 0.4, 6.0],
  right: [1.8, 6.0, 3.4, 5.6],
};

export const fullFrown = {
  left: [-2.8, 6.3],
  center: [-1.3, 6.0, 0.0, 6.0],
  right: [1.3, 6.0, 2.8, 6.3],
};

export const fullSmile = {
  left: [-2.8, 5.8],
  center: [-1.3, 6.0, 0.0, 6.0],
  right: [1.3, 6.0, 2.8, 5.8],
};

export const MORTUS_UPPER_LIP: UpperLip = {
  ...fullSmile,
  color: "#cd8162",
  thickness: 0.8,
};

export const MORTUS_EYE_WHITE: Eye = {
  corner: [2.3, 1.6],
  outerBottom: [3.0, 2.0, 5.0, 2.3, 6.1, 1.4],
  outerTop: [6.5, 0.8, 6.5, 0.0, 6.1, -0.3],
  top: [5.0, -0.6, 4.1, -0.6],
  innerTop: [3.4, -0.6, 2.8, -0.6, 2.2, -0.3],
  innerBottom: [1.7, 0.0, 1.7, 1.2, 2.3, 1.6],
};

export const MORTUS_BOTTOM_EYELASH: BottomEyelash = {
  corner: [2.32, 1.7],
  outerBottom: [3.0, 2.05, 5.0, 2.35, 6.07, 1.5],
  outerTop: [],
};

export const MORTUS_TOP_EYELASH: TopEyelash = {
  // start with inner edge (following eye) - traveling left from temple side to nose side
  outerTop: [6.1, -0.3],
  top: [5.0, -0.6, 4.1, -0.6],
  innerTop: [3.4, -0.6, 2.8, -0.6, 2.2, -0.3],
  // then do outer edge (actual outline of lash) - traveling right from nose side to temple side
  innerTopEdge: [2.17, -0.5],
  topEdge: [3.4, -0.77, 4.1, -0.73],
  lashStart: [5.0, -0.73, 6.1, -0.4],
  lashes: [],
  outerTopEdge: [6.15, -0.4],
};

export const MORTUS_IRIS: Iris = {
  x: 4.1,
  y: 0.7,
  radius: 1.218,
};

export const MORTUS_EYEBROW: Eyebrow = {
  corner: [1.2, -0.4],
  bottomCenter: [4.7, -1.2],
  outerBottom: [7.4, -0.7],
  outerTop: [7.4, -0.8],
  topCenter: [4.7, -1.8],
  innerTop: [1.3, -1.1],
  innerBottom: [1.2, -0.4],
};

export const MORTUS_EAR: Ear = {
  innerTop: [-8.6, 2.6],
  outerTop: [-10.0, 1.0, -11.25, 1.0],
  outerBottom: [-11.4, 3.3, -9.3, 5.4],
  innerBottom: [-7.6, 4.3],
};

export const MORTUS_EYEBROW_OLD: Eyebrow = {
  corner: [1.2, -0.4],
  bottomCenter: [2.8, -0.9, 4.7, -1.2],
  outerBottom: [5.8, -1.1, 7.0, -0.7],
  outerTop: [7.2, -0.75, 7.0, -0.8],
  topCenter: [6.2, -1.5, 4.7, -1.8],
  innerTop: [2.8, -1.4, 1.3, -1.1],
  innerBottom: [1.2, -0.75, 1.2, -0.4],
};
