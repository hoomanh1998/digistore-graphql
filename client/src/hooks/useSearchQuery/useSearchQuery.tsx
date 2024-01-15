import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export const useSearchQuery = () => {
  const { search } = useLocation<string>();
  return useMemo(() => new URLSearchParams(search), [search]);
};
