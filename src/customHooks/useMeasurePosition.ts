import { useEffect, useRef } from "react";

export function useMeasurePosition(update: any) {
  const ref: any = useRef(null);

  useEffect(() => {
    update({
      height: ref.current.offsetHeight,
      top: ref.current.offsetTop
    });
  });

  return ref;
}
