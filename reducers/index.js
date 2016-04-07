import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'


function fetchPets(state = { isFetching: false,
    didInvalidate: true,
    items:[]}, action) {

  switch(action.type) {
    case ActionTypes.REQUEST_PETS:
      return Object.assign({}, state, {isFetching:true, didInvalidate: false})
    break;
    case ActionTypes.RECEIVED_PETS:
      console.log('reducing ...', action )
      return Object.assign({},state, {
        items: action.pets,
        isFetching: false,
        didInvalidate: false,
        lastUpdated: action.receivedAt
      })
    break;
    case ActionTypes.FAILED_PETS:
      return Object.assign({},state, {
        isFetching: false,
        didInvalidate: true,
        lastUpdated: action.receivedAt

      })
    break;
    default:
      return state;
  }
}

function pets(state = { isFetching: false,
    didInvalidate: true,
    items:[]}, action) {
  switch (action.type) {
    case ActionTypes.FAILED_PETS:
    case ActionTypes.RECEIVED_PETS:
    case ActionTypes.REQUEST_PETS:
      let g = Object.assign({}, state, fetchPets(state, action))
      console.log('reduction ',g )
      return g
    default:
      return state
  }
}

// Updates error message to notify about the failed fetches.
function errorMessage(state = null, action) {
  const { type, error } = action

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return action.error
  }

  return state
}


const rootReducer = combineReducers({
  errorMessage,
  routing,
  pets
})

export default rootReducer
