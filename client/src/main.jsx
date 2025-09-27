import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import io from 'socket.io-client'

// Initialize Socket.IO client with proper configuration
const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:3003', {
  transports: ['websocket', 'polling'],
  withCredentials: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  timeout: 20000,
})

// Handle connection events
socket.on('connect', () => {
  console.log('Socket.IO connected:', socket.id)
})

socket.on('connect_error', (error) => {
  console.error('Socket.IO connection error:', error)
})

socket.on('disconnect', (reason) => {
  console.log('Socket.IO disconnected:', reason)
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App socket={socket} />
  </StrictMode>,
)