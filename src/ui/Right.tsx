import { Stack } from "@fluentui/react";
import { RenderRig } from "./Rig";

export function Right() {
  return (
    <Stack
      id="sidebar-right"
      className="sidebar"
      grow
      tokens={{ childrenGap: 12 }}
    >
      <RenderRig />
    </Stack>
  );
}
