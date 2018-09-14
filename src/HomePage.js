import React from 'react';
import { connect } from '@cerebral/react';
import { state } from 'cerebral/tags';
import {
  Grid,
  Paper,
  Typography,
  FormControlLabel,
  Checkbox,
  withStyles
} from '@material-ui/core';
import ConferenceInfo from './ConferenceInfo';
import ConferenceCard from './ConferenceCard';
import LoginReminder from './LoginReminder';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(1200 + theme.spacing.unit * 2 * 2)]: {
      width: 1200,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: theme.spacing.unit * 3
    }
  },
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

class HomePage extends React.Component {
  render() {
    const classes = this.props.classes;
    const currentDate = new Date().getTime();
    const visibleConferences = this.props.conferences
      .filter(conference => conference.conferenceFrom > currentDate)
      .sort((c1, c2) => c1.cfpTo > c2.cfpTo);
    return (
      <Grid container spacing={40} className={classes.layout}>
        <Grid item xs={24}>
          <Paper className={classes.paper}>
            <div style={{ overflow: 'auto' }}>
              <a
                style={{ float: 'right' }}
                target="_blank"
                href="http://diversitycharter.org"
              >
                <img src="/img/supporting-diversity.png" />
              </a>
              <p>
                <b>Call for Papers manager by GDG Vienna!</b>
              </p>
              <Typography component="p">
                We at{' '}
                <a href="http://www.gdg-vienna.at/" target="_blank">
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
          <Grid item xs={12} sm={6} lg={4}>
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
    conferences: state`conferences`
  },
  HomePage
);

export default withStyles(styles)(ConnectedHomePage);
