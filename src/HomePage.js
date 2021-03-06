import React from 'react';
import { Grid, Paper, Typography, withStyles } from '@material-ui/core';
import ConferenceCard from './ConferenceCard';
import LoginReminder from './LoginReminder';
import visibleConferences from './VisibleConferences';
import { connect } from '@cerebral/react';
import { state } from 'cerebral/tags';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 3,
    [theme.breakpoints.up(1200 + theme.spacing.unit * 2 * 2)]: {
      width: 1200,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      padding: theme.spacing.unit * 3
    }
  }
});

class HomePage extends React.Component {
  render() {
    const classes = this.props.classes;
    const visibleConferences = this.props.visibleConferences;
    return (
      <Grid container spacing={40} className={classes.layout}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <div style={{ overflow: 'auto' }}>
              <a
                style={{ float: 'right' }}
                target="_blank"
                rel="noopener noreferrer"
                href="http://diversitycharter.org"
              >
                <img
                  src="/img/supporting-diversity.png"
                  alt="Diversity Charter logo"
                />
              </a>
              <p>
                <b>Call for Papers manager by GDG Vienna!</b>
              </p>
              <Typography component="p">
                We at{' '}
                <a
                  href="http://www.gdg-vienna.at/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GDG Vienna
                </a>{' '}
                are involved in the organization of the following events and
                conferences. Here you can maintain one profile for all your talk
                proposals to these and future events.
              </Typography>
            </div>
          </Paper>
          <LoginReminder />
        </Grid>
        {visibleConferences.map(conference => (
          <Grid key={conference.key} item xs={12} sm={6} lg={4}>
            <ConferenceCard conference={conference} />
          </Grid>
        ))}
      </Grid>
    );
  }
}

const ConnectedHomePage = connect(
  {
    auth: state`auth`,
    visibleConferences
  },
  HomePage
);

export default withStyles(styles)(ConnectedHomePage);
