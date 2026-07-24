import { useState } from "react";
import { useBundle } from "../../state/useBundle";
import type { ReviewSize } from "./ReviewLineItem";

export function ReviewSummary({
  size,
  total,
  compareAtTotal,
  savings,
  monthlyEstimate,
}: {
  size: ReviewSize;
  total: number;
  compareAtTotal: number;
  savings: number;
  monthlyEstimate: number;
}) {
  const sm = size === "sm";
  const { saveSystem } = useBundle();
  const [saveState, setSaveState] = useState<"idle" | "saved" | "error">(
    "idle"
  );

  const handleSave = () => {
    const ok = saveSystem();
    setSaveState(ok ? "saved" : "error");
    setTimeout(() => setSaveState("idle"), 2000);
  };

  const pill = total > 0 && (
    <span
      className={
        sm
          ? "text-[11px] font-medium text-white bg-[#4E2FD2] rounded px-2 py-0.5 whitespace-nowrap"
          : "text-[16px] font-medium tracking-[-0.8px] text-white bg-[#4E2FD2] rounded-[3px] p-2 whitespace-nowrap"
      }
    >
      as low as ${monthlyEstimate.toFixed(2)}/mo
    </span>
  );

  const totalPrice = (
    <div className="flex items-baseline gap-2">
      {savings > 0 && (
        <span
          className={`text-[#6F7882] line-through ${sm ? "text-[18px]" : "text-[22px]"}`}
        >
          ${compareAtTotal.toFixed(2)}
        </span>
      )}
      <span
        className={`font-bold text-[#4E2FD2] ${sm ? "text-[24px]" : "text-[28px]"}`}
      >
        ${total.toFixed(2)}
      </span>
    </div>
  );

  return (
    <>
      {sm ? (
        <div className="mt-2 flex items-center gap-3">
          <img
            src="/ui/satisfaction_badge.png"
            alt="100% satisfaction guarantee"
            className="w-[78px] h-[78px] shrink-0"
          />
          <div className="flex-1 flex flex-col items-end gap-1">
            {pill}
            {totalPrice}
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-4">
            <img
              src="/ui/satisfaction_badge.png"
              alt="100% satisfaction guarantee"
              className="w-[131px] h-[131px] shrink-0"
            />
            <div>
              <div className="font-semibold text-[18px] mb-4">
                30-day hassle-free returns
              </div>
              <p className="text-[16px] text-[#1F1F1F] max-w-[250px]">
                If you're not totally in love with the product, we will refund
                you 100%.
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            {pill}
            {totalPrice}
          </div>
        </>
      )}

      {savings > 0 && (
        <div
          className={`text-[#0AA288] font-semibold text-center ${sm ? "text-xs mt-2" : "text-sm mt-[14px]"}`}
        >
          Congrats! You're saving ${savings.toFixed(2)} on your security bundle!
        </div>
      )}

      <button
        className={`${sm ? "mt-3 w-full" : "mt-1"} bg-[#4E2FD2] text-white rounded-lg py-3 font-semibold`}
      >
        Checkout
      </button>
      <button
        type="button"
        onClick={handleSave}
        className={`${sm ? "w-full mt-2" : "mt-2 text-center"} text-sm italic underline text-[#484848]`}
      >
        {saveState === "saved"
          ? "Saved! We'll keep it for your next visit ✓"
          : saveState === "error"
            ? "Couldn't save — check browser storage settings"
            : "Save my system for later"}
      </button>
    </>
  );
}
