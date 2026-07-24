import { useBundle } from "../state/useBundle";
import type { CatalogProduct } from "../state/selectors";
import { VariantChips } from "./VariantChips";
import { QuantityStepper } from "./QuantityStepper";

export function ProductCard({
  productId,
  product,
}: {
  productId: string;
  product: CatalogProduct;
}) {
  const { state, dispatch } = useBundle();
  const selection = state.selections[productId];
  const activeVariant = selection?.activeVariant ?? product.variants[0].id;
  const activeQty = selection?.quantities?.[activeVariant] ?? 0;
  const activeVariantData = product.variants.find((v) => v.id === activeVariant);
  const displayImage =
    activeVariantData?.cardImage ?? activeVariantData?.icon ?? product.image;
  const isSelected = activeQty > 0;

  return (
    <div
      className={`relative h-full overflow-hidden rounded-xl px-[9px] py-[15px] flex gap-3 bg-white border xl:flex-col ${
        isSelected
          ? "border-transparent ring-2 ring-inset ring-[#4E2FD2]/70"
          : "border-gray-200"
      }`}
    >
      {product.badge && (
        <span className="absolute top-3 left-3 z-10 text-xs bg-[#4E2FD2] text-white w-fit px-2 py-0.5 rounded-full">
          {product.badge}
        </span>
      )}

      <div
        className={`w-24 shrink-0 self-center rounded-lg flex items-center justify-center text-xs text-gray-400 xl:w-full xl:h-32 xl:self-auto ${
          product.imageAlign === "right" ? "xl:justify-end" : ""
        }`}
      >
        <img
          className="max-h-28 w-auto max-w-full object-contain xl:h-32 xl:max-h-none"
          src={displayImage}
          alt={product.title}
        />
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-3">
        <div>
          <h3 className="font-semibold text-[15px] tracking-[-0.035em] xl:text-[18px]">
            {product.title}
          </h3>
          <p className="text-[12px] font-medium  text-[#1F1F1FBF] xl:text-[14px]">
            {product.description}{" "}
            <a href={product.learnMoreUrl} className="text-xs underline">
              Learn More
            </a>
          </p>
        </div>

        <VariantChips
          variants={product.variants}
          activeVariant={activeVariant}
          onSelect={(variantId) =>
            dispatch({ type: "SET_VARIANT", payload: { productId, variantId } })
          }
        />

        <div className="mt-auto flex items-center justify-between">
          <QuantityStepper
            quantity={activeQty}
            max={product.maxQuantity}
            onAdjust={(delta) =>
              dispatch({
                type: "ADJUST_QUANTITY",
                payload: { productId, variantId: activeVariant, delta },
              })
            }
          />

          <div className="flex flex-col items-end xl:flex-row xl:items-baseline xl:gap-[3px]">
            {product.compareAtPrice && (
              <span className="text-[#EA4335] line-through">
                ${product.compareAtPrice}
              </span>
            )}
            <span className="">
              {product.price === 0 ? "FREE" : `$${product.price}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
