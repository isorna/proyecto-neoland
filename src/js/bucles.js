let condicion = ''
while (condicion !== 'he terminado') {
  // lanzar peticion
  condicion = API.getCondicion('https://API_URL')
}

const POKEMONS = []// Cargar aquí del pokedex.json

for (let typeIndex in POKEMONS[i].type) {
  let typeValue = POKEMONS[i].type[typeIndex]
  console.log(typeIndex, typeValue)
}

for (let pokemon of POKEMONS) {
  console.log(pokemon.name.english)
}