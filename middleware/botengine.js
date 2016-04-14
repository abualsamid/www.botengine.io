
var rootURL = "";

console.log("exporting api url ", process.env.NODE_ENV)

if (process.env.NODE_ENV === "development") {
  rootURL  = "http://localhost:5000/"
} else {
  rootURL = "https://api.botengine.io/"
}


export  const API_ROOT  = rootURL
