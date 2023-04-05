////// LIPS //////

export interface Lip {
  // start at left corner
  left: number[];
  // from left corner to top center
  center: number[];
  // from center to right
  right: number[];
  // from right to inner right point
  innerRight: number[];
  // from inner right to bottom center
  bottomCenter: number[];
  // from bottom center to inner left
  innerLeft: number[];
}

export interface LipSide {
  left: number[];
  right: number[];
  bottomRight: number[];
  bottomLeft: number[];
}

export const UPPER_LIP: Lip = {
  left: [-2.6, 5.5], // start at left outer corner
  center: [-2.0, 5.5, -1.0, 5.1, 0.0, 5.4], // right to top center
  right: [1.0, 5.1, 2.0, 5.5, 2.6, 5.5], // right to right outer corner
  innerRight: [2.3, 5.5], // slightly inward to right inner corner
  bottomCenter: [1.0, 5.75, 0.6, 5.8, 0.0, 5.8], // left to bottom center
  innerLeft: [-0.6, 5.8, -1.0, 5.75, -2.3, 5.5], // left to left inner corner
};

export const LOWER_LIP: Lip = {
  left: [-2.6, 5.5], // start at left outer corner
  center: [-1.0, 5.6, -0.6, 5.8, 0.0, 5.8], // right to top center
  right: [0.6, 5.8, 1.0, 5.6, 2.6, 5.5], // right to right outer corner
  innerRight: [], // slightly inward to right inner corner
  bottomCenter: [1.2, 6.2, 0.6, 6.2, 0.0, 6.2], // left to bottom center
  innerLeft: [-0.6, 6.2, -1.2, 6.2, -2.6, 5.5], // left to left inner corner
};

export const UPPER_LIP_SIDE: LipSide = {
  left: [5.8, 5.5], // start at top left corner (inward in face)
  right: [6.4, 5.5, 7.4, 5.1, 8.4, 5.4], // right across top curve to top right corner
  bottomRight: [8.5, 5.5, 8.3, 5.7], // down to bottom right corner (along outer edge of face)
  bottomLeft: [7.8, 5.8, 7.4, 5.75, 5.8, 5.6], // left along bottom curve to bottom left corner
};

export const LOWER_LIP_SIDE: LipSide = {
  left: [5.8, 5.6], // start at top left corner (inward in face)
  right: [7.4, 5.75, 7.8, 5.8, 8.3, 5.7], // right across top curve to top right corner
  bottomRight: [8.5, 5.9, 8.3, 6.1], // down to bottom right corner (along outer edge of face)
  bottomLeft: [7.8, 6.1, 6.4, 5.85, 5.8, 5.7], // left along bottom curve to bottom left corner
};
