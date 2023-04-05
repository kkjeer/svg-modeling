import { useContext } from "react";
import { Model } from "../models/base/model";
import { AppContext } from "../state/AppContext";
import { FilterElt } from "../utils/filterElements";
import { getModel } from "../utils/getModel";
import { makeId, getUrl } from "../utils/misc";
import { CircleRender, PathRender } from "../utils/types";

interface SVGProps {
  id: string;
  width: number;
  height: number;
}

export function SVG({ id, width, height }: SVGProps) {
  const { rig, modelName } = useContext(AppContext);

  const model = getModel(modelName, width, height);
  model.draw(rig);

  const renderPaths = (model: Model) => {
    const elts = model.getElts();
    return (
      <>
        {Object.keys(elts).map((id) => {
          const {
            type,
            stroke = "none",
            thickness = 0,
            fill = "none",
            filter = "",
            strokeLinecap = "butt",
          } = elts[id];
          const actualFilter = getUrl(filter);

          switch (type) {
            case "path":
              const { d, ...props } = elts[id] as PathRender;
              return (
                <path
                  key={id}
                  id={id}
                  d={d}
                  stroke={stroke}
                  strokeWidth={thickness}
                  fill={fill}
                  strokeLinecap={strokeLinecap}
                  {...props}
                  filter={actualFilter}
                ></path>
              );
            case "circle": {
              const { r, x, y, ...props } = elts[id] as CircleRender;
              return (
                <circle
                  key={id}
                  id={id}
                  r={r}
                  cx={x}
                  cy={y}
                  fill={fill}
                  {...props}
                ></circle>
              );
            }
          }

          return null;
        })}
      </>
    );
  };

  const renderGradients = (model: Model) => {
    const gradients = model.getGradients();
    return (
      <>
        {Object.keys(gradients).map((key) => {
          const grad = gradients[key];
          const id = makeId(grad.id ?? key);
          if (!id) {
            return null;
          }
          const x1 = "0%";
          const y1 = "0%";
          const x2 = grad.direction === "vertical" ? "0%" : "100%";
          const y2 = grad.direction === "vertical" ? "100%" : "0%";
          return (
            <linearGradient
              key={id}
              id={id}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              {...grad.params}
            >
              {grad.stops.map((stop) => (
                <stop
                  key={stop.offset}
                  offset={stop.offset + "%"}
                  stopColor={stop.color}
                ></stop>
              ))}
            </linearGradient>
          );
        })}
      </>
    );
  };

  const renderFilterElt = (elt: FilterElt) => {
    const { eltType, children: childParams = [], ...rest } = elt;
    const children = childParams.map((params) => renderFilterElt(params));
    const props = { ...rest, children, key: rest.id };
    return (
      <>
        {eltType === "feTurbulence" && <feTurbulence {...props} />}
        {eltType === "feDisplacementMap" && <feDisplacementMap {...props} />}
        {eltType === "feGaussianBlur" && <feGaussianBlur {...props} />}
        {eltType === "feMorphology" && <feMorphology {...props} />}
        {eltType === "feColorMatrix" && <feColorMatrix {...props} />}
        {eltType === "feFlood" && <feFlood {...props} />}
        {eltType === "feSpecularLighting" && <feSpecularLighting {...props} />}
        {eltType === "feDiffuseLighting" && <feDiffuseLighting {...props} />}
        {eltType === "feDistantLight" && <feDistantLight {...props} />}
        {eltType === "feComposite" && <feComposite {...props} />}
        {eltType === "feBlend" && <feBlend {...props} />}
        {eltType === "feImage" && <feImage {...props} />}
      </>
    );
  };

  const renderFilters = (model: Model) => {
    const filters = model.getFilters();
    return (
      <>
        {Object.keys(filters).map((key) => {
          const { elts, ...rest } = filters[key];
          return (
            <filter key={key} {...rest} id={key}>
              {elts.map((elt) => (
                <>{renderFilterElt(elt)}</>
              ))}
            </filter>
          );
        })}
      </>
    );
  };

  return (
    <svg
      id={id}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <defs id={`${id}Defs`}>
        {renderGradients(model)}
        {renderFilters(model)}
      </defs>
      {renderPaths(model)}
    </svg>
  );
}
