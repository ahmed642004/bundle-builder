import { useReviewData } from "../state/useReviewData";
import { ReviewCategories } from "./review/ReviewCategories";
import { ReviewSummary } from "./review/ReviewSummary";

export function ReviewPanel() {
  const {
    grouped,
    total,
    compareAtTotal,
    savings,
    monthlyEstimate,
    adjustQuantity,
  } = useReviewData();

  const summaryProps = { total, compareAtTotal, savings, monthlyEstimate };

  return (
    <>
      <aside className="xl:hidden w-full md:flex-1 md:min-w-[300px] md:sticky md:top-6 rounded-2xl bg-[#EDF4FF] p-5">
        <div className="text-xs uppercase tracking-wide text-gray-400">
          Review
        </div>
        <h2 className="text-xl font-bold mt-2">Your security system</h2>
        <p className="text-xs text-gray-500 mt-1">
          Review your personalized protection system designed to keep what
          matters most safe.
        </p>

        <ReviewCategories
          grouped={grouped}
          size="sm"
          onAdjust={adjustQuantity}
        />
        <ReviewSummary size="sm" {...summaryProps} />
      </aside>

      <div className="hidden xl:block mt-6 pt-6 border-t border-gray-200">
        <div className="rounded-2xl bg-[#EDF4FF] pt-[35px] pb-[20px] px-[60px] grid grid-cols-2 gap-[50px]">
          <div className="flex flex-col">
            <h2 className="text-[28px] font-semibold text-[#1F1F1F]">
              Your security system
            </h2>
            <p className="text-[16px] text-[#1F1F1FBF] mt-1">
              Review your personalized protection system designed to keep what
              matters most safe.
            </p>

            <ReviewCategories
              grouped={grouped}
              size="lg"
              onAdjust={adjustQuantity}
            />
          </div>

          <div className="flex flex-col max-w-[485px]">
            <ReviewSummary size="lg" {...summaryProps} />
          </div>
        </div>
      </div>
    </>
  );
}
