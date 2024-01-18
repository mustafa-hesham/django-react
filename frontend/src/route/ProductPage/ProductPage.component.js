/* eslint-disable no-unused-vars */
import './ProductPage.style.scss';

import AddToCart from 'Component/AddToCart';
import Header from 'Component/Header';
import { getProductBySKU } from 'Query/Product.query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getMediaLink,
  getProductColors,
  getProductImages,
  getProductVariantSizesByColor,
  getUniqueProductImages
} from 'Util/Product';

export default function ProductPage(props) {
  const {
    SKU
  } = useParams();

  const [product, setProduct] = useState({});

  useEffect(() => {
    getProductBySKU(SKU).then((data) => setProduct(data.productBySku));
  }, []);

  if (!product) {
    return null;
  }

  const {
    variants
  } = product;
  const [clickedColorIndex, setClickedColorIndex] = useState(0);

  const productColors = getProductColors(variants);
  const selectedColor = productColors? productColors.find((color) => color[1] === clickedColorIndex) : {};
  const sizesByColor = getProductVariantSizesByColor(variants, selectedColor);
  const [selectedSize, setSelectedSize] = useState('');

  if (sizesByColor && sizesByColor.length && !sizesByColor.some((size) => size === selectedSize)) {
    setSelectedSize(sizesByColor[0]);
  }

  const selectedVariant = variants ? variants.find(
      (variant) =>
        variant.color.name === selectedColor[0].name &&
    variant.size.name === selectedSize
  ) : 0;

  return (
    <div className='ProductPage'>
      { <Header /> }
      { renderProduct(
          product,
          productColors,
          selectedColor,
          sizesByColor,
          clickedColorIndex,
          setClickedColorIndex,
          setSelectedSize,
          selectedVariant
      ) }
    </div>
  );
};

function renderProduct(
    product,
    productColors,
    selectedColor,
    sizesByColor,
    clickedColorIndex,
    setClickedColorIndex,
    setSelectedSize,
    selectedVariant
) {
  const {
    name,
    price,
    variants
  } = product;

  const productImages = getProductImages(variants);
  const uniqueProductImages = getUniqueProductImages(variants);

  return (
    <div className='ProductPage-Product'>
      <div className='ProductPage-Images'>
        { renderProductImage(productImages, uniqueProductImages, clickedColorIndex, setClickedColorIndex) }
      </div>
      <div className='ProductPage-Info'>
        <div className='ProductPage-Name'>{ name }</div>
        <div className='ProductPage-Price'>{ `$${price}` }</div>
        { renderProductColorsAndSizes(
            productColors,
            selectedColor,
            sizesByColor,
            setClickedColorIndex,
            setSelectedSize
        ) }
        { renderAddToCart(product, selectedVariant) }
      </div>
    </div>
  );
};

function renderProductImage(images, uniqueProductImages, clickedColorIndex, setClickedColorIndex) {
  if (!images) {
    return null;
  }
  const imageUrl = getMediaLink(images[clickedColorIndex]);

  return (
    <div className='ProductPage-VariantsImages'>
      <div className='ProductPage-ImagesThumbnails'>
        { uniqueProductImages.map((image) => renderImageThumbNail(image, setClickedColorIndex, clickedColorIndex)) }
      </div>

      <div
        className='ProductPage-Image'
        style={ {
          backgroundImage: `url('${imageUrl}')`
        } }
      />
    </div>
  );
};

function renderImageThumbNail(image, setClickedColorIndex, clickedColorIndex) {
  const className = clickedColorIndex === image[1] ?
  'ProductPage-ImageThumbnail_Clicked' :
  'ProductPage-ImageThumbnail';
  return (
    <div className={ className }>
      <img
        src={ getMediaLink(image[0]) }
        onClick={ () => setClickedColorIndex(image[1]) }
      />
    </div>
  );
};

function renderProductColor(color, setClickedColorIndex, selectedColor) {
  if (!color) {
    return null;
  }

  const {
    name,
    hexValue
  } = color[0];

  const className = color === selectedColor ? 'ProductPage-Color ProductPage-Color_Clicked' : 'ProductPage-Color';

  return (
    <div
      key={ hexValue }
      className={ className }
      style={ {
        backgroundColor: `${hexValue}`
      } }
      onClick={ () => onClickProductColor(setClickedColorIndex, color[1]) }
    />
  );
};

function onClickProductColor(setClickedColorIndex, colorIndex) {
  setClickedColorIndex(colorIndex);
};

function renderProductColorsAndSizes(colors, selectedColor, sizesByColor, setClickedColorIndex, setSelectedSize) {
  if (!colors || !colors.length) {
    return null;
  }

  return (
    <>
      <div className='ProductPage-ColorName'>{ `Color: ${selectedColor[0].name}` }</div>
      <div className='ProductPage-VariantInfo'>
        <div className='ProductPage-Colors'>
          { colors.map((color) => renderProductColor(
              color,
              setClickedColorIndex,
              selectedColor
          )) }
        </div>
        { renderProductSizesDropDown(sizesByColor, setSelectedSize) }
      </div>
    </>
  );
};

function renderProductSizesDropDown(sizes, setSelectedSize) {
  if (!sizes || !sizes.length) {
    return null;
  }

  return (
    <div className='ProductPage-Sizes'>
      <select className='ProductPage-SelectSize' onChange={ (e) => setSelectedSize(e.target.value) }>
        { sizes.map(renderProductSize) }
      </select>
    </div>
  );
};

function renderProductSize(size) {
  if (!size) {
    return null;
  }

  return (
    <option key={ size } value={ size }>{ size }</option>
  );
}

function renderAddToCart(product, selectedVariant) {
  if (!product) {
    return null;
  }

  const modifiedProduct = {
    ...product,
    variants: {
      ...selectedVariant
    }
  };

  return (
    <div
      className='ProductPage-AddToCart'
    >
      <AddToCart product={ modifiedProduct } />
    </div>
  );
};
