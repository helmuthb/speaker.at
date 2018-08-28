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
    loginOrRegister: 0,
    isBusy: false
  };

  doLogin = () => {
    this.setState({ isBusy: 'login' });
    this.props.onLogin(this.state, () => {
      this.setState({ isBusy: false });
    });
  };

  doRegister = () => {
    this.setState({ isBusy: 'register' });
    this.props.onRegister(this.state, () => {
      this.setState({ isBusy: false });
    });
  };

  doReset = () => {
    this.setState({ isBusy: 'reset' });
    this.props.onReset(this.state, () => {
      this.setState({ isBusy: false });
    });
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
          <Tabs
            value={this.state.loginOrRegister}
            onChange={this.onTabChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="Register" />
            <Tab label="Login" />
          </Tabs>
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
          {loginOrRegister === 0 && (
            <Button
              disabled={busyDisabled}
              onClick={this.doRegister}
              variant="contained"
              color="primary"
              autoFocus
            >
              Sign-Up
            </Button>
          )}
          {loginOrRegister === 1 && (
            <Button
              disabled={busyDisabled}
              onClick={this.doLogin}
              variant="contained"
              color="primary"
              autoFocus
            >
              Login
            </Button>
          )}
          {loginOrRegister === 1 && (
            <Button
              disabled={busyDisabled}
              onClick={this.doReset}
              variant="contained"
              color="secondary"
              autoFocus
            >
              Reset Password
            </Button>
          )}
          {busyDisabled && (
            <CircularProgress size={48} className={buttonProgress} />
          )}
          <Button
            disabled={busyDisabled}
            onClick={this.props.onCancel}
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
