import React, { useState } from 'react'
import Modal from 'react-modal'
import '../components/form/Form.css'
import '../components/form/Input.css'

const AddEventModal = ({ isOpen, onClose, onEventAdded }) => {
  const [title, setTitle] = useState('')
  const [start, setStart] = useState(new Date())
  const [end, setEnd] = useState(new Date())
  const [description, setDescription] = useState('')

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  }

  const handleSubmit = e => {
    e.preventDefault()

    onEventAdded({
      title,
      start,
      end,
      description
    })

    onClose()
  }

  return (
    <Modal style={customStyles} isOpen={isOpen} onRequestClose={onClose}>
      <form className="form_container" onSubmit={handleSubmit}>
        <div className="form_control">
          <label htmlFor="title">Título do evento: </label>
          <input
            text="Titulo do evento"
            type="text"
            name="title"
            placeholder="Digite o título"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="form_control">
          <label htmlFor="start">Inicio do evento: </label>
          <input
            text="Data de inicio"
            type="datetime-local"
            name="start"
            placeholder="Selecione a data de inicio do evento"
            onChange={e => setStart(e.target.value)}
            value={start}
          />
        </div>
        <div className="form_control">
          <label htmlFor="end">Fim do evento: </label>
          <input
            text="Data de término"
            type="datetime-local"
            name="end"
            placeholder="Selecione a data de término do evento"
            onChange={e => setEnd(e.target.value)}
            value={end}
          />
        </div>
        <div className="form_control">
          <label htmlFor="description">Descrição do evento: </label>
          <input
            type="text"
            name="description"
            placeholder="Descrição do evento"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <button className="submitbtn">Adicionar Evento</button>
      </form>
    </Modal>
  )
}

export default AddEventModal
