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
    this._id = ''// TODO: Generar id
    this.name = name
    this.qty = qty
    this.price = price
  }
}
