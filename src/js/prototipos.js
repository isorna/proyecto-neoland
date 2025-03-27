/**
 * Herencia implícita y uso de prototype
 */
const lecheSinLactosa = {
  name: 'Leche sin lactosa Ahorramás',
  qty: 6,
  price: 3
}

let lecheComprada = Object.create(lecheSinLactosa)

console.log(lecheComprada.name)