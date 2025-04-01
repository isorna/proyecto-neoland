// @ts-check
// Patrón: Singleton

/** @import { User } from "./User.js" */

// CONTROLLER
export class SingletonDB {
  /**
   * @type {User[] | undefined}
   */
  dataBase
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
  get() {
    if (this.dataBase === undefined) {
      this.dataBase = []
    }
    return this.dataBase
  }
  push() {
    this.dataBase?.push(...arguments)
  }
  /**
   * Deletes the user in the database with the given email.
   * @param {string} email
   */
  deleteByEmail(email) {
    this.dataBase?.splice(this.dataBase.findIndex((user) => user.email === email), 1)
  }
}