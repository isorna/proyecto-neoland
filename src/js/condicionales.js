
// Los parámetros de comparación del switch NO CAMBIAN
switch (location.pathname) {
  case '/index.html':
    console.log('index.html')
    // ...
    break
  case '/sign-in.html':
    console.log('sign-in.html')
    // ...
    break
  case '/404.html':
  default:
    console.log('default')
    // ...
}

// con el if-else-if podemos cambiar siempre la condición
if (typeof 'condicionA' === 'string') {
  // ...
} else if (typeof 5 === 'number') {
  // ...
} else {
  // ...
}