import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from './../Header/index';
import Sidebar from '../Sidebar';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginRight: '187px',
  },
}));

const DashboardLayout = ({ children }) => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <>
      <Header />
      <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      {/* <div className={`${classes.toolbar} ta-toolbar`} /> */}
      <main className={classes.content}>{children}</main>
    </>
  );
};

export default DashboardLayout;
