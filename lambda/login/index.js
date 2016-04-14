// process login submission on Lambda.
// The user would have authenticated on the front end (with google for example)
// we would then
// 1) (todo) authenticate against google on the back end to make sure peep is good to go and no man
// in the middle attack.
// 2) issue a jwt and send back to app to save in localstorage or whatever.

console.log('Loading process login function ');

require('dotenv').load(); // Load up first so deps can use these as well

var AWS = require('aws-sdk');


var token        = require('botengine-token'),
    user         = require('botengine-user');


if (process.env.DEBUG) {
  test(function(err, token) {
    if(err) {
      console.log("[TEST] ... failed. ", err);
    } else {
      console.log("[TEST] The token is ", token);
    }
  })
}
  /*
  {
    "sourceId": "117589924757827990963",
    "name": "Ahmad Abualsamid",
    "email": "ahmad@abualsamid.com",
    "imageURL": "https://lh5.googleusercontent.com/-I2Z0TMlXCYA/AAAAAAAAAAI/AAAAAAAAAEs/93k5mJXnO2Q/s96-c/photo.jpg",
    "access_token": "ya29..wAKoYm69EsiBCQdRNPFCvIkE38nprN8pLfU7H0iygqcSm8gh3Rupz0eJKiPHony6zH4",
    "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjZmZmExOGQxNTYwMmY3YzVkMDZjZTY2OTdkMWRjMDBkZDJlZGU2MTAifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXRfaGFzaCI6IlBvdm1GOWx4aEY1bW5WekdKeV9YS1EiLCJhdWQiOiI3ODk2ODQ3MTI4MDQtbnI3cDU2dTRncmV2NTVjdDZsa3VqYzdpaDNwZnBtZXEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTc1ODk5MjQ3NTc4Mjc5OTA5NjMiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXpwIjoiNzg5Njg0NzEyODA0LW5yN3A1NnU0Z3JldjU1Y3Q2bGt1amM3aWgzcGZwbWVxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiaGQiOiJhYnVhbHNhbWlkLmNvbSIsImVtYWlsIjoiYWhtYWRAYWJ1YWxzYW1pZC5jb20iLCJpYXQiOjE0NjAyNTY2ODksImV4cCI6MTQ2MDI2MDI4OSwibmFtZSI6IkFobWFkIEFidWFsc2FtaWQiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDUuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1JMlowVE1sWENZQS9BQUFBQUFBQUFBSS9BQUFBQUFBQUFFcy85M2s1bUpYbk8yUS9zOTYtYy9waG90by5qcGciLCJnaXZlbl9uYW1lIjoiQWhtYWQiLCJmYW1pbHlfbmFtZSI6IkFidWFsc2FtaWQiLCJsb2NhbGUiOiJlbiJ9.sYJBKR52GNEZspag8gbCHRifNarMa7zr3imIEbDwVDybK30oHTUkCOJe8vYbnrDl5T78DuX9H_2qbqBOSTdT17tyM9qPoykYCZApFmThr08xI0w_2CzGYmpn7EzGtwvtMSzFu4qP_fpbZT4Qw1Xw6Xtg-Ia8GzQAEbgZpG_rdmomhGnNUt168L292cyjYFL-UxCwUuC2AJvXBE5V6dszyOL0H0AXGafK8_1AzbS1cyIaFkfsagBoIbfcmmb4D5ZlSjroeay3MHXBY1w6-dx48XEWSSogAfmAuQtXds_0HEeFHuq_Tdt5jaswyqLEAU8gOFgRIUD7y0Ky6UpacW4vNA",
    "idpId": "google",
    "expires_at": 1460260289433,
    "expires_in": 3600,
    "id" : "google/117589924757827990963"
  }
  */

