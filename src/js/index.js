// @ts-check
// IMPORTACION ESTATICA
// import { User } from "./classes/User.js"
import { User } from 'classes/User'
import { SingletonDB } from 'classes/SingletonDB'
// import { simpleFetch } from './lib/simpleFetch.js'
import './lib/logger.js'// IMPORTACION DIRECTA
// import { ArticleFactory, ARTICLE_TYPES } from './classes/Article.js'

/** @import {Dieta} from "./classes/User.js" */

// Patrón: Observer
window.addEventListener('DOMContentLoaded', onDOMContentLoaded)

// Patrón Singleton
const USER_DB = new SingletonDB()// CONTROLLER
// const ARTICLES_DB = new SingletonDB()
const POKEMON_DB = new SingletonDB()

// const USER_DB = []
// Equivalencia:
// const USER_DB = new Array()

// VISTA
/**
 * Evento que se lanza cuando el contenido de la página ha sido cargado en memoria
 * y se puede acceder a él.
 * @listens DOMContentLoaded
 */
function onDOMContentLoaded() {
  let signInForm = document.getElementById('signInForm')
  let logInForm = document.getElementById('logInForm')
  let logOutForm = document.getElementById('logOutForm')
  let signOutForm = document.getElementById('signOutForm')

  // Patrón Factoría
  // const factoriaObjetos = new ArticleFactory()
  // // Creo varios artículos de ejemplo
  // console.log(factoriaObjetos.createArticle(ARTICLE_TYPES.SIMPLE, 'leche'))
  // console.log(factoriaObjetos.createArticle(ARTICLE_TYPES.COMPLEX, 'carne', 3, 4))
  // console.log(factoriaObjetos.createArticle(ARTICLE_TYPES.COMPLEX, 'fruta'))
  // console.log(factoriaObjetos.createTranslatedArticle(ARTICLE_TYPES.COMPLEX, 'fruta'))

  // IMPORTACION ASINCRONA
  import('../api/pokedex.json', { with: { type: "json" } }).then((codigoModulo) => {
    console.log('libreria importada asincronamente', codigoModulo.default.length)
    if (POKEMON_DB.get() === undefined) {
      console.log('inicializo el singleton de la base de datos de pokemons')
    }
    POKEMON_DB.push(...codigoModulo.default)
  }).catch((error) => console.error(error))

  // Patrón: Observer
  if (signInForm !== null){
    signInForm.addEventListener('submit', onSignIn)
  }
  logInForm?.addEventListener('submit', onLogIn)
  logOutForm?.addEventListener('submit', onLogOut)
  signOutForm?.addEventListener('submit', onSignOut)
  readUserDB()
  checkLoggedIn()
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
  let nameElement = document.getElementById('userName')
  let name = /** @type {HTMLInputElement} */(nameElement)?.value
  let emailElement = document.getElementById('userEmail')
  let email = /** @type {HTMLInputElement} */(emailElement)?.value

  // Buscar en la BBDD si existe el usuario
  let userExists = USER_DB.get().findIndex((user) => user.name === name && user.email === email)

  // Y notificar en consecuencia
  if (userExists >= 0) {
    // Guardamos los datos del usuario en la sesión
    sessionStorage.setItem('user', JSON.stringify(USER_DB.get()[userExists]))
    document.body.classList.add('loading')
    // Actualizo el interfaz
    setTimeout(() => {
      document.getElementById('userLink')?.classList.remove('hidden')
      document.getElementById('loginInMessageOk')?.classList.remove('hidden')
      document.getElementById('loginInMessageKo')?.classList.add('hidden')
      document.getElementById('signInForm')?.classList.add('hidden')
      document.getElementById('logInForm')?.classList.add('hidden')
      document.getElementById('logOutForm')?.classList.remove('hidden')
      document.getElementById('loginInMessageOk')?.classList.add('hidden')
      document.body.classList.remove('loading')
    }, 1000)
  } else {
    document.getElementById('loginInMessageKo')?.classList.remove('hidden')
    document.getElementById('loginInMessageOk')?.classList.add('hidden')
  }
}

