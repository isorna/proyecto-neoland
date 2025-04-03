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
  /**  @type {string} */
  name
  /** @type {string} */
  email
  /**
   * @param {string} name
   * @param {string} email
   * @param {'user' | 'admin'} [rol='user']
   * @param {string} [password='']
   * @param {string} [token='']
   * @param {Dieta | {}} dieta
   */
  constructor(name, email, rol = 'user', password = '', token = '', dieta = {}) {
    this._id = ''// TODO: Generar id
    this.name = name
    this.email = email
    this.rol = rol
    this.password = password// TODO: Encriptar
    this.token = token
    this.dieta = dieta
  }
}