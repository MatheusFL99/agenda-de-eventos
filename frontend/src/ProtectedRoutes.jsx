import { useContext } from 'react'
import { Context } from './context/UserContext'
import { Outlet } from 'react-router-dom'
import Register from './pages/Auth/Register'

const ProtectedRoutes = () => {
  const { authenticated } = useContext(Context)
  return authenticated ? <Outlet /> : <Register />
}

export default ProtectedRoutes
