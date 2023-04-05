import {
  Filter,
  makeBlend,
  makeColorMatrix,
  makeComposite,
  makeDiffuseLighting,
  makeDisplacementMap,
  makeDistantLight,
  makeFlood,
  makeGaussianBlur,
  makeImage,
  makeMorphology,
  makeSpecularLighting,
  makeTurbulence,
  resultFcn,
} from "./filterElements";

function blendParams(defaultParams: any, params?: any) {
  const result = { ...defaultParams, ...params };
  return result;
}

/**
 * Marble
 * Not transparent
 * Shiny marble texture - can be used for metallic objects
 * Examples: Xelai cloak/clasp/swords, Istoel dress/head chain, Iarta dress, Merlara belt/sword
 */

interface MarbleFilterParams {
  contrast?: string;
  color?: string;
  flood?: string;
  opacity?: string;
  baseFrequency?: string;
  numOctaves?: string;
  scale?: string;
  stdDeviation1?: string;
  stdDeviation2?: string;
  surfaceScale?: string;
  specularConstant?: string;
  specularExponent?: string;
  azimuth?: string;
  elevation?: string;
}

export function marbleFilter(params?: MarbleFilterParams): Filter {
  const defaultParams: MarbleFilterParams = {
    contrast: "0.7",
    color: "#ffffff",
    flood: "rgb(224,224,224)",
    opacity: "1",
    baseFrequency: "0.01 0.01",
    numOctaves: "7",
    scale: "100",
    stdDeviation1: "4",
    stdDeviation2: "5",
    surfaceScale: "8",
    specularConstant: "0.80000001",
    specularExponent: "30",
    azimuth: "235",
    elevation: "55",
  };

  const {
    contrast,
    color,
    flood,
    opacity,
    baseFrequency,
    numOctaves,
    scale,
    stdDeviation1,
    stdDeviation2,
    surfaceScale,
    specularConstant,
    specularExponent,
    azimuth,
    elevation,
  } = blendParams(defaultParams, params);

  const id = "marble-filter";
  const result = resultFcn(id);

  const blur1 = makeGaussianBlur(id, "blur1", {
    stdDeviation: stdDeviation1,
  });

  const turbulence = makeTurbulence(id, "turbulence", {
    baseFrequency,
    numOctaves,
    type: "turbulence",
    seed: "50",
  });

  const colorMatrix = makeColorMatrix(id, "colorMatrix", {
    values: `1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 ${contrast} 0`,
  });

  const composite1 = makeComposite(id, "composite1", {
    operator: "in",
    in: result("colorMatrix1"),
    in2: result("blur1"),
  });

  const displacementMap1 = makeDisplacementMap(id, "displacementMap1", {
    in: colorMatrix.result,
    in2: composite1.result,
    scale,
    xChannelSelector: "A",
    yChannelSelector: "B",
  });

  const flood1 = makeFlood(id, "flood1", {
    in: displacementMap1.result,
    floodColor: flood,
    floodOpacity: opacity,
  });

  const composite2 = makeComposite(id, "composite2", {
    in2: displacementMap1.result,
    operator: "atop",
  });

  const composite3 = makeComposite(id, "composite3", {
    in: composite2.result,
    in2: "SourceGraphic",
    operator: "atop",
  });

  const blend = makeBlend(id, "blend", {
    in2: composite3.result,
    mode: "darken",
  });

  const blur2 = makeGaussianBlur(id, "blur2", {
    in: blend.result,
    stdDeviation: stdDeviation2,
  });

  const distantLight = makeDistantLight(
    id,
    "distantLight",
    {
      azimuth,
      elevation,
    },
    true,
  );

  const specularLighting = makeSpecularLighting(id, "specularLighting", {
    in: blur2.result,
    lightingColor: color,
    surfaceScale,
    specularConstant,
    specularExponent,
    children: [distantLight],
  });

  const composite4 = makeComposite(id, "composite4", {
    in: specularLighting.result,
    in2: blend.result,
    operator: "in",
  });

  const composite5 = makeComposite(id, "composite", {
    in: blend.result,
    in2: composite4.result,
    operator: "arithmetic",
    k1: "0",
    k2: "1",
    k3: "1",
    k4: "0",
  });

  return {
    id,
    x: "-0.25",
    y: "-0.25",
    width: "1.5",
    height: "1.5",
    elts: [
      blur1,
      turbulence,
      colorMatrix,
      composite1,
      displacementMap1,
      flood1,
      composite2,
      composite3,
      blend,
      blur2,
      specularLighting,
      composite4,
      composite5,
    ],
  };
}

/**
 * Stone
 * Not transparent
 * Looks like stone, rough paper, etc.
 * Examples: Iarta Eyoh, Merlara mountains
 */

interface StoneFilterParams {
  color?: string;
  baseFrequency?: string;
  numOctaves?: string;
  surfaceScale?: string;
  azimuth?: string;
  elevation?: string;
}

