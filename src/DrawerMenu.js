import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { connect } from '@cerebral/react';
import { state, signal } from 'cerebral/tags';
import { Typography } from '@material-ui/core';

const styles = {
  menu: {
    width: 270
  }
};
export default withStyles(styles)(
  connect(
    {
      ui: state`ui`,
      closeDrawer: signal`closeDrawer`,
      openLogin: signal`openLogin`
    },
    function({ ui, classes, closeDrawer, openLogin }) {
      return (
        <Drawer open={ui.drawerOpen} onClose={() => closeDrawer()}>
          <div style={{ backgroundColor: '#2196f3', minHeight: 150 }}>
            <div style={{ marginLeft: 16, marginTop: 16 }}>
              <Typography variant="title">
                <Avatar src="/icon-72x72.png" alt="GDG Logo" />
                Speaker @ GDG
              </Typography>
              <Button
                className={classes.button}
                component={Link}
                to="/register"
                variant="contained"
              >
                Register
              </Button>
              <Button
                className={classes.button}
                onClick={() => openLogin()}
                color="inherit"
                variant="outlined"
              >
                Login
              </Button>
            </div>
          </div>
          <MenuList className={classes.menu}>
            <MenuItem component={Link} to="/">
              Start Page
            </MenuItem>
            <MenuItem component={Link} to="/profile">
              Profile
            </MenuItem>
            <Divider />
            <MenuItem component={Link} to="/">
              Start Page
            </MenuItem>
            <MenuItem component={Link} to="/profile">
              Profile
            </MenuItem>
          </MenuList>
        </Drawer>
      );
    }
  )
);
