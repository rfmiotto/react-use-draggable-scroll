# useDraggable Hook

[![NPM Version](https://img.shields.io/npm/v/react-use-draggable-scroll)](https://www.npmjs.com/package/react-use-draggable-scroll)

useDraggable is a React hook that allows a wrapping div to have a draggable scroll with an inertial effect.
It is completely unstyled and just adds the functionality you are looking for so your application gives
the best user experience possible. It works in both x- and y-coordinate directions.

See [DEMO](https://stackblitz.com/edit/nextjs-tg52v4).

<img alt="example gif" src="https://github.com/rfmiotto/react-use-draggable-scroll/blob/main/.github/example.gif" width="480" height="270"/>

### Why useDraggable?

Differently from other hooks designed for the same purpose, this hook does not rely on any state changes. The
functionality is built entirely on event listeners. This means that the wrapping div and its children elements
are not re-rendered, resulting in a better performance.

### Installation

```console
yarn add react-use-draggable-scroll
```

```console
npm install react-use-draggable-scroll
```

### How to use

All you have to do is to create a reference to the wrapping div and pass it as parameter to to the useDraggable hook.
The hook is totally unstyled. You can use any library of your choice to style the div and the child components as you would normally do.
In the example below, we use TailwindCSS to illustrate.

Just recapping some basics of CSS that you will probably use along with this hook: It is important to set `overflow-x: scroll;`
property in the CSS of the wrapping div to create the scroll (same goes for y-direction, if that is your case). To prevent a
flex item from growing or shrinking, use the CSS property `flex: none;`.

**In Javascript:**

```javascript
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

export default function MyComponent() {
  const ref = useRef(); // We will use React useRef hook to reference the wrapping div:
  const { events } = useDraggable(ref); // Now we pass the reference to the useDraggable hook:

  return (
    <div
      className="flex max-w-xl space-x-3 overflow-x-scroll scrollbar-hide"
      {...events}
      ref={ref} // add reference and events to the wrapping div
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
  );
}
```

**In Typescript:**

```typescript
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

export default function MyComponent(): JSX.Element {
  // We will use React useRef hook to reference the wrapping div:
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref); // Now we pass the reference to the useDraggable hook:

  return (
    <div
      className="flex max-w-xl space-x-3 overflow-x-scroll scrollbar-hide"
      {...events}
      ref={ref} // add reference and events to the wrapping div
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
  );
}
```

### Additional settings:

**`activeMouseButton`: Change which mouse button starts a scroll**

By default, holding left mouse button will start a scroll. However, you can also use the middle or right
mouse button to start a scroll.

Accepts `"Left" | "Right" | "Middle`

```typescript
const { events } = useDraggable(ref, {
    activeMouseButton?: "Middle"; // Sets which mouse button starts a scroll
});
```

**`applyRubberBandEffect`: Rubber Band Effect**

It is possible to toggle a rubber band effect on and off for when the
user scrolls past the end of the container. This effect is turned off by default to avoid conflicting CSS style rules in code that uses earlier versions of this hook.

```typescript
const { events } = useDraggable(ref, {
  applyRubberBandEffect: true, // activate rubber band effect
});
```

> :warning: **If you are using rubber band effect**: This effect is applied
> using the `transform` CSS property. User-defined styles can be overridden when `applyRubberBandEffect` is `true` (default value is `false`).

**`decayRate`: Control the decay rate of the inertial effect**

You can also control the decay rate of the inertial effect by using an optional
parameter. The default value is 0.95, which means that at the speed will decay 5% of
its current value at every 1/60 seconds.

```typescript
const { events } = useDraggable(ref, {
  decayRate: 0.96, // specify the decay rate
});
```

**`safeDisplacement`: Control the drag sensitivity**

Finally, you can control drag sensitivity by using an optional parameter that states
the minimum distance in order to distinguish an intentional drag movement from
an unwanted one, which should be instead considered as a click.
The default value is 10, which means that when a drag movement travels for 10 pixels
or less it is considered unintentional. In this scenario, the drag operation would
still be performed, but the closing mouse-up event would still be propagated to the
rest of the DOM.

```typescript
const { events } = useDraggable(ref, {
  safeDisplacement: 11, // specify the drag sensitivity
});
```

**`isMounted`: Determine if ref is available or not, default `true`**

In some use cases, such as you need to use `useImperativeHandle`, 
you will need to wait for the component to be rendered and the Ref to be accessible before 
using the `useDraggable` hook. In this case, use `isMounted` as a controllable switch.

```typescript
const { events } = useDraggable(ref, {
  isMounted: true, 
});
```

### Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).
