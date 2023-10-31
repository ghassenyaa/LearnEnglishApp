import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { changeState } from './../../slices/courses';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import './_sidebar.scss';
import Container from './Components/Container';
import constants from '../../utilities/constants';
import Logo from '../../components/Logo/index';
import Frame from './../../assets/icons/Frame.svg';
import hamburger from './../../assets/img/icons8-menu-48.png';
let drawerWidth = constants.DRAWER_WIDTH;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: 100,
      flexShrink: 0,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    right: 0,
    left: 'auto',
    background: 'white',
  },

  drawerPaper1: {
    width: 100,
    right: 0,
    left: 0,
    background: 'white',
  },
  FormatListBulletedIcon: {
    cursor: 'pointer',
    marginBottom: 20,
    marginRight: 180,
  },
  FormatListBulletedIcon1: {
    cursor: 'pointer',
    marginBottom: 20,
  },
}));
const Sidebar = ({ handleDrawerToggle, mobileOpen, window }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const menuCollaps = useSelector((state) => state.courses.menuCollapse);
  const drawer = (
    <div className="sidebar">
      <div className="header">
        {!menuCollaps && (
          <div
            className={classes.FormatListBulletedIcon}
            onClick={() => {
              dispatch(changeState());
            }}
          >
            <img
              src={hamburger}
              alt="Frame"
              className="hiddenFormatListBulletedIcon"
              style={{ width: '25px', height: '20px' }}
            />
          </div>
        )}
        {menuCollaps && (
          <div
            className={classes.FormatListBulletedIcon1}
            onClick={() => {
              dispatch(changeState());
            }}
          >
            <img
              src={hamburger}
              alt="Frame"
              className="hiddenFormatListBulletedIcon"
              style={{ width: '25px', height: '20px' }}
            />
          </div>
        )}
        {menuCollaps ? (
          <div className={classes.logo}>
            <Logo handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} />
          </div>
        ) : (
          <Logo handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} />
        )}
      </div>
      {!menuCollaps && (
        <div className="content">
          <Container handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} />
        </div>
      )}
      {menuCollaps && (
        <div className="contentafter">
          <Container handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} />
        </div>
      )}
    </div>
  );
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'right'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        {!menuCollaps && (
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        )}
        {menuCollaps && (
          <Drawer
            classes={{
              paper: classes.drawerPaper1,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        )}
      </Hidden>
    </nav>
  );
};

Sidebar.propTypes = {
  drawerWidth: PropTypes.number,
  classes: PropTypes.any,
  theme: PropTypes.any,
  drawer: PropTypes.any,
  container: PropTypes.any,
};

export default Sidebar;
