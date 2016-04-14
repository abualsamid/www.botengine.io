import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import GoogleLogin from 'react-google-login'
import { triggerLogin } from '../actions'
import { API_ROOT } from '../middleware/botengine'
import { successfulLogin, failedLogin } from '../actions'

import * as actionCreators from '../actions'
// https://developers.google.com/identity/sign-in/web/server-side-flow



function responseGoogle(googleUser) {
  // console.log('response from google: ', googleUser);


  // if (authResult['code']) {
  //
  //   // Hide the sign-in button now that the user is authorized, for example:
  //
  //   // Send the code to the server
  //   // dispatch redux action to go to server
  //
  //   $.ajax({
  //     type: 'POST',
  //     url: 'http://example.com/storeauthcode',
  //     contentType: 'application/octet-stream; charset=utf-8',
  //     success: function(result) {
  //       // Handle or verify the server response.
  //     },
  //     processData: false,
  //     data: authResult['code']
  //   });
  // } else {
  //   // dispatch redux action to show error
  //   // There was an error.
  // }
}


class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.gooleResponse = this.gooleResponse.bind(this)
    this.processLogin = this.processLogin.bind(this)
    this.renderLoginOptions = this.renderLoginOptions.bind(this)
  }

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {

  }
  debugInfo(profile) {

    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
    console.log("The id_token is: " + id_token);
    console.log("The Auth Response is : " + googleUser.getAuthResponse());
  }


  processLogin(profile) {

    console.log("In process login ...\n ");
    const { successfulLogin, failedLogin, history } = this.props
    const { router } = this.context
    try {
      // console.log(JSON.stringify(profile));
      fetch(API_ROOT  + "token-auth", {
        headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
        },
        method:"POST",
        body: JSON.stringify(profile)
      })
      .then(function(res) {
        return res.json();
      })
      .then(function(token) {
        localStorage.setItem('token',token.token)
        console.log("Going to dispatch ... ", JSON.stringify(token))
        successfulLogin(token.token, profile)
        router.push('/Dashboard');
      })
      .catch(function(err) {
        console.log("Error in process login:", err)
        failedLogin()
      })
    } catch(x) {
      console.log(x);
    }
  }

  gooleResponse(googleUser) {

    console.log("test me...")
    try {
      var profile = googleUser.getBasicProfile();
      var auth = googleUser.getAuthResponse();
      var id_token = auth.id_token;
      this.processLogin({
          "id": auth.idpId + "/" + profile.getId(),
          "sourceId": profile.getId(),
          "name": profile.getName(),
          "email": profile.getEmail(),
          "imageURL": profile.getImageUrl(),
          "access_token": auth.access_token,
          "id_token": auth.id_token,
          "idpId": auth.idpId,
          "expires_at": auth.expires_at,
          "expires_in": auth.expires_in,
          "first_issued_at": auth.first_issued_at,
          "login_hint": auth.login_hint,
          "scope": auth.scope
      });

    } catch(x) {
      console.log(x);
    }
  }
  renderLoginOptions() {
    const { isLoggedIn, email } = this.props
    if (isLoggedIn) {
      return (
        <div>
          You are authenticated as { email }
        </div>
      )
    } else {
      return (
        <div>
          <GoogleLogin
            clientId="789684712804-nr7p56u4grev55ct6lkujc7ih3pfpmeq.apps.googleusercontent.com"
            callback={this.gooleResponse} />

        </div>
      )
    }
  }
  render() {
    return (
      <div className="container text-center">
        {this.renderLoginOptions()}
      </div>
    )
  }
}

LoginPage.contextTypes = {
  router: React.PropTypes.object.isRequired
}
export default connect(
  (state, ownProps) => (
    {
      email: state.login.email,
      isLoggedIn: state.login.isLoggedIn
    }
  ),
  actionCreators

)(LoginPage)
