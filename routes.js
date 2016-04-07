import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import PetPage from './containers/petPage'
import Home from './components/home'
export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/pets" component={PetPage} />


  </Route>
)
