// https://github.com/relateiq/lambda-auth/blob/master/lib/authenticate/index.js
var google   = require('googleapis');

var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL
);

var plus = google.plus('v1');

module.exports = {
  getUrl: getUrl,
  verifyCode: verifyCode,
  getUser: getUser
};

function getUrl(redirect) {
  return new Promise(function (resolve, reject) {
    resolve(oauth2Client.generateAuthUrl({
      redirect_uri: redirect,
      access_type: 'online', // 'online' (default) or 'offline' (gets refresh_token)
      scope: [
        'https://www.googleapis.com/auth/plus.me',
        'https://www.googleapis.com/auth/plus.profile.emails.read'
      ]
    }));
  });
}

function verifyCode(code) {
  return new Promise(function(resolve, reject) {
    oauth2Client.getToken(code, function(err, tokens) {
      if (err) {
        reject(err);
      } else {
        // Now tokens contains an access_token and an optional refresh_token. Save them.
        oauth2Client.setCredentials(tokens);
        resolve(code);
      }
    });
  });
}

function getUser() {
  return new Promise(function(resolve, reject) {
    // retrieve user profile
    plus.people.get({ userId: 'me', auth: oauth2Client }, function(err, profile) {
      if (err) {
        reject(err);
      } else {
        resolve(profile);
      }
    });
  });
}
