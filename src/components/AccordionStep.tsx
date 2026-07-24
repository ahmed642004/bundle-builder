import type { ReactNode } from "react";
import { useBundle } from "../state/useBundle";
import { getStepSelectedCount } from "../state/selectors";

type Props = {
  stepNumber: number;
  totalSteps: number;
  title: string;
  isOpen?: boolean;
  children?: ReactNode;
  stepId: string;
  icon: string;
};

export function AccordionStep({
  stepNumber,
  totalSteps,
  title,
  stepId,
  children,
  icon,
}: Props) {
  const { state, dispatch } = useBundle();
  const isOpen = state.expandedStep === stepId;
  const selectedCount = getStepSelectedCount(state, stepId);
  return (
    <div
      className={`w-full overflow-hidden ${
        isOpen ? "bg-[#EDF4FF] rounded-[10px]" : ""
      }`}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => dispatch({ type: "TOGGLE_STEP", payload: { stepId } })}
        className="w-full text-left"
      >
        <div className="px-[15px] pt-4 pb-1 text-xs text-[#484848]">
          STEP {stepNumber} OF {totalSteps}
        </div>
        <div
          className={`px-[15px] py-[20px] flex items-center justify-between border-t-[0.5px] border-[#1F1F1F] ${
            isOpen ? "" : "border-b-[0.5px]"
          }`}
        >
          <div className="flex items-center gap-2">
            <div>
              <img src={icon} alt="" />
            </div>
            <div className="text-lg font-semibold leading-none text-[#0B0D10] md:text-[22px] xl:text-[28px]">
              {title}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {selectedCount > 0 && (
              <span
                className={`text-sm font-medium text-[#4E2FD2] ${
                  isOpen ? "" : "md:hidden"
                }`}
              >
                {selectedCount} selected
              </span>
            )}
            <img
              src={isOpen ? "/icons/carrot-up.png" : "/icons/carrot-down.png"}
              alt=""
              className="w-[12px] h-[12px] object-contain"
            />
          </div>
        </div>
      </button>

      {isOpen && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}
