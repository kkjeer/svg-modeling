export interface Filter {
  id?: string;
  colorInterpolationFilters?: "auto" | "sRGB" | "linearRGB" | "inherit";
  x?: string;
  y?: string;
  width?: string;
  height?: string;
  elts: FilterElt[];
}

export interface FilterElt {
  eltType: string;
  id: string;
  in?: string;
  in2?: string;
  result?: string;
  children?: FilterElt[];
}

export interface Turbulence extends FilterElt {
  eltType: "feTurbulence";
  type?: string;
  baseFrequency?: string;
  numOctaves?: string;
  seed?: string;
}

export interface DisplacementMap extends FilterElt {
  eltType: "feDisplacementMap";
  scale?: string;
  xChannelSelector?: string;
  yChannelSelector?: string;
}

export interface GaussianBlur extends FilterElt {
  eltType: "feGaussianBlur";
  stdDeviation?: string;
}

export interface Morphology extends FilterElt {
  eltType: "feMorphology";
  operator?: string;
  radius?: string;
}

export interface ColorMatrix extends FilterElt {
  eltType: "feColorMatrix";
  values?: string;
}

export interface Flood extends FilterElt {
  eltType: "feFlood";
  floodColor?: string;
  floodOpacity?: string;
}

export interface SpecularLighting extends FilterElt {
  eltType: "feSpecularLighting";
  lightingColor?: string;
  surfaceScale?: string;
  specularConstant?: string;
  specularExponent?: string;
}

export interface DiffuseLighting extends FilterElt {
  eltType: "feDiffuseLighting";
  lightingColor?: string;
  surfaceScale?: string;
}

export interface DistantLight extends FilterElt {
  eltType: "feDistantLight";
  azimuth?: string;
  elevation?: string;
}

export interface Composite extends FilterElt {
  eltType: "feComposite";
  operator?: string;
  k1?: string;
  k2?: string;
  k3?: string;
  k4?: string;
}

export interface Blend extends FilterElt {
  mode?: string;
}

export interface Image extends FilterElt {
  xlinkHref?: string;
  x?: string;
  y?: string;
  width?: string;
  height?: string;
}

function idAndResult(filterId: string, id: string, omitResult?: boolean) {
  const elt = { id: `${filterId}-${id}` };
  if (omitResult) return elt;
  return { ...elt, result: resultFcn(filterId)(id) };
}

export function resultFcn(filterId?: string) {
  if (!filterId) return (id: string) => `${id}-result`;
  return (id: string) => `${filterId}-${id}-result`;
}

export function makeTurbulence(
  filterId: string,
  id: string,
  params: Omit<Turbulence, "eltType" | "id">,
  omitResult?: boolean,
): Turbulence {
  const elt: Turbulence = {
    ...idAndResult(filterId, id, omitResult),
    ...params,
    eltType: "feTurbulence",
  };
  if (!omitResult) {
    elt.result = resultFcn(filterId)(id);
  }
  return elt;
}

export function makeDisplacementMap(
  filterId: string,
  id: string,
  params: Omit<DisplacementMap, "eltType" | "id">,
  omitResult?: boolean,
): DisplacementMap {
  const elt: DisplacementMap = {
    ...idAndResult(filterId, id, omitResult),
    ...params,
    eltType: "feDisplacementMap",
  };
  if (!omitResult) {
    elt.result = resultFcn(filterId)(id);
  }
  return elt;
}

export function makeGaussianBlur(
  filterId: string,
  id: string,
  params: Omit<GaussianBlur, "eltType" | "id">,
  omitResult?: boolean,
): GaussianBlur {
  const elt: GaussianBlur = {
    ...idAndResult(filterId, id, omitResult),
    ...params,
    eltType: "feGaussianBlur",
  };
  if (!omitResult) {
    elt.result = resultFcn(filterId)(id);
  }
  return elt;
}

export function makeMorphology(
  filterId: string,
  id: string,
  params: Omit<Morphology, "eltType" | "id">,
  omitResult?: boolean,
): Morphology {
  const elt: Morphology = {
    ...idAndResult(filterId, id, omitResult),
    ...params,
    eltType: "feMorphology",
  };
  if (!omitResult) {
    elt.result = resultFcn(filterId)(id);
  }
  return elt;
}

export function makeColorMatrix(
  filterId: string,
  id: string,
  params: Omit<ColorMatrix, "eltType" | "id">,
  omitResult?: boolean,
): ColorMatrix {
  const elt: ColorMatrix = {
    ...idAndResult(filterId, id, omitResult),
    ...params,
    eltType: "feColorMatrix",
  };
  if (!omitResult) {
    elt.result = resultFcn(filterId)(id);
  }
  return elt;
}

export function makeFlood(
  filterId: string,
  id: string,
  params: Omit<Flood, "eltType" | "id">,
  omitResult?: boolean,
): Flood {
  const elt: Flood = {
    ...idAndResult(filterId, id, omitResult),
    ...params,
    eltType: "feFlood",
  };
  if (!omitResult) {
    elt.result = resultFcn(filterId)(id);
  }
  return elt;
}

export function makeSpecularLighting(
  filterId: string,
  id: string,
  params: Omit<SpecularLighting, "eltType" | "id">,
  omitResult?: boolean,
): SpecularLighting {
  const elt: SpecularLighting = {
    ...idAndResult(filterId, id, omitResult),
    ...params,
    eltType: "feSpecularLighting",
  };
  if (!omitResult) {
    elt.result = resultFcn(filterId)(id);
  }
  return elt;
}

export function makeDiffuseLighting(
  filterId: string,
  id: string,
  params: Omit<DiffuseLighting, "eltType" | "id">,
  omitResult?: boolean,
): DiffuseLighting {
  const elt: DiffuseLighting = {
    ...idAndResult(filterId, id, omitResult),
    ...params,
    eltType: "feDiffuseLighting",
  };
  if (!omitResult) {
    elt.result = resultFcn(filterId)(id);
  }
  return elt;
}

export function makeDistantLight(
  filterId: string,
  id: string,
  params: Omit<DistantLight, "eltType" | "id">,
  omitResult?: boolean,
): DistantLight {
  const elt: DistantLight = {
    ...idAndResult(filterId, id, omitResult),
    ...params,
    eltType: "feDistantLight",
  };
  if (!omitResult) {
    elt.result = resultFcn(filterId)(id);
  }
  return elt;
}

export function makeComposite(
  filterId: string,
  id: string,
  params: Omit<Composite, "eltType" | "id">,
  omitResult?: boolean,
): Composite {
  const elt: Composite = {
    ...idAndResult(filterId, id, omitResult),
    ...params,
    eltType: "feComposite",
  };
  if (!omitResult) {
    elt.result = resultFcn(filterId)(id);
  }
  return elt;
}

export function makeBlend(
  filterId: string,
  id: string,
  params: Omit<Blend, "eltType" | "id">,
  omitResult?: boolean,
): Blend {
  const elt: Blend = {
    ...idAndResult(filterId, id, omitResult),
    ...params,
    eltType: "feBlend",
  };
  if (!omitResult) {
    elt.result = resultFcn(filterId)(id);
  }
  return elt;
}

export function makeImage(
  filterId: string,
  id: string,
  params: Omit<Image, "eltType" | "id">,
  omitResult?: boolean,
): Image {
  const elt: Image = {
    ...idAndResult(filterId, id, omitResult),
    ...params,
    eltType: "feImage",
  };
  if (!omitResult) {
    elt.result = resultFcn(filterId)(id);
  }
  return elt;
}
