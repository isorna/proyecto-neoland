// Estructura de una función

/**
 * Envia los datos del asiento y el texto de saludo
 *
 * @param {string} textoSaludo - El texto de saludo
 * @param {number} [numeroAsiento=1] - El número del asiento
 * @returns string
 */
function enviarDatos(textoSaludo, numeroAsiento = 1) {
  // Código de la función

  console.log(textoSaludo, numeroAsiento)

  // Devolver datos a quien lo llamara
  return 'mensaje recibido'
}

enviarDatos('hola')

// Funcion flecha

window.addEventListener('click', () => console.log('click'))