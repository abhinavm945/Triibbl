import { useState, useEffect, useRef } from 'react'
import { socket } from '../services/socket'
import { useAuth } from '../contexts/AuthContext'

export default function GameChat({ roomId }) {
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const { currentUser } = useAuth()
  const messagesEndRef = useRef(null)

  useEffect(() => {
    socket.on('chat_message', (msg) => {
      setMessages(prev => [...prev, msg])
    })

    return () => {
      socket.off('chat_message')
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const sendMessage = (e) => {
    e.preventDefault()
    if (message.trim() && currentUser) {
      const newMessage = {
        roomId,
        userId: currentUser.uid,
        username: currentUser.displayName,
        text: message,
        timestamp: new Date().toISOString()
      }
      socket.emit('chat_message', newMessage)
      setMessage('')
    }
  }

  return (
    <div className="flex flex-col h-full bg-gray-800 rounded-lg">
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.map((msg, i) => (
          <div key={i} className="flex items-start">
            <span className="font-bold text-blue-400 mr-2">{msg.username}:</span>
            <span className="text-gray-200">{msg.text}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} className="p-2 flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-gray-700 text-white px-3 py-2 rounded-l focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  )
}