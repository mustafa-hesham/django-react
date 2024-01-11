import './RangeFilter.style.scss';

import { useState } from 'react';
import ReactSlider from 'react-slider';

export default function RangeFilter(props) {
  const {
    filterName,
    minValue,
    maxValue
  } = props;

  const [sliderValue, setSliderValue] = useState();

  return (
    <div className="RangeFilter">
      <div className="RangeFilter-Title">{ filterName }</div>
      <ReactSlider
        className="RangeFilter-Slider"
        thumbClassName="RangeFilter-Thumb"
        trackClassName="RangeFilter-Track"
        max={ maxValue }
        defaultValue={ [minValue, maxValue] }
        ariaLabel={ ['Lower thumb', 'Upper thumb'] }
        ariaValuetext={ (state) => `Thumb value ${state.valueNow}` }
        renderThumb={ (props, state) => <div className='RangeFilter-Thumb-Background'{ ...props } /> }
        pearling
        step={ 5 }
        onChange={ (value) =>setSliderValue(value) }
      />
      { renderRange(sliderValue, minValue, maxValue) }
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
