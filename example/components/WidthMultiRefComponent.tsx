import * as React from "react";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import Card from "./Card";

type Props = {
  nestedElementProps: { [key: string]: any };
};

function WidthMultiRefComponent({ nestedElementProps }: Props, ref) {
  const rootRef =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const nestedRef =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

  useImperativeHandle(ref, () => ({
    rootRef,
    nestedRef,
  }));

  const [numberOfEventsFired, setNumberOfEventsFired] = useState(0);

  const handleClickEvent = () => {
    setNumberOfEventsFired((oldState) => oldState + 1);
  };

  return (
    <div ref={rootRef} className="max-w-xl space-y-4 py-4">
      <h2 className="text-4xl font-bold">Example #4</h2>
      <p className="text-xl font-bold">
        Use multiple ref e.g., `useImperativeHandle`.
      </p>
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
        {...nestedElementProps}
        ref={nestedRef}
        className="flex space-x-3 overflow-x-scroll"
      >
        {Array.from(Array(40).keys()).map((e) => (
          <Card onClick={handleClickEvent} />
        ))}
      </div>
    </div>
  );
}

export default forwardRef(WidthMultiRefComponent);
