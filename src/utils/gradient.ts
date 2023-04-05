import { DEFS_ID } from "./constants";
import { getUrl } from "./misc";

export interface IGradient {
  id?: string;
  stops: IStop[];
  direction: "vertical" | "horizontal";
  fallbackColor?: string;
  params?: { [key: string]: string };
}

export interface IStop {
  offset: number | string;
  color: string;
}

export function getLinearGradient(
  color: string,
  id: string,
  stops: IStop[],
  direction: "vertical" | "horizontal" = "vertical",
  params?: { [key: string]: string },
) {
  if (!id) {
    return color;
  }

  linearGradient(id, stops, direction, params);
  return getUrl(id);
}

function linearGradient(
  id: string,
  stops: IStop[],
  direction: "vertical" | "horizontal",
  params?: { [key: string]: string },
) {
  const gradient = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "linearGradient",
  );
  gradient.id = id;

  for (const i in stops) {
    const stop = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    let offset = stops[i].offset.toString();
    if (typeof stops[i].offset == "number") offset += "%";
    stop.setAttributeNS("", "offset", offset);
    stop.setAttributeNS("", "stop-color", stops[i].color);
    gradient.appendChild(stop);
  }

  gradient.setAttributeNS("", "x1", "0%");
  gradient.setAttributeNS("", "y1", "0%");

  if (direction === "vertical") {
    gradient.setAttributeNS("", "x2", "0%");
    gradient.setAttributeNS("", "y2", "100%");
  } else {
    gradient.setAttributeNS("", "x2", "100%");
    gradient.setAttributeNS("", "y2", "0%");
  }

  if (params) {
    for (const key in params) {
      gradient.setAttributeNS("", key, params[key]);
    }
  }

  setTimeout(() => {
    const elt = document.getElementById(DEFS_ID);

    if (!elt) return;

    elt.appendChild(gradient);
  }, 100);
}
