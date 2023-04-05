export const RIG = {
  face: {
    center: {
      position: { x: 50, y: 20, z: 160 },
      rotation: { x: 0, y: 0, z: 0 },
    },
    chin: { x: 0, y: 0 },
    jaw: { x0: 0, y0: 0, x1: 0, y1: 0, x2: 0, y2: 0 },
  },
  mouth: {
    upperLip: {
      left: { x: 0, y: 0.1 },
      center: { x0: 0, y0: 0, x1: 0, y1: 0, x2: 0, y2: 0 },
      right: { x0: 0, y0: 0, x1: 0, y1: 0, x2: 0, y2: 0.1 },
    },
  },
  irises: { position: { x: 0, y: -0.1 }, dot: { x: -0.2, y: 0.1 } },
  leftEye: {
    corner: { x: 0.1, y: -0.1 },
    outerBottom: { x0: 0, y0: -0.5, x1: 0, y1: -0.5, x2: 0, y2: -0.2 },
    outerTop: { x0: 0, y0: 0, x1: 0, y1: 0, x2: 0.2, y2: 0.5 },
    top: { x0: 0, y0: 0.5, x1: 0, y1: 0.5, x2: 0, y2: 0.5 },
    innerTop: { x0: 0, y0: 0.5, x1: 0, y1: 0.5, x2: 0, y2: 0.5 },
    innerBottom: { x0: 0.2, y0: 0.4, x1: 0.2, y1: 0, x2: 0.1, y2: 0 },
  },
  rightEye: {
    corner: { x: 0.1, y: -0.1 },
    outerBottom: { x0: 0, y0: -0.5, x1: 0, y1: -0.5, x2: 0, y2: -0.2 },
    outerTop: { x0: 0, y0: 0, x1: 0, y1: 0, x2: 0.2, y2: 0.5 },
    top: { x0: 0, y0: 0.5, x1: 0, y1: 0.5, x2: 0, y2: 0.5 },
    innerTop: { x0: 0, y0: 0.5, x1: 0, y1: 0.5, x2: 0, y2: 0.5 },
    innerBottom: { x0: 0.2, y0: 0.4, x1: 0.2, y1: 0, x2: 0.1, y2: 0 },
  },
  leftEyebrow: {
    inner: { x: 0, y: 0.8 },
    center: { x0: 0, y0: 0, x1: 0, y1: 0.8 },
    outer: { x0: 0, y0: 0, x1: 0, y1: 0.7 },
  },
  rightEyebrow: {
    inner: { x: 0, y: 0.8 },
    center: { x0: 0, y0: 0, x1: 0, y1: 0.8 },
    outer: { x0: 0, y0: 0, x1: 0, y1: 0.7 },
  },
};
