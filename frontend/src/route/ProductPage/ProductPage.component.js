import './ProductPage.style.scss';

import Header from 'Component/Header';
import { getProductBySKU } from 'Query/Product.query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ProductPage(props) {
  const {
    SKU
  } = useParams();

  const [product, setProduct] = useState({});

  useEffect(() => {
    getProductBySKU(SKU).then((data) => setProduct(data.productBySku));
  }, []);

  console.log(product);

  return (
    <div className='ProductPage'>
      { <Header /> }
    </div>
  );
};
