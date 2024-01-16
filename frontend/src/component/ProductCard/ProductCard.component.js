/* eslint-disable no-magic-numbers */
import './ProductCard.style.scss';

import AddToCart from 'Component/AddToCart';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getMediaLink,
  getProductColors,
  getProductImages,
  getProductVariantSizesByColor,
  sortVariants } from 'Util/Product';

export default function ProductCard(props) {
  const {
    product,
    product: {
      SKU,
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
  const navigate = useNavigate();
  const modifiedProductName = name.replaceAll(' ', '-');

  return (
    <div
      className='ProductCard'
    >
      { renderProductImages(
          getProductImages(sortedVariantsByOrder, false),
          clickedColorIndex,
          modifiedProductName,
          SKU,
          navigate
      ) }
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

function renderProductImages(variantsImages, clickedColorIndex, modifiedProductName, SKU, navigate) {
  if (!variantsImages) {
    return null;
  }

  const imageUrl = getMediaLink(variantsImages[clickedColorIndex]);

  return (
    <div
      className='ProductCard-Images'
      onClick={ ()=> navigate(`/${SKU}/${modifiedProductName}`) }
    >
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
  if (!product) {
    return null;
  }

  const {
    variants
  } = product;

  const modifiedProduct = variants.length === 1 ? {
    ...product,
    variants: {
      ...variants[0]
    }
  } : product;

  return (
    <div
      className='ProductCard-AddToCart'
    >
      <AddToCart product={ modifiedProduct } />
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
        { sizesByColor.length === 1 ? <div className='ProductCard-Size'>
          { sizesByColor[0] }
        </div> : <div className='ProductCard-MoreSizes'>{ `${sizesByColor.length} sizes` }</div> }
      </div>
    </div>
  );
};
