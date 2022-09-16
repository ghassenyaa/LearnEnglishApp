import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AddUser } from '../Modals';
import { closeModals } from '../../slices/modalsaddUser';
import UpdateModal from '../Modals/UpdateModal';
import { postUsers } from '../../slices/users';
const ModalsProviderUser = (putstatus) => {
  const { modals } = useSelector((state) => state.modaluser);
  const dispatch = useDispatch();
  const modalState = (id, key) => {
    const res = modals.find((modal) => modal.id === id);
    return res[key];
  };
  const handleClose = (id) => {
    dispatch(closeModals(id));
  };
  const usersdata = {
    id: 'user',
    title: 'اضف مستخدم جديدة',
    label: ' المستخدم',
    addcomponent: postUsers,
  };

  return (
    <>
      <AddUser
        id="add-user"
        open={modalState('add-user', 'open')}
        data={usersdata}
        handleClose={handleClose}
      />
      <UpdateModal
        id="update-Modal"
        open={modalState('update-Modal', 'open')}
        data={modalState('update-Modal', 'data')}
        //  handleClose={handleClose}
      />
    </>
  );
};

export default ModalsProviderUser;
