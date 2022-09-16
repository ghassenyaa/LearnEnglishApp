import React, { useState, useEffect, memo } from 'react';
import './MoreDetailsIcon.scss';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openSnackBar } from '../../slices/snackbar';
const MoreDetailsIcon = (props) => {
  const { onClick, link, langcourses, linkcontent, id, deleteitem, deletestatus } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickSnack = () => {
    dispatch(deleteitem(id));
  };
  const dispatch = useDispatch();
  const handleClickMoreVertIcon = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <>
      <IconButton onClick={handleClickMoreVertIcon} style={{ float: 'left!important ' }}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>
          <div onClick={onClick}>تعديل</div>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to={{ pathname: link, state: langcourses }}>{linkcontent}</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <div onClick={handleClickSnack}>حذف</div>
        </MenuItem>
      </Menu>
    </>
  );
};
export default memo(MoreDetailsIcon);
