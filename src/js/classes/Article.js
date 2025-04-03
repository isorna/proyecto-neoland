// @ts-check
// Model definitions

export class Article {
  /**
   * Creates an instance of Article.
   *
   * @param {string} name - The name of the article.
   * @param {number} [qty=1] - The quantity of the article.
   * @param {number} [price=0] - The price of the article.
   */
  constructor(name, qty = 1, price = 0) {
    const timestamp = new Date()
    // Generar id aleatorio (hasta que tengamos el de la BBDD)
    this._id = String(timestamp.getTime())
    this.name = name
    this.qty = qty
    this.price = price
  }
}
