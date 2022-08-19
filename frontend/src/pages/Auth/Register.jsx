import Input from '../../components/form/Input'
import '../../components/form/Form.css'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import { Context } from '../../context/UserContext'

const Register = () => {
  const [user, setUser] = useState({})
  const { register } = useContext(Context)
  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()

    // enviar usuario para o banco
    console.log(user)
    register(user)
  }
  return (
    <section className="form_container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <Input
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite o seu nome"
          handleOnChange={handleChange}
        />
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite o seu email"
          handleOnChange={handleChange}
        />
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite a sua senha"
          handleOnChange={handleChange}
        />
        <Input
          text="Confirmação de Senha"
          type="password"
          name="confirmpassword"
          placeholder="Comfirme a sua senha"
          handleOnChange={handleChange}
        />
        <input type="submit" value="Cadastrar" />
      </form>
      <p>
        Já tem uma conta? <Link to="/login">Clique aqui</Link>
      </p>
    </section>
  )
}

export default Register
