import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchPetsIfNeeded } from '../actions'



const Pet = ({type, price}) => (
  <li>
    {type} : {price}
  </li>
)

const PetPage = ({pets, onClick}) => {
  return (
    <div>
      <h5>List of Pets </h5>
      <ul>
        {
          pets.map(pet =>
            <Pet key={pet.id}
            {...pet}
            />
          )
        }
      </ul>

      <button onClick= {e => {
         e.preventDefault()
         onClick()
       }} className="btn btn-primary">Click Me {Date.now()}</button>
    </div>
  )
}


// PetPage.PropTypes = {
//   pets: React.PropTypes.array
// }




const mapDispatchToProps = (dispatch,ownProps) => {
  return {
    onClick: () => {
      dispatch(fetchPetsIfNeeded(""))
    }
  }
}
export default connect(
  (state, ownProps) => ({
      pets: state.pets.items ||[]
    }),
  mapDispatchToProps
)(PetPage)
