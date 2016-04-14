import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import LoginPage from './containers/loginPage'
import SignupPage from './containers/SignupPage'
import Home from './components/home'
export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/login" component={LoginPage} />
    <Route path="/signup" component={SignupPage} />

  </Route>
)
