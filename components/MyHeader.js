import React, { Component } from 'react'


// const topStyle= { backgroundColor: '#EEE', border: 'solid 1px black'}
// const boldStyle = { fontWeight: 'bold'}
// const italicStyle = { fontStyle : 'italic' }

const topStyle= { fontWeight: 'bold'}
const boldStyle = { fontWeight: 'bold'}
const italicStyle = { fontWeight: 'bold'}

const Title = () => {
  return  (
    <div className="container text-center">
      <div className="text-center clearfix">
        <span style={italicStyle}> botengine.io </span>
        <span style={boldStyle}>your</span> intentions,
        <span style={boldStyle}>our</span> bots.
        <br/>
      </div>
    </div>
  )
}

const Body = () => {
  return  (
    <div className="container text-center">
      <div className="row">
        <div className="col-md-4">
          <h1 style={italicStyle}>
            <span style={boldStyle}>&lt;mission&gt;</span>
              <br/>
              to automate workflows using natural language, intentions, and bots
              <br/>
              <span style={boldStyle}>&lt;/mission&gt;</span>
          </h1>
        </div>
        <div className="col-md-4">
          <img className="img-responsive" src="images/logo_transparent_gray.png" style={{width: "20vw"}} />
        </div>
        <div className="col-md-4">
          <h1 style={italicStyle}>
            <span style={boldStyle}>
              &lt;vision&gt;
            </span>
            <br/>
            <span style='text-decoration:underline'>your</span>
            intentions, processed through
            <span style='text-decoration:underline'>our</span>
            bots, seamlessly trigger actions in
            <span style='text-decoration:underline'>your</span>
            apps and systems.
            <br/>
            <span style={boldStyle}>
              &lt;/vision&gt;
            </span>
          </h1>
        </div>
      </div>
    </div>
  )
}

export default class MyHeader extends Component {
  render() {
      <div className="hero-section container" style={ topStyle } >
        <Title/>
        <Body/>
      </div>
  }
}