export function stoneFilter(params?: StoneFilterParams): Filter {
  const defaultParams: StoneFilterParams = {
    color: "#ffffff",
    baseFrequency: "0.04",
    numOctaves: "10",
    surfaceScale: "5",
    azimuth: "45",
    elevation: "60",
  };

  const {
    color: lightingColor,
    baseFrequency,
    numOctaves,
    surfaceScale,
    azimuth,
    elevation,
  } = blendParams(defaultParams, params);
  const id = "stone-filter";
  const result = resultFcn(id);

  const turbulence = makeTurbulence(id, "turbulence", {
    type: "fractalNoise",
    baseFrequency,
    numOctaves,
  });

  const distantLight = makeDistantLight(id, "distantLight", {
    azimuth,
    elevation,
  });

  const diffuseLighting = makeDiffuseLighting(
    id,
    "diffuseLighting",
    {
      in: result("turbulence"),
      lightingColor,
      surfaceScale,
      children: [distantLight],
    },
    true,
  );

  const composite = makeComposite(id, "composite", {
    in2: "SourceGraphic",
    operator: "in",
  });

  return {
    id,
    elts: [turbulence, diffuseLighting, composite],
  };
}

/**
 * Cloud
 */

interface CloudFilterParams {
  color?: string;
  baseFrequency?: string;
  numOctaves?: string;
  opacity?: string;
}

export function cloudFilter(params?: CloudFilterParams): Filter {
  const defaultParams: CloudFilterParams = {
    color: "#ffffff",
    baseFrequency: "0.02",
    numOctaves: "5",
    opacity: "1",
  };

  const { color, baseFrequency, numOctaves, opacity } = blendParams(
    defaultParams,
    params,
  );
  const id = "cloud-filter";
  const result = resultFcn(id);

  const turbulence = makeTurbulence(
    id,
    "turbulence",
    {
      type: "fractalNoise",
      baseFrequency,
      numOctaves,
    },
    true,
  );

  const colorMatrix = makeColorMatrix(id, "colorMatrix", {
    values: "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 3 -1",
  });

  const flood = makeFlood(id, "flood", {
    floodColor: color,
    floodOpacity: opacity,
  });

  const blend = makeBlend(id, "blend", {
    in: result("flood"),
    in2: "SourceGraphic",
    mode: "normal",
  });

  const composite1 = makeComposite(id, "composite1", {
    in2: result("colorMatrix"),
    operator: "out",
  });

  const composite2 = makeComposite(id, "composite2", {
    in2: "SourceGraphic",
    operator: "atop",
  });

  return {
    id,
    colorInterpolationFilters: "sRGB",
    elts: [turbulence, colorMatrix, flood, blend, composite1, composite2],
  };
}

/**
 * Fur
 * Transparent
 * Gives the appearance of thick, somewhat rough fur
 * Examples: Merlara coat stripes, Istoel trees
 */

interface FurFilterParams {
  color?: string;
  numOctaves1?: string;
  baseFrequency1?: string;
  numOctaves2?: string;
  baseFrequency2?: string;
  dilateRadius?: string;
  displacementScale?: string;
  lightingScale?: string;
  specularConstant?: string;
  specularExponent?: string;
  azimuth?: string;
  elevation?: string;
}

export function furFilter(params?: FurFilterParams): Filter {
  const defaultParams: FurFilterParams = {
    color: "#ffffff",
    numOctaves1: "10",
    baseFrequency1: "0.12 0.02",
    numOctaves2: "8",
    baseFrequency2: "0.08 0.05",
    dilateRadius: "1.3",
    displacementScale: "5",
    lightingScale: "2",
    specularConstant: "1",
    specularExponent: "35",
    azimuth: "235",
    elevation: "75",
  };

  const {
    color,
    numOctaves1,
    baseFrequency1,
    numOctaves2,
    baseFrequency2,
    dilateRadius,
    displacementScale,
    lightingScale,
    specularConstant,
    specularExponent,
    azimuth,
    elevation,
  } = blendParams(defaultParams, params);
  const id = "fur-filter";
  const result = resultFcn(id);

  const turbulence1 = makeTurbulence(
    id,
    "turbulence1",
    {
      type: "fractalNoise",
      numOctaves: numOctaves1,
      baseFrequency: baseFrequency1,
      seed: "10",
    },
    true,
  );

  const colorMatrix = makeColorMatrix(id, "colorMatrix", {
    values: "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.7 0",
  });

  const composite1 = makeComposite(id, "composite1", {
    in: "SourceGraphic",
    in2: result("colorMatrix"),
    operator: "out",
  });

  const morphology = makeMorphology(id, "morphology", {
    operator: "dilate",
    radius: dilateRadius,
  });

  const turbulence2 = makeTurbulence(id, "turbulence2", {
    type: "turbulence",
    numOctaves: numOctaves2,
    baseFrequency: baseFrequency2,
    seed: "25",
  });

  const displacementMap = makeDisplacementMap(id, "displacementMap", {
    in: result("morphology"),
    in2: result("turbulence2"),
    scale: displacementScale,
    xChannelSelector: "R",
    yChannelSelector: "G",
  });

  const distantLight = makeDistantLight(
    id,
    "distantLight",
    { azimuth, elevation },
    true,
  );

  const specularLighting = makeSpecularLighting(id, "specularLighting", {
    in: result("displacementMap"),
    lightingColor: color,
    surfaceScale: lightingScale,
    specularConstant,
    specularExponent,
    children: [distantLight],
  });

  const composite2 = makeComposite(id, "composite2", {
    in: result("specularLighting"),
    in2: result("displacementMap"),
    operator: "in",
  });

  const composite3 = makeComposite(id, "composite3", {
    in: result("displacementMap"),
    in2: result("composite2"),
    operator: "arithmetic",
    k1: "0",
    k2: "1",
    k3: "1",
    k4: "0",
  });

  const blend = makeBlend(
    id,
    "blend",
    {
      in2: result("composite3"),
      mode: "multiply",
    },
    true,
  );

  return {
    id,
    elts: [
      turbulence1,
      colorMatrix,
      composite1,
      morphology,
      turbulence2,
      displacementMap,
      specularLighting,
      composite2,
      composite3,
      blend,
    ],
  };
}

