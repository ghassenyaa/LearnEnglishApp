import React from 'react';
import './_rankingblock.scss';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import HalfRectangle from './../HalfRectangle/HalfRectangle';
import Word from './../Words/Word';
import BlockTitle from './../blockTitle/BlockTitle';
const RankingBlock = (props) => {
  const { data } = props;
  return (
    <>
      <BlockTitle
        title="الترتيب"
        icon={<FormatListBulletedOutlinedIcon style={{ color: '#2E6FF1' }} />}
      />
      <div className="ranking-block-content">
        <HalfRectangle height={'190px'} />
        <div className="boxes-wrapper">
          {data.words.map((item, index) => (
            <Word id={item.id} word={item.word} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default RankingBlock;
