import 'react-datepicker/dist/react-datepicker.css';
import ReactDatePicker from 'react-datepicker';
import { Controller } from 'react-hook-form';
import scenePostNew from '../../css/model/comic/scenePostNew.module.css';

const DatePicker = ({ name, control }) => {
  return (
    <>
      <div>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value } }) => (
            <ReactDatePicker
              locale='ja'
              calendarStartDay={1}
              dateFormat="yyyy年MM月dd日"
              onChange={onChange}
              selected={value}
              placeholderText="日付を入力してください"
              withPortal
              className={scenePostNew["form-input"]}
            />
          )}
        />
      </div>
    </>
  );
};

export default DatePicker;
