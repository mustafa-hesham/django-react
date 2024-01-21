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
  getProductVariantSizesByColor
} from 'Util/Product';

export default function ProductPage() {
  const {
    SKU
  } = useParams();

  const [product, setProduct] = useState({});

  useEffect(() => {
    getProductBySKU(SKU).then((data) => setProduct(data.productBySku));
  }, []);

  const [clickedColorIndex, setClickedColorIndex] = useState(0);
  const [clickedImageIndex, setClickedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');

  if (!product) {
    return null;
  }

  const {
    variants
  } = product;

  const productColors = getProductColors(variants);
  const selectedColor = productColors? productColors.find((color) => color[1] === clickedColorIndex) : {};
  const sizesByColor = getProductVariantSizesByColor(variants, selectedColor);

  if (sizesByColor && sizesByColor.length && !sizesByColor.some((size) => size.size.name === selectedSize)) {
    setSelectedSize(sizesByColor[0].size.name);
  }

  const selectedVariant = variants ? variants.find(
      (variant) =>
        variant.color.name === selectedColor[0].name
  ) : 0;

  const selectedSizeObject = sizesByColor ? sizesByColor.find((size) => size.size.name === selectedSize) : {};

  const modifiedSelectedVariant = {
    ...selectedVariant,
    productsizecollectionSet: {
      ...selectedSizeObject
    }
  };

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
          modifiedSelectedVariant,
          clickedImageIndex,
          setClickedImageIndex
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
    selectedVariant,
    clickedImageIndex,
    setClickedImageIndex
) {
  const {
    name,
    price,
    variants
  } = product;

  const productImages = getProductImages(variants);

  return (
    <div className='ProductPage-Product'>
      <div className='ProductPage-Images'>
        { renderProductImage(
            productImages,
            clickedColorIndex,
            clickedImageIndex,
            setClickedImageIndex
        ) }
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

function renderProductImage(
    images,
    clickedColorIndex,
    clickedImageIndex,
    setClickedImageIndex
) {
  if (!images || !images.length) {
    return null;
  }

  if (clickedImageIndex + 1 > images[clickedColorIndex].length) {
    setClickedImageIndex(0);
    return;
  }

  const {
    image = { image: '' }
  } = images[clickedColorIndex][clickedImageIndex];

  const imageUrl = getMediaLink(image);

  return (
    <div className='ProductPage-VariantsImages'>
      <div className='ProductPage-ImagesThumbnails'>
        { images[clickedColorIndex].map(
            (image, index) =>
              renderImageThumbNail(image, index, setClickedImageIndex, clickedImageIndex, clickedColorIndex)
        ) }
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

function renderImageThumbNail(image, index, setClickedImageIndex, clickedImageIndex, clickedColorIndex) {
  const {
    image: currentImage
  } = image;

  const className = clickedImageIndex === index ?
  'ProductPage-ImageThumbnail_Clicked' :
  'ProductPage-ImageThumbnail';
  return (
    <div className={ className } key={ index }>
      <img
        src={ getMediaLink(currentImage) }
        onClick={ () => setClickedImageIndex(index) }
      />
    </div>
  );
};

function renderProductColor(color, setClickedColorIndex, selectedColor) {
  if (!color) {
    return null;
  }

  const {
    hexValue,
    name
  } = color[0];

  const className = color === selectedColor ? 'ProductPage-Color ProductPage-Color_Clicked' : 'ProductPage-Color';

  return (
    <div
      key={ hexValue }
      title={ name }
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

  const {
    size: {
      name
    }
  } = size;

  return (
    <option key={ name } value={ name }>{ name }</option>
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
