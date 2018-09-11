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

class HomePage extends React.Component {
  render() {
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <div>
            <h2>HELLO</h2>
            <p>
              Cras facilisis urna ornare ex volutpat, et convallis erat
              elementum. Ut aliquam, ipsum vitae gravida suscipit, metus dui
              bibendum est, eget rhoncus nibh metus nec massa. Maecenas
              hendrerit laoreet augue nec molestie. Cum sociis natoque penatibus
              et magnis dis parturient montes, nascetur ridiculus mus.
            </p>

            <p>Duis a turpis sed lacus dapibus elementum sed eu lectus.</p>
          </div>
        </Grid>
      </Grid>
    );
  }
}

const ConnectedHomePage = connect(
  {
    auth: state`auth`,
    conference: state`conference`
  },
  HomePage
);

export default ConnectedHomePage;
