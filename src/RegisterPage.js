import React from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Grid, Paper, Typography, withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { connect } from '@cerebral/react';
import { state, signal } from 'cerebral/tags';

const styles = theme => ({
  appBar: {
    position: 'relative'
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 9,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      padding: theme.spacing.unit * 3
    }
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  }
});

class RegisterPage extends React.Component {
  render() {
    const classes = this.props.classes;
    if (this.props.auth.loggedIn) {
      // redirect to profile page
      return <Redirect to="/profile" />;
    }
    return (
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="title">Register</Typography>
          <p>Sign-Up for our Speaker Platform!</p>
          <form>
            <Grid container spacing={24}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="firstName"
                  label="First name"
                  fullWidth
                  autoComplete="fname"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="lastName"
                  label="Last name"
                  fullWidth
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  name="bio"
                  label="About you"
                  multiline
                  rows="3"
                  fullWidth
                  helperText="Only one or two sentences about you"
                  autoComplete="bio"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  label="E-mail address"
                  fullWidth
                  required
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  type="password"
                  name="password"
                  label="Password"
                  autoComplete="current-password"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  type="password"
                  name="password2"
                  autoComplete="current-password"
                  label="Password (confirm)"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" autoFocus>
                  Sign-Up
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </main>
    );
  }
}

const ConnectedRegisterPage = connect(
  {
    auth: state`auth`
  },
  RegisterPage
);

export default withStyles(styles)(ConnectedRegisterPage);
