// Leer la base de datos
import pokedex from '/pokedex/pokedex.json' with { type: "json" }

/*
# Tarea: buscar un pokemon

1. Escribo en el formulario el nombre o el número del pokemon
2. Pincho en el botón de buscar
3. Usando Javascript, busco en la base de datos un pokemon que coincida con la búsqueda
4. Devuelvo los datos de ese pokemon a la página web
5. Limpio la tabla de pokemons para dejarla preparada
6. Añado un LI a la lista ordenada de pokemons con los datos del pokemon y la estructura HTML
*/

window.addEventListener("DOMContentLoaded", onDOMContentLoaded)

/**
 * Evento que se lanza cuando el contenido de la página ha sido cargado en memoria
 * y se puede acceder a él.
 * @listens DOMContentLoaded
 */
function onDOMContentLoaded() {
  let formulario = document.getElementById('formulario')

  // Asigno los eventos que se observan a partir de que cargue la página
  formulario.addEventListener('submit', buscarPokemon)

  // Leo la lista de pokemons y pinto el HTML
  leerListaPokemons(12)

  // Informo de los favoritos al usuario
  mostrarFavoritos()
}

/**
 * Muestra los pokemons marcados como favoritos en la lista de favoritos.
 * Si no hay pokemons marcados como favoritos, oculta la lista de favoritos.
 */
function mostrarFavoritos() {
  let listaFavoritos = document.getElementById('listaFavoritos')
  let favoritos = JSON.parse(localStorage.getItem('favoritos'))

  while (listaFavoritos.firstChild) {
    listaFavoritos.removeChild(listaFavoritos.firstChild)
  }

  //if (favoritos !== undefined && favoritos.length > 0) {
  // Equivalencia
  if (favoritos?.length > 0) {
    listaFavoritos.closest('.favorites').classList.add('visible')
    favoritos.forEach((id) => {
      // Buscamos los datos del pokemon a partir de su id
      let pokemon = pokedex.find((pokemon) => String(pokemon.id) === id)
      // con sus datos, construimos la ficha o lo que necesitemos
      let li = document.createElement('li')
      li.textContent = pokemon.name.english
      listaFavoritos.appendChild(li)
    })
  } else {
    listaFavoritos.closest('.favorites').classList.remove('visible')
  }
}

/**
 * Toggles the favorite status of a Pokémon when its figure element is clicked.
 *
 * This function checks if the Pokémon, identified by its dataset ID, is already
 * in the list of favorites stored in localStorage. If it is, the Pokémon is
 * removed from the favorites list; otherwise, it is added. The 'favorite' class
 * is also toggled on the clicked element to visually indicate its status.
 *
 * @param {Event} event - The click event triggered on the Pokémon's figure element.
 */

