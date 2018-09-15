import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ButtonAppBar from './ButtonAppBar';
import HomePage from './HomePage';
import RegisterPage from './RegisterPage';
import LoginDialog from './LoginDialog';
import { connect } from '@cerebral/react';
import { state, signal } from 'cerebral/tags';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2196f3'
    },
    secondary: {
      main: '#f50057'
    }
    // error: will use the default color
  }
});

export default connect(
  {
    auth: state`auth`,
    onLogin: signal`onLogin`,
    onOpenLogin: signal`onOpenLogin`,
    onCloseLogin: signal`onCloseLogin`,
    onReset: signal`onReset`
  },
  function App({ auth, onOpenLogin }) {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <div>
            <LoginDialog registerUrl="/register" />
            <ButtonAppBar
              onLogin={() => onOpenLogin()}
              user={auth.user}
              title="Speaker @ GDG Vienna"
            />
            <main className="content">
              <Route exact path="/" render={props => <HomePage />} />
              <Route path="/register" render={props => <RegisterPage />} />
            </main>
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
);
