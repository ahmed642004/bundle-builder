export type Selection = {
  activeVariant: string;
  quantities: Record<string, number>;
};

export type BundleState = {
  expandedStep: string | null;
  selections: Record<string, Selection>;
};

export type BundleAction =
  | { type: "TOGGLE_STEP"; payload: { stepId: string } }
  | { type: "SET_VARIANT"; payload: { productId: string; variantId: string } }
  | {
      type: "ADJUST_QUANTITY";
      payload: { productId: string; variantId: string; delta: number };
    }
  | { type: "HYDRATE"; payload: Partial<BundleState> };

export const initialState: BundleState = {
  expandedStep: "cameras",
  selections: {},
};

export function bundleReducer(
  state: BundleState,
  action: BundleAction
): BundleState {
  switch (action.type) {
    case "TOGGLE_STEP": {
      const { stepId } = action.payload;
      return {
        ...state,
        expandedStep: state.expandedStep === stepId ? null : stepId,
      };
    }

    case "SET_VARIANT": {
      const { productId, variantId } = action.payload;
      const existing = state.selections[productId] ?? { quantities: {} };

      return {
        ...state,
        selections: {
          ...state.selections,
          [productId]: {
            ...existing,
            activeVariant: variantId,
          },
        },
      };
    }

    case "ADJUST_QUANTITY": {
      const { productId, variantId, delta } = action.payload;
      const existing = state.selections[productId] ?? {
        activeVariant: variantId,
        quantities: {},
      };
      const current = existing.quantities[variantId] ?? 0;
      const qty = Math.max(0, current + delta);

      return {
        ...state,
        selections: {
          ...state.selections,
          [productId]: {
            ...existing,
            quantities: {
              ...existing.quantities,
              [variantId]: qty,
            },
          },
        },
      };
    }

    case "HYDRATE": {
      return {
        ...state,
        ...action.payload,
      };
    }

    default:
      return state;
  }
}
