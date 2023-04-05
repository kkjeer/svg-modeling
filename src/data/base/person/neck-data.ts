export interface Neck {
  // start at inside of shoulder
  shoulder: number[];
  // inward and up along side of neck
  side: number[];
  // up to top of neck
  top: number[];
  // optional extension down and in
  extension?: number[];
}

// origin: between eyes (same as face origin)
// TODO: should this be the origin of the neck?

export const NECK: Neck = {
  shoulder: [8.9, 11.7],
  side: [7.0, 11.4, 2.0, 11.4, 2.3, 7.2],
  top: [2.3, 6.2],
  extension: [5.0, 14.4],
};

export const MALE_NECK: Neck = {
  shoulder: [11.0, 12.7],
  side: [5.0, 12.2, 4.0, 12.0, 4.1, 8.2],
  top: [4.1, 7.2],
  extension: [5.0, 14.0],
};

// istoel neck
// origin: 52.0, 11.2
// width from outer shoulder to outer edge of top: 7.4
//    (note: this might not line up with the actual desired shoulder point since istoel has weird dress straps)
// height from outer shoulder to outer edge of top: 5.5
// const x = 54.7,
//       y = 22.7;
//     const path = new Path(this.width, this.height)
//       .move(x, y) // start at inside of left shoulder
//       .cubic(56.6, 22.4, 62.2, 22.4, 62.1, 18.2) // up and right along left side of neck
//       .line(62.1, 17.2) // slightly up to top of left neck
//       .line(67.2, 17.2) // right to top of right neck
//       .line(67.2, 18.4) // slightly down along right side of neck
//       .cubic(66.8, 22.0, 68.2, 22.0, 73.6, 22.6) // down and right to inside of right shoulder (inner edge of right strap)
