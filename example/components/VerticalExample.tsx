import * as React from "react";
import { useRef, useState } from "react";
import { useDraggable } from "../../src";

import Card from "./Card";

function VerticalExample(): JSX.Element {
  const [numberOfEventsFired, setNumberOfEventsFired] = useState(0);

  const handleClickEvent = () => {
    setNumberOfEventsFired((oldState) => oldState + 1);
  };

  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref, {
    decayRate: 0.96,
    safeDisplacement: 11,
  });

  return (
    <div className="max-w-xl space-y-4 py-4">
      <h2 className="text-4xl font-bold">Example #2</h2>

      <div className="flex justify-between">
        <p className="text-2xl font-bold">Counter: {numberOfEventsFired}</p>
        <button
          className="bg-gray-200 rounded-md px-2"
          type="button"
          onClick={() => setNumberOfEventsFired(0)}
        >
          Reset
        </button>
      </div>
      <div
        className="flex flex-col items-center max-h-96 space-y-3 overflow-y-scroll"
        {...events}
        ref={ref}
      >
        <Card onClick={handleClickEvent} />
        <Card onClick={handleClickEvent} />
        <Card onClick={handleClickEvent} />
        <Card onClick={handleClickEvent} />
        <Card onClick={handleClickEvent} />
        <Card onClick={handleClickEvent} />
        <Card onClick={handleClickEvent} />
        <Card onClick={handleClickEvent} />
        <Card onClick={handleClickEvent} />
      </div>
    </div>
  );
}

export default VerticalExample;