/**
 * Checks if a user is logged in by verifying session storage for user data.
 * If a user is logged in, it updates the UI to show the user link and log out form,
 * while hiding the sign-in and log-in forms. If no user is logged in and the current
 * page is not the home page, it redirects to the home page.
 */
function checkLoggedIn() {
  if (sessionStorage.getItem('user')) {
    document.getElementById('userLink')?.classList.remove('hidden')
    document.getElementById('logOutForm')?.classList.remove('hidden')
    document.getElementById('signInForm')?.classList.add('hidden')
    document.getElementById('logInForm')?.classList.add('hidden')
  } else if (location.pathname !== '/index.html') {
    // Redirigimos a la home si el usuario no está identificado
    location.href = '/index.html'
  }
}

/**
 * Handles the log out form submission, prevents the default form behavior,
 * removes the user session data from session storage, and redirects to the home page.
 *
 * @param {Event} event - The event object associated with the form submission.
 */
function onLogOut(event) {
  event.preventDefault()
  // Eliminar la sesión del usuario
  sessionStorage.removeItem('user')
  location.href = '/index.html'
}

/**
 * Handles the sign-out form submission, prevents the default form behavior,
 * removes the user data from USER_DB, removes the user session data from session storage,
 * and redirects to the home page.
 *
 * @param {Event} event - The event object associated with the form submission.
 */
function onSignOut(event) {
  event.preventDefault()
  // Borro el usuario, si está identificado
  if (sessionStorage.getItem('user') && confirm('¿Estás seguro de borrar tu usuario?')) {
    let localStoredUser = sessionStorage.getItem('user')
    // Si no existe la clave 'user' en la sesión, localStoredUser es null
    if (localStoredUser === null) {
      // Asignamos una cadena de texto vacía, para no romper JSON.parse()
      localStoredUser = ''
    }
    USER_DB.deleteByEmail(JSON.parse(localStoredUser).email)
    updateUserDB()
    // Eliminar la sesión del usuario
    sessionStorage.removeItem('user')
    alert('Usuario borrado correctamente')
    location.href = '/index.html'
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
  let nameElement = document.getElementById('name')
  let name = /** @type {HTMLInputElement} */(nameElement)?.value
  let emailElement = document.getElementById('email')
  let email = /** @type {HTMLInputElement} */(emailElement)?.value
  /** @type {Dieta} */
  let dietaUsuario = {
    calorias: 2000,
    semana: {
      lunes: [],
      martes: [],
      miercoles: [],
      jueves: [],
      viernes: [],
    },
  }
  let newUser = new User(name, email, 18, dietaUsuario)
  // let newUser = new User(name, email)

  // Patron decorador:
  // logUser(newUser)
  // newUser.log()

  // Comprobamos si el usuario ya existe (por ejemplo por el email)
  /**
   * @callback filterUserCallback
   * @param {User} user
   * @returns number
   */
  /** @type {filterUserCallback} */
  let findIndexCallback = (user) => user.email === email
  if (USER_DB.get().findIndex(findIndexCallback) >= 0) {
    document.getElementById('signInMessageKo')?.classList.remove('hidden')
    return
  }
  document.getElementById('signInMessageKo')?.classList.add('hidden')

  USER_DB.push(newUser)
  updateUserDB()

  // Informo al usuario del resultado de la operación
  document.getElementById('signInMessageOk')?.classList.remove('hidden')
  setTimeout(() => {
    document.getElementById('signInMessageOk')?.classList.add('hidden')
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
    let localStoredUSER_DB = localStorage.getItem('USER_DB')
    // Si no existe la clave 'user' en local store, localStoredUSER_DB es null
    if (localStoredUSER_DB === null) {
      // Asignamos una cadena de texto vacía, para no romper JSON.parse()
      localStoredUSER_DB = ''
    }
    savedUsers = JSON.parse(localStoredUSER_DB)
      // Usamos la clase User también para montar la BBDD al cargar la página
      .map((/** @type {User} */user) => new User(user.name, user.email))
  }
  if (USER_DB.get() === undefined) {
    console.log('inicializo el singleton de la base de datos')
  }
  USER_DB.push(...savedUsers)
  // console.log(USER_DB.get())
}