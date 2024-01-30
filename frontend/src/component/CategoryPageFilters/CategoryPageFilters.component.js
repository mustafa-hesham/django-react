import './CategoryPageFilters.style.scss';

import FilterComponent from 'Component/FilterComponent';
import RangeFilter from 'Component/RangeFilter';
import { useDispatch, useSelector } from 'react-redux';
import { updateColorFilter, updatePriceFilter, updateSizesFilter } from 'Store/Category/CategoryReducer.reducer';

export default function CategoryPageFilters(props) {
  const {
    colors,
    sizes
  } = props;

  const dispatch = useDispatch();
  const filters = useSelector((state) => state.CategoryReducer?.category.filters);
  const categoryAndFilterColors = colors;
  const categoryAndFilterSizes = sizes;

  filters.colors.forEach((filterColor) => {
    if (!categoryAndFilterColors.find((color) => color.name === filterColor.name)) {
      categoryAndFilterColors.push(filterColor);
    }
  });

  filters.sizes.forEach((filterSize) => {
    if (!categoryAndFilterSizes.find((size) => size === filterSize)) {
      categoryAndFilterSizes.push(filterSize);
    }
  });

  const {
    minPrice,
    maxPrice
  } = filters.price;

  return (
    <div className='CategoryPageFilters'>
      <div className='CategoryPageFilters-Title'>Filters</div>
      <div className='CategoryPageFilters-Price'>
        <RangeFilter
          filterName="Price"
          filterValue={ filters.price }
          minValue={ minPrice }
          maxValue={ maxPrice }
          updateFunction={ updatePriceFilter }
          dispatch={ dispatch }
        />
      </div>
      <FilterComponent
        filterValues = { categoryAndFilterColors }
        dispatch = { dispatch }
        stateValues = { filters.colors }
        title = 'Colors'
        isValueName = { true }
        updateValueFilter = { updateColorFilter }
      />
      <FilterComponent
        filterValues = { categoryAndFilterSizes }
        dispatch = { dispatch }
        stateValues = { filters.sizes }
        title = 'Sizes'
        isValueName = { false }
        updateValueFilter = { updateSizesFilter }
      />
    </div>
  );
};
