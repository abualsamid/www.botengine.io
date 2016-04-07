import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class Nav extends Component {
  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to='/' activeClassName='active' className="navbar-brand">botengine.io</Link>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li>
                <Link to='/' activeClassName='active' className="navbar-brand">Home</Link>
              </li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
              <Link to='/pets'  className="navbar-brand">Pets</Link>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><a href="#">Action</a></li>
                  <li><a href="#">Another action</a></li>
                  <li><a href="#">Something else here</a></li>
                  <li role="separator" className="divider"></li>
                  <li className="dropdown-header">Nav header</li>
                  <li><a href="#">Separated link</a></li>
                  <li><a href="#">One more separated link</a></li>
                </ul>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><a href="../navbar/">Default</a></li>
              <li><a href="../navbar-static-top/">Static top</a></li>
              <li class="active"><a href="./">Fixed top <span class="sr-only">(current)</span></a></li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}
