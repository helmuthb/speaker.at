import React, { Component } from 'react';
import { Route, NavLink, BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import ButtonAppBar from './ButtonAppBar';
import Home from './pages/Home';
import Login from './pages/Login';
import LoginDialog from './dialogs/LoginDialog';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isLoginOpen: false
    };
  }

  openLogin = () => {
    this.setState({
      isLoginOpen: true
    });
  };

  doLogin = () => {
    console.log('doLogin');
    this.setState({
      user: {
        first_name: 'Helmuth',
        last_name: 'Breitenfellner',
        email: 'helmuth@breitenfellner.at',
        id: 1
      },
      isLoginOpen: false
    });
  };

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <LoginDialog open={this.state.isLoginOpen} onClose={this.doLogin} />
        <BrowserRouter>
          <div>
            <ButtonAppBar
              onLogin={this.openLogin}
              user={this.state.user}
              title="Speaker @"
            />
            <main className="content">
              <Route exact path="/" render={props => <Home />} />
            </main>
          </div>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
