import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from '../Sidebar';
import Header from '../Header/index';
import constants from '../../utilities/constants';
import { useSelector } from 'react-redux';
const drawerWidth = constants.DRAWER_WIDTH;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    height: '100vh',
    overflow: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: drawerWidth,
    },
  },
  content1: {
    flexGrow: 1,
    padding: theme.spacing(3),
    height: '100vh',
    overflow: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: 90,
    },
  },
}));
const DashboardLayout = ({ children }) => {
  const menuCollaps = useSelector((state) => state.courses.menuCollapse);
  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <Header handleDrawerToggle={handleDrawerToggle} />
      <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      {!menuCollaps ? (
        <main className={classes.content}>{children}</main>
      ) : (
        <main className={classes.content1}>{children}</main>
      )}
    </>
  );
};
export default DashboardLayout;
