type Props = {
  quantity: number;
  onAdjust: (delta: 1 | -1) => void;
  max?: number | null;
};

export function QuantityStepper({ quantity, onAdjust, max }: Props) {
  const atMax = max != null && quantity >= max;
  return (
    <div className="inline-flex items-center gap-[10px]">
      <button
        type="button"
        onClick={() => onAdjust(-1)}
        disabled={quantity <= 0}
        aria-label="Decrease quantity"
        className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#EFF1F4] text-[#1F1F1F] text-xl font-semibold leading-none disabled:opacity-30"
      >
        −
      </button>
      <span className="min-w-[16px] text-center text-base font-medium text-[#1F1F1F]">
        {quantity}
      </span>
      <button
        type="button"
        onClick={() => onAdjust(1)}
        disabled={atMax}
        aria-label="Increase quantity"
        className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#EFF1F4] text-[#1F1F1F] text-xl font-semibold leading-none disabled:opacity-30"
      >
        +
      </button>
    </div>
  );
}
