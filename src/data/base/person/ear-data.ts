export interface Ear {
  innerTop: number[];
  outerTop: number[];
  outerBottom: number[];
  innerBottom: number[];
}

// origin: same as face origin

export const EAR: Ear = {
  innerTop: [-10.0, 0.0],
  outerTop: [-11.0, -2.0],
  outerBottom: [-11.0, 3.0],
  innerBottom: [-10.0, 2.0],
};

export const MALE_EAR: Ear = {
  innerTop: [-8.0, 2.8],
  outerTop: [-9.8, 1.0, -10.6, 1.0],
  outerBottom: [-11.4, 3.5, -9.2, 5.6],
  innerBottom: [-7.6, 4.5],
};
