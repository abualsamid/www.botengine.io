import React, { Component, PropTypes } from 'react'
import { API_ROOT } from '../middleware/botengine'
import { connect } from 'react-redux'

class Dashboard extends Component {
    constructor(props) {
      super(props)
      this.state = { hello: "pending..."};
    }
    componentDidMount() {
      let self = this
      const {email, token} = this.props
      fetch(API_ROOT  + "test/hello", {
        headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json' ,
         'Authorization' : 'Bearer ' + token
        },
        method:"GET",
        mode: "cors",
        cache: "default",
        credentials: true
      })
      .then(function(res) {
        if (res.ok) {
          return res.json();
        } else {
          console.log("Network error in response.")
        }
      })
      .then(function(data) {
        self.setState({hello: data.hello})
        // localStorage.setItem('token',token.token)
        // successfulLogin(token.token, profile)
        // router.push('/Dashboard');
      })
      .catch(function(err) {
        console.log("Error in dashboard render:", err)
        self.setState({hello: err.message})
      })
    }
    render() {
      const {email, token} = this.props
      return (
        <div>
          Congrats you made it.
          <br/>
          signed on as: {email}
          <br/>
          <div>
            This is your dashboard, make me proud.
          </div>
          <div>
            From the server: {this.state.hello}
          </div>
        </div>

      )
    }
}

export default connect(
  (state) => (
    {
      token: state.login.token,
      email: state.login.email
    }

  )

)(Dashboard)
