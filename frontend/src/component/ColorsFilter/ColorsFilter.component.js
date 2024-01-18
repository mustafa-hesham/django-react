import './ColorsFilter.style.scss';

import { useSelector } from 'react-redux';
import { updateColorFilter } from 'Store/Category/CategoryReducer.reducer';

export default function ColorsFilter(props) {
  const stateColors = useSelector((state) => state.CategoryReducer.category.filters.colors);

  const {
    colors,
    dispatch
  } = props;

  return renderColorsFilter(colors, stateColors, dispatch);
};

function renderColorsFilter(colors, stateColors, dispatch) {
  if (!Array.isArray(colors) || !colors.length) {
    return null;
  }

  return (
    <div className='ColorsFilter'>
      <div className='ColorsFilter-Title'>Colors</div>
      <div className='ColorsFilter-Colors'>
        { colors.map((color) => renderColorFilter(stateColors, color, dispatch)) }
      </div>
      <div
        className='ColorsFilter-Reset'
        onClick={ () => dispatch(updateColorFilter([])) }
      >Reset
      </div>
    </div>
  );
}

function renderColorFilter(stateColors, color, dispatch) {
  if (!color || !stateColors) {
    return null;
  }

  const {
    hexValue
  } = color;

  const className = stateColors.some((stateColor) => stateColor.name === color.name) ?
  'ColorsFilter-Color ColorsFilter-Color_Selected' :
  'ColorsFilter-Color';

  return (
    <div
      key={ hexValue }
      className={ className }
      style={ {
        backgroundColor: `${hexValue}`
      } }
      onClick={ () => setStateColors(stateColors, color, dispatch) }
    />

  );
}

function setStateColors(stateColors, color, dispatch) {
  let filteredColors = [...stateColors];

  if (!filteredColors.find((stateColor) => stateColor.name === color.name) ) {
    filteredColors.push(color);
  } else {
    filteredColors = filteredColors.filter((stateColor) => stateColor.name !== color.name);
  }

  dispatch(updateColorFilter(filteredColors));
}
