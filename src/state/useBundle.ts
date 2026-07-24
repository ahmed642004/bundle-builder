import { createContext, useContext } from "react";
import type { BundleState, BundleAction } from "./bundleReducer";

export type BundleContextValue = {
  state: BundleState;
  dispatch: React.Dispatch<BundleAction>;
  saveSystem: () => boolean;
};

export const BundleContext = createContext<BundleContextValue | null>(null);

export function useBundle() {
  const ctx = useContext(BundleContext);
  if (!ctx) throw new Error("useBundle must be used inside BundleProvider");
  return ctx;
}
