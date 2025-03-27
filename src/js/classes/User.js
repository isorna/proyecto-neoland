export class User {
  name
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

export class SuperUser extends User {// HERENCIA
  name
  email
  /**
   * @param {string} name
   * @param {string} email
   */
  constructor(name, email) {
    super(name, email)
    this.role = 'admin'// MIXIN
  }
}