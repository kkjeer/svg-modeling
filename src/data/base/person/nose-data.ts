export interface Nose {
  topLeft: number[];
  left: number[];
  right: number[];
  topRight: number[];
}

export interface NoseTip {
  rightToLeft: number[];
}

export interface NoseSide {
  bottom: number[];
  tip: number[][];
  corner: number[];
  top: number[][];
  bottomEnd: number[][];
}

export interface NoseTipSide {
  corner: number[];
  bottom: number[][];
  topEnd: number[][];
}

export const NOSE: Nose = {
  topLeft: [-0.2, 1.6], // start at top left corner
  left: [-0.4, 2.9, -0.7, 4.0], // down to bottom left corner
  right: [0.0, 4.2, 0.7, 4.0], // across bottom to bottom right corner
  topRight: [0.4, 2.9, 0.2, 1.6], // up right side to top right corner
};

export const NOSE_TIP: NoseTip = {
  rightToLeft: [0.0, 4.6],
};

export const MALE_NOSE: Nose = {
  topLeft: [-0.4, 1.0],
  left: [-0.5, 1.8, -1.0, 4.2],
  right: [0.0, 4.1, 1.0, 4.2],
  topRight: [0.5, 1.8, 0.4, 1.0],
};

export const MALE_NOSE_TIP: NoseTip = {
  rightToLeft: [0.0, 4.4],
};

export const NOSE_SIDE: NoseSide = {
  bottom: [7.8, 4.0],
  tip: [
    [8.2, 4.0, 8.6, 3.8], // slight bump out and up
    [9.1, 3.5, 9.7, 3.3], // out and up to tip of nose
  ],
  corner: [9.8, 3.2, 9.7, 3.1],
  top: [
    [8.7, 2.8, 8.0, 2.5], // up and in to bridge
    [7.5, 2.2, 7.3, 1.9], // most of the way to top of nose
    [7.2, 1.6], // top of nose (meeting face)
    [7.15, 1.55, 7.1, 1.6], // round corner of top
  ],
  bottomEnd: [
    [7.3, 2.8, 7.8, 4.0], // back to bottom of nose
  ],
};

export const NOSE_TIP_SIDE: NoseTipSide = {
  corner: [9.8, 3.3, 9.8, 3.2], // to halfway point of tip corner
  bottom: [
    [9.7, 3.5, 9.3, 3.7], // start heading down and in
    [9.0, 3.9, 8.6, 4.1], // most of the way down and in
    [8.3, 4.2, 8.1, 4.2], // to face
  ],
  topEnd: [
    [8.1, 4.1, 7.8, 4.0], // back to bottom of top part of nose
  ],
};