export function woodFilter(color: string, params?: FurFilterParams): Filter {
  const woodParams: FurFilterParams = {
    color,
    numOctaves1: "4",
    numOctaves2: "1",
    displacementScale: "0.5",
    baseFrequency1: "0.06 0.01",
    baseFrequency2: "0.06 0.01",
    lightingScale: "0.05",
    dilateRadius: "0.3",
    specularConstant: "0.7",
    specularExponent: "60",
    azimuth: "100",
    elevation: "50",
  };
  const p = blendParams(woodParams, params);
  return furFilter(p);
}

/**
 * Dotted edges
 * Not transparent
 * Speckles the edges of the shape
 * Examples: Merlara beach
 */

interface DottedEdgesFilterParams {
  scale?: string;
  baseFrequency?: string;
  numOctaves?: string;
}

export function dottedEdgesFilter(params?: DottedEdgesFilterParams): Filter {
  const defaultParams: DottedEdgesFilterParams = {
    scale: "15",
    baseFrequency: "0.75",
    numOctaves: "2",
  };

  const { scale, baseFrequency, numOctaves } = blendParams(
    defaultParams,
    params,
  );

  const id = "dotted-edges-filter";

  const turbulence = makeTurbulence(id, "turbulence", {
    type: "fractalNoise",
    baseFrequency,
    numOctaves,
  });

  const displacementMap = makeDisplacementMap(id, "displacementMap", {
    in: "SourceGraphic",
    scale,
    xChannelSelector: "R",
    yChannelSelector: "G",
  });

  return {
    id,
    elts: [turbulence, displacementMap],
  };
}

/**
 * Wavy edges
 * Not transparent
 * Adds noise around the edges of a shape
 * Examples: feTurbulence mozilla docs
 */

interface WavyEdgesFilterParams {
  scale?: string;
  baseFrequency?: string;
  numOctaves?: string;
}

export function wavyEdgesFilter(params?: WavyEdgesFilterParams): Filter {
  const defaultParams: DottedEdgesFilterParams = {
    scale: "50",
    baseFrequency: "0.05",
    numOctaves: "2",
  };

  const { scale, baseFrequency, numOctaves } = blendParams(
    defaultParams,
    params,
  );

  const id = "wavy-edges-filter";

  const turbulence = makeTurbulence(id, "turbulence", {
    type: "turbulence",
    baseFrequency,
    numOctaves,
  });

  const displacementMap = makeDisplacementMap(id, "displacementMap", {
    in: "SourceGraphic",
    in2: turbulence.result,
    scale,
    xChannelSelector: "R",
    yChannelSelector: "G",
  });

  return {
    id,
    elts: [turbulence, displacementMap],
  };
}

/**
 * Image
 * This really doesn't work, don't use
 */

interface ImageFilterParams {
  src?: string;
  x?: string;
  y?: string;
  width?: string;
  height?: string;
}

export function imageFilter(params?: ImageFilterParams): Filter {
  const defaultParams: ImageFilterParams = {
    src: "https://media.geeksforgeeks.org/wp-content/uploads/20201106171852/Untitled189-2.png",
    x: "0",
    y: "0",
    width: "100",
    height: "100",
  };

  const { src, x, y, width, height } = blendParams(defaultParams, params);

  const id = "image-filter";

  const image = makeImage(
    id,
    "image",
    { xlinkHref: src, x, y, width, height },
    true,
  );

  return {
    id,
    elts: [image],
  };
}
