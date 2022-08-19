import { useContext } from 'react'
import { Context } from '../../context/UserContext'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  const { authenticated, logout } = useContext(Context)

  return (
    <nav className="navbar">
      <div className="navbar_logo">
        <Link to="/" style={{ display: 'flex' }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2693/2693560.png"
            alt="Calendar logo"
          />
          <h2>Calendario de Eventos</h2>
        </Link>
      </div>
      <ul>
        {authenticated ? (
          <>
            <li>
              <Link to="/">Calendario</Link>
            </li>
            <li>
              <Link to="/dashboard">Eventos</Link>
            </li>
            <li onClick={logout}>Sair</li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Entrar</Link>
            </li>
            <li>
              <Link to="/register">Cadastrar</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
