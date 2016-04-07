import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

const rawFaq = require("../templates/faq.html");
const whatWeDo = require("../templates/whatwedo.html");

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

export default class Home extends Component {
  render() {
    return (
      <div>
        <HowItWorks />
        <br/>
        <FAQ />
      </div>
    )
  }
}
