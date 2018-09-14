import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Fade from '@material-ui/core/Fade';

import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import md5 from 'md5';
import { connect } from '@cerebral/react';
import { state, signal } from 'cerebral/tags';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: 20
  },
  button: {
    margin: theme.spacing.unit
  }
});

class ButtonAppBar extends Component {
  state = {
    anchorEl: null,
    open: false
  };

  handleAvatarClick = event => {
    const trg = event.currentTarget;
    this.setState(state => ({ anchorEl: trg, open: !state.open }));
  };

  render() {
    const { classes, title, auth, onOpenLogin } = this.props;
    let login;
    if (auth.loggedIn) {
      const md5Hash = md5(('' + auth.user.email).trim().toLowerCase());
      login = (
        <Avatar
          onClick={this.handleAvatarClick}
          src={`https://www.gravatar.com/avatar/${md5Hash}?d=retro`}
        />
      );
    } else {
      login = (
        <React.Fragment>
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
            onClick={() => onOpenLogin()}
            color="inherit"
            variant="outlined"
          >
            Login
          </Button>
        </React.Fragment>
      );
    }

    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              component={Link}
              to="/"
              className={classes.menuButton}
              color="inherit"
              aria-label="Start"
            >
              <img
                src="/icon-72x72.png"
                style={{ width: '38px', height: '38px' }}
              />
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              {title}
            </Typography>
            {login}
            <Popper
              open={this.state.open}
              anchorEl={this.state.anchorEl}
              disablePortal
              transition
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps}>
                  <Paper>
                    <MenuList>
                      <MenuItem>Profile</MenuItem>
                      <MenuItem>Logout</MenuItem>
                    </MenuList>
                  </Paper>
                </Fade>
              )}
            </Popper>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
};

const ConnectedButtonAppBar = connect(
  {
    auth: state`auth`,
    onOpenLogin: signal`onOpenLogin`
  },
  ButtonAppBar
);

export default withStyles(styles)(ConnectedButtonAppBar);
