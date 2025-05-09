import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import './App.css'
import Login from './pages/login/Login'
import Home from './pages/home/Home';
import Header from './components/Header';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
    </Route>
  )
)

function App() {
  // const [count, setCount] = useState(0)
  // const mensaje = 'Bienvenido a Vite + React'
  // <Login mensaje={mensaje} />

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
