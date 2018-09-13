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

const styles = theme => ({
  appBar: {
    position: 'relative'
  },
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
    minHeight: 350,
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
    return (
      <Grid container spacing={24} className={classes.layout}>
        {this.props.conferences.map(conference => (
          <Grid item xs={12} sm={6} lg={4}>
            <Paper className={classes.paper}>
              <ConferenceInfo conference={conference} />
            </Paper>
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
