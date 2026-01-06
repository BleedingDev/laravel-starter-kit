import { useCallback } from "react";

export const useMobileNavigation = () =>
  useCallback(() => {
    // Remove pointer-events style from body...
    document.body.style.removeProperty("pointer-events");
  }, []);
