import "react-app-polyfill/ie11";
import * as React from "react";
import * as ReactDOM from "react-dom";

import "./styles.css";

import VerticalExample from "./components/VerticalExample";
import HorizontalExample from "./components/HorizontalExample";
import TwoDimensionalExample from "./components/TwoDimensionalExample";
import WidthMultiRefComponent from "./components/WidthMultiRefComponent";
import { useDraggable } from "../src";

type MultiRefs = {
  nestedRef: React.MutableRefObject<HTMLElement | null>;
};

const App = () => {
  const multiRefs = React.useRef<MultiRefs>({
    nestedRef: { current: null },
  });

  const [mounted, setMounted] = React.useState(false);

  const { events } = useDraggable(
    multiRefs.current?.nestedRef as React.MutableRefObject<HTMLElement>,
    {
      decayRate: 0.96,
      safeDisplacement: 11,
      applyRubberBandEffect: true,
      isMounted: mounted,
    }
  );

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="flex flex-col max-w-xl mx-auto space-y-4 my-12">
      <h1 className="text-5xl font-bold">Example of usage</h1>

      <p>
        <code className="bg-gray-200 rounded-md">
          react-use-draggable-scroll
        </code>{" "}
        does not interfere with other events passing through the same scroll
        container. In this example, clicking on one of the cards below causes a
        counter to increase its value.
      </p>

      <div className="divide-y-2">
        <HorizontalExample />
        <VerticalExample />
        <TwoDimensionalExample />
        <WidthMultiRefComponent
          nestedElementProps={{ ...events }}
          ref={multiRefs}
        />
      </div>
    </main>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
