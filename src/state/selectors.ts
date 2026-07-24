import type { BundleState } from "./bundleReducer";
import catalog from "../data/bundle.json";

export type CatalogVariant = {
  id: string;
  label: string | null;
  swatch: string | null;
  icon?: string | null;
  cardImage?: string | null;
};

export type CatalogProduct = {
  stepId: string;
  category: string;
  title: string;
  description: string;
  learnMoreUrl: string;
  image: string;
  imageAlign?: string;
  badge: string | null;
  compareAtPrice: number | null;
  billingPeriod?: string | null;
  price: number;
  maxQuantity?: number | null;
  variants: CatalogVariant[];
};

const products = catalog.products as Record<string, CatalogProduct>;

export type ReviewLineData = {
  productId: string;
  variantId: string;
  title: string;
  variantLabel: string | null;
  image: string;
  price: number;
  compareAtPrice: number | null;
  billingPeriod: string | null;
  quantity: number;
  category: string;
};

export function getReviewLines(state: BundleState): ReviewLineData[] {
  const lines: ReviewLineData[] = [];

  for (const [productId, selection] of Object.entries(state.selections)) {
    const product = products[productId];
    if (!product) continue;

    for (const [variantId, quantity] of Object.entries(
      selection.quantities
    )) {
      if (quantity <= 0) continue;

      const variant = product.variants.find((v) => v.id === variantId);

      lines.push({
        productId,
        variantId,
        title: product.title,
        variantLabel: variant?.label ?? null,
        image: variant?.icon ?? product.image,
        price: product.price,
        compareAtPrice: product.compareAtPrice ?? null,
        billingPeriod: product.billingPeriod ?? null,
        quantity,
        category: product.category,
      });
    }
  }

  return lines;
}

export function getStepSelectedCount(
  state: BundleState,
  stepId: string
): number {
  const productsInStep = Object.entries(products).filter(
    ([, p]) => p.stepId === stepId
  );

  return productsInStep.filter(([productId]) => {
    const selection = state.selections[productId];
    if (!selection) return false;
    return Object.values(selection.quantities).some((q) => q > 0);
  }).length;
}

export function getTotal(state: BundleState): {
  total: number;
  compareAtTotal: number;
} {
  const lines = getReviewLines(state);
  let total = 0;
  let compareAtTotal = 0;

  for (const line of lines) {
    total += line.price * line.quantity;
    compareAtTotal += (line.compareAtPrice ?? line.price) * line.quantity;
  }

  return { total, compareAtTotal };
}
