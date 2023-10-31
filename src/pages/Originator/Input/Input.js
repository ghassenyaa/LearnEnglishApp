import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import {
  getText,
  savecorreactword,
  getImage,
  getAudio,
  saveFile,
  getText1,
  saveAnswer,
  getText2,
} from './../../../slices/files';
import './_input.scss';
import { getblockId } from '../../../slices/select';
import { saveQuestion, saveTitle, saveDescription, saveText } from '../../../slices/files';
const Input = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const [isFilePicked, setIsFilePicked] = useState(false);
  const [inputvalue, setInputValue] = useState('');
  const { trueAnswer, question } = useSelector((state) => state.files);
  const { img, label, placeholder, withoutimg, speakerId, id, saveblockId, blockId } = props;
  const dispatch = useDispatch();

  const changeHandler = (event) => {
    setSelectedFile(URL.createObjectURL(event.target.files[0]));
    dispatch(
      saveFile({
        file: URL.createObjectURL(event.target.files[0]),
        filetype: event.target.files[0],
        type: label,
        speakerId: speakerId,
      })
    );
    if (label === 'صورة' && id !== 'discussionaudio') {
      dispatch(getImage({ img: URL.createObjectURL(event.target.files[0]) }));
      dispatch(getblockId({ blockId: 'imageBlock' }));
    }
    if (label === 'صوت' && id !== 'discussionaudio') {
      dispatch(getAudio({ audio: URL.createObjectURL(event.target.files[0]) }));
      dispatch(getblockId({ blockId: 'audioBlock' }));
    }

    setIsFilePicked(true);
  };
  let value = '';
  const handleChange = (event) => {
    setInputValue(event.target.value);
    value = event.target.value;
  };
  let inputRef;
  return (
    <div id="img-input-wrapper">
      <div className="img-inputlabe-wrapper">
        {withoutimg && <img src={img} alt={'img'} />}
        <span>{label}</span>
      </div>
      <div>
        {['صورة', 'فيديوا', 'صوت'].includes(label) && selectedFile === null ? (
          <div className="input-button-wrapper" style={{ border: '1px solid #dee4ed' }}>
            <div> {placeholder}</div>
            <input
              type="file"
              name="file"
              accept={
                label === 'صورة'
                  ? 'image/*'
                  : label === 'فيديوا'
                  ? 'video/mp4,video/x-m4v,video/*'
                  : '.mp3,audio/*'
              }
              onChange={changeHandler}
              ref={(refParam) => (inputRef = refParam)}
              hidden
            />
            <button
              onClick={() => {
                inputRef.click();
              }}
            >
              اختر ملف
            </button>
          </div>
        ) : ['صورة', 'فيديوا', 'صوت'].includes(label) && selectedFile != null ? (
          <div className="input-button-wrapper" style={{ border: '2px solid #779F65' }}>
            <div> {placeholder}</div>
            <input
              type="file"
              name="file"
              accept={
                label === 'صورة'
                  ? 'image/*'
                  : label === 'فيديوا'
                  ? 'video/mp4,video/x-m4v,video/*'
                  : label === 'صوت'
                  ? '.mp3,audio/*'
                  : ''
              }
              onChange={changeHandler}
              ref={(refParam) => (inputRef = refParam)}
              hidden
            />
            <button
              onClick={() => {
                inputRef.click();
              }}
            >
              اختر ملف
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '10px' }} className="input-button-wrapper">
            <input
              type="text"
              placeholder={placeholder}
              onChange={handleChange}
              value={inputvalue}
              style={{ border: '1px solid #dee4ed' }}
            />
            <button
              onClick={() => {
                if (label === 'السوال') {
                  dispatch(saveQuestion(inputvalue));
                }
                if (label === 'اجابة') {
                  dispatch(saveAnswer(inputvalue));
                }
                if (label === 'نص') {
                  dispatch(saveText(inputvalue));
                  dispatch(getblockId({ blockId: 'textBlock' }));
                }
                if (label === 'العنوان') {
                  dispatch(saveTitle(inputvalue));
                  dispatch(getblockId({ blockId: 'titleBlock' }));
                }
                if (label === 'وصف') {
                  dispatch(saveDescription(inputvalue));
                  dispatch(getblockId({ blockId: 'descriptionBlock' }));
                }
                if (label === 'عنوان الحوار') {
                  dispatch(getText({ text: inputvalue }));
                }
                if (label?.includes('اضف النص الاول')) {
                  dispatch(getText1({ text1: inputvalue }));
                  dispatch(saveblockId({ blockId: blockId }));
                }
                if (label?.includes('اضف النص الثاني')) {
                  dispatch(getText2({ text2: inputvalue }));
                }
              }}
            >
              {placeholder}
            </button>
          </div>
        )}
      </div>
      {/* {labell.find((elt) => elt.label === 'توصيل البطاقات')?.label && <button>تاكيد</button>} */}
    </div>
  );
};

export default Input;
