export function sortVariants(variants) {
  return variants.slice().sort((a, b) => a.productvariant.order - b.productvariant.order);
}

export function getProductImages(variants, sort=true) {
  if (!variants || !Array.isArray(variants)) {
    return [];
  }

  const sortedVariants = sort ? sortVariants(variants) : variants;

  return sortedVariants.map((variant) => variant.image);
}

export function getProductColors(variants, sort=true) {
  const sortedVariants = sort ? sortVariants(variants) : variants;
  const colors = [];
  const uniqueColors = [];
  sortedVariants.forEach((variant, index) => {
    if (!colors.some((color) => color.name === variant.color.name)) {
      colors.push(variant.color);
      uniqueColors.push([variant.color, index]);
    }
  });

  return uniqueColors;
}

export function getProductVariantSizesByColor(variants, color, sort=true) {
  const sortedVariants = sort ? sortVariants(variants) : variants;

  const {
    name = ''
  } = color[0];

  const sizesByColor = [];

  sortedVariants.forEach((variant) => {
    if (variant.color.name === name) {
      sizesByColor.push(variant.size.name);
    }
  });

  return sizesByColor;
}