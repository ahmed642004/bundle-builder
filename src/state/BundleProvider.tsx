import { useReducer, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import { bundleReducer, initialState } from "./bundleReducer";
import type { BundleState } from "./bundleReducer";
import { BundleContext } from "./useBundle";

const STORAGE_KEY = "bundle-builder-state";

export function BundleProvider({
  children,
  seedSelections,
}: {
  children: ReactNode;
  seedSelections?: BundleState["selections"];
}) {
  const [state, dispatch] = useReducer(bundleReducer, {
    ...initialState,
    selections: seedSelections ?? {},
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object" && parsed.selections) {
          dispatch({
            type: "HYDRATE",
            payload: { selections: parsed.selections },
          });
        }
      } catch {}
    }
  }, []);

  const saveSystem = useCallback(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ selections: state.selections })
      );
      return true;
    } catch {
      return false;
    }
  }, [state.selections]);

  return (
    <BundleContext.Provider value={{ state, dispatch, saveSystem }}>
      {children}
    </BundleContext.Provider>
  );
}
