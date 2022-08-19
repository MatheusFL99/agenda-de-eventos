import api from '../../utils/api'
import '../../components/form/Form.css'
import '../../components/form/Input.css'
import { useParams } from 'react-router-dom'
import useFlashMessage from '../../hooks/useFlashMessage'
import { useEffect, useState } from 'react'
import EventForm from '../../components/form/EventForm'

const EditEvent = () => {
  const [event, setEvent] = useState({})
  const { id } = useParams()
  const { setFlashMessage } = useFlashMessage()
  const [token] = useState(localStorage.getItem('token') || '')

  useEffect(() => {
    api.get(`/events/${id}`).then(response => {
      setEvent(response.data.event)
    })
  }, [id])

  const updateEvent = async event => {
    let msgType = 'success'

    const data = await api
      .patch(`/events/${id}`, event, token)
      .then(response => {
        return response.data
      })
      .catch(err => {
        msgType = 'error'
        return err.response.data
      })

    setFlashMessage(data.message, msgType)
  }

  return (
    <section>
      <h1>Editando o evento: {event.title}</h1>

      {event.title && (
        <EventForm
          handleSubmit={updateEvent}
          eventData={event}
          btnText="Editar"
        />
      )}
    </section>
  )
}

export default EditEvent
