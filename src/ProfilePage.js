import React from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Grid, Paper, Typography, withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
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

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      bio: '',
      email: '',
      password: '',
      password2: ''
    };
  }

  componentDidMount() {
    // copy properties into state
    if (this.props.auth && this.props.auth.user) {
      const user = this.props.auth.user;
      this.setState({
        firstName: user.firstName,
        lastName: user.lastName,
        bio: user.bio,
        email: user.email,
        password: '',
        password2: ''
      });
    }
  }

  componentWillUnmount() {
    // remove state
    this.setState({
      firstName: '',
      lastName: '',
      bio: '',
      email: '',
      password: '',
      password2: ''
    });
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  doSave = () => {
    this.props.onSaveProfile(this.state);
  };

  render() {
    const classes = this.props.classes;
    if (!this.props.auth.loggedIn) {
      // redirect to home page
      return <Redirect to="/" />;
    }
    const emailConfirmed = this.props.auth.user.emailConfirmed;
    return (
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="title">Your Profile</Typography>
          <br />
          <br />
          <form>
            <Grid container spacing={24}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="firstName"
                  label="First name"
                  onChange={this.handleChange}
                  value={this.state.firstName}
                  fullWidth
                  autoComplete="fname"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="lastName"
                  label="Last name"
                  onChange={this.handleChange}
                  value={this.state.lastName}
                  fullWidth
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  name="bio"
                  label="About you"
                  onChange={this.handleChange}
                  value={this.state.bio}
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
                  onChange={this.handleChange}
                  inputProps={{ readOnly: emailConfirmed }}
                  value={this.state.email}
                  fullWidth
                  required={!emailConfirmed}
                  autoComplete="email"
                  helperText={
                    emailConfirmed
                      ? 'The email address is your login and cannot be changed'
                      : ''
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="password"
                  name="password"
                  label="Password"
                  onChange={this.handleChange}
                  value={this.state.password}
                  autoComplete="current-password"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="password2"
                  name="password2"
                  label="Password (confirm)"
                  onChange={this.handleChange}
                  value={this.state.password2}
                  autoComplete="current-password"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  className={classes.button}
                  component={Link}
                  to="/"
                  onClick={this.doSave}
                  variant="contained"
                  color="primary"
                  autoFocus
                >
                  Save
                </Button>
                <Button
                  className={classes.button}
                  component={Link}
                  to="/"
                  color="primary"
                  autoFocus
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </main>
    );
  }
}

const ConnectedProfilePage = connect(
  {
    auth: state`auth`,
    onSaveProfile: signal`onSaveProfile`
  },
  ProfilePage
);

export default withStyles(styles)(ConnectedProfilePage);