function guardarFavorito(event) {
  let listaFavoritos = []
  let pokemon = pokedex.find((pokemon) => String(pokemon.id) === this.dataset.id)

  if (localStorage.getItem('favoritos')) {
    listaFavoritos = JSON.parse(localStorage.getItem('favoritos'))
  }

  // ¿Está guardado mi id en favoritos?
  if (listaFavoritos.includes(this.dataset.id)) {
    // Si lo estaba, lo saco
    listaFavoritos = listaFavoritos.filter(id => id !== this.dataset.id)
    this.classList.remove('favorite')
  } else {
    // Si no lo estaba, lo guardo
    listaFavoritos.push(this.dataset.id)
    this.classList.add('favorite')
  }
  // Actualizo local storage
  localStorage.setItem('favoritos', JSON.stringify(listaFavoritos))
  // Actualizo la lista de pokemons capturados
  mostrarFavoritos()

  // Traigo la información de su familia, llamada ASINCRONA
  fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.name.english.toLowerCase()}`)
    // Cuando la API devuelve la información
    .then((respuesta) => {
      // Vemos si la respuesta es correcta
      if (!respuesta.ok) {
        throw new Error(`HTTP error! Status: ${respuesta.status}`);
      }
      // Devolvemos la información en forma de JSON
      return respuesta.json();
    })
    .then((datosFamiliaPokemon) => {
      let listaFamilias = document.getElementsByClassName('listaFamilias')[0]
      // Trabajamos con esa información
      // Por ejemplo crear una lista de familias
      let familiasDelPokemon = datosFamiliaPokemon.egg_groups.map((eggGroup) => eggGroup.name)
      familiasDelPokemon.forEach((familia) => {
        // Comprobar antes si ya existe esa familia...
        let li = document.createElement('li')
        li.textContent = familia
        listaFamilias.appendChild(li)
      })
      // console.log(familiasDelPokemon.join(', '))
    })
    .catch((mensajeError) => {
      console.log(mensajeError)
    })
}

/**
 * Lee la lista de pokemons de la base de datos y la pinta en la
 * tabla con la clase "lista-pokemons".
 *
 * @param {Number} [maxPokemons=10] - Número de pokemons a mostrar
 *                                      por defecto se muestra 10
 */
function leerListaPokemons(maxPokemons = 10/* Valor por defecto */) {
  let listaPokemons = document.getElementsByClassName('lista-pokemons')[0]
  let fichasPokemons = document.getElementsByClassName('pokemon')

  // Vacío la tabla antes de rellenar con los nuevos pokemons
  // Antes he de limpiar la memoria, de los eventos asignados
  for (let i = 0; i < fichasPokemons.length; i++) {
    fichasPokemons[i].removeEventListener('click', guardarFavorito)
  }
  while (listaPokemons.firstChild) {
    listaPokemons.removeChild(listaPokemons.firstChild)
  }
  // Equivalencia
  // while (listaPokemons.children.length > 0) {
  //   console.log(listaPokemons.children[0])
  //   listaPokemons.children[0].remove(listaPokemons.firstChild)
  // }

  // Por cada pokemon de la base de datos
  for (let i = 0; i < maxPokemons; i++) {
    addPokemonToList(pokedex[i])
  }
}

/**
 * Searches for a Pokémon based on the input from the search field.
 * It prevents the default form submission, retrieves the search input
 * (either a Pokémon name or ID), and searches the pokedex for matching entries.
 * The search results are displayed in the list of Pokémon in the HTML.
 *
 * @param {Event} event - The form submission event to prevent default behavior.
 *
 * The function:
 * - Checks if the search input is a number (ID) or a string (name).
 * - Filters the pokedex for matching Pokémon based on the input.
 * - Clears the current Pokémon list in the HTML.
 * - Adds the search results to the list.
 * - Logs the number of Pokémon found or if none are found.
 */
function buscarPokemon(event) {
  // Paramos el envío del formulario
  event.preventDefault()
  let listaPokemons = document.getElementsByClassName('lista-pokemons')[0]
  let mensajeError = document.getElementsByClassName('error')[0]
  let fichasPokemons = document.getElementsByClassName('pokemon')
  // Almacenar el nombre o número de pokemon que buscamos
  let campoBusqueda = document.getElementById('busqueda')
  let resultadosBusqueda = []

  mensajeError.classList.remove('visible')
  if (campoBusqueda.value === '') {
    leerListaPokemons(12)
    return
  }

  // Busco en la base de datos
  if (Number.isInteger(Number(campoBusqueda.value))) {
    console.log('buscamos por id de pokemon')
    resultadosBusqueda = pokedex.filter((pokemon) => pokemon.id === Number(campoBusqueda.value))
  } else {
    console.log('buscamos por nombre de pokemon')
    resultadosBusqueda = pokedex.filter((pokemon) => pokemon.name.english.toLowerCase().includes(campoBusqueda.value.toLowerCase()))
  }

  // Si no encontramos ninguno, avisamos al usuario y salimos
  if (resultadosBusqueda.length === 0) {
    // mostrarError('Pokemon no encontrado, por favor cambia el texto de la búsqueda')
    mostrarErrorBusqueda()
    return
  }

  // Vacío la tabla antes de rellenar con los nuevos pokemons
  // Antes he de limpiar la memoria, de los eventos asignados
  for (let i = 0; i < fichasPokemons.length; i++) {
    fichasPokemons[i].removeEventListener('click', guardarFavorito)
  }
  while (listaPokemons.firstChild) {
    listaPokemons.removeChild(listaPokemons.firstChild)
  }

  // Por cada pokemon encontrado
  for (let i = 0; i < resultadosBusqueda.length; i++) {
    addPokemonToList(resultadosBusqueda[i])
  }
}

/**
 * Muestra un mensaje de error en la tabla de pokemons
 *
 * Añade la clase 'visible' al elemento con clase 'error' para mostrar el mensaje
 * de error en la tabla de pokemons.
 */
function mostrarErrorBusqueda() {
  let mensajeError = document.getElementsByClassName('error')[0]

  mensajeError.classList.add('visible')
}

/**
 * Muestra un mensaje de error en la tabla de pokemons
 * @param {String} error - El texto del mensaje de error
 */
function mostrarError(error) {
  let listaPokemons = document.getElementsByClassName('lista-pokemons')[0]
  let mensajeError = document.createElement('li')
  let textoMensaje = document.createElement('h1')
  let fichasPokemons = document.getElementsByClassName('pokemon')

  // Vacío la tabla antes de rellenar con los nuevos pokemons
  // Antes he de limpiar la memoria, de los eventos asignados
  for (let i = 0; i < fichasPokemons.length; i++) {
    fichasPokemons[i].removeEventListener('click', guardarFavorito)
  }
  while (listaPokemons.firstChild) {
    listaPokemons.removeChild(listaPokemons.firstChild)
  }

  mensajeError.classList.add('error')
  textoMensaje.innerText = error
  mensajeError.appendChild(textoMensaje)
  listaPokemons.appendChild(mensajeError)
}

/**
 * Añade un LI a la lista ordenada de pokemons con los datos del pokemon y la estructura HTML
 *
 * @param {Object} pokemon - Objeto con los datos del pokemon a mostrar
 * @returns {void}
 */
function addPokemonToList(pokemon){
  let listaPokemons = document.getElementsByClassName('lista-pokemons')[0]
  let nuevoPokemon = document.createElement('li')
  let fichaPokemon = document.createElement('figure')
  fichaPokemon.classList.add('pokemon')
  // Si tenemos guardado en localStorage este pokemon como favorito,
  // añadinmos la clase 'favorite' a la ficha del pokemon
  let listaFavoritos = []
  if (localStorage.getItem('favoritos')) {
    listaFavoritos = JSON.parse(localStorage.getItem('favoritos'))
  }
  // ¿Está guardado mi id en favoritos?
  if (listaFavoritos.includes(String(pokemon.id))) {
    fichaPokemon.classList.add('favorite')
  }
  // Guardo el identificador del pokemon en su dataset
  fichaPokemon.dataset.id = pokemon.id
  // Asigno el click a las fichas de los pokemons, para poder guardarlos como favoritos
  fichaPokemon.addEventListener('click', guardarFavorito)

  let imagenPokemon = document.createElement('img')
  imagenPokemon.setAttribute('src', `/pokedex/images/${String(pokemon.id).padStart(3, '0')}.png`)
  imagenPokemon.setAttribute('alt', pokemon.name.english)
  imagenPokemon.setAttribute('title', pokemon.name.english)

  let idPokemon = document.createElement('figcaption')
  idPokemon.classList.add('numero')
  idPokemon.innerText = `Nº ${String(pokemon.id).padStart(4, '0')}`

  let nombrePokemon = document.createElement('p')
  nombrePokemon.classList.add('nombre')
  nombrePokemon.innerText = pokemon.name.english

  let tiposPokemon = document.createElement('p')
  tiposPokemon.classList.add('tipos')

  for (let tipoPokemon of pokemon.type) {
    let tipoDelPokemon = document.createElement('span')
    tipoDelPokemon.classList.add('tag', tipoPokemon.toLowerCase())
    tipoDelPokemon.innerText = tipoPokemon
    tiposPokemon.appendChild(tipoDelPokemon)
  }

  fichaPokemon.appendChild(imagenPokemon)
  fichaPokemon.appendChild(idPokemon)
  fichaPokemon.appendChild(nombrePokemon)
  fichaPokemon.appendChild(tiposPokemon)
  nuevoPokemon.appendChild(fichaPokemon)
  listaPokemons.appendChild(nuevoPokemon)
}