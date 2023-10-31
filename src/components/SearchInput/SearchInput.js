import React from 'react';
import './_searchinput.scss';
import Search from './../../assets/icons/Vector.svg';
const SearchInput = (props) => {
  return (
    <div className={props.className ? `search-input ${props.className}` : 'search-input'}>
      <div className="input-icon-wrapper">
        <img src={Search} alt={'Search'} />
        <input type="text" placeholder="ابحث عن أي شيء ..." onChange={props.onChange} />
      </div>
    </div>
  );
};

export default SearchInput;
