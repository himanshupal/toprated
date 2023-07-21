import { useCallback, useEffect, useState } from "react";
import useDebounce from "./useDebounce";

export interface IDimensions {
  height: number;
  width: number;
}

const useDisplayDimensions = () => {
  const [dimens, setDimens] = useState<IDimensions>({ width: 0, height: 0 });

  const updateDimens = useCallback(() => {
    setDimens({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    updateDimens();
    window.addEventListener("resize", updateDimens);
    return () => {
      window.removeEventListener("resize", updateDimens);
    };
  }, [updateDimens]);

  return useDebounce(dimens, 50);
};

export default useDisplayDimensions;
