import { Module } from 'cerebral';
import { set } from 'cerebral/operators';
import { state } from 'cerebral/tags';

function login({ props, state }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      state.set('auth.user', {
        firstName: props.firstName || 'Test',
        lastName: props.lastName || 'User',
        email: props.email || 'test@user.com',
        emailConfirmed: true
      });
      state.set('auth.loggedIn', true);
      resolve({ success: true });
    }, 1000);
  });
}

function logout({ state }) {
  state.set('auth.user', {});
  state.set('auth.loggedIn', false);
}

function closeLoginDialog({ state }) {
  state.set('auth.loginActive', false);
}

function openLoginDialog({ state }) {
  state.set('auth.loginActive', true);
}

function saveProfile({ props, state }) {
  const user = state.get('auth.user');
  if (props.firstName) {
    user.firstName = props.firstName;
  }
  if (props.lastName) {
    user.lastName = props.lastName;
  }
  if (props.email && !user.emailConfirmed) {
    user.email = props.email;
  }
  if (props.bio) {
    user.bio = props.bio;
  }
  state.set('auth.user', user);
}

const AppModule = Module({
  state: {
    auth: {
      loggedIn: false,
      loginActive: false,
      loginBusy: false,
      user: {}
    },
    conferences: [
      {
        id: 1,
        series: 'DevFest Vienna',
        name: 'DevFest Vienna 2018',
        description:
          'DevFest Vienna is a yearly conference, with topics all around Mobile, Web, Social and Cloud.',
        conferenceFrom: 1543050000000,
        conferenceTo: 1543176000000,
        cfpFrom: 1543050000000,
        cfpTo: 1543176000000,
        location: 'TU Wien',
        topics: 'Mobile, Cloud, Java, Web',
        logo: 'https://devfest.at/img/seo/sharing-twitter-2014.png',
        url: 'https://devfest.at'
      },
      {
        id: 2,
        series: 'droidcon Vienna',
        name: 'droidcon Vienna 2018',
        description: 'droidcon brings the best from Android to Vienna!',
        conferenceFrom: 1537520400000,
        conferenceTo: 1537632000000,
        cfpFrom: 1537520400000,
        cfpTo: 1537632000000,
        location: 'Technikum Wien',
        topics: 'Android: Java, Kotlin, React Native, Flutter',
        logo: 'https://droidcon.at/img/sprites/logo_droidcon-small.png',
        url: 'https://droidcon.at'
      },
      {
        id: 3,
        series: 'Women Techmakers Vienna',
        name: 'Women Techmakers Vienna 2018',
        description: 'WTM Vienna - for women and men alike',
        conferenceFrom: 1537520400000,
        conferenceTo: 1537632000000,
        cfpFrom: 1437520400000,
        cfpTo: 1537632000000,
        location: 'Technikum Wien',
        topics: 'Android: Java, Kotlin, React Native, Flutter',
        logo: 'https://droidcon.at/img/sprites/logo_droidcon-small.png',
        url: 'https://droidcon.at'
      }
    ]
  },
  signals: {
    onLogin: [
      set(state`auth.loginBusy`, true),
      login,
      set(state`auth.loginBusy`, false),
      closeLoginDialog
    ],
    onLogout: [logout],
    onOpenLogin: [set(state`auth.loginBusy`, false), openLoginDialog],
    onReset: [closeLoginDialog],
    onCloseLogin: [closeLoginDialog],
    onSaveProfile: [saveProfile]
  }
});

export default AppModule;
