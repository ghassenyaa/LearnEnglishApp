import React from 'react';
import './_carddelivery.scss';
import BlockTitle from '../blockTitle/BlockTitle';
import ElementsBlock from '../ElementsBlock/ElementsBlock';
import CopyAllIcon from '@mui/icons-material/CopyAll';
const CardDelivery = (props) => {
  const { data, id } = props;
  return (
    <>
      <BlockTitle title="توصيل البطاقات" icon={<CopyAllIcon style={{ color: '#2E6FF1' }} />} />

      <ElementsBlock blockId={id} />
    </>
  );
};

export default CardDelivery;
