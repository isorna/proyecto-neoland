// @ts-check

// MODEL
export class User {
  /**
   * @param {string} name
   * @param {string} email
   * @param {'user' | 'admin'} [rol='user']
   * @param {string} [password='']
   * @param {string} [token='']
   */
  constructor(name, email, rol = 'user', password = '', token = '') {
    const timestamp = new Date()
    // Generar id aleatorio (hasta que tengamos el de la BBDD)
    this._id = String(timestamp.getTime())
    this.name = name
    this.email = email
    this.rol = rol
    this.password = password// TODO: Encriptar
    this.token = token
  }
}