import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import userImage from './UserImage';
import visibleConferences from './VisibleConferences';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { connect } from '@cerebral/react';
import { state, signal } from 'cerebral/tags';
import { Typography } from '@material-ui/core';

const styles = {
  menu: {
    width: 270
  },
  avatar: {
    width: 60,
    height: 60
  }
};
export default withStyles(styles)(
  connect(
    {
      ui: state`ui`,
      auth: state`auth`,
      closeDrawer: signal`closeDrawer`,
      openLogin: signal`openLogin`,
      logout: signal`logout`,
      userImage,
      visibleConferences
    },
    function({
      classes,
      ui,
      auth,
      closeDrawer,
      openLogin,
      logout,
      userImage,
      visibleConferences
    }) {
      let avatar;
      if (auth.loggedIn) {
        avatar = <Avatar className={classes.avatar} src={userImage} />;
      } else {
        avatar = (
          <Avatar className={classes.avatar}>
            <AccountCircleIcon className={classes.avatar} />
          </Avatar>
        );
      }
      return (
        <Drawer
          open={ui.drawerOpen}
          onClick={() => closeDrawer()}
          onClose={() => closeDrawer()}
        >
          <div style={{ backgroundColor: '#2196f3', paddingBottom: 20 }}>
            <div style={{ marginLeft: 16, marginTop: 16 }}>
              {avatar}
              <br />
              {auth.loggedIn ? (
                <Typography variant="title">
                  {auth.user.firstName + ' ' + auth.user.lastName}
                </Typography>
              ) : (
                ''
              )}
            </div>
          </div>
          <MenuList className={classes.menu}>
            <MenuItem key="home" component={Link} to="/">
              Start Page
            </MenuItem>
            {auth.loggedIn
              ? [
                  <MenuItem key="profile" component={Link} to="/profile">
                    Profile
                  </MenuItem>,
                  <MenuItem key="logout" onClick={() => logout()}>
                    Logout
                  </MenuItem>,
                  <Divider key="divider" />
                ].concat(
                  visibleConferences.map(conference => (
                    <MenuItem
                      key={conference.key}
                      component={Link}
                      to={`/conference/${conference.key}`}
                    >
                      {conference.title}
                    </MenuItem>
                  ))
                )
              : [
                  <MenuItem key="register" component={Link} to="/register">
                    Register
                  </MenuItem>,
                  <MenuItem key="login" onClick={() => openLogin()}>
                    Login
                  </MenuItem>
                ]}
          </MenuList>
        </Drawer>
      );
    }
  )
);
