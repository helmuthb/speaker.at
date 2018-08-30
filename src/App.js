import React, { Component } from 'react';
import { Route, NavLink, BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import ButtonAppBar from './ButtonAppBar';
import Home from './pages/Home';
import Register from './pages/Register';
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

  onLogin = (user, cb) => {
    console.log('doLogin');
    setTimeout(() => {
      this.setState({
        user: {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          id: 1
        },
        isLoginOpen: false
      });
      cb();
    }, 2000);
  };

  onReset = (user, cb) => {
    console.log('doReset');
    setTimeout(() => {
      this.setState({
        isLoginOpen: false
      });
      cb();
    }, 2000);
  };

  onCancel = user => {
    this.setState({
      isLoginOpen: false
    });
  };

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <BrowserRouter>
          <div>
            <LoginDialog
              open={this.state.isLoginOpen}
              onReset={this.onReset}
              onLogin={this.onLogin}
              onCancel={this.onCancel}
              registerUrl="/register"
            />
            <ButtonAppBar
              onLogin={this.openLogin}
              user={this.state.user}
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
}

export default App;
