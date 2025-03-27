/**
 * Ejemplos de uso
 */
// // Genero un nuevo pokemon
// const pikachu = new Pokemon('Pikachu', 'Eletric', 100, 55, 40, 90)

// // Genero una lista de pokemons
// const pokemons = [
//   new Pokemon('Pikachu', 'Eletric', 100, 55, 40, 90),
//   new Pokemon('Charmander', 'Fire', undefined, 52, 43, 65),
//   new Pokemon('Bulbasaur', 'Grass', 100, 49, 49, 45)
// ]

// Definición de modelos de datos
class Pokemon {// CLASE
  /**
   * Constructor de la clase Pokemon // MODELO
   * @param {string} name - nombre del Pokémon
   * @param {string} type - tipo del Pokémon
   * @param {number} [health=100] - puntos de vida del Pokémon
   * @param {number} attack - ataque del Pokémon
   * @param {number} defense - defensa del Pokémon
   * @param {number} speed - velocidad del Pokémon
   */
  constructor(name, type, health = 100, attack, defense, speed) {
    // FORMA
    this.name = name
    this.type = type
    this.health = health
    this.attack = attack
    this.defense = defense
    this.speed = speed
  }
}