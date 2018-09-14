import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from '@cerebral/react';
import { Paper } from '@material-ui/core';
import { state, signal } from 'cerebral/tags';
import yellow from '@material-ui/core/colors/yellow';
import ErrorIcon from '@material-ui/icons/Error';

const styles = theme => ({
  paper: {
    backgroundColor: yellow[100],
    marginTop: theme.spacing.unit * 3,
    // marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 3,
      // marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  },
  icon: {
    marginBottom: -5,
    marginRight: theme.spacing.unit * 2,
    display: 'inline'
  }
});

class LoginReminder extends React.Component {
  render() {
    const { classes, auth } = this.props;

    if (!auth.loggedIn) {
      return (
        <Paper className={classes.paper}>
          <ErrorIcon color="error" className={classes.icon} />
          Please login to submit talk proposals.
        </Paper>
      );
    } else {
      return '';
    }
  }
}

const ConnectedLoginReminder = connect(
  {
    auth: state`auth`,
    onOpenLogin: signal`onOpenLogin`
  },
  LoginReminder
);

export default withStyles(styles)(ConnectedLoginReminder);
