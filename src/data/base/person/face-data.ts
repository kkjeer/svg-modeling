export interface Face {
  chin: number[];
  jaw: number[];
  temple: number[];
  forehead: number[];
}

export interface FaceSide {
  chin: number[];
  lipBottom: number[];
  lipCorner: number[][];
  lipTop: number[][];
  noseBottom: number[];
  noseTop: number[];
  forehead: number[][];
  headBack: number[][];
  earInnerTop: number[][];
  earInnerBottom: number[][];
  chinEnd: number[][];
}

// xelai face - origin: 52.0, 11.2
// half-width at jaw endpoint (widest point): 10.0 - 10.3 (depending on side)
// height from chin to highest forehead point: 15.0
// .move(52.0, 19.2) // start at chin
// .shift(-0.4, 0.0)
// .cubic(49.2, 18.8, 46.0, 17.0, 45.2, 16.0) // up and left, to partway up left cheek
// .cubic(44.0, 15.2, 43.0, 14.0, 42.4, 12.8) // up and left, to slightly above left cheek halfway point
// .cubic(42.0, 9.0, 43.0, 7.6, 43.6, 7.0) // up and slightly right, to partway up left temple
// .cubic(45.2, 5.6, 48.2, 4.6, 51.8, 4.6) // up and right, to top center of forehead
// .shift(1.6, 0.0)
// .cubic(55.6, 4.6, 58.4, 5.6, 59.4, 7.0) // down and right, to partway down right temple
// .cubic(60.2, 7.6, 60.7, 9.0, 60.7, 12.8) // down and slightly right, to slightly above right cheek halfway point
// .cubic(60.4, 15.6, 58.6, 16.2, 57.6, 16.9) // down and left, to partway down left cheek
// .cubic(55.8, 17.6, 54.4, 19.2, 52.0 - 1.0, 19.2) // down and left, back to chin

export const FACE: Face = {
  chin: [0.0, 8.2],
  jaw: [5.6, 7.9, 9.1, 5.0, 10.3, 1.8],
  temple: [10.7, -2.0, 9.7, -3.4, 9.1, -4.0],
  forehead: [7.5, -5.4, 4.2, -6.8, 0.6, -6.8],
};

export const MALE_FACE: Face = {
  chin: [0.0, 8.6],
  jaw: [6.8, 8.9, 7.5, 4.8, 8.4, 1.8],
  temple: [9.1, -2.0, 9.2, -3.4, 8.6, -4.0],
  forehead: [7.3, -5.6, 4.2, -6.4, 0.6, -6.4],
};

////// SIDE FACES //////

export const FACE_SIDE: FaceSide = {
  chin: [5.8, 8.2],
  lipBottom: [6.4, 8.2, 6.9, 6.1, 7.7, 5.9],
  lipCorner: [
    [6.3, 5.4],
    [5.4, 4.75],
  ],
  lipTop: [
    [6.8, 5.2],
    [8.5, 5.0],
  ],
  noseBottom: [8.1, 4.8, 8.3, 4.0],
  noseTop: [7.2, 2.0],
  forehead: [
    [7.0, 0.0, 7.5, -2.8],
    [7.7, -4.0, 6.6, -5.6],
  ],
  headBack: [[3.3, -6.6, -1.0, -5.4]],
  earInnerTop: [[-1.9, 1.9]],
  earInnerBottom: [[-2.4, 4.3]],
  chinEnd: [[0.0, 7.2, 4.8, 8.2, 5.8, 8.2]],
};
