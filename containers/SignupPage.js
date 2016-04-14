import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'



const SignupPage = (props) => {
  return (
    <div>

    <a id="button-google" className="button googleTie wide" href="https://accounts.google.com/o/oauth2/auth">
      <span class="google-button-title">
        Sign Up with your Google Account
      </span>
    </a>

    </div>
  )
}



export default connect(
  (state, ownProps) => ({

    }),
  (dispatch, ownProps) => ({})
)(SignupPage)
