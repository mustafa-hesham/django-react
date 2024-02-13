import 'react-datepicker/dist/react-datepicker.css';
import './FormDatePicker.style.scss';

import DatePicker from 'react-datepicker';
import { noopFn } from 'Util/General';

export default function FormDatePicker(props) {
  const {
    currentDate,
    setCurrentDate,
    validationFunction = noopFn,
    disabled = false
  } = props;

  return (
    <div className='FormDatePicker'>
      <DatePicker
        selected={ currentDate }
        onChange={ (date) => setCurrentDate(date) }
        onBlur={ () => validationFunction() }
        className='FormDatePicker-DatePicker'
        name='DatePicker'
        dateFormat='yyyy-MM-dd'
        disabled={ disabled }
      />
    </div>
  );
};
