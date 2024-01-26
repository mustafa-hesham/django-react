import 'react-datepicker/dist/react-datepicker.css';
import './FormDatePicker.style.scss';

import DatePicker from 'react-datepicker';

export default function FormDatePicker(props) {
  const {
    startDate,
    setStartDate
  } = props;

  return (
    <div className='FormDatePicker'>
      <DatePicker
        selected={ startDate }
        onChange={ (date) => setStartDate(date) }
        className='FormDatePicker-DatePicker'
        name='DatePicker'
        dateFormat='yyyy-MM-dd'
      />
    </div>
  );
};
