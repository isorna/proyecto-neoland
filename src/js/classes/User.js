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
   */
  constructor(name, email) {
    this.name = name
    this.email = email
  }
}

// @logUser // Patrón decorador no-estándar en JS
export class SuperUser extends User {// HERENCIA
  /**
   * @param {string} name
   * @param {string} email
   */
  constructor(name, email) {
    super(name, email)
    this.role = 'admin'// MIXIN
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