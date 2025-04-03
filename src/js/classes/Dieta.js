/**
 * @typedef {'leche' | 'carne' | 'fruta' | 'verdura' | 'grasas' | 'azucar' | 'sal' | 'huevos' | 'aceite'} Ingrediente
 */

/**
 * @typedef {Ingrediente[]} Ingredientes
 */

/**
 * @typedef {Object} Dieta
 * @property {number} calorias
 * @property {Object} semana
 * @property {Ingredientes} semana.lunes por ejemplo ['leche', 'carne', 'fruta']
 * @property {Ingredientes} semana.martes
 * @property {Ingredientes} semana.miercoles
 * @property {Ingredientes} semana.jueves
 * @property {Ingredientes} semana.viernes
 */