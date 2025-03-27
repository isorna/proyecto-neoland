import { User, logUser } from "./classes/User.js"
import { SingletonDB } from './classes/SingletonDB.js'
import { ArticleFactory, ARTICLE_TYPES } from './classes/Article.js'

// Patrón: Observer
window.addEventListener('DOMContentLoaded', onDOMContentLoaded)

// Patrón Singleton
const USER_DB = new SingletonDB()
const ARTICLES_DB = new SingletonDB()

// const USER_DB = []
// Equivalencia:
// const USER_DB = new Array()

/**
 * Evento que se lanza cuando el contenido de la página ha sido cargado en memoria
 * y se puede acceder a él.
 * @listens DOMContentLoaded
 */
function onDOMContentLoaded() {
  let signInForm = document.getElementById('signInForm')
  let logInForm = document.getElementById('logInForm')

  // Patrón Factoría
  const factoriaObjetos = new ArticleFactory()
  // Creo varios artículos de ejemplo
  console.log(factoriaObjetos.createArticle(ARTICLE_TYPES.SIMPLE, 'leche'))
  console.log(factoriaObjetos.createArticle(ARTICLE_TYPES.COMPLEX, 'carne', 3, 4))
  console.log(factoriaObjetos.createArticle(ARTICLE_TYPES.COMPLEX, 'fruta'))
  console.log(factoriaObjetos.createTranslatedArticle(ARTICLE_TYPES.COMPLEX, 'fruta'))

  // Patrón: Observer
  signInForm.addEventListener('submit', onSignIn)
  logInForm.addEventListener('submit', onLogIn)
  readUserDB()
}

/**
 * Handles the login form submission, prevents the default form behavior,
 * retrieves user input values, checks if a user exists in the USER_DB array,
 * and logs the result to the console.
 *
 * @param {Event} event - The event object associated with the form submission.
 */
function onLogIn(event) {
  event.preventDefault()
  let name = document.getElementById('userName').value
  let email = document.getElementById('userEmail').value

  // Buscar en la BBDD si existe el usuario
  let userExists = USER_DB.get().findIndex((user) => user.name === name && user.email === email)

  // Y notificar en consecuencia
  if (userExists >= 0) {
    document.getElementById('loginInMessageOk').classList.toggle('hidden')
    // Oculto los formularios
    setTimeout(() => {
      document.getElementById('signInForm').classList.toggle('hidden')
      document.getElementById('logInForm').classList.toggle('hidden')
    }, 500)
  } else {
    document.getElementById('loginInMessageKo').classList.toggle('hidden')
  }
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

  // Patron decorador:
  logUser(newUser)
  newUser.log()

  USER_DB.push(newUser)
  updateUserDB()

  // Informo al usuario del resultado de la operación
  document.getElementById('signInMessageOk').classList.toggle('hidden')
  setTimeout(() => {
    document.getElementById('signInMessageOk').classList.toggle('hidden')
  }, 1000)
}

/**
 * Updates the local storage with the latest state of the USER_DB array.
 */
function updateUserDB() {
  localStorage.setItem('USER_DB', JSON.stringify(USER_DB.get()))
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
      // Usamos la clase User también para montar la BBDD al cargar la página
      .map((user) => new User(user.name, user.email))
  }
  if (USER_DB.get() === undefined) {
    console.log('inicializo el singleton de la base de datos')
  }
  USER_DB.push(...savedUsers)
  console.log(USER_DB.get())
}