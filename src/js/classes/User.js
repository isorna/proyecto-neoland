// @ts-check

// MODEL
export class User {
  /**
   * @param {string} name
   * @param {string} email
   * @param {'user' | 'admin'} [rol='user']
   * @param {string} [password='']
   * @param {string} [token='']
   * @param {string} [_id='']
   */
  constructor(name, email, rol = 'user', password = '', token = '', _id = '') {
    if (_id === '') {
      const timestamp = new Date()
      // Generar id aleatorio (hasta que tengamos el de la BBDD)
      this._id = String(timestamp.getTime())
    } else {
      this._id = _id
    }
    this.name = name
    this.email = email
    this.rol = rol
    this.password = password// TODO: Encriptar
    this.token = token
  }
}