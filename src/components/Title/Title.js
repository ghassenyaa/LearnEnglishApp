import React, { useState, useEffect } from 'react';
import './_title.scss';
import './../Button/_taButton.scss';
import Button from '@material-ui/core/Button';
import Pen from './../../assets/icons/Pen.svg';
import { useDispatch, useSelector } from 'react-redux';
import { postquestionBlocks, fetchQuestions } from './../../slices/questionblocks';
import { fetchExercises } from './../../slices/exercises';
import Snackbar from './../Snackbar/Snackbar';
import { getquestionTitle, getExerciseId, BlocksWrapper } from './../../slices/structureBuilder';
import Select from 'react-select';
import { emptySeletedPersonsArray } from './../../slices/select';
import { closeSnackBar } from './../../slices/snackbar';
const Title = (props) => {
  const dispatch = useDispatch();
  const {
    className,
    title,
    onClick,
    btnContent,
    showimg,
    onClickbtn,
    showbtn,
    savebtncontent,
    showinput,
    saveData,
    onClickWarning,
  } = props;
  const [inputvalue, setInputValue] = useState('');
  const { questionBlockswrapper } = useSelector((state) => state.structureBuilder);

  const customStyles = {
    control: (base) => ({
      ...base,
      height: 50,
      width: 200,
    }),
  };
  const { builder } = useSelector((state) => state.structureBuilder);
  const opensnack = useSelector((state) => state.snackbar.open);
  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchExercises());
  }, [dispatch]);
  const handleChange = (event) => {
    setInputValue(event.target.value);
    dispatch(getquestionTitle({ title: event.target.value }));
  };
  const [selectedValue, setSelectedValue] = useState(3);
  const handleSelectChange = (e) => {
    setSelectedValue(e.value);
    dispatch(getExerciseId({ exerciseId: e.value }));
  };
  const { exercices } = useSelector((state) => state.exercises);
  const exercicesOptions = exercices?.map((item) => {
    return {
      value: item._id,
      label: item.title,
    };
  });
  return (
    <div className={className ? `page-header ${className}` : 'page-header'}>
      {!showinput && (
        <div className="page-title">
          {title}
          {showimg && <img src={Pen} alt={'Pen'} />}
        </div>
      )}
      {showinput && (
        <div className="label-input-savebtn-wrapper">
          <Snackbar open={opensnack} handleClose={closeSnackBar()} />
          <div className="label-input-wrapper">
            <label>اضف السؤال :</label>
            <div className="title-input-button-wrapper">
              <input id="title-input" name="message" onChange={handleChange} value={inputvalue} />
              <div className="select-button-wrapper">
                <Select
                  maxMenuHeight={500}
                  options={exercicesOptions}
                  value={exercicesOptions.find((obj) => obj._id === selectedValue)}
                  placeholder={'اختر  تمرين'}
                  styles={customStyles}
                  onChange={handleSelectChange}
                />
                <Button
                  className="ta-btn primary btn-rounded btn-lg btn-content"
                  onClick={() => {
                    dispatch(saveData?.func(saveData?.data));
                  }}
                >
                  اضف السؤال
                </Button>
              </div>
            </div>
          </div>
          <Button
            className="ta-btn primary btn-rounded btn-lg btn-content"
            onClick={() => {
              dispatch(
                postquestionBlocks({ builder: builder, questionBlocks: questionBlockswrapper })
              );
            }}
          >
            <span> حفظ المعلومات</span>
          </Button>
        </div>
      )}
      <div className="btn-wrapper">
        {showbtn && (
          <Button
            className="ta-btn btn-rounded btn-lg btn_exercice_update"
            variant="outlined"
            onClick={onClickbtn}
          >
            {savebtncontent}
          </Button>
        )}
        {!showinput && (
          <Button
            onClick={() => {
              dispatch(onClick);
              return onClickWarning;
            }}
            className="ta-btn primary btn-rounded btn-lg btn-content"
          >
            <span> {btnContent}</span>
          </Button>
        )}
      </div>
    </div>
  );
};
export default Title;
