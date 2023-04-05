////// TYPES //////

export interface Eye {
  // start at inner bottom corner
  corner: number[];
  // across bottom, to outer bottom corner
  outerBottom: number[];
  // up to outer top corner
  outerTop: number[];
  // partway along top
  top: number[];
  // more along top, to inner top corner
  innerTop: number[];
  // down, back to inner bottom corner
  innerBottom: number[];
}

export interface BottomEyelash {
  // start with outer edge of eyelash
  // start at inner bottom corner
  corner: number[];
  // across bottom, to outer bottom corner
  outerBottom: number[];
  // up to outer top corner
  outerTop: number[];

  // then do inner edge of eyelash
  // optional thickness if the inner edge of the eyelash should mirror the outer edge
  thickness?: number;
  // overrides for the inner edge of the eyelash in case it shouldn't mirror the outer edge
  // inward from outer top corner to inner top corner
  innerTop?: number[];
  // down to inner bottom corner (next to outer bottom corner)
  innerBottom?: number[];
  // across to inner corner (next to starting inner bottom corner)
  innerCorner?: number[];
}

export interface TopEyelash {
  // start with inner edge (following eye)
  // start at outer top corner
  outerTop: number[];
  // partway across top
  top: number[];
  // across top to inner top corner
  innerTop: number[];
  // optionally go down to inner bottom corner
  innerBottom?: number[];

  // then do outer edge (actual outline of lash)
  // optionally move next to inner bottom corner
  innerBottomEdge?: number[];
  // move next to inner top corner (or go up from inner bottom edge if innerBottomEdge exists)
  innerTopEdge: number[];
  // partway across top
  topEdge: number[];
  // more across top, to start of lashes
  lashStart: number[];
  // multiple lash points
  lashes: number[][];
  // back to point next to outer top corner
  outerTopEdge: number[];
}

////// FEMALE EYES //////

// xelai - origin: 1.8, 1.8
// width from inner bottom corner to outer top corner: 6.4
// height from inner bottom corner to bottommost point: 0.4
// height from inner bottom corner to topmost point: 2.4
// height from inner bottom corner to inner top corner: 2.1
// .move(53.8, 13.0) // start at bottom left (inner) corner of right eye
// .cubic(56.8, 13.4, 59.5, 13.2, 59.7, 12.2) // across bottom to partway up right (outer) side
// .line(60.2, 11.0) // up and slightly right to top right (outer) corner
// .cubic(58.7, 10.6, 57.5, 10.6, 55.9, 11.0) // left to partway across top
// .cubic(54.0, 11.2, 54.0, 12.0, 53.8, 13.0) // down and left, back to bottom left corner

export const XELAI_EYE: Eye = {
  corner: [1.8, 1.8],
  outerBottom: [4.8, 2.2, 7.5, 2.0, 7.7, 1.0],
  outerTop: [8.2, -0.2],
  top: [6.7, -0.6, 5.5, -0.6, 3.85, -0.4],
  innerTop: [2.0, 0.0, 2.0, 0.8, 1.8, 1.4],
  innerBottom: [1.8, 1.8],
};

export const XELAI_BOTTOM_EYELASH: BottomEyelash = {
  corner: [2.0, 1.9],
  outerBottom: [4.8, 2.3, 6.6, 2.1, 7.8, 1.1],
  outerTop: [8.35, -0.2],
  thickness: 0.12,
};

export const XELAI_TOP_EYELASH: TopEyelash = {
  // inner edge - following eye
  outerTop: [8.15, -0.3],
  top: XELAI_EYE.top,
  innerTop: XELAI_EYE.innerTop,
  innerBottom: XELAI_EYE.innerBottom,
  // outer edge
  innerBottomEdge: [1.6, 1.4],
  innerTopEdge: [1.7, 0.8, 1.5, 0.4, 3.45, -0.6],
  topEdge: [5.5, -0.8, 6.7, -0.8],
  lashStart: [7.2, -0.6, 8.0, -0.6],
  lashes: [
    [9.0, -0.9],
    [9.2, -0.7],
  ],
  outerTopEdge: [8.2, -0.3],
};

// TODO: fix istoel eyes (they seem really wide right now)

