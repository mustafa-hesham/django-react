import './ProductCard.style.scss';

import AddToCart from 'Component/AddToCart';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getMediaLink,
  getProductColors,
  getProductImages,
  getProductVariantSizesByColor
} from 'Util/Product';

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

  const stateColors = useSelector((state) => state.CategoryReducer.category.filters.colors);
  const [clickedColorIndex, setClickedColorIndex] = useState(0);
  const productColors = getProductColors(variants);
  const selectedColor = productColors.find((color) => color[1] === clickedColorIndex);

  const [stateSelectedColorSelected, setStateSelectedColorSelected] = useState(false);

  const stateSelectedColor = productColors.find(
      (color) => stateColors.some((stateColor) => stateColor.name === color[0].name)
  );

  useEffect(() => {
    if ((!stateSelectedColor && stateSelectedColorSelected)) {
      setStateSelectedColorSelected(false);
    }

    if (stateSelectedColor && !stateSelectedColorSelected) {
      setClickedColorIndex(stateSelectedColor[1]);
      setStateSelectedColorSelected(true);
    }
  }, [stateSelectedColor, stateColors]);

  const sizesByColor = getProductVariantSizesByColor(variants, selectedColor);
  const navigate = useNavigate();
  const modifiedProductName = name.replaceAll(' ', '-');

  return (
    <div
      className='ProductCard'
    >
      { renderProductImages(
          getProductImages(variants),
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

  const {
    image
  } = variantsImages[clickedColorIndex] ? variantsImages[clickedColorIndex][0] : variantsImages[0][0];

  const imageUrl = getMediaLink(image);

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
  if (!Array.isArray(colors)) {
    return null;
  }

  return (
    <div className='ProductCard-VariantInfo'>
      <div className='ProductCard-Colors'>
        { colors.map((color, index) => renderProductColor(color, setClickedColorIndex, index)) }
      </div>
      { renderProductSizes(sizesByColor) }
    </div>
  );
};

function renderProductSizes(sizesByColor) {
  if (!Array.isArray(sizesByColor)) {
    return null;
  }

  return (
    <div className='ProductCard-Sizes'>
      { sizesByColor.length === 1 ? <div className='ProductCard-Size'>
        { sizesByColor[0].size.name }
      </div> : <div className='ProductCard-MoreSizes'>{ `${sizesByColor.length} sizes` }</div> }
    </div>
  );
}
