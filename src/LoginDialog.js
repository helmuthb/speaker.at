import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { connect } from '@cerebral/react';
import { state, signal } from 'cerebral/tags';

const styles = theme => ({
  dialogPaper: {
    minHeight: '0px'
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
  state = {};

  isLoginPossible = () =>
    this.state.email && this.state.password && !this.props.auth.loginBusy;

  handleLogin = () => {
    this.setState({ email: undefined, password: undefined });
    this.props.onLogin({
      email: this.state.email,
      password: this.state.password
    });
  };

  handleCancel = () => {
    this.setState({ email: undefined, password: undefined });
    this.props.onCloseLogin();
  };

  handleReset = () => this.props.onReset();

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { fullScreen, auth, onCloseLogin } = this.props;
    const busyDisabled = !!auth.loginBusy;
    const buttonProgress = this.props.classes.buttonProgress;
    const disableLogin = busyDisabled || !this.isLoginPossible();
    const passwordHelperProps = {
      error: true,
      onClick: this.handleReset
    };

    return (
      <Dialog
        fullScreen={fullScreen}
        maxWidth="xs"
        open={auth.loginActive}
        onClose={() => onCloseLogin()}
        aria-labelledby="responsive-dialog-title"
        classes={{ paper: this.props.classes.dialogPaper }}
        onBackdropClick={this.handleCancel}
        onEscapeKeyDown={this.handleCancel}
      >
        <DialogTitle id="responsive-dialog-title">Login</DialogTitle>
        <DialogContent>
          <form>
            Login with your existing account
            <TextField
              disabled={busyDisabled}
              fullWidth
              required
              margin="dense"
              onChange={this.handleChange}
              value={this.state.email}
              name="email"
              label="E-Mail"
            />
            <TextField
              disabled={busyDisabled}
              fullWidth
              required
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
        </DialogContent>
        <DialogActions>
          <Button
            disabled={busyDisabled}
            component={Link}
            onClick={this.handleCancel}
            to={this.props.registerUrl}
          >
            Register
          </Button>
          <Button
            disabled={disableLogin}
            onClick={this.handleLogin}
            variant="contained"
            color="primary"
            autoFocus
          >
            Login
          </Button>
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

const ConnectedLoginDialog = connect(
  {
    auth: state`auth`,
    onLogin: signal`onLogin`,
    onOpenLogin: signal`onOpenLogin`,
    onCloseLogin: signal`onCloseLogin`,
    onReset: signal`onReset`
  },
  LoginDialog
);

ConnectedLoginDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  registerUrl: PropTypes.string.isRequired
};

export default withMobileDialog()(withStyles(styles)(ConnectedLoginDialog));
