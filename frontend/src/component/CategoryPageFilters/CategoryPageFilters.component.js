import './CategoryPageFilters.style.scss';

import RangeFilter from 'Component/RangeFilter';

export default function CategoryPageFilters() {
  return (
    <div className='CategoryPageFilters'>
      <h1>Filters</h1>
      <RangeFilter filterName="Price" minValue={ 0 } maxValue={ 9999 }/>
    </div>
  );
};
