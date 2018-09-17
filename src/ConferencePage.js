import React from 'react';
import { Typography, Grid, withStyles } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
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

export default withStyles(styles)(
  connect(
    {
      auth: state`auth`,
      proposals: state`proposals`,
      visibleConferences
    },
    function({ classes, auth, proposals, visibleConferences, match }) {
      const conferenceKey = match.params.conferenceKey;
      const theConference = visibleConferences.find(
        conference => conference.key === conferenceKey
      );
      if (!theConference) {
        return <Redirect to="/" />;
      }
      const confProposals = proposals.filter(
        proposal => proposal.conference === conferenceKey
      );
      return (
        <Grid container spacing={40} className={classes.layout}>
          <Grid item xs={12}>
            <Typography variant="title">{theConference.title}</Typography>
          </Grid>
          {confProposals.map(proposal => (
            <React.Fragment>
              <a href="#">{proposal.title}</a>
              <br />
            </React.Fragment>
          ))}
        </Grid>
      );
    }
  )
);
