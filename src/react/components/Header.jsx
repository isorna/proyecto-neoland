import { Outlet, Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <header>
        <h1>Ejemplo de Vite + React</h1>
        <nav>
          <menu>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
          </menu>
        </nav>
      </header>
      <Outlet/>
    </>
  )
}

export default Header