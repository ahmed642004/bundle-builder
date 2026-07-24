import { useBundle } from "./useBundle";
import { getReviewLines, getTotal } from "./selectors";
import type { ReviewLineData } from "./selectors";

const CATEGORY_ORDER = ["Cameras", "Sensors", "Accessories", "Plan"];

export type ReviewGroup = { category: string; lines: ReviewLineData[] };

export function useReviewData() {
  const { state, dispatch } = useBundle();
  const lines = getReviewLines(state);
  const { total, compareAtTotal } = getTotal(state);
  const savings = compareAtTotal - total;
  const monthlyEstimate = total / 12;

  const grouped: ReviewGroup[] = CATEGORY_ORDER.map((category) => ({
    category,
    lines: lines.filter((l) => l.category === category),
  })).filter((g) => g.lines.length > 0);

  const adjustQuantity = (line: ReviewLineData, delta: 1 | -1) =>
    dispatch({
      type: "ADJUST_QUANTITY",
      payload: {
        productId: line.productId,
        variantId: line.variantId,
        delta,
      },
    });

  return {
    grouped,
    total,
    compareAtTotal,
    savings,
    monthlyEstimate,
    adjustQuantity,
  };
}
