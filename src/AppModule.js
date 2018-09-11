import { Module } from 'cerebral';
import { set } from 'cerebral/operators';
import { state, string } from 'cerebral/tags';

function login({ props, state }) {
  console.log('performing login');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      state.set('auth.user', {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@user.com'
      });
      state.set('auth.loggedIn', true);
      resolve({ success: true });
    }, 1000);
  });
}

function closeLoginDialog({ props, state }) {
  console.log('Closing login dialog');
  state.set('auth.loginActive', false);
}

function openLoginDialog({ props, state }) {
  console.log('Opening login dialog');
  state.set('auth.loginActive', true);
}

const AppModule = Module({
  state: {
    auth: {
      loggedIn: false,
      loginActive: false,
      loginBusy: false,
      user: {}
    }
  },
  signals: {
    onLogin: [
      set(state`auth.loginBusy`, true),
      login,
      set(state`auth.loginBusy`, false),
      closeLoginDialog
    ],
    onOpenLogin: [set(state`auth.loginBusy`, false), openLoginDialog],
    onReset: [closeLoginDialog],
    onCloseLogin: [closeLoginDialog]
  }
});

export default AppModule;
