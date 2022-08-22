import React, { useEffect, useState } from 'react'
import api from '../../utils/api'
import Moment from 'react-moment'
import useFlashMessage from '../../hooks/useFlashMessage'
import { Link, useNavigate } from 'react-router-dom'
import './Dashboard.css'

const Dashboard = () => {
  const [events, setEvents] = useState([])
  const { setFlashMessage } = useFlashMessage()
  const [token] = useState(localStorage.getItem('token'))
  const navigate = useNavigate()

  useEffect(() => {
    api
      .get('/events/myevents', token)
      .then(response => {
        setEvents(response.data.events)
      })
      .catch(err => {
        console.log(err.response.data)
      })
  }, [token])

  const removeEvent = async id => {
    let msgType = 'success'
    let msgText = 'Evento removido com sucesso!'
    await api
      .delete(`/events/${id}`, token)
      .then(response => {
        const updatedEvents = events.filter(event => event._id !== id)
        setEvents(updatedEvents)
        return response.data
      })
      .catch(err => {
        msgType = 'error'
        msgText = err.response.data.message
      })
    setFlashMessage(msgText, msgType)
  }

  return (
    <div className="dashboard">
      <div className="title-container">
        <h2>Meus Eventos</h2>
        <button
          className="btn bold"
          onClick={() => {
            navigate('/events/new')
          }}
        >
          Criar Evento
        </button>
        {!token && <p>Carregando...</p>}
      </div>
      {events.length > 0 &&
        events.map(event => (
          <>
            <div className="events-container">
              <ul>
                <li key={event._id}>
                  <span className="bold label">{event.title}</span>
                  {event.description}
                  <Moment format="DD/MM/YYYY">{event.start}</Moment>

                  <div className="actions">
                    <Link to={`/event/edit/${event._id}`}>Editar</Link>
                    <button
                      className="btn bold"
                      onClick={() => {
                        removeEvent(event._id)
                      }}
                    >
                      Excluir
                    </button>
                  </div>
                </li>
              </ul>
            </div>
            <div></div>
          </>
        ))}
    </div>
  )
}

export default Dashboard
