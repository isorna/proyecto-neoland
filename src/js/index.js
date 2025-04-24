// @ts-check
import { User } from 'classes/User'
import { simpleFetch } from 'lib/simpleFetch'
import { HttpError } from 'classes/HttpError'
import { store, INITIAL_STATE } from 'store/redux'
/** @import {State} from './store/redux.js' */
/** @import {Article} from './classes/Article.js' */

// Preparación para cuando trabajemos con express
const API_PORT = location.port ? `:${1337}` : ''
const TIMEOUT = 10000

window.addEventListener('DOMContentLoaded', onDOMContentLoaded)

// Patrón Singleton
// const USER_DB = new SingletonDB()

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

  signInForm?.addEventListener('submit', onSignIn)
  logInForm?.addEventListener('submit', onLogIn)
  logOutForm?.addEventListener('submit', onLogOut)
  signOutForm?.addEventListener('submit', onSignOut)
  readUsersFromLocalStorage()
  checkLoggedIn()
  // DEBUG:
  console.log('CONTENIDO DE REDUX AL CARGAR LA PÁGINA', store.getState())

  window.addEventListener('stateChanged', onStateChanged)
}

/**
 * Handles a state change event from the store
 * @param {Event} event - The event object associated with the state change
 * @listens stateChanged
 */
function onStateChanged(event) {
  console.log('onStateChanged', /** @type {CustomEvent} */(event).detail)
}

/**
 * Handles the login form submission, prevents the default form behavior,
 * retrieves user input values, checks if a user exists in the USER_DB array,
 * and logs the result to the console.
 *
 * @param {Event} event - The event object associated with the form submission.
 */
async function onLogIn(event) {
  event.preventDefault()
  let nameElement = document.getElementById('userName')
  let name = /** @type {HTMLInputElement} */(nameElement)?.value
  let emailElement = document.getElementById('userEmail')
  let email = /** @type {HTMLInputElement} */(emailElement)?.value
  let newUser = new User(name, email, 'user')
  // Para cuando usemos express:
  const payload = JSON.stringify(newUser)

  // Buscar en la BBDD si existe el usuario
  // Usamos una petición HTTP para comprobar si el usuario existe
  // @ts-expect-error: TODO Arreglarlo bien luego
  const apiData = JSON.parse(await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/login`, 'POST', payload))
  // Y notificar en consecuencia
  if (apiData.length >= 0) {
    // Guardamos los datos del usuario en la sesión
    // sessionStorage.setItem('user', JSON.stringify(USER_DB.get()[userExists]))
    let userFromREDUX = store.user.getByEmail?.(email)
    sessionStorage.setItem('user', JSON.stringify(userFromREDUX))
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
    // Comprobar si en apiData existe algún error
    console.error(apiData)
    document.getElementById('loginInMessageKo')?.classList.remove('hidden')
    document.getElementById('loginInMessageOk')?.classList.add('hidden')
    if (/** @type {any} */(apiData)?.error === true) {
      console.error(/** @type {any} */(apiData)?.message)
      window.alert(/** @type {any} */(apiData)?.message)
      return
    }
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
    // USER_DB.deleteByEmail(JSON.parse(localStoredUser).email)
    store.user.delete(JSON.parse(localStoredUser))
    // console.log('compruebo que esté borrado el usuario', store.user.getAll())
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
async function onSignIn(event) {
  event.preventDefault()
  let nameElement = document.getElementById('name')
  let name = /** @type {HTMLInputElement} */(nameElement)?.value
  let emailElement = document.getElementById('email')
  let email = /** @type {HTMLInputElement} */(emailElement)?.value
  let newUser = new User(name, email, 'user')
  // Transformación de User a URLSearchParams para el fetch
  // const payload = new URLSearchParams(/** @type {any} */(newUser))
  // Para cuando usemos express:
  const payload = JSON.stringify(newUser)

  // Comprobamos si el usuario ya existe (por ejemplo por el email)
  if (store.user.getByEmail?.(email) !== undefined) {
    document.getElementById('signInMessageKo')?.classList.remove('hidden')
    return
  }
  document.getElementById('signInMessageKo')?.classList.add('hidden')
  // Sustituir por llamada fetch al servidor de apis
  // Enviar el fetch a la API, crear nuevo usuario
  const apiData = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/create/users`, 'POST', payload)
  if (!apiData) {
    // Informo al usuario del resultado de la operación
    document.getElementById('signInMessageKo')?.classList.remove('hidden')
    setTimeout(() => {
      document.getElementById('signInMessageKo')?.classList.add('hidden')
    }, 1000)
    console.error('Error al crear usuario', apiData)
    return
  }
  console.log('Respuesta del servidor de APIs', apiData)
  // store.user.create(newUser, () => {
    updateUserDB()
    // Informo al usuario del resultado de la operación
    document.getElementById('signInMessageOk')?.classList.remove('hidden')
    setTimeout(() => {
      document.getElementById('signInMessageOk')?.classList.add('hidden')
    }, 1000)
  // })
}

