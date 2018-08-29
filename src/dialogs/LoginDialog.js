import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import { withStyles } from '@material-ui/core/styles';
import { FormHelperText } from '@material-ui/core';

const styles = theme => ({
  dialogPaper: {
    minHeight: '500px'
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
});

class LoginDialog extends React.Component {
  state = {
    loginOrRegister: 1,
    isBusy: false
  };

  isLoginPossible = () => this.state.email && this.state.password;

  isRegisterPossible = () =>
    this.state.first_name &&
    this.state.last_name &&
    this.state.email &&
    this.state.password &&
    this.state.password == this.state.password2;

  handleLogin = () => {
    this.setState({ isBusy: 'login' });
    this.props.onLogin(this.state, () => {
      this.setState({ isBusy: false });
    });
  };

  handleRegister = () => {
    this.setState({ isBusy: 'register' });
    this.props.onRegister(this.state, () => {
      this.setState({ isBusy: false });
    });
  };

  handleReset = () => {
    this.setState({ isBusy: 'reset' });
    this.props.onReset(this.state, () => {
      this.setState({ isBusy: false });
    });
  };

  handleCancel = () => {
    this.setState({
      email: '',
      password: '',
      password2: '',
      first_name: '',
      last_name: ''
    });
    this.props.onCancel();
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onTabChange = (event, value) => {
    this.setState({ loginOrRegister: value });
  };

  setLogin = () => {
    this.setState({ loginOrRegister: 1 });
  };

  setRegister = () => {
    this.setState({ loginOrRegister: 0 });
  };

  render() {
    const { fullScreen } = this.props;
    const { loginOrRegister } = this.state;
    const busyDisabled = !!this.state.isBusy;
    const buttonProgress = this.props.classes.buttonProgress;
    const disableLogin = busyDisabled || !this.isLoginPossible();
    const disableRegister = busyDisabled || !this.isRegisterPossible();
    const passwordHelperProps = {
      error: true,
      onClick: this.handleReset
    };

    return (
      <Dialog
        fullScreen={fullScreen}
        maxWidth="xs"
        open={this.props.open}
        onClose={this.props.onClose}
        aria-labelledby="responsive-dialog-title"
        classes={{ paper: this.props.classes.dialogPaper }}
      >
        <DialogTitle id="responsive-dialog-title">
          {(loginOrRegister === 0 && 'New Account') || 'Login'}
        </DialogTitle>
        <DialogContent>
          {loginOrRegister === 0 && (
            <form>
              Sign-Up for our Speaker platform!
              <TextField
                disabled={busyDisabled}
                fullWidth
                margin="dense"
                onChange={this.handleChange}
                value={this.state.first_name}
                name="first_name"
                label="First Name"
              />
              <TextField
                disabled={busyDisabled}
                fullWidth
                margin="dense"
                onChange={this.handleChange}
                value={this.state.last_name}
                name="last_name"
                label="Last Name"
              />
              <TextField
                disabled={busyDisabled}
                fullWidth
                margin="dense"
                onChange={this.handleChange}
                value={this.state.email}
                name="email"
                label="E-Mail"
              />
              <TextField
                disabled={busyDisabled}
                fullWidth
                margin="dense"
                onChange={this.handleChange}
                value={this.state.password}
                name="password"
                type="password"
                label="Password"
              />
              <TextField
                disabled={busyDisabled}
                fullWidth
                margin="dense"
                onChange={this.handleChange}
                value={this.state.password2}
                name="password2"
                type="password"
                label="Password (confirm)"
              />
            </form>
          )}
          {loginOrRegister === 1 && (
            <form>
              Login with your existing account
              <TextField
                disabled={busyDisabled}
                fullWidth
                margin="dense"
                onChange={this.handleChange}
                value={this.state.email}
                name="email"
                label="E-Mail"
              />
              <TextField
                disabled={busyDisabled}
                fullWidth
                margin="dense"
                onChange={this.handleChange}
                value={this.state.password}
                name="password"
                type="password"
                label="Password"
                helperText="Forgot Password?"
                FormHelperTextProps={passwordHelperProps}
              />
            </form>
          )}
        </DialogContent>
        <DialogActions>
          {loginOrRegister === 0 && (
            <Button disabled={busyDisabled} onClick={this.setLogin}>
              Existing User
            </Button>
          )}
          {loginOrRegister === 1 && (
            <Button disabled={busyDisabled} onClick={this.setRegister}>
              Register
            </Button>
          )}
          {loginOrRegister === 0 && (
            <Button
              disabled={disableRegister}
              onClick={this.handleRegister}
              variant="contained"
              color="primary"
              autoFocus
            >
              Sign-Up
            </Button>
          )}
          {loginOrRegister === 1 && (
            <Button
              disabled={disableLogin}
              onClick={this.handleLogin}
              variant="contained"
              color="primary"
              autoFocus
            >
              Login
            </Button>
          )}
          {busyDisabled && (
            <CircularProgress size={48} className={buttonProgress} />
          )}
          <Button
            disabled={busyDisabled}
            onClick={this.handleCancel}
            variant="outlined"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

LoginDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default withMobileDialog()(withStyles(styles)(LoginDialog));
