import React, { useEffect } from 'react';
import ListUsers from './List_User';
import Title from '../../components/Title/Title';
import { openModals } from '../../slices/modalsaddUser';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUsers, putUsers } from './../../slices/users';
import Search from './../../assets/icons/Vector.svg';
import './_users.scss';
const Index = () => {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  const [inputText, setInputText] = React.useState('');
  let inputHandler = (event) => {
    setInputText(event.target.value);
  };

  const { user, deleteStatus } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  const filteredData = user?.filter((el) => {
    if (inputText === '') {
      return el;
    } else {
      return el.fullName.toLowerCase().includes(inputText.toLowerCase());
    }
  });

  return (
    <div className="headers_users_btn_and_searchbar">
      <div className="header_users">
        <Title
          btnContent={'اضف مستخدم جديد'}
          onClick={() => dispatch(openModals('add-user'))}
          showbtn={false}
        />
        <div className="input_search_users">
          <div className="search-input_user">
            <div className="input-icon-wrapper">
              <img src={Search} alt={'Search'} />
              <input type="text" placeholder="ابحث عن المستعمل.." onChange={inputHandler} />
            </div>
          </div>
        </div>
      </div>

      <ListUsers data={filteredData} />
    </div>
  );
};

export default Index;
