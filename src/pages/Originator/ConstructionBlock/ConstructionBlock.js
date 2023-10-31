import React from 'react';
import './_constructionblock.scss';
import filter from './../../../assets/img/filter.png';
import Column from '../Column';
import SearchInput from '../../../components/SearchInput/SearchInput';
const ConstructionBlock = (props) => {
  const { columns, onSortEnd, area, isdragging, label } = props;
  const [inputText, setInputText] = React.useState('');
  let inputHandler = (event) => {
    setInputText(event.target.value);
  };
  // const filteredData = columns.today.items.filter((el) => {
  //   if (inputText === '') {
  //     return el;
  //   } else {
  //     return el.name.toLowerCase().includes(inputText.toLowerCase());
  //   }
  // });
  return (
    <div className="item1">
      <div className="item1-title-wrapper">
        <div className="first-block-title">بناء</div>
        <div className="searchinput-filter-wrapper">
          <SearchInput className="search" onChange={inputHandler} />
          <div className="img-container">
            <img src={filter} alt={'filter'} />
          </div>
        </div>
      </div>
      <div className="cards-wrapper">
        <Column
          column={columns}
          columnId={'today'}
          height={'100%'}
          onSortEnd={onSortEnd}
          showbtn={false}
          showMoreDetailsIcon={false}
          id={'question'}
          className="exercise-title"
          imgclassNameid={'img'}
          area={area}
          isdragging={isdragging}
          label={label}
        />
      </div>
    </div>
  );
};
export default ConstructionBlock;
