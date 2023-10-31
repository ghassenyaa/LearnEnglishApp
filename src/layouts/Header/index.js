import React, { useState } from 'react';
import MenuDropdown from './../../components/MenuDropdown/index';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import imAvatar from '../../assets/img/avatar.png';
import { makeStyles } from '@material-ui/core/styles';
import SearchInput from '../../components/SearchInput/SearchInput';
import './_search.scss';
const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
}));
const Index = ({ handleDrawerToggle }) => {
  const classes = useStyles();
  const [name] = useState('');
  const [division] = useState('');
  const [avatar] = useState(imAvatar);
  return (
    <div className="header-wrapper">
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        className={classes.menuButton}
      >
        <MenuIcon />
      </IconButton>
      <SearchInput />
      <MenuDropdown name={name} division={division} avatar={avatar} />
    </div>
  );
};
export default Index;
