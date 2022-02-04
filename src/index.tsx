import { MutableRefObject, useEffect, useLayoutEffect, useRef } from "react";

type OptionsType = {
  decayRate?: number,
  safeDisplacement?: number,
};

type ReturnType = {
  events: {
    onMouseDown: (e: React.MouseEvent<HTMLElement>) => void;
  },
};

export function useDraggable(
  ref: MutableRefObject<HTMLElement>, {
    decayRate = 0.95,
    safeDisplacement = 10,
  }: OptionsType = {},
): ReturnType {
  const internalState = useRef({
    isMouseDown: false,
    isDraggingX: false,
    isDraggingY: false,
    initialMouseX: 0,
    initialMouseY: 0,
    lastMouseX: 0,
    lastMouseY: 0,
    scrollSpeedX: 0,
    scrollSpeedY: 0,
    lastScrollX: 0,
    lastScrollY: 0,
  });

  let maxHorizontalScroll = 0;
  let maxVerticalScroll = 0;
  let cursorStyleOfWrapperElement: string;
  let cursorStyleOfChildElements: string[];

  useLayoutEffect(() => {
    maxHorizontalScroll = ref.current.scrollWidth - ref.current.clientWidth;
    maxVerticalScroll = ref.current.scrollHeight - ref.current.clientHeight;

    cursorStyleOfWrapperElement = window.getComputedStyle(ref.current).cursor;

    cursorStyleOfChildElements = [];
    (ref.current.childNodes as NodeListOf<HTMLOptionElement>).forEach(
      (child: HTMLElement) => {
        cursorStyleOfChildElements.push(window.getComputedStyle(child).cursor);
      }
    );
  }, []);

  const timing = (1 / 60) * 1000; // period of most monitors (60fps)

  const runScroll = () => {
    const dx = internalState.current.scrollSpeedX * timing;
    const dy = internalState.current.scrollSpeedY * timing;
    const offsetX = Math.min(maxHorizontalScroll, ref.current.scrollLeft + dx);
    const offsetY = Math.min(maxVerticalScroll, ref.current.scrollTop + dy);

    ref.current.scrollLeft = offsetX; // eslint-disable-line no-param-reassign
    ref.current.scrollTop = offsetY; // eslint-disable-line no-param-reassign
    internalState.current.lastScrollX = offsetX;
    internalState.current.lastScrollY = offsetY;
  };

  const callbackMomentum = () => {
    const didNotReachHorizontalEdges =
      internalState.current.lastScrollX > 0 &&
      internalState.current.lastScrollX < maxHorizontalScroll;

    const didNotReachVerticalEdges =
      internalState.current.lastScrollY > 0 &&
      internalState.current.lastScrollY < maxVerticalScroll;

    if (didNotReachHorizontalEdges) {
      const keepMovingX = setInterval(() => {
        const lastScrollSpeedX = internalState.current.scrollSpeedX;
        const newScrollSpeedX = lastScrollSpeedX * decayRate;
        internalState.current.scrollSpeedX = newScrollSpeedX;

        runScroll();

        if (
          Math.abs(newScrollSpeedX) < 0.005 ||
          internalState.current.isMouseDown
        ) {
          internalState.current.scrollSpeedX = 0;
          internalState.current.isDraggingX = false;
          clearInterval(keepMovingX);
        }
      }, timing);
    }

    if (didNotReachVerticalEdges) {
      const keepMovingY = setInterval(() => {
        const lastScrollSpeedY = internalState.current.scrollSpeedY;
        const newScrollSpeedY = lastScrollSpeedY * decayRate;
        internalState.current.scrollSpeedY = newScrollSpeedY;

        runScroll();

        if (
          Math.abs(newScrollSpeedY) < 0.005 ||
          internalState.current.isMouseDown
        ) {
          internalState.current.scrollSpeedY = 0;
          internalState.current.isDraggingY = false;
          clearInterval(keepMovingY);
        }
      }, timing);
    }

    internalState.current.isDraggingX = false;
    internalState.current.isDraggingY = false;
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
    internalState.current.lastMouseY = e.clientY;
    internalState.current.initialMouseX = e.clientX;
    internalState.current.initialMouseY = e.clientY;
  };

  const onMouseUp = (e: MouseEvent) => {
    const isDragging =
      internalState.current.isDraggingX || internalState.current.isDraggingX;

    const dx = internalState.current.initialMouseX - e.clientX;
    const dy = internalState.current.initialMouseY - e.clientY;

    const isMotionIntentional =
      Math.abs(dx) > safeDisplacement || Math.abs(dy) > safeDisplacement;

    const isDraggingConfirmed = isDragging && isMotionIntentional;

    if (isDraggingConfirmed) {
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
    internalState.current.lastMouseY = 0;

    ref.current.style.cursor = cursorStyleOfWrapperElement; // eslint-disable-line no-param-reassign
    (ref.current.childNodes as NodeListOf<HTMLOptionElement>).forEach(
      (child: HTMLElement, i) => {
        child.style.cursor = cursorStyleOfChildElements[i]; // eslint-disable-line no-param-reassign
      }
    );

    if (isDraggingConfirmed) {
      callbackMomentum();
    }
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!internalState.current.isMouseDown) {
      return;
    }

    e.preventDefault();

    const dx = internalState.current.lastMouseX - e.clientX;
    internalState.current.lastMouseX = e.clientX;

    internalState.current.scrollSpeedX = dx / timing;
    internalState.current.isDraggingX = true;

    const dy = internalState.current.lastMouseY - e.clientY;
    internalState.current.lastMouseY = e.clientY;

    internalState.current.scrollSpeedY = dy / timing;
    internalState.current.isDraggingY = true;

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
    maxVerticalScroll = ref.current.scrollHeight - ref.current.clientHeight;
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
