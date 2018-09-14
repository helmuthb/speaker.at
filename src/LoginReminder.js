import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from '@cerebral/react';
import { Paper } from '@material-ui/core';
import { state, signal } from 'cerebral/tags';

const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit * 3,
    // marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 3,
      // marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  }
});

class LoginReminder extends React.Component {
  render() {
    const { classes, auth } = this.props;

    return (
      <Paper className={classes.paper}>
        Please login to submit talk proposals.
      </Paper>
    );
  }
}

const ConnectedLoginReminder = connect(
  {
    auth: state`auth`,
    onOpenLogin: signal`onOpenLogin`
  },
  LoginReminder
);

export default withStyles(styles)(LoginReminder);
