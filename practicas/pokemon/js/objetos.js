let pokemon = {
  "id": 1,
  "name": {
    "english": "Bulbasaur",
    "japanese": "フシギダネ",
    "chinese": "妙蛙种子",
    "french": "Bulbizarre"
  },
  "type": [
    "Grass",
    "Poison"
  ],
  "base": {
    "HP": 45,
    "Attack": 49,
    "Defense": 49,
    "Sp. Attack": 65,
    "Sp. Defense": 65,
    "Speed": 45
  }
}

let pokemon2 = {
  ...pokemon,
  "favorito": true,
  "type": [
    "Luz"
  ],
  "base": {
    ...pokemon.base,
    "HP": 5,
  }
}

console.log(pokemon2)

let {id, name, type, base} = pokemon2
console.log(id, name, type, base)