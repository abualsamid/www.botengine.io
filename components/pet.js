import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'


const Pet = ({id, price, type}) => (
  <div className="pet">
    <li>
      {type}
    </li>
  </div>
)

Pet.propTypes = {
  pet: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.string
  }).isRequired
}
