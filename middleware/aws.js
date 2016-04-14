import 'whatwg-fetch'

// Extracts the next page URL from Github API response.
function getNextPageUrl(response) {
  const link = response.headers.get('link')
  if (!link) {
    return null
  }

  const nextLink = link.split(',').find(s => s.indexOf('rel="next"') > -1)
  if (!nextLink) {
    return null
  }

  return nextLink.split(';')[0].slice(1, -1)
}

const GATEWAY_ROOT = "https://hh61e19vvk.execute-api.us-west-2.amazonaws.com/test/pets"

// function callApi(endpoint) {
//   const fullUrl = (endpoint.indexOf(GATEWAY_ROOT) === -1) ? GATEWAY_ROOT + endpoint : endpoint
//
//   return fetch(fullUrl)
//     .then(response =>
//       response.json().then(json => ({ json, response }))
//     ).then(({ json, response }) => {
//       if (!response.ok) {
//         return Promise.reject(json)
//       }
//
//       const nextPageUrl = getNextPageUrl(response)
//
//       return Object.assign({},
//         json,
//         { nextPageUrl }
//       )
//     })
// }

function callApi(endpoint) {
  const fullUrl = (endpoint.indexOf(GATEWAY_ROOT) === -1) ? GATEWAY_ROOT + endpoint : endpoint

  window.apigClient = window.apigClient || apigClientFactory.newClient();
  var params= {};
  var body = {};
  var additionalParams = {};

      window.apigClient.petsGet(params, body, additionalParams)
      .then(function(result){
          console.log('from api gateway: ', result);
          return result;
      }).catch( function(result){
        console.log('error in api gateway call: ', result);
        //This is where you would put an error callback
      });


}


// Action key that carries API call info interpreted by this Redux middleware.
export const API_GATEWAY = Symbol('API Gateway')

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {

  console.log('in middleware');

  const callAPI = action[API_GATEWAY]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint } = callAPI
  const { types } = callAPI

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[API_GATEWAY]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types

  console.log('in middleware... going to next');

  next(actionWith({ type: requestType }))

  return callApi(endpoint).then(
    response => next(actionWith({
      response,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened'
    }))
  )
}
