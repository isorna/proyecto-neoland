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

  /**
   * Calcula la potencia de a elevado a b
   * @param {number} a base
   * @param {number} b exponente
   * @returns {number} a elevado a b
   */
  potencia(a, b) {
    return a ** b
  }
}
