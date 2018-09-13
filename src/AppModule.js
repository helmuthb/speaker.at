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
    },
    conferences: [
      {
        series: 'DevFest Vienna',
        name: 'DevFest Vienna 2018',
        description:
          'DevFest Vienna is a yearly conference, with topics all around Mobile, Web, Social and Cloud.',
        conferenceFrom: 1543050000000,
        conferenceTo: 1543176000000,
        location: 'TU Wien',
        topics: 'Mobile, Cloud, Java, Web',
        logo: 'https://devfest.at/img/seo/sharing-twitter-2014.png',
        url: 'https://devfest.at'
      },
      {
        series: 'droidcon Vienna',
        name: 'droidcon Vienna 2018',
        description: 'droidcon brings the best from Android to Vienna!',
        conferenceFrom: 1537520400000,
        conferenceTo: 1537632000000,
        location: 'Technikum Wien',
        topics: 'Android: Java, Kotlin, React Native, Flutter',
        logo: 'https://droidcon.at/img/sprites/logo_droidcon-small.png',
        url: 'https://droidcon.at'
      },
      {
        series: 'Women Techmakers Vienna',
        name: 'Women Techmakers Vienna 2018',
        description: 'WTM Vienna - for women and men alike',
        conferenceFrom: 1537520400000,
        conferenceTo: 1537632000000,
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
    onOpenLogin: [set(state`auth.loginBusy`, false), openLoginDialog],
    onReset: [closeLoginDialog],
    onCloseLogin: [closeLoginDialog]
  }
});

export default AppModule;
