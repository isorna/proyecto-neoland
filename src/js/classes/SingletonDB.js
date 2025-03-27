// Patrón: Singleton
export class SingletonDB {
  dataBase
  constructor(){
    console.log('construyo el singleton de la base de datos')
  }
  /**
   * Returns the dataBase array.
   *
   * If the database is uninitialized, it is initialized with an empty array.
   *
   * @returns {Array} dataBase
   */
  get() {
    if (this.dataBase === undefined) {
      this.dataBase = []
    }
    return this.dataBase
  }
  push() {
    this.dataBase.push(...arguments)
  }
}