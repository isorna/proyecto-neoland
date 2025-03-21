// 3. READ base de datos
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
  let botonBuscar = document.getElementById('botonBuscar')

  // Asigno los eventos que se observan a partir de que cargue la página
  // 2. CLICK en botón de submit
  botonBuscar.addEventListener('click', buscarPokemon)

  // Leo la lista de pokemons y pinto el HTML
  leerListaPokemons(5)
}

/**
 * Lee la lista de pokemons de la base de datos y pinta el HTML
 *
 * @listens DOMContentLoaded
 * @param {Number} [maxPokemons=10] Número máximo de pokemons a mostrar
 */
function leerListaPokemons(maxPokemons = 10) {// Valor por defecto
  let listaPokemons = document.getElementsByClassName('lista-pokemons')[0]

  // 3. Vacío la tabla antes de rellenar con los nuevos pokemons

  while (listaPokemons.firstChild) {
    listaPokemons.remove(listaPokemons.firstChild)
  }

  // 4. FOR cada pokemon de la base de datos
  for (let i = 0; i < maxPokemons; i++) {
    let pokemon = pokedex[i]
    let nuevoPokemon = document.createElement('li')
    let fichaPokemon = document.createElement('figure')
    fichaPokemon.classList.add('pokemon')

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

    // for (let j = 0; j < pokemon.type.length; j++) {
    //   let tipoDelPokemon = document.createElement('span')
    //   tipoDelPokemon.classList.add('tag', pokemon.type[j].toLowerCase())
    //   tipoDelPokemon.innerText = pokemon.type[j]
    //   tiposPokemon.appendChild(tipoDelPokemon)
    // }
    // EQUIVALENCIAS:
    // Siempre que no necesitemos el índice para algo en particular,
    // podemos usar esta versión del for..of
    for (let tipoPokemon of pokemon.type) {
      let tipoDelPokemon = document.createElement('span')
      tipoDelPokemon.classList.add('tag', tipoPokemon.toLowerCase())
      tipoDelPokemon.innerText = tipoPokemon
      tiposPokemon.appendChild(tipoDelPokemon)
    }
    // Bucle While (sería menos óptimo)
    // let j = 0
    // while (pokemon.type[j] !== undefined) {
    // while (j < 2) {
    //   // if (pokemon.type.length > 1) {
    //   if (pokemon.type[j] !== undefined) {
    //     let tipoDelPokemon = document.createElement('span')
    //     tipoDelPokemon.classList.add('tag', pokemon.type[j].toLowerCase())
    //     tipoDelPokemon.innerText = pokemon.type[j]
    //     tiposPokemon.appendChild(tipoDelPokemon)
    //   }
    //   j++
    // }

    fichaPokemon.appendChild(imagenPokemon)
    fichaPokemon.appendChild(idPokemon)
    fichaPokemon.appendChild(nombrePokemon)
    fichaPokemon.appendChild(tiposPokemon)
    nuevoPokemon.appendChild(fichaPokemon)
    listaPokemons.appendChild(nuevoPokemon)

    // Bucle for..in, para recorrer clave+valor dentro de un objeto
    // for (let estadistica in pokemon.base) {
    //   console.log(estadistica, pokemon.base[estadistica])
    // }

    // Opción usando el innerHTML NO RECOMENDADA salvo que uses REACT, ANGULAR o LIT
    // let pokemon = pokedex[i]
    // let nuevoPokemon = document.createElement('li')
    // nuevoPokemon.innerHTML = `
    // <figure class="pokemon">
    //   <img src="${`/pokedex/images/${String(pokemon.id).padStart(3, '0')}.png`}" alt="${pokemon.name.english}" title="${pokemon.name.english}">
    //   <figcaption class="numero">Nº ${String(pokemon.id).padStart(4, '0')}</figcaption>
    //   <p class="nombre">${pokemon.name.english}</p>
    //   <p class="tipos">
    //     <span class="tag ${pokemon.type[0].toLowerCase()}">${pokemon.type[0]}</span>
    //     ${ (pokemon.type.length > 1) `<span class="tag ${pokemon.type[1].toLowerCase()}">${pokemon.type[0]}</span>`}
    //   </p>
    // </figure>
    // `
    // listaPokemons.appendChild(nuevoPokemon)
  }
}

/**
 * Busco un pokemon determinado usando el formulario de búsqueda
 */
function buscarPokemon() {
  // 1. SET busqueda = INPUT nombre o número de pokemon
  let campoBusqueda = document.getElementById('busqueda')
  let resultadosBusqueda = []
  let returnValue = ''

  // Busco en la base de datos
  // ...
  if (resultadosBusqueda.length > 0) {
    // 4.1. IF encuentro pokemon RETURN datos del pokemon
    returnValue = `He encontrado ${resultadosBusqueda.length} pokemons`
    returnValue = 'He encontrado ' + resultadosBusqueda.length + ' pokemons'
  } else {
    // 4.2. ELSE devuelvo "pokemon no encontrado"
    returnValue = 'pokemon no encontrado'
  }

  // 4. FOR cada pokemon de la base de datos
  // 4.1. IF encuentro pokemon RETURN datos del pokemon
  // 4.2. ELSE devuelvo "pokemon no encontrado"
  // 5. SHOW tabla de datos (lista-pokemons) limpia
  // 6.1. IF hay pokemon, lo añado a la lista con DISPLAY
  // 6.1.1. IF hay más de un pokemon, con FOR por cada pokemon añado su ficha a la lista
  // 6.2. ELSE no hay pokemon, muestro "pokemon no encontrado" en lugar de la lista-pokemons

  console.log('Estoy buscando', campoBusqueda.value)
  console.log('buscando pokemon... He encontrado ', pokedex)
}