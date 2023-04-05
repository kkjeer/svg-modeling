import "./App.css";
import { initializeIcons, Stack } from "@fluentui/react";
import { SVG } from "./ui/SVG";
import { HEIGHT, WIDTH } from "./utils/constants";
import { Left } from "./ui/Left";
import { Provider } from "./state/AppContext";
import { Right } from "./ui/Right";

initializeIcons();

function App() {
  const width = WIDTH,
    height = HEIGHT;

  return (
    <Provider>
      <svg
        id="defsContainer"
        width="10"
        height="10"
        viewBox="0 0 10 10"
        style={{ position: "fixed", zIndex: 0, top: 0, left: 0 }}
      >
        <defs id="svgDefs"></defs>
      </svg>
      <Stack
        id="app-root"
        horizontal
        verticalAlign="center"
        horizontalAlign="space-between"
        styles={{ root: { width: "100vw", height: "100vh" } }}
        tokens={{ childrenGap: 20 }}
      >
        <Left />
        <SVG id="test" width={width} height={height} />
        <Right />
      </Stack>
    </Provider>
  );
}

export default App;
