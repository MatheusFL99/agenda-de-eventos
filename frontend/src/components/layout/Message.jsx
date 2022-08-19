import { useEffect } from 'react'
import { useState } from 'react'
import bus from '../../utils/bus'
import './Message.css'

const Message = () => {
  const [visibility, setVisibility] = useState(false)
  const [message, setMessage] = useState('')
  const [type, setType] = useState('')

  useEffect(() => {
    bus.addListener('flash', ({ message, type }) => {
      setVisibility(true)
      setMessage(message)
      setType(type)

      setTimeout(() => {
        setVisibility(false)
      }, 4000)
    })
  }, [])

  return visibility && <div className={`message ${type}`}>{message}</div>
}

export default Message
