let condicion = ''
while (condicion !== 'he terminado') {
  // lanzar peticion
  condicion = API.getCondicion('https://API_URL')
}

const POKEMONS = []// Cargar aquí del pokedex.json

// Bucle for..in para Objetos
for (let pokemonIndex in POKEMONS[0]) {
  console.log(pokemonIndex, POKEMONS[0][pokemonIndex])
}

// Bucle for..of para Arrays (NO UTILIZA EL INDICE)
for (let pokemon of POKEMONS) {
  console.log(pokemon.name.english)
}

// Bucle FOR estándar
for (let i = 0; i < POKEMONS.length; i++) {
  console.log(POKEMONS[i].name.english)
}