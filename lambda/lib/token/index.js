var jwt = require('njwt');
var AWS = require('aws-sdk');
var fs = require('fs');


module.exports = {
  issue: issue,
  verify: verify,
  test: test
};

var opt = {}
  if (process.env.DEBUG) {
    opt = {
      region:'us-west-2',
      accessKeyId: process.env.accessKeyId,
      secretAccessKey: process.env.secretAccessKey
    }
  } else {
    opt = {region:'us-west-2'}
  }
var kms = new AWS.KMS(opt);

if (process.env.DEBUG) {
  test();
}

function test() {
  var claims = {
        iss: "https://botengine.com/",  // The URL of your service
        sub: "users/user1234",    // The UID of the user in your system
        scope: "self, admins"
      }
  // console.log("claims in token.test() are: " , claims)
  var t =
  issue(claims, function(err,t) {
    if (err) {
      console.log("Error issuing token: ", err)
    } else {
      verify(t, function(err, x) {
        console.log("the verified token is : ", x.toString())
      })
    }

  })
}
function issue(claims, callback) {

  getSigningKey(function(err, signingKey) {
      if(err) {
        console.log("Error getting signing key: ", err)
        callback(err, null)
      } else {
        var t = jwt.create(claims, signingKey).compact()
        if (process.env.DEBUG) {
          console.log("Created jwt is  ", t)
        }

        callback(null, t);

      }
    });

}

function verify(token, callback) {
  getSigningKey(function(err, signingKey) {
      if(err) {
        console.log("Error getting signing key: ", err)
        callback(err, null)
      } else {
        jwt.verify(token, signingKey, function(err, data) {
          if (err) {
            console.log("could not verify token ", err)
            callback(err, null);
          } else {
            if(process.env.DEBUG) {
              console.log('verified token: ', data);
            }
            callback(null,data);
          }
        })

      }
  })

}

function getSigningKey(callback) {

  var secretPath = './encrypted-secret';
  var encryptedSecret = fs.readFileSync(secretPath);
  var decryptionParams = {
    CiphertextBlob : encryptedSecret
  }

  kms.decrypt(decryptionParams, function(err, data) {
    if (err) {
      // console.log(err, err.stack, data? data['Plaintext'].toString() : "");
      callback(err,null)
    } else {
      callback(null, data.Plaintext)
    }
  });
}
