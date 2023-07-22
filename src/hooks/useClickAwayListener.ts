import { useEffect, useRef } from "react";

const useClickAwayListener = <T extends HTMLElement = HTMLDivElement>(callback: VoidFunction) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as T;

      if (event.target !== ref.current) {
        if (target.contains(ref.current) && target !== ref.current) {
          callback();
        }
      }
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
    };
  }, [callback]);

  return ref;
};

export default useClickAwayListener;
