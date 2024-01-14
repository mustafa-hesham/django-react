import './ProductCard.style.scss';

import AddToCart from 'Component/AddToCart';
import { useState } from 'react';
import { getProductColors, getProductImages, getProductVariantSizesByColor, sortVariants } from 'Util/Product';

export default function ProductCard(props) {
  const {
    product,
    product: {
      name = '',
      variants,
      price = 0.00
    }
  } = props;

  const [clickedColorIndex, setClickedColorIndex] = useState(0);

  const sortedVariantsByOrder = sortVariants(variants);
  const productColors = getProductColors(sortedVariantsByOrder, false);
  const selectedColor = productColors.find((color) => color[1] === clickedColorIndex);
  const sizesByColor = getProductVariantSizesByColor(sortedVariantsByOrder, selectedColor, false);

  return (
    <div className='ProductCard'>
      { renderProductImages(getProductImages(sortedVariantsByOrder, false), clickedColorIndex) }
      { renderProductName(name) }
      { renderProductPrice(price) }
      { renderProductColorsAndSizes(
          productColors,
          setClickedColorIndex,
          sizesByColor
      ) }
      { renderAddToCart(product) }
    </div>
  );
};

function renderProductName(name) {
  if (!name) {
    return null;
  }

  return (
    <div className='ProductCard-Name'>
      { name }
    </div>
  );
}

function renderProductImages(variantsImages, clickedColorIndex) {
  if (!variantsImages) {
    return null;
  }

  const imageUrl = `static/media/${variantsImages[clickedColorIndex]}`;

  return (
    <div className='ProductCard-Images'>
      <div
        className='ProductCard-Image'
        style={ {
          backgroundImage: `url('${imageUrl}')`
        } }
      />
    </div>
  );
};

function renderProductPrice(price) {
  if (!price) {
    return null;
  }

  return (
    <div className='ProductCard-Price'>
      { `$${price}` }
    </div>
  );
};

function renderAddToCart(product) {
  return (
    <div
      className='ProductCard-AddToCart'
    >
      <AddToCart product={ product } />
    </div>
  );
};

function renderProductColor(color, setClickedColorIndex) {
  if (!color) {
    return null;
  }

  const {
    hexValue
  } = color[0];

  return (
    <div
      key={ hexValue }
      className='ProductCard-Color'
      style={ {
        backgroundColor: `${hexValue}`
      } }
      onClick={ () => setClickedColorIndex(color[1]) }
    />

  );
};

function renderVariantSizes(size) {
  return (
    <div className='ProductCard-Size'>
      { size }
    </div>
  );
};

function renderProductColorsAndSizes(colors, setClickedColorIndex, sizesByColor) {
  if (!colors && !colors.length) {
    return null;
  }

  return (
    <div className='ProductCard-VariantInfo'>
      <div className='ProductCard-Colors'>
        { colors.map((color, index) => renderProductColor(color, setClickedColorIndex, index)) }
      </div>
      <div className='ProductCard-Sizes'>
        { sizesByColor && sizesByColor.map(renderVariantSizes) }
      </div>
    </div>
  );
};
