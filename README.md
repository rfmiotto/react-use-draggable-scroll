# useDraggable Hook

useDraggable is a React hook that allows a wrapping div to have a draggable scroll with an inertial effect.
It is completely unstyled and just adds the functionality you are looking for so your application gives
the best user experience possible. It works in both x- and y-coordinate directions.


https://user-images.githubusercontent.com/35971460/129657343-5d3aae09-cf3e-4ec6-9b43-77814c51e580.mp4


### Why useDraggable?

Differently from other hooks designed for the same purpose, this hook does not rely on any state changes. The
funcionality is built entirely on event listeners. This means that the wrapping div and its children elements
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
  const ref = useRef();                 // We will use React useRef hook to reference the wrapping div:
  const { events } = useDraggable(ref); // Now we pass the reference to the useDraggable hook:

  return (
    <div
      className="flex max-w-xl space-x-3 overflow-x-scroll scrollbar-hide"
      {...events}
      ref={ref}   // add reference and events to the wrapping div
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
      ref={ref}   // add reference and events to the wrapping div
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

You can also control the decay rate of the inertial effect by using an optional
parameter. The default value is 0.95, which means that at the speed will decay 5% of
its current value at every 1/60 seconds.

```typescript
const { events } = useDraggable(ref, {
  decayRate: 0.96,  // specify the decay rate
});
```

You can also control drag sensitivity by using an optional parameter that states
the minimum distance in order to distinguish an intentional drag movement from
an unwanted one, which should be instead considered as a click.
The default value is 10, which means that when a drag movement travels for 10 pixels
or less it is considered unintentional. In this scenario, the drag operation would
still be performed, but the closing mouseup event would still be propagated to the
rest of DOM.

```typescript
const { events } = useDraggable(ref, {
  safeDisplacement: 11,  // specify the drag sensitivity
});
```
