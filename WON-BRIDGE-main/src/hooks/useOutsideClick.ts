import { useEffect, useRef } from "react";

function useOutsideClick<T extends HTMLElement>(
  handler: (event: MouseEvent | TouchEvent) => void,
  active: boolean = true,
  // Array of elements to ignore when detecting outside clicks
  excludedRefs: (HTMLElement | null | undefined)[] = []
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!active) return;

    const listener = (event: MouseEvent | TouchEvent) => {
      const targetNode = event.target as Node;

      // Do nothing if the click is inside the primary referenced element (the main form/nav).
      if (ref.current && ref.current.contains(targetNode)) {
        return;
      }

      // Check if the click is inside any of the excluded elements (like a modal).
      const isInsideExcluded = excludedRefs
        .filter((el): el is HTMLElement => !!el)
        .some((el) => el.contains(targetNode));

      // If the click is inside an excluded element, do nothing.
      if (isInsideExcluded) {
        return;
      }

      // stop the click from triggering anything else higher up in the DOM
      event.stopPropagation();
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [handler, active, excludedRefs]);

  return ref;
}

export default useOutsideClick;
