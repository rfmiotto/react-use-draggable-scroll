# useDraggable Package

useDraggable is a React hook that allows a wrapping div to have a draggable scroll effect. 
It is completely unstyled, just adding the functionality. 
In addition, the scrolling has an inertial/momentum effect that improves the user experience. 
Differently from other hooks designed for the same purpose, this package does not rely on any state changes. 
Hence, the wrapping div and its children elements are not re-rendered, which results in a great performance.

### Installation

```console
yarn add react-use-draggable-scroll
```
or
```console
npm install react-use-draggable-scroll
```

### How to use

All you have to do is to create a reference to the wrapping div and pass it as parameter to to the useDraggable hook.
The hook is totally unstyled. You can use any library of your choice to style the div and the child components as normal.
In the example below, we use TailwindCSS to illustrate. It is important to set `overflow-x: scroll;` property in the CSS of the wrapping div.


**In Javascript:**
```javascript
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

import { ChildrenComponent } from "@/components/ChildrenComponent";

export default function MyComponent() {
  // We will use React useRef hook to reference the wrapping div:
  const ref = useRef();

  // Now we pass the reference to the useDraggable hook:
  const { events } = useDraggable(ref);

  return (
    <div
      className="flex space-x-3 overflow-x-scroll scrollbar-hide" // TailwindCSS
      {...events}
      ref={ref}   // add the reference and the events to the wrapping div
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
      ref={ref}   // add the reference and the events to the wrapping div
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
