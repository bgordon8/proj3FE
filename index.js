console.log('here')

fetch('http://localhost:3000/users')
    .then(response => response.json())
    .then(users => handleData(users))

function handleData(users) {
    console.log(users)
    users.forEach(user => {
        const main2 = document.querySelector('#user')
        const userCard = document.createElement('div')
        userCard.classList.add(`user_card`)
        main2.append(userCard)

        renderUser(user, userCard)

        function renderUser(user, userCard) {
            const username = document.createElement('h1')
            const userHandicap = document.createElement('h2')
            username.innerHTML = user.name
            userHandicap.innerHTML = `Handicap: ${user.handicap}`
            userCard.append(username, userHandicap)
        }

        user.scores.forEach(score => {

            const main1 = document.querySelector('#score_cards')
            const scoreCard = document.createElement('div')
            scoreCard.classList.add(`score_card`)
            main1.append(scoreCard)
            renderScore(score, scoreCard)
        })

        function renderScore(score, scoreCard) {
            const holeId = document.createElement('h3')
            const strokes = document.createElement('h2')
            const chips = document.createElement('h2')
            const putts = document.createElement('h2')

            holeId.innerHTML = `Hole #${score.hole_id}:`
            strokes.innerHTML = `Strokes: ${score.strokes}`
            chips.innerHTML = `Chips: ${score.chips}`

            putts.innerHTML = `Putts: ${score.putts}`

            scoreCard.append(holeId, strokes, chips, putts)
        }

        user.holes.forEach(hole => {
            console.log(hole)
            const main = document.querySelector('#hole_card')
            const card = document.createElement('div')
            card.classList.add(`card-1`)
            main.append(card)
            renderHole(hole, card)
        })

        function renderHole(hole, card) {
            const holeHandicap = document.createElement('h3')
            const holeNumber = document.createElement('h1')
            const par = document.createElement('h2')
            const yards = document.createElement('h2')
            holeHandicap.innerHTML = `Hole Handicap: ${hole.handicap}`
            holeNumber.innerHTML = `Hole number: ${hole.number}`
            par.innerHTML = `Par: ${hole.par}`
            yards.innerHTML = `Yards: ${hole.yards}`
            card.append(holeNumber, yards, par, holeHandicap)
        }

        const courseContainer = document.querySelector('#course_card')
        const courseCard = document.createElement('div')
        const courseName = document.createElement('h1')
        const courseAddress = document.createElement('h2')
        const courseRating = document.createElement('h2')
        user.courses.forEach(course => {
            courseCard.classList.add(`course-card${course.id}`)
            courseName.innerHTML = course.name
            courseAddress.innerHTML = `Address: ${course.address}`
            courseRating.innerHTML = `Course Rating: ${course.rating}`
        })
        courseCard.append(courseName, courseAddress, courseRating)
        courseContainer.append(courseCard)
    })
}

const newUserForm = document.querySelector('#new-user-form')
newUserForm.addEventListener('submit', () => {
    event.preventDefault()
    const formData = new FormData(newUserForm)
    const name = formData.get('name')
    console.log(name)
    const password = formData.get('password')
    const handicap = formData.get('handicap')
    fetch('http://localhost:3000/users', {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            password: password,
            handicap: handicap,
        })
    })
})
const newScoreForm = document.querySelector('#score_form')
newScoreForm.addEventListener('submit', () => {
    event.preventDefault()
    const formData = new FormData(newScoreForm)
    const strokes = formData.get('strokes_form')
    const chips = formData.get('chips_form')
    const putts = formData.get('putts_form')
    fetch('http://localhost:3000/scores', {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            number: hole,
            strokes: strokes,
            chips: chips,
            putts: putts
        })
    })
})