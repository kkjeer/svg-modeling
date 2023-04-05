import { BottomEyelash, Eye, Iris, TopEyelash } from "../base/person/eye-data";
import { Eyebrow } from "../base/person/eyebrow-data";
import { Face } from "../base/person/face-data";
import { Lip } from "../base/person/mouth-data";
import { Nose, NoseTip } from "../base/person/nose-data";

export const JYNX_FACE: Face = {
  chin: [0.0, 8.4],
  jaw: [5.2, 7.7, 8.8, 5.0, 9.6, 1.8],
  temple: [10.2, -2.0, 9.3, -3.4, 8.7, -3.8],
  forehead: [7.5, -5.2, 4.2, -6.4, 0.6, -6.4],
};

export const JYNX_EYE: Eye = {
  corner: [1.8, 1.8],
  outerBottom: [4.8, 2.2, 7.5, 2.0, 7.5, 1.0],
  outerTop: [8.0, -0.2],
  top: [6.7, -0.6, 5.5, -0.6, 3.85, -0.4],
  innerTop: [2.0, 0.0, 2.0, 0.8, 1.8, 1.4],
  innerBottom: [1.8, 1.8],
};

export const JYNX_BOTTOM_EYELASH: BottomEyelash = {
  corner: [2.0, 1.9],
  outerBottom: [4.8, 2.3, 6.6, 2.1, 7.6, 1.1],
  outerTop: [8.15, -0.2],
  thickness: 0.12,
};

export const JYNX_TOP_EYELASH: TopEyelash = {
  // inner edge - following eye
  outerTop: [7.95, -0.3],
  top: JYNX_EYE.top,
  innerTop: JYNX_EYE.innerTop,
  innerBottom: JYNX_EYE.innerBottom,
  // outer edge
  innerBottomEdge: [1.6, 1.4],
  innerTopEdge: [1.7, 0.8, 1.5, 0.4, 3.45, -0.6],
  topEdge: [5.5, -0.8, 6.7, -0.8],
  lashStart: [7.2, -0.6, 7.8, -0.6],
  lashes: [
    [8.8, -0.9],
    [9.0, -0.7],
  ],
  outerTopEdge: [8.0, -0.3],
};

export const JYNX_EYEBROW: Eyebrow = {
  corner: [1.4, -1.1],
  outerBottom: [2.7, -1.8, 6.2, -2.45, 8.4, -1.6],
  outerTop: [8.4, -1.7],
  innerTop: [7.6, -2.5, 5.9, -2.62, 1.45, -1.65],
  innerBottom: [1.4, -1.1],
};

export const JYNX_IRIS: Iris = {
  x: 4.3,
  y: 0.75,
  radius: 0.66 * 2.1,
};

export const JYNX_NOSE: Nose = {
  topLeft: [-0.2, 2.3], // start at top left corner
  left: [-0.3, 2.8, -0.85, 4.1], // down to bottom left corner
  right: [0.0, 3.4, 0.85, 4.1], // across bottom to bottom right corner
  topRight: [0.3, 2.8, 0.2, 2.3], // up right side to top right corner
};

export const JYNX_NOSE_TIP: NoseTip = {
  rightToLeft: [0.0, 4.7],
};

export const JYNX_UPPER_LIP: Lip = {
  left: [-2.55, 5.5], // start at left outer corner
  center: [-2.0, 5.5, -1.0, 5.3, 0.0, 5.3], // right to top center
  right: [1.0, 5.3, 2.0, 5.5, 2.6, 5.5], // right to right outer corner
  innerRight: [2.3, 5.5], // slightly inward to right inner corner
  bottomCenter: [1.0, 5.75, 0.6, 5.8, 0.0, 5.8], // left to bottom center
  innerLeft: [-0.6, 5.8, -1.0, 5.75, -2.3, 5.5], // left to left inner corner
};

export const JYNX_LOWER_LIP: Lip = {
  left: [-2.55, 5.5], // start at left outer corner
  center: [-1.0, 5.6, -0.6, 5.75, 0.0, 5.75], // right to top center
  right: [0.6, 5.8, 1.0, 5.6, 2.6, 5.5], // right to right outer corner
  innerRight: [], // slightly inward to right inner corner
  bottomCenter: [1.2, 6.2, 0.6, 6.2, 0.0, 6.2], // left to bottom center
  innerLeft: [-0.6, 6.2, -1.2, 6.2, -2.55, 5.5], // left to left inner corner
};
