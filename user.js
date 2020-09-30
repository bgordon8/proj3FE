const searchParams = new URLSearchParams(window.location.search)
const id = searchParams.get('id')

fetch(`http://localhost:3000/users/2`)
    .then(response => response.json())
    .then(user => handleData(user))

function handleData(user) {
    console.log(user)

    const main2 = document.querySelector('#user')
    const userCard = document.createElement('div')
    userCard.classList.add(`user_card`)
    main2.append(userCard)

    renderUser(user, userCard)

}

function renderUser(user, userCard) {
    const username = document.createElement('h1')
    const userHandicap = document.createElement('h2')
    username.innerHTML = user.name
    userHandicap.innerHTML = `Handicap: ${user.handicap}`
    userCard.append(username, userHandicap)
}


const playHole1 = document.createElement('button')
playHole1.innerHTML = 'Hole1'
document.body.append(playHole1)


playHole1.addEventListener('click', () => {
    window.location = 'hole1.html'
})

const playHole2 = document.createElement('button')
playHole2.innerHTML = 'Hole2'
document.body.append(playHole2)


playHole2.addEventListener('click', () => {
    window.location = 'hole2.html'
})

// const baseUrl = 'http://localhost:3000/users'
// const createuserForm = document.querySelector('createUser')

// createuserForm.addEventListener('submit', createNewUser)

// function createNewUser(event) {
//     event.preventDefault()
//     const newUserFormData = new FormData(event.target)
//     const username = newUserFormData.get('username')
//     const password = newUserFormData.get('password')
//     const newUser = { username, password }



//     fetch(baseUrl, {
//         method: "POST",
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ user: newUser })
//     }).then(handleResponse)
//         .then(user => {
//             if (user.errors) {
//                 throw new Error(user.errors[0])
//             }
//             window.location.replace(`/profile.html?id=${user.id}`)

//         })
//         .catch(error => console.error(error))
// }

// function handleResponse(response) {
//     console.log(response)
//     if (response.ok) {
//         return response.json()
//     } else {
//         throw new Error('You done goofed')
//     }
// }

// function parseJson(response) {
//     return response.json{ }
// }