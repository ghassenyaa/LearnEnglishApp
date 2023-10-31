import React, { useState } from 'react';
import './_adviceblock.scss';
import data from './../../../utilities/constants';
import { useDispatch } from 'react-redux';
import { saveTipBlockWords } from './../../../slices/words';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import BlockTitle from './../blockTitle/BlockTitle';
import TextInput from './../Input/Input';
import { getblockId } from './../../../slices/select';
import WordsInput from './../DiscussionBlock/input';
const AdviceBlock = (props) => {
  const dispatch = useDispatch();
  const { id } = props;
  const [inputFields, setInputFields] = useState([{ position: 0, content: '' }]);
  const handleChangeInput = (position, event) => {
    const newInputFields = inputFields.map((i) => {
      if (position === i.position) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });
    setInputFields(newInputFields);
  };
  const handleAddFields = () => {
    setInputFields([...inputFields, { position: inputFields.length, content: '' }]);
  };
  return (
    <>
      <fieldset style={{ width: '100%', padding: '10px', border: '2px solid #87B5FF' }}>
        <legend style={{ color: '#489BFF', fontWeight: 'bold', width: 'fit-content' }}>
          {' '}
          <BlockTitle
            title="النصيحة"
            icon={<HelpOutlineOutlinedIcon style={{ color: '#2E6FF1' }} />}
          />
        </legend>
        <div className="advice-block-content">
          <div className="input-advices-wrapper">
            {data.inputdata.map((item, index) => {
              return (
                <TextInput
                  label={item.label}
                  key={index}
                  placeholder={item.placeholder}
                  saveblockId={getblockId}
                  blockId={id}
                />
              );
            })}
            <div style={{ width: '100%' }}>
              {inputFields.map((inputField, index) => (
                <WordsInput
                  key={index}
                  id={index}
                  blockId="tipblock"
                  inputField={inputField}
                  content={inputField.content}
                  onClick={saveTipBlockWords}
                  handleChangeInput={handleChangeInput}
                  handleAddFields={handleAddFields}
                  inputFields={inputFields}
                />
              ))}
            </div>
          </div>
        </div>
      </fieldset>
    </>
  );
};

export default AdviceBlock;
