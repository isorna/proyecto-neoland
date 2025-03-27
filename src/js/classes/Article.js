// Model definitions
import { translate } from '../lib/translate.js'

export const ARTICLE_TYPES = {
  COMPLEX: 'complex',
  SIMPLE: 'simple'
}

class SimpleArticle {
  constructor(name) {
    this.name = name
    this.id = ''
  }
}
// Herencia & Mixin
class ComplexArticle extends SimpleArticle {
  constructor(name, qty = 1, price = 0) {
    super(name)
    this.qty = qty
    this.price = price
  }
}

// Patrón: Factory
export class ArticleFactory {
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

function translateArticle(article) {
  return {
    ...article,
    // Patrón: Command Pattern
    name: translate.toEnglish(article.name)
  }
}