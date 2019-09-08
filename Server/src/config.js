export const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : window.location.origin
console.log("API_URL", process.env.NODE_ENV, API_URL)