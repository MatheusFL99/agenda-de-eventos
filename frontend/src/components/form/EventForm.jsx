import React, { useState } from 'react'
import './Form.css'
import Input from './Input'

const EventForm = ({ handleSubmit, eventData, btnText }) => {
  const [event, setEvent] = useState(eventData || {})

  const handleChange = e => {
    setEvent({ ...event, [e.target.name]: e.target.value })
  }

  const submit = e => {
    e.preventDefault()
    //console.log(event)
    handleSubmit(event)
  }

  return (
    <form onSubmit={submit} className="form_container">
      <Input
        text="Titulo do evento"
        type="text"
        name="title"
        placeholder="Digite o título"
        handleOnChange={handleChange}
        value={event.title || ''}
      />
      <Input
        text="Data de inicio"
        type="datetime-local"
        name="start"
        placeholder="Selecione a data de inicio"
        handleOnChange={handleChange}
        value={event.start}
      />
      <Input
        text="Data de término"
        type="datetime-local"
        name="end"
        placeholder="Selecione a data do fim"
        handleOnChange={handleChange}
        value={event.end}
      />
      <Input
        text="Descrição do evento"
        type="text"
        name="description"
        placeholder="Digite a descriçao"
        handleOnChange={handleChange}
        value={event.description || ''}
      />
      <input type="submit" value={btnText} />
    </form>
  )
}
export default EventForm
