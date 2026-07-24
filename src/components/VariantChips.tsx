type Variant = {
  id: string;
  label: string | null;
  swatch: string | null;
  icon?: string | null;
};

type Props = {
  variants: Variant[];
  activeVariant: string;
  onSelect: (variantId: string) => void;
};

export function VariantChips({ variants, activeVariant, onSelect }: Props) {
  if (variants.length === 1 && variants[0].id === "default") return null;

  return (
    <div className="flex gap-[6px]">
      {variants.map((v) => {
        const isActive = v.id === activeVariant;
        return (
        <button
          key={v.id}
          type="button"
          onClick={() => onSelect(v.id)}
          className="flex items-center w-[65px] rounded-sm text-xs"
          style={{
            border: isActive ? "0.5px solid #0AA288" : "0.5px solid #ddd",
            backgroundColor: isActive ? "#1DF0BB0A" : undefined,
          }}
        >
          {v.icon ? (
            <img src={v.icon} alt="" className="h-7 w-auto object-contain" />
          ) : (
            <span
              className="w-3 h-3 rounded-full inline-block"
              style={{ background: v.swatch ?? "#ccc" }}
            />
          )}
          {v.label}
        </button>
        );
      })}
    </div>
  );
}
