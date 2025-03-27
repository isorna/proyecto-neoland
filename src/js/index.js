import { User } from "./classes/User.js"

window.addEventListener("DOMContentLoaded", onDOMContentLoaded)

const USER_DB = []

/**
 * Evento que se lanza cuando el contenido de la página ha sido cargado en memoria
 * y se puede acceder a él.
 * @listens DOMContentLoaded
 */
function onDOMContentLoaded() {
  let signInForm = document.getElementById('signInForm')

  signInForm.addEventListener('submit', onSignIn)
  readUserDB()
}

/**
 * Handles the sign-in form submission, prevents the default form behavior,
 * retrieves user input values, creates a new User instance, and adds it to
 * the USER_DB array. Finally, logs the updated USER_DB to the console.
 *
 * @param {Event} event - The event object associated with the form submission.
 */
function onSignIn(event) {
  event.preventDefault()
  let name = document.getElementById('name').value
  let email = document.getElementById('email').value
  let newUser = new User(name, email)

  USER_DB.push(newUser)
  updateUserDB()
}

/**
 * Updates the local storage with the latest state of the USER_DB array.
 */
function updateUserDB() {
  localStorage.setItem('USER_DB', JSON.stringify(USER_DB))
}

/**
 * Reads the USER_DB array from local storage and updates the global USER_DB
 * array with the read data.
 *
 * If no data is found in local storage, the global USER_DB is left unchanged.
 *
 * @returns {void}
 */
function readUserDB() {
  let savedUsers = []

  if (localStorage.getItem('USER_DB')) {
    savedUsers = JSON.parse(localStorage.getItem('USER_DB'))
  }
  USER_DB.push(...savedUsers)
  console.log(USER_DB)
}