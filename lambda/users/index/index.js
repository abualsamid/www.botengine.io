require('dotenv').load(); // Load up first so deps can use these as well

var Promise      = require('bluebird'),
    token        = require('botengine-token'),
    user         = require('botengine-user');

module.exports.handler = function(event, context) {
  checkAuth(event.query)
  .then(user.findAll)
  .then(function(result) {
    result.status = 201;
    context.done(null, result);
  })
  .error(function(error) {
    context.done(null, {
      status: 400,
      message: 'Authentication Failed',
      error: error
    });
  });
};

function checkAuth(query) {
  return new Promise(function(resolve, reject) {
    if (query.jwt) {
      return token.verify(query.jwt)
      .then(function (data) {
        resolve(data);
      })
      .error(function (error) {
        reject({ message: error });
      });
    } else {
      reject({ message: "This resource requires a JWT session to continue." });
    }
  });
}
