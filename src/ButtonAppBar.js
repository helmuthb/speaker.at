import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { connect } from '@cerebral/react';
import { state, signal } from 'cerebral/tags';
import { ButtonBase } from '@material-ui/core';

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class ButtonAppBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, title, auth, onOpenLogin } = this.props;
    let login;
    if (auth.loggedIn) {
      login = <div>{auth.user.firstName}</div>;
    } else {
      login = (
        <React.Fragment>
          <Button component={Link} to="/register" variant="contained">
            Register
          </Button>
          <Button onClick={() => onOpenLogin()} color="inherit">
            Login
          </Button>
        </React.Fragment>
      );
    }

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
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
