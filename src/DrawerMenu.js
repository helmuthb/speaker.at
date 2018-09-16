import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { connect } from '@cerebral/react';
import { state, signal } from 'cerebral/tags';

const styles = {
  menu: {
    width: 250
  }
};
export default withStyles(styles)(
  connect(
    {
      ui: state`ui`,
      closeDrawer: signal`closeDrawer`
    },
    function({ ui, classes, closeDrawer }) {
      return (
        <Drawer open={ui.drawerOpen} onClose={() => closeDrawer()}>
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
