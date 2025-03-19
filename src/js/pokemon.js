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
  leerListaPokemons()
}

function leerListaPokemons() {
  let listaPokemons = document.getElementsByClassName('lista-pokemons')[0]

  for (let i = 0; i < 10; i++) {
    let nuevoPokemon = document.createElement('li')
    nuevoPokemon.innerText = pokedex[i].name.english
    console.log('añadiendo', pokedex[i].name.english)
    listaPokemons.appendChild(nuevoPokemon)
  }
}

/**
 * Busco un pokemon determinado usando el formulario de búsqueda
 */
function buscarPokemon() {
  // 1. SET busqueda = INPUT nombre o número de pokemon
  let campoBusqueda = document.getElementById('busqueda')

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