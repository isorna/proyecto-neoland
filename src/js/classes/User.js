// @ts-check

/**
 * @typedef {'leche' | 'carne' | 'fruta' | 'verdura' | 'grasas' | 'azucar' | 'sal' | 'huevos' | 'aceite'} Ingrediente
 */

/**
 * @typedef {Ingrediente[]} Ingredientes
 */

/**
 * @typedef {Object} Dieta
 * @property {number} calorias
 * @property {Object} semana
 * @property {Ingredientes} semana.lunes por ejemplo ['leche', 'carne', 'fruta']
 * @property {Ingredientes} semana.martes
 * @property {Ingredientes} semana.miercoles
 * @property {Ingredientes} semana.jueves
 * @property {Ingredientes} semana.viernes
 */

// MODEL
export class User {
  /**
   * @type {string}
   */
  name
  /**
   * @type {string}
   */
  email
  /**
   * @param {string} name
   * @param {string} email
   * @param {number} [edad=18]
   * @param {Dieta | {}} dieta
   * @param {'user' | 'admin'} [rol='user']
   */
  constructor(name, email, edad = 18, dieta = {}, rol = 'user') {
    this.name = name
    this.email = email
    this.edad = edad
    this.dieta = dieta
    this.rol = rol
  }
}

// @logUser // Patrón decorador no-estándar en JS
export class SuperUser extends User {// HERENCIA
  /**
   * @param {string} name
   * @param {string} email
   * @param {number} [edad=18]
   */
  constructor(name, email, edad = 18) {
    super(name, email, edad, 'admin')
  }
}

// Patrón: Decorator
/**
 *
 * @param {any} userInstance
 * @returns
 */
export function logUser(userInstance) {
  userInstance.log = function() {
    console.info('LOG', this.name)
  }
  return userInstance
}