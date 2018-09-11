import React, { Component } from 'react';
import { Route, NavLink, BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import ButtonAppBar from './ButtonAppBar';
import Home from './pages/Home';
import Register from './pages/Register';
import LoginDialog from './dialogs/LoginDialog';
import { connect } from '@cerebral/react';
import { state, signal } from 'cerebral/tags';

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
      <React.Fragment>
        <CssBaseline />
        <BrowserRouter>
          <div>
            <LoginDialog registerUrl="/register" />
            <ButtonAppBar
              onLogin={() => onOpenLogin()}
              user={auth.user}
              title="Speaker @ GDG"
            />
            <main className="content">
              <Route exact path="/" render={props => <Home />} />
              <Route path="/register" render={props => <Register />} />
            </main>
          </div>
        </BrowserRouter>
      </React.Fragment>
    );
  }
);