/**
 * Updates the local storage with the latest state of the USER_DB array.
 */
function updateUserDB() {
  // localStorage.setItem('USER_DB', JSON.stringify(USER_DB.get()))
  // Leemos el nodo users almacenado en localstorage REDUX_DB,
  let localStoredString = localStorage.getItem('REDUX_DB')
  let localStoredData = JSON.parse(localStoredString || '')
  // y guardamos lo que tengamos en store.user.getAll()
  localStoredData.users = [...store.user.getAll()]
  localStorage.setItem('REDUX_DB', JSON.stringify(localStoredData))
}

/**
 * Reads the User's array from local storage and updates the store
 * array with the read data.
 *
 * If no data is found in local storage, the global store is left unchanged.
 *
 * @returns {void}
 */
function readUsersFromLocalStorage() {
  let savedUsers = []

  if (localStorage.getItem('REDUX_DB')) {
    let localStoredREDUX_DB = localStorage.getItem('REDUX_DB')
    // Si no existe la clave 'user' en local store, localStoredREDUX_DB es null
    if (localStoredREDUX_DB === null) {
      // Asignamos una cadena de texto vacía, para no romper JSON.parse()
      localStoredREDUX_DB = ''
    }
    savedUsers = JSON.parse(localStoredREDUX_DB)
      ?.users
      // Usamos la clase User también para montar la BBDD al cargar la página
      .map((/** @type {User} */user) => new User(user.name, user.email, user.rol, user.password, user.token, user._id))
  } else {
    // REDUX_DB no existe en local storage, tenemos que crear el valor por defecto
    console.log('Iniciamos local storage porque está vacío')
    localStorage.setItem('REDUX_DB', JSON.stringify(INITIAL_STATE))
  }

  // if (USER_DB.get() === undefined) {
  //   console.log('inicializo el singleton de la base de datos')
  // }
  // USER_DB.push(...savedUsers)
  // Replicamos lo mismo en REDUX
  savedUsers.forEach((/** @type {User} */newUser) => {
    store.user.create(newUser, () => {console.log('usuario creado')})
  })
  // console.log(USER_DB.get())
}

/**
 * Checks if there is a user logged in by verifying the presence of a token
 * in the local storage.
 *
 * @returns {boolean} True if the user is logged in, false otherwise.
 */
export function getDataFromLocalStorage() {
  const defaultValue = JSON.stringify(INITIAL_STATE)
  return JSON.parse(localStorage.getItem('REDUX_DB') || defaultValue)
}

/**
 * Retrieves the shopping list data from session storage.
 *
 * @returns {State} Saved state.
 * If no data is found, returns an empty State object.
 */
function getDataFromSessionStorage() {
  const defaultValue = JSON.stringify(INITIAL_STATE)
  return JSON.parse(sessionStorage.getItem('REDUX_DB') || defaultValue)
}


/**
 * Get data from API
 * @param {string} apiURL
 * @param {string} method
 * @param {any} [data]
 * @returns {Promise<Array<User | Article>>}
 */
export async function getAPIData(apiURL, method = 'GET', data) {
  let apiData

  try {
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Access-Control-Allow-Origin', '*')
    if (data) {
      headers.append('Content-Length', String(JSON.stringify(data).length))
    }
    // Añadimos la cabecera Authorization si el usuario esta logueado
    if (isUserLoggedIn()) {
      const userData = getDataFromSessionStorage()
      headers.append('Authorization', `Bearer ${userData?.user?.token}`)
    }
    apiData = await simpleFetch(apiURL, {
      // Si la petición tarda demasiado, la abortamos
      signal: AbortSignal.timeout(TIMEOUT),
      method: method,
      body: data ?? undefined,
      headers: headers
    });
  } catch (/** @type {any | HttpError} */err) {
    // En caso de error, controlamos según el tipo de error
    if (err.name === 'AbortError') {
      console.error('Fetch abortado');
    }
    if (err instanceof HttpError) {
      if (err.response.status === 404) {
        console.error('Not found');
      }
      if (err.response.status === 500) {
        console.error('Internal server error');
      }
    }
  }

  return apiData
}

/**
 * Checks if there is a user logged in by verifying the presence of a token
 * in the local storage.
 *
 * @returns {boolean} True if the user is logged in, false otherwise.
 */
function isUserLoggedIn() {
  const userData = getDataFromSessionStorage()
  return userData?.user?.token
}