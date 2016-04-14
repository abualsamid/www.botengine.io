import 'whatwg-fetch'

// pets
export const REQUEST_PETS = 'REQUEST_PETS'
export const RECEIVED_PETS = 'RECEIVED_PETS'
export const FAILED_PETS = 'FAILED_PETS'
export const SUCCESS_LOGIN = 'SUCCESS_LOGIN'
export const FAILED_LOGIN = 'FAILED_LOGIN'
export const LOGOUT = "LOGOUT"

function requestPets() {
  return {
    type: REQUEST_PETS
  }
}

function receivedPets(json) {

  console.log('in receive pets, json is: ', json)
  return {
    type: RECEIVED_PETS,
    pets: json,
    receivedAt: Date.now()
  }
}

function failedPets() {
  return {
    type: FAILED_PETS
  }
}


export function successfulLogin(token, profile) {

  console.log('in successfulLogin , token is: ', token)
  try {
    return {
      type: SUCCESS_LOGIN,
      token: token,
      profile: profile,
      receivedAt: Date.now()
    }
  } catch(x) {
    console.log("in successfulLogin: ", x )
  }

}

export function logout() {
  console.log('signing off folks')
  try {
    return {
      type: LOGOUT,
      token: "",
      profile: {},
      email: "",
      isLoggedIn: false,
      receivedAt: Date.now()
    }
  } catch(x) {
    console.log("in logout: ", x)
  }

}

export function failedLogin() {
  return {
    type: FAILED_LOGIN
  }
}

export function fetchPets(endpoint="") {
  const fullUrl = endpoint === "" ? GATEWAY_ROOT : GATEWAY_ROOT +'/' + endpoint
  console.log('fetching...');
  return function(dispatch) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    dispatch(requestPets())

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.
    console.log('calling out to ', fullUrl)

    window.apigClient = window.apigClient || apigClientFactory.newClient();
    var params= {};
    var body = {};
    var additionalParams = {};

    return window.apigClient.petsGet(params, body, additionalParams)
      .then(function(result){
          console.log('from api gateway: ', result);
          if (!result) {
            console.log("failed on network.");
            return dispatch(failedPets("network down!"))
          }
          if (result.status!==200) {
            console.log("failed on network call: ", result.statusText);
            return dispatch(failedPets(result.statusText))
          }
          return dispatch(receivedPets(result.data))
      }).catch( function(result){
        console.log('error in api gateway call: ', result);
        dispatch(failedPets("wtf?"))
        // Let the calling code know there's nothing to wait for.
        return Promise.resolve()

      });

    // return fetch(fullUrl)
    //   .then(response =>response.json().then(json => ({json,response})))
    //   .then( ({json,response}) => {
    //     if (!response.ok) {
    //       console.log('failed on network fetch ', response.statusText);
    //       return dispatch(failedPets(response.statusText))
    //     }
    //     console.log('received json ', json)
    //     dispatch(receivedPets(json))
    //   })
    //   .catch( (err) => {
    //     console.log('Network error on request: ', err);
    //     dispatch(failedPets("wtf?"))
    //     // Let the calling code know there's nothing to wait for.
    //     return Promise.resolve()
    //   })
  }
}

function shouldFetchPets(state) {

  try {
    console.log('resolving should fetch pets: ', state)
  } catch(x) {}
  try {
    if (!state.pets) {
      return true
    } else if (state.pets.isFetching) {
      return false
    } else {
      return state.pets.didInvalidate
    }
  } catch(x) {
    return true;
  }

}

export function fetchPetsIfNeeded(endpoint="") {

  // Note that the function also receives getState()
  // which lets you choose what to dispatch next.

  // This is useful for avoiding a network request if
  // a cached value is already available.

  return (dispatch, getState) => {
    console.log("Dispatching In fetchPetsIfNeeded ")
    if (shouldFetchPets(getState())) {
      // Dispatch a thunk from thunk!
      return dispatch(fetchPets(""))
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve()
    }
  }
}

// pets



export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

// Resets the currently visible error message.
export function resetErrorMessage() {
  return {
    type: RESET_ERROR_MESSAGE
  }
}

export function triggerLogin(email) {
  return {
    type: SUCCESS_LOGIN ,
    email: email,
    isLoggedIn: true
  }
}
