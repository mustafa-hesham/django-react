import './RangeFilter.style.scss';

import { useState } from 'react';
import ReactSlider from 'react-slider';

import { MAX_VALUE } from './RangerFilter.config';

export default function RangeFilter(props) {
  const {
    filterName,
    filterValue,
    minValue,
    maxValue,
    updateFunction,
    dispatch
  } = props;

  const [sliderValue, setSliderValue] = useState([0, MAX_VALUE]);
  const [isSliderValueSet, setIsSliderValueSet] = useState(false);

  if (JSON.stringify(sliderValue) !== JSON.stringify(filterValue) && !isSliderValueSet) {
    const {
      minPrice,
      maxPrice
    } = filterValue;

    setSliderValue([minPrice, maxPrice]);
    setIsSliderValueSet(true);
  }

  return (
    <div className="RangeFilter">
      <div className="RangeFilter-Title">{ filterName }</div>
      <ReactSlider
        className="RangeFilter-Slider"
        thumbClassName="RangeFilter-Thumb"
        trackClassName="RangeFilter-Track"
        max={ MAX_VALUE }
        defaultValue={ [minValue, maxValue] }
        ariaLabel={ ['Lower thumb', 'Upper thumb'] }
        ariaValuetext={ (state) => `Thumb value ${state.valueNow}` }
        renderThumb={ (props) => <div className='RangeFilter-Thumb-Background'{ ...props } /> }
        pearling
        step={ 5 }
        value={ sliderValue }
        onChange={ (value) => onChange(value, dispatch, updateFunction, setSliderValue) }
      />
      { renderRange(sliderValue, minValue, maxValue) }
      { renderResetRange(filterName, minValue, maxValue, dispatch, updateFunction, setSliderValue) }
    </div>
  );
};

function renderRange(value, minValue, maxValue) {
  const content = value ? `${value[0]} to ${value[1]}` : `${minValue} to ${maxValue}`;

  return (
    <div className='RangeFilter-Range'>
      { content }
    </div>
  );
};

function renderResetRange(filterName, minValue, maxValue, dispatch, updateFunction, setSliderValue) {
  return (
    <div
      className='RangeFilter-Reset'
      onClick={ () => onChange([0, MAX_VALUE], dispatch, updateFunction, setSliderValue) }
    >
      { `Reset ${filterName.toLowerCase()}` }
    </div>
  );
};

function onChange(value, dispatch, updateFunction, setSliderValue) {
  setSliderValue(value);
  if (dispatch) {
    dispatch(updateFunction(value));
  } else {
    updateFunction(value);
  }
};
