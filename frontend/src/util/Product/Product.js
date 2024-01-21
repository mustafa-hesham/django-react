export function getUniqueProductImages(variants) {
  if (!variants || !Array.isArray(variants)) {
    return [];
  }

  const colors = [];
  const uniqueImages = [];

  variants.forEach((variant, index) => {
    if (!colors.some((color) => color.name === variant.color.name)) {
      colors.push(variant.color);
      uniqueImages.push([variant.image, index]);
    }
  });

  return uniqueImages;
}

export function getProductImages(variants) {
  if (!variants || !Array.isArray(variants)) {
    return [];
  }

  return variants.map((variant) => variant.images);
}

export function getProductColors(variants) {
  if (!Array.isArray(variants) || !variants) {
    return;
  }

  const colors = [];
  const uniqueColors = [];
  variants.forEach((variant, index) => {
    if (!colors.some((color) => color.name === variant.color.name)) {
      colors.push(variant.color);
      uniqueColors.push([variant.color, index]);
    }
  });

  return uniqueColors;
}

export function getProductVariantSizesByColor(variants, color) {
  if (!Array.isArray(variants) || !variants || !color) {
    return;
  }

  const {
    name = ''
  } = color[0];

  const sizesByColor = [];

  variants.forEach((variant) => {
    if (variant.color.name === name) {
      variant.productsizecollectionSet.forEach((size) => sizesByColor.push(size));
    }
  });

  return sizesByColor;
}

export function getMediaLink(link) {
  const {
    location: { origin }
  } = window;

  return `${origin}/static/media/${link}`;
}

export function getProductUniqueSizes(product) {
  const sizes = [];

  const {
    variants
  } = product;

  variants.forEach((variant) => {
    variant.productsizecollectionSet.forEach((size) => {
      if (sizes.indexOf(size.size.name) === -1) {
        sizes.push(size.size.name);
      }
    });
  });

  return sizes;
}
