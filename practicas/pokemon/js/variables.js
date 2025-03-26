let variableModificable = 1

// Cadena de texto normal
variableModificable = 'otro valor, contiene "cadenas dobles" dentro'
variableModificable = "otro valor, contiene 'cadenas dobles' dentro"

variableModificable = 'a concatenado ' + 'con b ' + 6

let variables = 'variables'

// Template literal
variableModificable = `tanto valores de texto
como saltos de línea
como ${variables} o incluso ${3 + 4} operaciones`

const MI_CONSTANTE = 'no soy modificable'

MI_CONSTANTE = 34

const MI_LISTA = [
  'nombre'
]

MI_LISTA.push(1, 2, 3, 4)

var usoAntiguoDeVariable = 'hola'

let miObjeto = {
  nombre: 'Alvaro',
  edad: 48,
  formacion: {
    neoland: 'profesor',
    cursos: []
  }
}