# useDraggable Hook

useDraggable is a React hook that allows a wrapping div to have a draggable scroll with an inertial effect.
It is completely unstyled and just adds the functionality you are looking for so your application gives 
the best user experience possible. It works in both x- and y-coordinate directions.

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
In the example below, we use TailwindCSS to illustrate. It is important to set `overflow-x: scroll;` property in the CSS of the wrapping div.


**In Javascript:**
```javascript
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

export default function MyComponent() {
  // We will use React useRef hook to reference the wrapping div:
  const ref = useRef();

  // Now we pass the reference to the useDraggable hook:
  const { events } = useDraggable(ref);

  return (
    <div
      className="flex space-x-3 overflow-x-scroll scrollbar-hide" // TailwindCSS
      {...events}
      ref={ref}   // add reference and events to the wrapping div
    >
      <div className="flex-none w-32" />
    </div>
  );
}
```


**In Typescript:**
```typescript
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

import { ChildrenComponent } from "@/components/ChildrenComponent";

export default function MyComponent(): JSX.Element {
  // We will use React useRef hook to reference the wrapping div:
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

  // Now we pass the reference to the useDraggable hook:
  const { events } = useDraggable(ref);

  return (
    <div
      className="flex space-x-3 overflow-x-scroll scrollbar-hide" // TailwindCSS
      {...events}
      ref={ref}   // add reference and events to the wrapping div
    >
      <ChildrenComponent />
      <ChildrenComponent />
      <ChildrenComponent />
      <ChildrenComponent />
      <ChildrenComponent />
    </div>
  );
}
```

You can also control the decay rate of the inertial effect by using a second (optional)
parameter. The default value is 0.95, which means that at the speed will decay 5% of
its current value at every 1/60 seconds.

```typescript
const { events } = useDraggable(ref, 0.9); // specify the decay rate
```
