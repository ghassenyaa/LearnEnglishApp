import React, { useState } from 'react';
import Input from './input';
import { makeStyles } from '@material-ui/core/styles';
import './_discussionblock.scss';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));
const Textaudio = (props) => {
  const { speaker, position, id, onClick } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const [count, setCount] = useState(0);
  const [inputFields, setInputFields] = useState([{ position: 0, content: '' }]);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
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
    setCount(count + 1);
  };
  const handleRemoveFields = (id) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.position === id),
      1
    );
    setInputFields(values);
  };
  return (
    <form className={classes.root} noValidate onSubmit={handleSubmit}>
      {inputFields.map((inputField, index) => (
        <Input
          key={inputField.position}
          id={index}
          speakerId={speaker?.id}
          inputField={inputField}
          content={inputField.content}
          blockId={id}
          handleChangeInput={handleChangeInput}
          position={position}
          handleAddFields={handleAddFields}
          handleRemoveFields={handleRemoveFields}
          inputFields={inputFields}
          onClick={onClick}
        />
      ))}
    </form>
  );
};

export default Textaudio;
