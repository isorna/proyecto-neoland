/*
# Tarea: buscar un pokemon

1. Escribo en el formulario el nombre o el número del pokemon
2. Pincho en el botón de buscar
3. Usando Javascript, busco en la base de datos un pokemon que coincida con la búsqueda
4. Devuelvo los datos de ese pokemon a la página web
5. Limpio la tabla de pokemons para dejarla preparada
6. Añado un LI a la lista ordenada de pokemons con los datos del pokemon y la estructura HTML

## Pseudocódigo

1. SET busqueda = INPUT nombre o número de pokemon
2. CLICK en botón de submit
3. READ base de datos
4. FOR cada pokemon de la base de datos
4.1. IF encuentro pokemon RETURN datos del pokemon
4.2. ELSE devuelvo "pokemon no encontrado"
5. SHOW tabla de datos (lista-pokemons) limpia
6.1. IF hay pokemon, lo añado a la lista con DISPLAY
6.1.1. IF hay más de un pokemon, con FOR por cada pokemon añado su ficha a la lista
6.2. ELSE no hay pokemon, muestro "pokemon no encontrado" en lugar de la lista-pokemons
*/

// Variable normal
let variable_1 = 'variable 1'

// Ejemplo de Template literal
let comida = 'fruta'
let nombrePokemon = 'Pikachu tiene hambre, voy a darle de comer ' + comida

nombrePokemon = `Pikachu tiene hambre,
voy a darle de comer`
console.log(1, nombrePokemon);

nombrePokemon = `Pikachu tiene hambre,
voy a darle de comer ${comida}`
console.log(2, nombrePokemon);

comida = 'pescado'
nombrePokemon = `Pikachu tiene hambre,
voy a darle de comer ${comida}`
console.log(3, nombrePokemon);

let variable3 = 1345
let variableLista = [
  'variable 1',
  'variable 2',
  'variable 3',
  144
]
// camelCase
let miPokemon = {
  nombre: 'Bulbasaur',
  imagen: './img/120x120.svg',
  numero: '0001',
  tipos: ['Planta', 'Veneno']
}

// CONSTANTE
const MI_CONSTANTE = 'mi constante'
const IDIOMAS = [
  'es',
  'en',
  'fr',
  'de'
]

IDIOMAS.push('it')

IDIOMAS.forEach((idioma) => {
  console.log('IDIOMAS.forEach', idioma)
})

// kebab-case (NO SE USA EN JAVASCRIPT)
// snake_case (SE USA EN PHP y PYTHON)

// var: No la usaremos
var variable2 = 'variable 2'

// caso práctico: añadir pokemons a la lista
const LISTA_POKEMONS = []

function addPokemon() {
  let nuevoPokemon = document.getElementById('nuevoPokemon').value
  LISTA_POKEMONS.push(nuevoPokemon)
  console.log('LISTA_POKEMONS', LISTA_POKEMONS)
}

console.log('on load pokemon.js');
console.log('variables', variable_1, variable2, variable3);
console.log('objetos y arrays', miPokemon, variableLista);
console.log('constantes', MI_CONSTANTE, IDIOMAS);