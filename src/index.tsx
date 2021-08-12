import { MutableRefObject, useEffect, useRef } from "react";

type ReturnType = {
  events: {
    onMouseDown: (e: React.MouseEvent<HTMLElement>) => void;
  };
};

export function useDraggable(
  ref: MutableRefObject<HTMLElement>,
  decayRate = 0.95
): ReturnType {
  const internalState = useRef({
    lastMouseX: 0,
    isMouseDown: false,
    isDragging: false,
    scrollSpeed: 0,
    lastScrollX: 0,
  });

  let maxHorizontalScroll = 0;
  let cursorStyleOfWrapperDiv: string;
  let cursorStyleOfChildElements: string[];

  useEffect(() => {
    maxHorizontalScroll = ref.current.scrollWidth - ref.current.clientWidth;

    cursorStyleOfWrapperDiv = window.getComputedStyle(ref.current).cursor;

    cursorStyleOfChildElements = [];
    (ref.current.childNodes as NodeListOf<HTMLOptionElement>).forEach(
      (child: HTMLElement) => {
        cursorStyleOfChildElements.push(window.getComputedStyle(child).cursor);
      }
    );
  }, []);

  const timing = (1 / 60) * 1000; // period of most monitors (60fps)

  const runScroll = () => {
    const dx = internalState.current.scrollSpeed * timing;
    const offsetX = Math.min(maxHorizontalScroll, ref.current.scrollLeft + dx);

    ref.current.scrollLeft = offsetX; // eslint-disable-line no-param-reassign
    internalState.current.lastScrollX = offsetX;
  };

  const callbackMomentum = () => {
    const didNotReachTheEdges =
      internalState.current.lastScrollX > 0 &&
      internalState.current.lastScrollX < maxHorizontalScroll;

    if (didNotReachTheEdges) {
      const keepMoving = setInterval(() => {
        const lastScrollSpeed = internalState.current.scrollSpeed;
        const newScrollSpeed = lastScrollSpeed * decayRate;
        internalState.current.scrollSpeed = newScrollSpeed;

        runScroll();

        if (Math.abs(newScrollSpeed) < 0.01) {
          internalState.current.scrollSpeed = 0;
          internalState.current.isDragging = false;
          clearInterval(keepMoving);
        }
      }, timing);
    }

    internalState.current.isDragging = false;
  };

  const preventClick = (e: Event) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    // e.stopPropagation();
  };

  const onMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    const isLeftMouseButton = e.buttons === 1;
    if (!isLeftMouseButton) {
      return;
    }

    internalState.current.isMouseDown = true;
    internalState.current.lastMouseX = e.clientX;

    ref.current.classList.add("active");
  };

  const onMouseUp = () => {
    if (internalState.current.isDragging) {
      ref.current.childNodes.forEach((child) => {
        child.addEventListener("click", preventClick);
      });
    } else {
      ref.current.childNodes.forEach((child) => {
        child.removeEventListener("click", preventClick);
      });
    }

    internalState.current.isMouseDown = false;
    internalState.current.lastMouseX = 0;

    ref.current.classList.remove("active");

    ref.current.style.cursor = cursorStyleOfWrapperDiv; // eslint-disable-line no-param-reassign
    (ref.current.childNodes as NodeListOf<HTMLOptionElement>).forEach(
      (child: HTMLElement, i) => {
        child.style.cursor = cursorStyleOfChildElements[i]; // eslint-disable-line no-param-reassign
      }
    );

    callbackMomentum();
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!internalState.current.isMouseDown) {
      return;
    }

    e.preventDefault();

    const dx = internalState.current.lastMouseX - e.clientX;
    internalState.current.lastMouseX = e.clientX;

    internalState.current.scrollSpeed = dx / timing;
    internalState.current.isDragging = true;

    ref.current.style.cursor = "grabbing"; // eslint-disable-line no-param-reassign
    (ref.current.childNodes as NodeListOf<HTMLOptionElement>).forEach(
      (child: HTMLElement) => {
        child.style.cursor = "grabbing"; // eslint-disable-line no-param-reassign
      }
    );

    runScroll();
  };

  const handleResize = () => {
    maxHorizontalScroll = ref.current.scrollWidth - ref.current.clientWidth;
  };

  useEffect(() => {
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    events: {
      onMouseDown,
    },
  };
}
