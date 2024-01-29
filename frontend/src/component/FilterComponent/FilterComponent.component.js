import './FilterComponent.styles.scss';

import { capitalize } from 'Util/General';

import { RESET } from './FilterComponent.config';

export default function FilterComponent(props) {
  const {
    filterValues,
    dispatch,
    stateValues,
    title,
    isValueName,
    updateValueFilter
  } = props;

  return renderValuesFilter(filterValues, stateValues, updateValueFilter, dispatch, title, isValueName);
};

function renderValuesFilter(values, stateValues, updateValueFilter, dispatch, title, isValueName) {
  if (!Array.isArray(values) || !values.length) {
    return null;
  }

  return (
    <div className='FilterComponent'>
      <div className='FilterComponent-Title'>{ `Filter by ${title}` }</div>
      <div className='FilterComponent-Values'>
        { values.map((value) => renderValueFilter(stateValues, value, updateValueFilter, dispatch, isValueName)) }
      </div>
      <div
        className='FilterComponent-Reset'
        onClick={ () => dispatch(updateValueFilter([])) }
      >
        { `${RESET} ${title.toLowerCase()}` }
      </div>
    </div>
  );
};

function renderValueFilter(stateValues, value, updateValueFilter, dispatch, isValueName) {
  if (!value || !stateValues) {
    return null;
  }

  const className = stateValues.some((stateValue) => stateValue === value) ?
        'FilterComponent-Value FilterComponent-Value_Selected' :
        'FilterComponent-Value';

  if (isValueName) {
    const {
      hexValue,
      name
    } = value;

    const className = stateValues.some((stateValue) => stateValue.name === value.name) ?
        'FilterComponent-ColorValue FilterComponent-ColorValue_Selected' :
        'FilterComponent-ColorValue';

    return (
      <div className={ className } key={ hexValue }>
        <div
          className='FilterComponent-Color'
          data-tooltip-id="my-tooltip"
          data-tooltip-content={ capitalize(name) }
          data-tooltip-place="top"
          data-tooltip-variant="light"
          style={ {
            backgroundColor: `${hexValue}`
          } }
          onClick={ () => setStateValuesByName(stateValues, value, updateValueFilter, dispatch) }
        />
      </div>
    );
  }

  return (
    <div
      key={ value }
      className={ className }
      onClick={ () => setStateValues(stateValues, value, updateValueFilter, dispatch) }
    >
      { value }
    </div>
  );
};

function setStateValuesByName(stateValues, value, updateValueFilter, dispatch) {
  let filteredValues = [...stateValues];

  if (!filteredValues.find((stateValue) => stateValue.name === value.name) ) {
    filteredValues.push(value);
  } else {
    filteredValues = filteredValues.filter((stateValue) => stateValue.name !== value.name);
  }

  dispatch(updateValueFilter(filteredValues));
};

function setStateValues(stateValues, value, updateValueFilter, dispatch) {
  let filteredValues = [...stateValues];

  if (!filteredValues.find((stateValue) => stateValue === value) ) {
    filteredValues.push(value);
  } else {
    filteredValues = filteredValues.filter((stateValue) => stateValue !== value);
  }

  dispatch(updateValueFilter(filteredValues));
}
