/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { socket } from '../services/socket'
import { useAuth } from '../contexts/AuthContext'

export default function PlayerList({ roomId }) {
  const [players, setPlayers] = useState([])
  const { currentUser } = useAuth()

  useEffect(() => {
    socket.on('players_update', (roomPlayers) => {
      setPlayers(roomPlayers)
    })

    return () => {
      socket.off('players_update')
    }
  }, [])

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-3 text-white">Players ({players.length})</h3>
      <ul className="space-y-2">
        {players.map((player) => (
          <li key={player.id} className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-2">
              {player.username.charAt(0).toUpperCase()}
            </div>
            <span className={`${player.id === currentUser?.uid ? 'text-yellow-400 font-bold' : 'text-white'}`}>
              {player.username}
            </span>
            {player.isDrawer && (
              <span className="ml-2 bg-yellow-500 text-xs text-black px-2 py-1 rounded">
                Drawing
              </span>
            )}
            {player.score > 0 && (
              <span className="ml-auto bg-green-600 text-xs text-white px-2 py-1 rounded">
                {player.score} pts
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}