import * as React from "react";
import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
import { useDraggable } from "../../src";
import Card from "./Card";

type ChildrenProps = {
  nestedElementProps: { [key: string]: any };
};
type MultiRefs = {
  nestedRef: React.MutableRefObject<HTMLElement | null>;
};

// Children
const MultiRefChildren = forwardRef(
  ({ nestedElementProps }: ChildrenProps, ref) => {
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
          Use multiple ref e.g., `useImperativeHandle`, with `isMounted`.
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
            <Card key={e} onClick={handleClickEvent} />
          ))}
        </div>
      </div>
    );
  }
);

// Parent
function WidthMultiRefExample(): JSX.Element {
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

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <MultiRefChildren nestedElementProps={{ ...events }} ref={multiRefs} />
  );
}

export default WidthMultiRefExample;
