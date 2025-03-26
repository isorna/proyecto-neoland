// Promesa que se ejecuta correctamente
let miPromesa = new Promise((resolve, reject) => {
  setTimeout(() => {
    // Simulamos un número aleatorio, para ver si la promesa se resuelve
    // Por ejemplo, si llamáramos a https://randomuser.me/api/
    let numeroAleatorio = Math.floor(Math.random() * 10)
    // imaginamos que es la respuesta de una API, por ejemplo
    if (numeroAleatorio > 5) {
      // Promesa que se ejecuta con error
      reject(`promesa rechazada ${numeroAleatorio}`)
    } else {
      // En el caso de que hubiera ido todo OK, ejecutamos el resolve
      resolve(`promesa resuelta ${numeroAleatorio}`)
    }
  }, 500)
})
// Declaración de variables usando constructores y clases
let miNombre = new String('Pepe')
let miApellido = 'Perez'

miPromesa
  .then((value) => `${value} valor 1`)
  .then((value) => `${value} valor 2`)
  .then((value) => `${value} valor 3`)
  .then((value) => `${value} valor 4`)
  .then((value) => {
    console.log(value)
  })
  .catch((err) => {
    console.error(err)
  })

let miPromesa2 = new Promise((resolveOuter) => {
  resolveOuter(
    new Promise((resolveInner) => {
      setTimeout(resolveInner, 1000)
    }),
  )
})

miPromesa2.then(() => console.log('promesa finalizada'))

// Ejecución de una llamada a una API externa, combinando fetch y las promesas:
fetch('https://randomuser.me/api/')
  .then((respuesta) => {
    // ESTO NO FUNCIONA EN JS
    // if (respuesta.ok) {
    //   return respuesta.json()
    // } else {
    //   throw new Error(`HTTP error! Status: ${respuesta.status}`)
    // }

    // Ésta es la forma correcta.
    // Si la respuesta FALLA, NO LLEGA respuesta.ok
    if (!respuesta.ok) {
      throw new Error(`HTTP error! Status: ${respuesta.status}`)
    }

    return respuesta.json()
  })
  .then((respouestaOk) => console.log(respouestaOk))
  .catch((mensajeError) => {
    console.log(mensajeError)
  })