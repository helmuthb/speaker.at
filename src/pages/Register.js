import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import {
  Grid,
  Paper,
  Typography,
  FormControlLabel,
  Checkbox,
  withStyles
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  appBar: {
    position: 'relative'
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
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
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
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

class Register extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const classes = this.props.classes;
    return (
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="title">Register</Typography>
          <p>Sign-Up for our Speaker Platform!</p>
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
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                type="password2"
                name="password2"
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
        </Paper>
      </main>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Register);
