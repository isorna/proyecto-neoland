// @ts-check
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
   * @param {'user' | 'admin'} [rol='user']
   */
  constructor(name, email, edad = 18, rol = 'user') {
    this.name = name
    this.email = email
    this.edad = edad
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