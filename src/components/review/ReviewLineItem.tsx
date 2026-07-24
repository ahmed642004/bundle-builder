import type { ReviewLineData } from "../../state/selectors";
import { QuantityStepper } from "../QuantityStepper";

export type ReviewSize = "sm" | "lg";

export function ReviewLineItem({
  line,
  size,
  onAdjust,
}: {
  line: ReviewLineData;
  size: ReviewSize;
  onAdjust: (delta: 1 | -1) => void;
}) {
  const extended = line.price * line.quantity;
  const extendedCompareAt =
    line.compareAtPrice != null ? line.compareAtPrice * line.quantity : null;
  const isPlan = line.category === "Plan";
  const suffix = line.billingPeriod ? `/${line.billingPeriod}` : "";
  const [firstWord, ...restWords] = line.title.split(" ");
  const showCompareAt =
    extendedCompareAt != null && extendedCompareAt > extended;
  const sm = size === "sm";

  const title = isPlan ? (
    <>
      <span className="font-bold">{firstWord}</span>
      {restWords.length > 0 && (
        <span className="font-bold text-[#4E2FD2]"> {restWords.join(" ")}</span>
      )}
    </>
  ) : (
    line.title
  );

  return (
    <div className={`flex items-center ${sm ? "gap-2" : "gap-3"}`}>
      <div
        className={`${sm ? "w-9 h-9" : "w-10 h-10"} rounded-md bg-white border border-gray-200 shrink-0 flex items-center justify-center overflow-hidden`}
      >
        <img src={line.image} alt="" className="w-full h-full object-contain" />
      </div>

      <div
        className={
          sm
            ? "flex-1 min-w-0 text-[13px] font-medium leading-tight"
            : "flex-1 text-sm font-medium"
        }
      >
        {title}
        {line.variantLabel && (
          <span className="text-xs text-gray-400 font-normal">
            {" "}
            · {line.variantLabel}
          </span>
        )}
      </div>

      {!isPlan && (
        <QuantityStepper quantity={line.quantity} onAdjust={onAdjust} />
      )}

      <div
        className={
          sm
            ? "flex flex-col items-end w-14 shrink-0"
            : "flex items-baseline gap-2 w-28 justify-end"
        }
      >
        {showCompareAt && (
          <span
            className={`${sm ? "text-[11px]" : "text-[16px]"} text-[#6F7882] line-through`}
          >
            ${extendedCompareAt.toFixed(2)}
            {suffix}
          </span>
        )}
        <span
          className={`${sm ? "text-[13px]" : "text-[16px]"} font-semibold text-[#4E2FD2]
          `}
        >
          {line.price === 0 ? "FREE" : `$${extended.toFixed(2)}${suffix}`}
        </span>
      </div>
    </div>
  );
}

export function FastShippingRow({ size }: { size: ReviewSize }) {
  const sm = size === "sm";
  return (
    <div
      className={`border-t border-[#CED6DE] pt-[15px] ${sm ? "pb-3 gap-2" : "pb-4 gap-3"} flex items-center`}
    >
      <div
        className={`${sm ? "w-9 h-9" : "w-10 h-10"} rounded-md bg-white border border-gray-200 shrink-0 flex items-center justify-center overflow-hidden`}
      >
        <img
          src="/ui/delivery.png"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>
      <span
        className={`flex-1 ${sm ? "text-[13px] font-medium" : "text-sm text-gray-700"}`}
      >
        Fast Shipping
      </span>
      <span
        className={`${sm ? "text-[11px]" : "text-xs"} text-gray-400 line-through`}
      >
        $5.99
      </span>
      <span
        className={`${sm ? "text-[13px]" : "text-sm"} font-semibold text-[#4E2FD2]`}
      >
        FREE
      </span>
    </div>
  );
}
