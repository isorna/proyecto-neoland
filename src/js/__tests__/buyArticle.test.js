/* eslint-disable no-undef */
import { testBuyArticle } from './testBuyArticle.js'

describe('Voy a probar que se realiza la suma correctamente', () => {
  test('sumar 1 + 2 es igual a 3', () => {
    // 1 assertion
    expect(testBuyArticle(1, 2)).toBe(3);
  });
})