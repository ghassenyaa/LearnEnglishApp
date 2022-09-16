import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { TextField, Box, Typography, Button } from '@material-ui/core';
import Radio from '@mui/material/Radio';
import { savespeeches, savespeeches2, savespeeches3, saveSentences } from './../../../slices/words';
import { getblockId } from './../../../slices/select';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import './_discussionblock.scss';
const Input = (props) => {
  const {
    content,
    id,
    handleChangeInput,
    handleRemoveFields,
    handleAddFields,
    inputFields,
    inputField,
    speakerId,
    position,
    saveblockId,
    blockId,
    onClick,
  } = props;
  const [value, setValue] = React.useState(null);
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const { audio } = useSelector((state) => state.files);
  return (
    <>
      <label style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>النص</label>
      <div key={id}>
        <TextField
          name="content"
          margin="normal"
          variant="outlined"
          size="small"
          value={content}
          onChange={(event) => {
            return handleChangeInput(id, event);
          }}
        />
        {/* <IconButton
          disabled={inputFields?.length === 1}
          onClick={() => {
            handleRemoveFields(id);
            dispatch(deleteword({ personId: speakerId, position: position }));
          }}
        >
          <RemoveIcon />
        </IconButton> */}
        {(blockId === 'conversationBlock' ||
          blockId === 'tipblock' ||
          blockId === 'phraseBuilder') && (
          <IconButton
            onClick={() => {
              handleAddFields();
            }}
          >
            <AddIcon />
          </IconButton>
        )}
        <div className="btns-wrapper">
          {(blockId === 'conversationBlock' || blockId === 'secondDialogblock') && (
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">نوع النص</FormLabel>
              <RadioGroup
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={value}
                onChange={handleChange}
                row
              >
                <FormControlLabel value={true} control={<Radio />} label="مخفي" />
                <FormControlLabel value={false} control={<Radio />} label="غير مخفي" />
              </RadioGroup>
            </FormControl>
          )}
          <Button
            style={{
              backgroundColor: '#779F65',
              color: '#FFFFFF',
              borderRadius: '30px',
              width: '150px',
            }}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            onClick={() => {
              if (blockId === 'conversationBlock') {
                dispatch(
                  savespeeches({
                    personId: speakerId,
                    position: position + 1,
                    words: { wordposition: id + 1, content: content, isHidden: value },
                    audioUrl: audio,
                  })
                );
              } else if (blockId === 'secondDialogblock') {
                dispatch(
                  savespeeches2({
                    personId: speakerId,
                    position: position + 1,
                    content: content,
                    isHidden: value,
                  })
                );
              } else if (blockId === 'dialogBuilderBlock') {
                dispatch(
                  savespeeches3({
                    personId: speakerId,
                    position: position + 1,
                    content: content,
                  })
                );
              } else if (blockId === 'tipblock') {
                dispatch(onClick(content));
              } else if (blockId === 'phraseBuilder') {
                dispatch(getblockId({ blockId: 'phraseBuilder' }));
                dispatch(
                  saveSentences({
                    position: id + 1,
                    content: content,
                  })
                );
              }
            }}
          >
            اضف النص
          </Button>
        </div>
      </div>
    </>
  );
};

export default Input;
