import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import React, { useRef, useState } from 'react'
import AddEventModal from './AddEventModal'
import moment from 'moment'
import api from '../utils/api'
import useFlashMessage from '../hooks/useFlashMessage'

const Calendar = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [events, setEvents] = useState([])
  const { setFlashMessage } = useFlashMessage()
  const calendarRef = useRef(null)
  const [token] = useState(localStorage.getItem('token') || '')

  const onEventAdded = event => {
    let calendarApi = calendarRef.current.getApi()
    calendarApi.addEvent({
      start: moment(event.start).toDate(),
      end: moment(event.end).toDate(),
      title: event.title
    })
  }

  const handleEventAdd = async data => {
    let msgType = 'success'
    let msgText = 'Evento criado com sucesso!'

    try {
      await api.post(`/events/create`, data.event, token)
    } catch (err) {
      msgType = 'error'
      msgText = err.response.data.message
    }
    console.log(data.event)
    setFlashMessage(msgText, msgType)
  }

  const handleDatesSet = async data => {
    const response = await api.get(
      '/events/getevents?start=' +
        moment(data.start).toISOString() +
        '&end=' +
        moment(data.end).toISOString()
    )
    try {
      setEvents(response.data)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  return (
    <section>
      <div style={{ position: 'relative', zIndex: 0 }}>
        <FullCalendar
          locale="pt-br"
          ref={calendarRef}
          events={events}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          displayEventTime="true"
          displayEventEnd="true"
          eventAdd={event => handleEventAdd(event)}
          datesSet={date => handleDatesSet(date)}
          customButtons={{
            openModal: {
              text: 'Adicionar Evento',
              click: () => setModalOpen(true)
            }
          }}
          headerToolbar={{
            left: 'openModal',
            center: 'title'
          }}
        />
      </div>
      <AddEventModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onEventAdded={event => onEventAdded(event)}
      />
    </section>
  )
}

export default Calendar
