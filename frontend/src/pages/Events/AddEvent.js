import React, { useState } from 'react'
import EventForm from '../../components/form/EventForm'
import useFlashMessage from '../../hooks/useFlashMessage'
import { useNavigate } from 'react-router-dom'
import api from '../../utils/api'

const AddEvent = () => {
  const [token] = useState(localStorage.getItem('token'))
  const { setFlashMessage } = useFlashMessage()
  const navigate = useNavigate()

  const registerEvent = async event => {
    let msgType = 'success'

    const data = await api
      .post('/events/create', event, token)
      .then(response => {
        return response.data
      })
      .catch(err => {
        msgType = 'error'
        return err.respnse.data
      })
    setFlashMessage(data.message, msgType)
    navigate('/')
  }

  return (
    <section>
      <h1>Adicionando evento</h1>
      <EventForm handleSubmit={registerEvent} btnText="Adicionar Evento" />
    </section>
  )
}

export default AddEvent
