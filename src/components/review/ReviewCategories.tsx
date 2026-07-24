import type { ReviewLineData } from "../../state/selectors";
import type { ReviewGroup } from "../../state/useReviewData";
import { ReviewLineItem, FastShippingRow } from "./ReviewLineItem";
import type { ReviewSize } from "./ReviewLineItem";

export function ReviewCategories({
  grouped,
  size,
  onAdjust,
}: {
  grouped: ReviewGroup[];
  size: ReviewSize;
  onAdjust: (line: ReviewLineData, delta: 1 | -1) => void;
}) {
  const sm = size === "sm";
  return (
    <div className={`${sm ? "mt-3" : "mt-4"} flex flex-col`}>
      {grouped.map((group) => (
        <div
          key={group.category}
          className={`border-t border-[#CED6DE] pt-[15px] ${sm ? "pb-3" : "pb-[10px]"}`}
        >
          <div
            className={
              sm
                ? "text-[10px] uppercase tracking-wide text-gray-400 mb-2"
                : "text-xs text-gray-400 uppercase tracking-wide mb-3"
            }
          >
            {group.category}
          </div>
          <div className={`flex flex-col ${sm ? "gap-3" : "gap-4"}`}>
            {group.lines.map((line) => (
              <ReviewLineItem
                key={`${line.productId}-${line.variantId}`}
                line={line}
                size={size}
                onAdjust={(delta) => onAdjust(line, delta)}
              />
            ))}
          </div>
        </div>
      ))}

      <FastShippingRow size={size} />
    </div>
  );
}
