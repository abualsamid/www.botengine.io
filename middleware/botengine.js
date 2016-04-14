
var rootURL = "";

if (process.env.NODE_ENV === 'development') {
  rootURL  = "http://localhost:5000/"
} else {
  rootURL = "https://api.botengine.io/"
}


export  const API_ROOT  = rootURL
