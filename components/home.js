import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

const rawFaq = require("../templates/faq.html");
const whatWeDo = require("../templates/whatwedo.html");
const topStyle= { backgroundColor: '#EEE', border: 'solid 1px black'}
const boldStyle = { fontWeight: 'bold'}
const italicStyle = { fontStyle : 'italic' }

const HowItWorks = () => {
  return  (
    <section className="howitworks"  dangerouslySetInnerHTML={{__html: whatWeDo}}>
    </section>
  )
}

const FAQ = () => {
  const topStyle = { backgroundColor: "#CCC", border: "1px solid black"}
  return  (
            <section className="howitworks"  dangerouslySetInnerHTML={{__html: rawFaq}}>
            </section>
          )
}


const Title = () => {
  return  (
    <div className="container clearfix text-center">
      <div className="row">
        <div className="col-md-12">
          <span>
            <span style={italicStyle}>bot<span style={{fontWeight: 'bold'}}>engine</span>.io</span>
          </span>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <span style={boldStyle}>intentions </span>
           in
          <span style={boldStyle}> flow</span>
        </div>
      </div>
    </div>
  )
}
const Mission = () => {
  return (
    <div className="col-md-4">
      <h1 style={italicStyle}>
        <span style={boldStyle}>&lt;mission&gt;</span>
          <br/>
          automate workflows using natural language, intentions, and bots
          <br/>
          <span style={boldStyle}>&lt;/mission&gt;</span>
      </h1>
    </div>

  )
}
const Vision = () => {
  return (
    <div className="col-md-4">
      <h1 style={italicStyle}>
        <span style={boldStyle}>
          &lt;vision&gt;
        </span>
        <br/>
        <span style={{textDecoration: "underline", paddingRight: "0.5ch"}}>your</span>
        <span>{ }</span>
         intentions
        <span> + </span>
        <span style={{textDecoration: "underline", padding: "0.5ch"}}>our</span>
        <span>{ }</span>
        bots
        <span> = </span>
        <span style={{textDecoration: "underline", padding: "0.5ch"}}>your</span>
          workflow
        <br/>
        <span style={boldStyle}>
          &lt;/vision&gt;
        </span>
      </h1>
    </div>
  )
}
const Logo = () => {
  return (
    <div className="col-md-4">
      <img className="img-responsive" src="images/logo_transparent_gray.png" style={{width: "20vw"}} />
    </div>

  )
}
const TheBody = () => {
  return  (
    <div className="container text-center">
      <div className="row">
        <Mission />
        <Logo />
        <Vision />
      </div>
    </div>
  )
}

const  MyHeader = () => {
  return (
    <header className="hero-section container" style={ topStyle } >
      <Title/>
      <TheBody/>
    </header>
  )

}


export default class Home extends Component {
  render() {
    return (
      <div>
        <MyHeader />
        <br/>

        <HowItWorks />
        <br/>
        <FAQ />
      </div>
    )
  }
}
