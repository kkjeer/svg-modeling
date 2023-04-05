import { Dropdown, IDropdownOption, Stack } from "@fluentui/react";
import { useContext } from "react";
import { setModelName } from "../state/actions";
import { AppContext } from "../state/AppContext";
import { MODEL_NAMES } from "../utils/getModel";
import { prettyName } from "../utils/misc";

export function Left() {
  const { dispatch, modelName } = useContext(AppContext);

  const modelNameOptions: IDropdownOption[] = MODEL_NAMES.map((name) => ({
    key: name,
    text: prettyName(name),
  }));

  return (
    <Stack
      id="sidebar-left"
      className="sidebar"
      grow
      tokens={{ childrenGap: 12 }}
    >
      <Stack horizontal verticalAlign="end" tokens={{ childrenGap: 18 }}>
        <Dropdown
          label="Model"
          options={modelNameOptions}
          selectedKey={modelName || MODEL_NAMES[0]}
          onChange={(ev: any, option?: IDropdownOption) => {
            if (!option) return;
            dispatch(setModelName(option.key.toString()));
          }}
          styles={{
            root: {
              width: 150,
            },
          }}
        />
      </Stack>
    </Stack>
  );
}
