import './CategoryPageFilters.style.scss';

import RangeFilter from 'Component/RangeFilter';
import { useDispatch, useSelector } from 'react-redux';
import { updatePriceFilter } from 'Store/Category/CategoryReducer.reducer';

export default function CategoryPageFilters() {
  const dispatch = useDispatch();
  const price = useSelector((state) => state.CategoryReducer?.category.filters.price);

  const {
    minPrice,
    maxPrice
  } = price;

  return (
    <div className='CategoryPageFilters'>
      <h1>Filters</h1>
      <RangeFilter
        filterName="Price"
        minValue={ minPrice }
        maxValue={ maxPrice }
        updateFunction={ updatePriceFilter }
        dispatch={ dispatch }
      />
    </div>
  );
};
