import './App.css'
import Login from './login/Login'

function App() {
  // const [count, setCount] = useState(0)
  const mensaje = 'Bienvenido a Vite + React'

  return (
    <>
      <Login mensaje={mensaje} />
    </>
  )
}

export default App
