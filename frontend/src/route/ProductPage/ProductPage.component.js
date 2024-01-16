/* eslint-disable no-magic-numbers */
/* eslint-disable no-unused-vars */
import './ProductPage.style.scss';

import Header from 'Component/Header';
import { getProductBySKU } from 'Query/Product.query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getMediaLink,
  getProductColors,
  getProductImages,
  getProductVariantSizesByColor,
  sortVariants
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
    return;
  }

  const [clickedColorIndex, setClickedColorIndex] = useState(0);

  return (
    <div className='ProductPage'>
      { <Header /> }
      { renderProduct(product, clickedColorIndex) }
    </div>
  );
};

function renderProduct(product, clickedColorIndex) {
  const {
    name,
    price,
    weight,
    variants
  } = product;

  const sortedVariantsByOrder = sortVariants(variants);
  const productColors = getProductColors(sortedVariantsByOrder, false);
  const productImages = getProductImages(sortedVariantsByOrder, false);
  const selectedColor = productColors? productColors.find((color) => color[1] === clickedColorIndex) : {};
  const sizesByColor = getProductVariantSizesByColor(sortedVariantsByOrder, selectedColor, false);

  return (
    <div className='ProductPage-Product'>
      <div className='ProductPage-Images'>
        { renderProductImage(productImages, clickedColorIndex) }
      </div>
      <div className='ProductPage-Info'>
        <div className='ProductPage-Name'>{ name }</div>
        <div className='ProductPage-Price'>{ price }</div>
        <div className='ProductPage-Weight'>{ weight }</div>
      </div>
    </div>
  );
};

function renderProductImage(images, clickedColorIndex) {
  if (!images) {
    return null;
  }

  return (
    <div className='ProductPage-Image'>
      <img className='ProductPage-Img' src={ getMediaLink(images[clickedColorIndex]) }/>
    </div>
  );
};
