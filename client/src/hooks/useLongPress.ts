import React, { MouseEventHandler, useCallback, useRef, useState } from "react";

type Options = {
  shouldPreventDefault: boolean;
  delay: number;
};

const useLongPress = (
  onLongPress: MouseEventHandler<any>,
  onClick: MouseEventHandler<any>,
  { shouldPreventDefault = true, delay = 300 }: Options
) => {
  const [longPressTriggered, setLongPressTriggered] = useState(false);
  const timeout = useRef<any>();
  const target = useRef<any>();

  const start = useCallback(
    (event: any) => {
      if (shouldPreventDefault && event.target) {
        event.target.addEventListener("touchend", preventDefault, {
          passive: false,
        });
        target.current = event.target;
      }
      timeout.current = setTimeout(() => {
        onLongPress(event);
        setLongPressTriggered(true);
      }, delay);
    },
    [onLongPress, delay, shouldPreventDefault]
  );

  const clear = useCallback(
    (event, shouldTriggerClick = true) => {
      timeout.current && clearTimeout(timeout.current);
      shouldTriggerClick && !longPressTriggered && onClick(undefined);
      setLongPressTriggered(false);
      if (shouldPreventDefault && target.current) {
        target.current.removeEventListener("touchend", preventDefault);
      }
    },
    [shouldPreventDefault, onClick, longPressTriggered]
  );

  return {
    onMouseDown: (e) => start(e),
    onTouchStart: (e) => start(e),
    onMouseUp: (e) => clear(e),
    onMouseLeave: (e) => clear(e, false),
    onTouchEnd: (e) => clear(e),
  };
};

const isTouchEvent = (event) => {
  return "touches" in event;
};

const preventDefault = (event) => {
  if (!isTouchEvent(event)) return;

  if (event.touches.length < 2 && event.preventDefault) {
    event.preventDefault();
  }
};

export default useLongPress;
