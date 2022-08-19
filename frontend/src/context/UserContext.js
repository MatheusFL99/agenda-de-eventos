import React, { createContext } from 'react'
import useAuth from '../hooks/useAuth'

const Context = createContext()

const UserProvider = ({ children }) => {
  const { authenticated, register, registerEvent, logout, login } = useAuth()

  return (
    <Context.Provider
      value={{ authenticated, register, registerEvent, logout, login }}
    >
      {children}
    </Context.Provider>
  )
}

export { Context, UserProvider }