function test(callback) {
  var profile = {
    sourceId: "117589924757827990963",
    name: "Ahmad Abualsamid",
    email: "ahmad@abualsamid.com",
    imageURL: "https://lh5.googleusercontent.com/-I2Z0TMlXCYA/AAAAAAAAAAI/AAAAAAAAAEs/93k5mJXnO2Q/s96-c/photo.jpg",
    access_token: "ya29..wAKoYm69EsiBCQdRNPFCvIkE38nprN8pLfU7H0iygqcSm8gh3Rupz0eJKiPHony6zH4",
    id_token: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjZmZmExOGQxNTYwMmY3YzVkMDZjZTY2OTdkMWRjMDBkZDJlZGU2MTAifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXRfaGFzaCI6IlBvdm1GOWx4aEY1bW5WekdKeV9YS1EiLCJhdWQiOiI3ODk2ODQ3MTI4MDQtbnI3cDU2dTRncmV2NTVjdDZsa3VqYzdpaDNwZnBtZXEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTc1ODk5MjQ3NTc4Mjc5OTA5NjMiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXpwIjoiNzg5Njg0NzEyODA0LW5yN3A1NnU0Z3JldjU1Y3Q2bGt1amM3aWgzcGZwbWVxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiaGQiOiJhYnVhbHNhbWlkLmNvbSIsImVtYWlsIjoiYWhtYWRAYWJ1YWxzYW1pZC5jb20iLCJpYXQiOjE0NjAyNTY2ODksImV4cCI6MTQ2MDI2MDI4OSwibmFtZSI6IkFobWFkIEFidWFsc2FtaWQiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDUuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1JMlowVE1sWENZQS9BQUFBQUFBQUFBSS9BQUFBQUFBQUFFcy85M2s1bUpYbk8yUS9zOTYtYy9waG90by5qcGciLCJnaXZlbl9uYW1lIjoiQWhtYWQiLCJmYW1pbHlfbmFtZSI6IkFidWFsc2FtaWQiLCJsb2NhbGUiOiJlbiJ9.sYJBKR52GNEZspag8gbCHRifNarMa7zr3imIEbDwVDybK30oHTUkCOJe8vYbnrDl5T78DuX9H_2qbqBOSTdT17tyM9qPoykYCZApFmThr08xI0w_2CzGYmpn7EzGtwvtMSzFu4qP_fpbZT4Qw1Xw6Xtg-Ia8GzQAEbgZpG_rdmomhGnNUt168L292cyjYFL-UxCwUuC2AJvXBE5V6dszyOL0H0AXGafK8_1AzbS1cyIaFkfsagBoIbfcmmb4D5ZlSjroeay3MHXBY1w6-dx48XEWSSogAfmAuQtXds_0HEeFHuq_Tdt5jaswyqLEAU8gOFgRIUD7y0Ky6UpacW4vNA",
    idpId: "google",
    expires_at: 1460260289433,
    expires_in: 3600,
    id : "google" + "/" + "117589924757827990963"
  }


  console.log("[TEST] processing login for \n", profile);

  createAuth(profile, function(err, token) {
    if (err) {
      callback(err, {
        status: 400,
        message: 'Authentication Failed',
        error: err
      });
      //context.fail(err);
    } else {
      console.log("[TEST] returning result to caller: ", token);
      callback(null, token);
      //context.succeed(token);
    }
  });
  console.log("[TEST] what am i doing here?");
}

module.exports.handler = function(profile, context, callback) {

  // incoming query looks like this
    // id: profile.getId(),
    // name: profile.getName(),
    // email: profile.getEmail()
    // imageURL: profile.getImageUrl(),
    // access_token: auth.access_token,
    // id_token: auth.id_token,
    // idpId: auth.idpId,
    // expires_at: auth.expires_at,
    // expires_in: auth.expires_in,
    // first_issued_at: auth.first_issued_at,
    // login_hint: auth.login_hint,
    // scope: auth.scope

  // console.log("processing login for \n", profile);

  createAuth(profile, function(err, token) {
    if (err) {
      callback(err, {
        status: 400,
        message: 'Authentication Failed',
        error: err
      });
      // context.fail(err);
    } else {
      // console.log("returning result to caller: ", token);
      callback(null, token);
      // context.succeed(token);
    }
  });
  // console.log("what am i doing here?");
};



function createAuth(profile, callback) {
    if (profile.id_token) {
      // should call out to Google to verify id_token.

      // if google says it is ok, then we need to lookup/create the user in our dynamo

      // then we need to return the jwt
        // {
        //   id: profile.getId(),
        //   name: profile.getName(),
        //   email: profile.getEmail()
        //   imageURL: profile.getImageUrl(),
        //   access_token: auth.access_token,
        //   id_token: auth.id_token,
        //   idpId: auth.idpId,
        //   expires_at: auth.expires_at,
        //   expires_in: auth.expires_in,
        //   first_issued_at: auth.first_issued_at,
        //   login_hint: auth.login_hint,
        //   scope: auth.scope
        // }
      var claims = {
        iss: "https://botengine.com/",  // The URL of your service
        sub: profile.idpId + "/" + profile.sourceId ,    // The UID of the user in your system
        scope: "self, admins"
      }

      token.issue(claims, function(err, token) {
        if(err) {
          callback(err,null);
        } else {
          user.findOrCreate(profile)
          .then(function(goodUserRecord) {
            console.log("The clean user record: ", goodUserRecord)
          })
          callback(null, token);
        }
      });
    } else {
      callback({ message: "This invalid login. Go Away ." },null);
    }
}
