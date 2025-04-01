//@ts-check
// Model definitions
import { translate } from '../lib/translate.js'

export const ARTICLE_TYPES = {
  COMPLEX: 'complex',
  SIMPLE: 'simple'
}

class SimpleArticle {
  /**
   * Creates an instance of SimpleArticle.
   *
   * @param {string} name - The name of the article.
   */
  constructor(name) {
    this.name = name
    this.id = ''
  }
}
// Herencia & Mixin
class ComplexArticle extends SimpleArticle {
  /**
   * Creates an instance of ComplexArticle.
   *
   * @param {string} name - The name of the article.
   * @param {number} [qty=1] - The quantity of the article.
   * @param {number} [price=0] - The price of the article.
   */
  constructor(name, qty = 1, price = 0) {
    super(name)
    this.qty = qty
    this.price = price
  }
}

// Patrón: Factory
export class ArticleFactory {
  /**
   * Creates an article based on the type provided.
   *
   * @param {string} type - The type of article to be created.
   * @param {string} name - The name of the article.
   * @param {number} [qty=1] - The quantity of the article.
   * @param {number} [price=0] - The price of the article.
   * @returns {ComplexArticle | SimpleArticle} The created article.
   */
  createArticle(type, name, qty, price) {
    switch(type) {
      case ARTICLE_TYPES.COMPLEX:
        return new ComplexArticle(name, qty, price)
      case ARTICLE_TYPES.SIMPLE:
      default:
        return new SimpleArticle(name)
    }
  }
  // Patrón: Adapter

  /**
   * Creates an article based on the type provided and translates it to the
   * currently selected language.
   *
   * @param {string} type - The type of article to be created.
   * @param {string} name - The name of the article.
   * @param {number} [qty=1] - The quantity of the article.
   * @param {number} [price=0] - The price of the article.
   * @returns {ComplexArticle | SimpleArticle} The created article.
   */
  createTranslatedArticle(type, name, qty, price) {
    switch(type) {
      case ARTICLE_TYPES.COMPLEX:
        return translateArticle(new ComplexArticle(name, qty, price))
      case ARTICLE_TYPES.SIMPLE:
      default:
        return translateArticle(new SimpleArticle(name))
    }
  }
}

/**
 * Translates an article to the currently selected language.
 *
 * @param {ComplexArticle | SimpleArticle} article - The article to be translated.
 * @returns {ComplexArticle | SimpleArticle} The translated article.
 */
function translateArticle(article) {
  return {
    ...article,
    // Patrón: Command Pattern
    name: translate.toEnglish(article.name)
  }
}