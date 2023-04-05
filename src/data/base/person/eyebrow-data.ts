export interface Eyebrow {
  // start at inner bottom corner
  corner: number[];
  // move along bottom to outer bottom corner
  outerBottom: number[];
  // turn around the outer corner to the outer top corner
  outerTop: number[];
  // move along top to inner top corner
  innerTop: number[];
  // down to inner bottom corner
  innerBottom: number[];
}

// xelai - origin: 1.8, -1.4
// length: 7.7
// height: 0.55
// const rx = 53.8;
// const ry = 9.6;
// const rightEyebrow = new Path(this.width, this.height)
// .shift(-0.4, 0.5)
// .move(rx, ry) // start at lower left corner (close to nose)
// .cubic(55.1, 8.9, 58.2, 8.47, 61.5, 9.1) // bottom curve to rightmost point (close to temple)
// .cubic(60, 8.4, 58.3, 8.18, 53.85, 9.05) // top curve to upper left corner
// .line(rx, ry) // move back down to lower left corner

export const EYEBROW: Eyebrow = {
  corner: [1.8, -1.2],
  outerBottom: [3.1, -1.9, 6.6, -2.37, 9.5, -1.7],
  outerTop: [9.5, -1.8],
  innerTop: [8.0, -2.6, 6.3, -2.72, 1.85, -1.75],
  innerBottom: [1.8, -1.2],
};
