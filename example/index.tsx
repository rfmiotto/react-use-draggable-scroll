import "react-app-polyfill/ie11";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { useRef } from "react";
import { useDraggable } from "../src";

import "./styles.css";

const App = () => {
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref, {
    decayRate: 0.96,
    safeDisplacement: 11,
  });

  return (
    <main className="flex h-screen w-screen justify-center items-center">
      <div
        className="flex max-w-xl space-x-3 overflow-x-scroll"
        {...events}
        ref={ref}
      >
        <div className="flex-none w-52 h-32 bg-red-200" />
        <div className="flex-none w-52 h-32 bg-red-200" />
        <div className="flex-none w-52 h-32 bg-red-200" />
        <div className="flex-none w-52 h-32 bg-red-200" />
        <div className="flex-none w-52 h-32 bg-red-200" />
        <div className="flex-none w-52 h-32 bg-red-200" />
        <div className="flex-none w-52 h-32 bg-red-200" />
        <div className="flex-none w-52 h-32 bg-red-200" />
        <div className="flex-none w-52 h-32 bg-red-200" />
      </div>
    </main>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
