import React, { useEffect } from 'react';

const useClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T>,
  handler: (event: MouseEvent) => void,
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown'
) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    window.addEventListener(mouseEvent, listener);

    return () => {
      window.removeEventListener(mouseEvent, listener);
    };
  }, [ref, handler, mouseEvent]);
};

export default useClickOutside;
