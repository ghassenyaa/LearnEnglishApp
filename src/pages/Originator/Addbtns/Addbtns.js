import React from 'react';
import './_addbtns.scss';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
const Addbtns = () => {
  return (
    <div className="btn-container">
      <div className="add-text">
        <BorderColorIcon />
        اضف نصك
      </div>
      <div className="add-answer">
        <ChatBubbleOutlineIcon />
        اضف مكان الاجابة
      </div>
    </div>
  );
};

export default Addbtns;
