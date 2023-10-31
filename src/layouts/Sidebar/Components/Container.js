import React from 'react';
import ContainerItems from './ContainerItems';
import constants from '../../../utilities/constants';
import '../_sidebar.scss';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useSelector } from 'react-redux';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Collapse from '@mui/material/Collapse';
const list = constants.SIDEBAR_LIST;
const Container = ({ handleDrawerToggle, mobileOpen }) => {
  const [open, setOpen] = React.useState(true);
  const listitem = list.filter((el) => el.name === 'المستخدمين' || el.name === 'اعدادات');
  const homePage = list.filter((el) => el.id === 0);
  const menuCollaps = useSelector((state) => state.courses.menuCollapse);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div className="container">
      <ul>
        {homePage &&
          homePage.length > 0 &&
          homePage.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <ContainerItems
                  key={index}
                  item={item}
                  id={item.id}
                  handleDrawerToggle={handleDrawerToggle}
                  mobileOpen={mobileOpen}
                />
              </React.Fragment>
            );
          })}
        <div className="ListItemButton">
          <ListItemButton onClick={handleClick} className="ListItemButton">
            {!menuCollaps && (
              <>
                <ListItemIcon>
                  <InboxIcon className="InboxIcon" />
                </ListItemIcon>
                <div className="home_sidebar_dropdown">المحتوى</div>
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
                  <InboxIcon className="InboxIcon_after" />
                </ListItemIcon>

                <div className="home_sidebar_dropdown_after">
                  <div className="home_sidebar_dropdown">المحتوى</div>
                  {open ? (
                    <ExpandLess className="ExpandLess" />
                  ) : (
                    <ExpandMore className="ExpandMore" />
                  )}
                </div>
              </>
            )}
          </ListItemButton>
        </div>
        <Collapse in={open} timeout="auto" unmountOnExit>
          {list &&
            list.length > 0 &&
            list.map((item, index) => {
              return (
                index < 4 && (
                  <ContainerItems
                    key={index}
                    id={item.id}
                    item={item}
                    handleDrawerToggle={handleDrawerToggle}
                    mobileOpen={mobileOpen}
                    open
                  />
                )
              );
            })}
        </Collapse>
        {listitem &&
          listitem.length > 0 &&
          listitem.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <ContainerItems
                  key={index}
                  item={item}
                  id={item.id}
                  handleDrawerToggle={handleDrawerToggle}
                  mobileOpen={mobileOpen}
                />
              </React.Fragment>
            );
          })}
      </ul>
    </div>
  );
};

Container.propTypes = {};

export default Container;
