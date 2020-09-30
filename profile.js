const baseURL = 'http://localhost:3000'
const profileURL = `${baseURL}/profile`

const authHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.token}`
}

console.log(localStorage.token)

fetch(profileURL, { headers: authHeaders })
    .then(response => response.json())
    .then(console.log)