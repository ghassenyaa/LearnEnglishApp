import { NavLink } from 'react-router-dom';
import React from 'react';
import Chip from '@material-ui/core/Chip';
import '../_sidebar.scss';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useSelector } from 'react-redux';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import constants from '../../../utilities/constants';
import User from './../../../assets/icons/User.svg';
import Collapse from '@mui/material/Collapse';
import { Fragment } from 'react';
const ContainerItems = ({ item, options, handleDrawerToggle, mobileOpen }) => {
  const list = constants.SIDEBAR_LIST;
  const listitem = list.find((el) => el.children);
  const nameitem = list.find((el) => el.name === 'المستخدمين');
  const menuCollaps = useSelector((state) => state.courses.menuCollapse);
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  function renderContent() {
    return (
      <React.Fragment>
        <div className="title">
          {!menuCollaps && (
            <img
              alt={item.name}
              src={item.icon}
              className={` '' ${
                item.name === 'اعدادات' || item.name === 'لوحة القيادة'
                  ? 'setting_item_sidebar'
                  : ''
              }`}
            />
          )}

          {!menuCollaps && <div className="name_item_sidebar">{item.name}</div>}
          {menuCollaps && (
            <>
              {' '}
              <img alt={item.name} src={item.icon} />
              <div className="name_item_sidebar_none">{item.name}</div>
            </>
          )}
        </div>
        {options && (
          <Chip
            color={options.badge ? 'secondary' : 'default'}
            size="small"
            label={options.label}
          />
        )}
      </React.Fragment>
    );
  }

  return (
    <>
      <li className="nav-link-sidebar">
        {item.type === 'route' && (
          <NavLink
            to={item.url}
            exact
            onClick={() => {
              if (mobileOpen === true) {
                handleDrawerToggle();
              }
            }}
          >
            {renderContent()}
          </NavLink>
        )}
        {item.type === 'submenu' && (
          <ul>
            <ListItemButton onClick={handleClick} className="ListItemButton">
              {!menuCollaps && (
                <>
                  <ListItemIcon className="picture_sidebar_user">
                    <img alt="User" src={User} />
                  </ListItemIcon>
                  <div className="user-sidebar">{nameitem?.name}</div>
                  {open ? (
                    <ExpandLess className="ExpandLess" />
                  ) : (
                    <ExpandMore className="ExpandMore" />
                  )}
                </>
              )}
              {menuCollaps && (
                <>
                  <ListItemIcon>
                    <img alt="User" src={User} className="picture_sidebar_user_after" />
                  </ListItemIcon>
                  <div className="user-sidebar_none">
                    <div className="user-sidebar">{nameitem?.name}</div>
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </div>
                </>
              )}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              {listitem.children.map((item, index) => {
                return (
                  <Fragment key={index}>
                    <NavLink
                      to={item.url}
                      exact
                      onClick={() => {
                        if (mobileOpen === true) {
                          handleDrawerToggle();
                        }
                      }}
                    >
                      <div className="sidebar_user_items">
                        <img src={User} alt="User" className="icon_user_sidebar" />
                        {!menuCollaps && <span className="name_item_user">{item.name}</span>}
                        {menuCollaps && <span className="name_item_user_none">{item.name}</span>}
                      </div>
                    </NavLink>
                  </Fragment>
                );
              })}
            </Collapse>
          </ul>
        )}
      </li>
    </>
  );
};

export default ContainerItems;
