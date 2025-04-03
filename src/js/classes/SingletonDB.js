// @ts-check
// Patrón: Singleton

/** @import { User } from "./User.js" */

// CONTROLLER
export class SingletonDB {
  /**
   * @type {User[] | undefined}
   */
  dataBase // Store en REDUX
  constructor(){
    // console.log('construyo el singleton de la base de datos')
  }

  /**
   * Returns the dataBase array.
   *
   * If the database is uninitialized, it is initialized with an empty array.
   *
   * @returns {User[]} dataBase
   */
  get() {// Métodos: ACTIONS en REDUX // READ
    if (this.dataBase === undefined) {
      this.dataBase = []
    }
    return this.dataBase
  }
  push() {// Métodos: ACTIONS en REDUX // CREATE
    this.dataBase?.push(...arguments)// REDUCER EN REDUX
  }
  /**
   * Deletes the user in the database with the given email.
   * @param {string} email
   */
  deleteByEmail(email) {// Métodos: ACTIONS en REDUX // DELETE
    // REDUCER EN REDUX
    this.dataBase?.splice(this.dataBase.findIndex((user) => user.email === email), 1)
  }
}