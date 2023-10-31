import React from 'react';
import './_phraseBuilder.scss';
import TextInputs from './../DiscussionBlock/textInputs';
import ConstructionIcon from '@mui/icons-material/Construction';
const phraseBuilder = () => {
  return (
    <fieldset style={{ width: '100%', padding: '10px', border: '2px solid #87B5FF' }}>
      <legend style={{ color: '#489BFF', fontWeight: 'bold', width: 'fit-content' }}>
        <ConstructionIcon />
        انشاء جملة
      </legend>
      <TextInputs id="phraseBuilder" />
    </fieldset>
  );
};

export default phraseBuilder;