// istoel
// width from inner bottom corner to outer top corner: 6.9
// height from inner bottom corner to bottommost point: 0.7
// height from inner bottom corner to topmost point: 2.5
// height from inner bottom corner to inner top corner: 1.8
// .move(67.4, 12.8) // start at bottom inner corner
// .cubic(69.2, 13.0, 72.4, 13.5, 73.6, 12.4) // right to bottom outer corner
// .line(74.3, 11.6) // up and right to top outer corner
// .quad(73.6, 10.8, 72.4, 10.7) // up and left, partially along top
// .cubic(71.4, 10.3, 68.1, 10.8, 68.1, 11.0) // left and slightly down to top inner corner
// .cubic(67.4, 11.6, 67.4, 12.0, 67.4, 12.8) // down to bottom inner corner

export const ISTOEL_EYE: Eye = {
  corner: [1.6, 1.6],
  outerBottom: [3.4, 1.8, 6.6, 2.3, 7.8, 1.2],
  outerTop: [8.5, 0.4],
  top: [7.8, -0.5, 6.6, -0.7],
  innerTop: [5.6, -0.9, 2.3, -0.4, 2.3, -0.2],
  innerBottom: [1.6, 0.4, 1.6, 0.8, 1.6, 1.6],
};

export const ISTOEL_BOTTOM_EYELASH: BottomEyelash = {
  corner: [1.6, 1.65],
  outerBottom: [3.4, 2.0, 6.6, 2.4, 7.8, 1.2],
  outerTop: [8.4, 0.6],
  thickness: 0.08,
};

export const ISTOEL_TOP_EYELASH: TopEyelash = {
  // inner edge - following eye
  outerTop: [8.45, 0.3],
  top: ISTOEL_EYE.top,
  innerTop: ISTOEL_EYE.innerTop,
  innerBottom: ISTOEL_EYE.innerBottom,
  // outer edge
  innerBottomEdge: [1.5, 1.4],
  innerTopEdge: [1.5, 0.8, 1.5, 0.4, 2.1, -0.4],
  topEdge: [5.3, -1.0, 6.6, -0.8],
  lashStart: [7.8, -0.6, 8.5, -0.1],
  lashes: [
    [9.0, -0.5],
    [9.3, -0.2],
  ],
  outerTopEdge: [8.55, 0.3],
};

export const EYE: Eye = XELAI_EYE;
export const TOP_EYELASH: TopEyelash = XELAI_TOP_EYELASH;
export const BOTTOM_EYELASH: BottomEyelash = XELAI_BOTTOM_EYELASH;

////// MALE EYES //////

export const MALE_EYE: Eye = {
  corner: [2.3, 1.6],
  outerBottom: [3.0, 2.0, 5.0, 2.3, 6.1, 1.4],
  outerTop: [6.5, 0.8, 6.5, 0.0, 6.1, -0.3],
  top: [5.0, -0.6, 4.1, -0.6],
  innerTop: [3.4, -0.6, 2.8, -0.6, 2.2, -0.3],
  innerBottom: [1.7, 0.0, 1.7, 1.2, 2.3, 1.6],
};

export const MALE_BOTTOM_EYELASH: BottomEyelash = {
  corner: [2.32, 1.7],
  outerBottom: [3.0, 2.05, 5.0, 2.35, 6.07, 1.5],
  outerTop: [6.02, 1.5],
};

export const MALE_TOP_EYELASH: TopEyelash = {
  // start with inner edge (following eye) - traveling left from temple side to nose side
  outerTop: [6.1, -0.3],
  top: [5.0, -0.6, 4.1, -0.6],
  innerTop: [3.4, -0.6, 2.8, -0.6, 2.2, -0.3],
  // then do outer edge (actual outline of lash) - traveling right from nose side to temple side
  innerTopEdge: [2.25, -0.45],
  topEdge: [3.4, -0.72, 4.1, -0.68],
  lashStart: [5.0, -0.68, 6.1, -0.35],
  lashes: [],
  outerTopEdge: [6.15, -0.35],
};

////// IRISES //////

export interface Iris {
  x: number;
  y: number;
  radius: number;
  pupilRadius?: number;
  dotRadius?: number;
}

export const IRIS: Iris = {
  x: 4.2,
  y: 0.75,
  radius: 0.62 * 2.1,
};

export const MALE_IRIS: Iris = {
  x: 4.1,
  y: 0.7,
  radius: 0.58 * 2.1,
};
