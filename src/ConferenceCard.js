import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

const styles = theme => ({
  card: {
    marginRight: theme.spacing.unit
  },
  avatar: {
    border: '1pt solid lightgrey'
  },
  content: {
    minHeight: 240
  },
  actions: {
    display: 'flex'
  },
  open: {},
  closed: {
    filter: 'grayscale(100%)',
    opacity: 0.5
  },
  button: {
    margin: theme.spacing.unit
  }
});

class TableRow extends React.Component {
  render() {
    return (
      <tr>
        <th style={{ padding: '5px', textAlign: 'left', verticalAlign: 'top' }}>
          <Typography component="p">
            <b>{this.props.title}:</b>
          </Typography>
        </th>
        <td style={{ padding: '5px', verticalAlign: 'top' }}>
          <Typography component="p">{this.props.children}</Typography>
        </td>
      </tr>
    );
  }
}

class ConferenceCard extends React.Component {
  render() {
    const { conference, classes } = this.props;
    const shortUrl = conference.url.replace('https://', '');
    const currentDate = new Date().getTime();
    const cfpOpen =
      conference.cfpFrom <= currentDate && conference.cfpTo >= currentDate;
    let cfpTiming =
      'Call closes ' + moment(conference.cfpTo).format('D MMMM Y');
    if (!cfpOpen) {
      if (conference.cfpFrom > currentDate) {
        cfpTiming =
          'Call will open on ' + moment(conference.cfpFrom).format('D MMMM Y');
      } else {
        cfpTiming =
          'Call closed on ' + moment(conference.cfpTo).format('D MMMM Y');
      }
    }
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="Conference"
              className={classes.avatar}
              src={conference.logo}
            />
          }
          title={conference.name}
          subheader={moment(conference.conferenceFrom).format('D MMMM Y')}
        />
        <CardContent
          className={
            classes.content + ' ' + cfpOpen ? classes.open : classes.closed
          }
        >
          <Typography component="div">
            <div style={{ minHeight: 55, fontStyle: 'italic' }}>
              {conference.description}
            </div>
            <table border="0">
              <tbody>
                <TableRow title="When">
                  {moment(conference.conferenceFrom).format('D MMMM Y')}
                </TableRow>
                <TableRow title="Where">{conference.location}</TableRow>
                <TableRow title="Topics">{conference.topics}</TableRow>
                <TableRow title="Website">
                  <a target="_blank" href={conference.url}>
                    {shortUrl}
                  </a>
                </TableRow>
              </tbody>
            </table>
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <Button
            disabled={!cfpOpen}
            color={cfpOpen ? 'primary' : undefined}
            className={classes.button}
            variant="outlined"
          >
            Submit
          </Button>
          <Typography component="div" style={{ fontStle: 'italic' }}>
            {cfpTiming}
          </Typography>
        </CardActions>
      </Card>
    );
  }
}

ConferenceCard.propTypes = {
  classes: PropTypes.object.isRequired,
  conference: PropTypes.object.isRequired
};

export default withStyles(styles)(ConferenceCard);
