import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../slices/user';
const Role = ({ children }) => {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.user);
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUser());
    }
  }, [status]);

  const isAllowed = () => {
    if (user?.is_admin_teacher == null || user?.is_admin_teacher === false) {
      return false;
    }
    return true;
  };

  if (!isAllowed()) return null;

  return <>{children}</>;
};

export default Role;
