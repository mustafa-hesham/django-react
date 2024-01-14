export function getProductImages(variants, sort=true) {
  if (!variants || !Array.isArray(variants)) {
    return [];
  }

  if (sort) {
    const sortedVariantsByOrder = variants.slice().sort((a, b) => a.productvariant.order - b.productvariant.order);
    return sortedVariantsByOrder.map((variant) => variant.image);
  } else {
    return variants.map((variant) => variant.image);
  }
}
