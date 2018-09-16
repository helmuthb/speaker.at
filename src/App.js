import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ButtonAppBar from './ButtonAppBar';
import Drawer from '@material-ui/core/Drawer';
import HomePage from './HomePage';
import RegisterPage from './RegisterPage';
import ProfilePage from './ProfilePage';
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
    ui: state`ui`,
    onOpenLogin: signal`onOpenLogin`,
    closeDrawer: signal`closeDrawer`
  },
  function App({ auth, ui, onOpenLogin, closeDrawer }) {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <div>
            <LoginDialog registerUrl="/register" />
            <Drawer open={ui.drawerOpen} onClose={() => closeDrawer()}>
              This is the side menu
            </Drawer>
            <ButtonAppBar
              onLogin={() => onOpenLogin()}
              user={auth.user}
              title="Speaker @ GDG Vienna"
            />
            <main className="content">
              <Route exact path="/" render={props => <HomePage />} />
              <Route
                path="/register"
                render={props => <RegisterPage profileUrl="/profile" />}
              />
              <Route
                path="/profile"
                render={props => <ProfilePage registerUrl="/register" />}
              />
            </main>
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
);
