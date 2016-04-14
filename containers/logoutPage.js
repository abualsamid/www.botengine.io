import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import * as actionCreators from '../actions'

class LogoutPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {

  }
  componentDidMount() {
    try {
      const { logout } = this.props

      logout()
    } catch(err) {
      console.log("Crap ", err)
    }
    try {
      this.context.router.push("/")

    } catch(x) {
      console.log("Doh ", x)
    }
  }
  render() {
    return (
      <div>
        adios
      </div>
    )
  }
}

LogoutPage.contextTypes = {
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

)(LogoutPage)
