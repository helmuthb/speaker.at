import React from 'react';
import moment from 'moment';
import { Typography } from '@material-ui/core';

class TableRow extends React.Component {
  render() {
    return (
      <tr>
        <th style={{ padding: '5px', textAlign: 'left', verticalAlign: 'top' }}>
          {this.props.title}:
        </th>
        <td>{this.props.children}</td>
      </tr>
    );
  }
}

class ConferenceInfo extends React.Component {
  render() {
    const conference = this.props.conference;
    const shortUrl = conference.url.replace('https://', '');
    return (
      <React.Fragment>
        <img
          style={{ maxHeight: '50px', maxWidth: '120px' }}
          alt={conference.name}
          src={conference.logo}
        />
        <Typography variant="title">{conference.name}</Typography>
        <p>{conference.description}</p>
        <table border="0">
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
        </table>
      </React.Fragment>
    );
  }
}

export default ConferenceInfo;
