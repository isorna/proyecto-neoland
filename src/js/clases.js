class Person {
  // Aquí defines las propiedades de la clase, una por línea
  _name

  // =============== CICLO DE VIDA =============== //
  // Este método siempre ha de existir, se ejecuta al crear una instancia
  constructor(name) {
    this._name = name
    console.log('nueva instancia', name)
  }

  // =============== METODOS PRIVADOS =============== //

  /**
   * Calcula la suma de dos números
   * @param {number} a Número a sumar
   * @param {number} b Número a sumar
   * @returns {number} La suma de a y b
   * @private
   */
  _calcularSuma(a, b) {
    return a + b
  }

  // =============== METODOS PUBLICOS =============== //
  // Este método es público, se puede ejecutar a demanda, sobre su instancia
  introduceSelf() {
    console.log(`Hi! I'm ${this._name}`)
  }
}

// Ejemplo de instanciación
const pepe = new Person('Pepe')
// uso de sus métodos públicos
pepe.introduceSelf()

// Clase básica
class Calculadora {
  constructor() {
    console.log('nueva calculadora')
  }

  sumar(a, b) {
    return a + b
  }

  restar(a, b) {
    return a - b
  }
}

// Clase extendida, mejora la clase básica
class CalculadoraCientifica extends Calculadora {
  // SIEMPRE QUE TENGAMOS UNA CLASE EXTENDIDA, invocar al constructor del padre
  constructor() {
    super()
  }

  potencia(a, b) {
    return a ** b
  }
}

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

// Genero un nuevo pokemon
const pikachu = new Pokemon('Pikachu', 'Eletric', 100, 55, 40, 90)

// Genero una lista de pokemons
const pokemons = [
  new Pokemon('Pikachu', 'Eletric', 100, 55, 40, 90),
  new Pokemon('Charmander', 'Fire', undefined, 52, 43, 65),
  new Pokemon('Bulbasaur', 'Grass', 100, 49, 49, 45)
]