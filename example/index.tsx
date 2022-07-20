import "react-app-polyfill/ie11";
import * as React from "react";
import * as ReactDOM from "react-dom";

import "./styles.css";

import VerticalExample from "./components/VerticalExample";
import HorizontalExample from "./components/HorizontalExample";
import TwoDimensionalExample from "./components/TwoDimensionalExample";
import WidthMultiRefExample from "./components/WidthMultiRefComponent";

const App = () => {
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
        <WidthMultiRefExample />
      </div>
    </main>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
