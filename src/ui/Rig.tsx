import {
  DefaultButton,
  Dropdown,
  IconButton,
  IDropdownOption,
  PrimaryButton,
  Stack,
  Text,
  TextField,
} from "@fluentui/react";
import { useContext, useState } from "react";
import { ALL_RIGS } from "../rigs";
import type { Rig } from "../rigs/base/rig";
import { setRigName, updateRig } from "../state/actions";
import { AppContext } from "../state/AppContext";
import { MODEL_RIGS } from "../utils/getModel";
import {
  capitalize,
  deepCopy,
  editObject,
  isFlatObject,
  prettyName,
} from "../utils/misc";

export function RenderRig() {
  const { dispatch, rig, modelName, rigName } = useContext(AppContext);

  const [copied, setCopied] = useState(false);

  const rigOptions: IDropdownOption[] = [{ key: "default", text: "Default" }];
  const currRigs = ALL_RIGS[modelName] ?? {};
  for (const rigNameKey in currRigs) {
    rigOptions.push({ key: rigNameKey, text: prettyName(rigNameKey) });
  }

  return (
    <Stack tokens={{ childrenGap: 12 }}>
      <Stack horizontal verticalAlign="end" tokens={{ childrenGap: 12 }}>
        <Dropdown
          label="Rig"
          options={rigOptions}
          selectedKey={rigName}
          onChange={(ev: any, option?: IDropdownOption) => {
            if (!option) return;
            const key = option.key.toString();
            dispatch(setRigName(key));
          }}
          styles={{ root: { minWidth: 150 } }}
        />
        <PrimaryButton
          onClick={() => {
            const text = `export const RIG = ${JSON.stringify(rig)}`;
            navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
            }, 2000);
          }}
        >
          <Text>Copy</Text>
        </PrimaryButton>
        <DefaultButton
          styles={{ root: { width: 32 } }}
          onClick={() => {
            const defaultRig = MODEL_RIGS[modelName];
            if (rigName === "default") {
              dispatch(updateRig(deepCopy(defaultRig)));
              return;
            }
            const newRig = currRigs[rigName] ?? {};
            const nextRig = { ...defaultRig, ...newRig };
            dispatch(updateRig(deepCopy(nextRig)));
          }}
        >
          <Text>Reset</Text>
        </DefaultButton>
        {copied && <Text>Copied!</Text>}
      </Stack>
      <RenderObject
        root={{ ...rig }}
        obj={{ ...rig }}
        parentKey=""
        indent={0}
        onChange={(newRig: Rig) => {
          dispatch(updateRig(newRig));
        }}
      />
    </Stack>
  );
}

interface RenderObjectProps {
  root: { [key: string]: any };
  obj: { [key: string]: any };
  parentKey: string;
  indent: number;
  onChange: (obj: { [key: string]: any }) => void;
}

const DEBUG_KEYS = false;

function RenderObject({
  root,
  obj,
  parentKey,
  indent,
  onChange,
}: RenderObjectProps) {
  const [expandedKeys, setExpandedKeys] = useState<{
    [key: string]: boolean;
  }>({});

  const padding = 12;

  const renderKey = (key: string, flat?: boolean) => {
    const isExpanded = expandedKeys[key];
    return (
      <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 6 }}>
        <IconButton
          iconProps={{ iconName: isExpanded ? "ChevronDown" : "ChevronRight" }}
          onClick={() => {
            const newExpandedKeys = {
              ...expandedKeys,
              [key]: !expandedKeys[key],
            };
            setExpandedKeys(newExpandedKeys);
          }}
        />
        <Text
          variant="mediumPlus"
          styles={{
            root: {
              cursor: "pointer",
              selectors: {
                ":hover": {
                  textDecoration: "underline",
                  color: "rgb(0, 120, 212)",
                },
              },
            },
          }}
          onClick={() => {
            const text = `${key}: ${JSON.stringify(obj[key], null)},`;
            navigator.clipboard.writeText(text);
          }}
        >
          {capitalize(key)}
        </Text>
        {DEBUG_KEYS && <Text variant="medium">{parentKey}</Text>}
        <div
          style={{ height: 1, background: "#666", width: "100%", marginTop: 4 }}
        />
      </Stack>
    );
  };

  return (
    <Stack tokens={{ childrenGap: 9 }}>
      {Object.keys(obj).map((key) => {
        const child = obj[key];
        if (isFlatObject(child)) {
          return (
            <Stack
              key={key}
              styles={{ root: { marginLeft: indent * padding } }}
            >
              {renderKey(key, true)}
              {expandedKeys[key] && (
                <Stack
                  horizontal
                  wrap
                  tokens={{ childrenGap: 15 }}
                  styles={{ root: { marginLeft: (indent + 1.5) * padding } }}
                >
                  {Object.keys(child).map((childKey) => {
                    const fullKey = parentKey
                      ? `${parentKey}.${key}.${childKey}`
                      : childKey;
                    const childValue = child[childKey];
                    const isNumeric = typeof childValue === "number";
                    const isZero = isNumeric && childValue === 0;
                    const isRotation = key === "rotation";
                    const isOffset =
                      !isRotation &&
                      (true || key.toLowerCase().includes("offset"));
                    return (
                      <TextField
                        key={childKey}
                        label={DEBUG_KEYS ? fullKey : childKey}
                        value={child[childKey].toString()}
                        type={isNumeric ? "number" : "string"}
                        min={isRotation ? -180 : undefined}
                        max={isRotation ? 180 : undefined}
                        step={isOffset ? 0.1 : 1}
                        styles={{
                          root: {
                            marginRight: "12px !important",
                            selectors: {
                              label: {
                                fontWeight: isZero ? "normal" : 600,
                              },
                            },
                          },
                          field: { width: 65 },
                        }}
                        onChange={(ev: any, val?: string) => {
                          let value: any = val;
                          if (typeof childValue === "number") {
                            value = Number(val);
                            if (isNaN(value)) {
                              value = 0;
                            }
                          }
                          const edited = editObject(root, fullKey, value);
                          onChange(edited);
                        }}
                      />
                    );
                  })}
                </Stack>
              )}
            </Stack>
          );
        }

        return (
          <Stack
            key={key}
            tokens={{ childrenGap: 6 }}
            styles={{ root: { marginLeft: indent * padding } }}
          >
            {renderKey(key)}
            {expandedKeys[key] && (
              <RenderObject
                root={root}
                obj={child}
                parentKey={parentKey ? `${parentKey}.${key}` : key}
                indent={indent + 1}
                onChange={onChange}
              />
            )}
          </Stack>
        );
      })}
    </Stack>
  );
}
