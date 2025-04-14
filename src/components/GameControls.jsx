import { useState } from 'react'
import { useGame } from '../contexts/GameContext'
import { FaVolumeUp, FaVolumeMute, FaInfoCircle } from 'react-icons/fa'

export default function GameControls() {
  const { isMuted, toggleMute, currentRound, totalRounds, timer } = useGame()
  const [showHint, setShowHint] = useState(false)

  return (
    <div className="bg-gray-800 p-4 rounded-lg space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-white">
          Round: {currentRound}/{totalRounds}
        </div>
        <div className="text-white">
          Time: {timer}s
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleMute}
          className="p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
        
        <button
          onClick={() => setShowHint(!showHint)}
          className="p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600"
          aria-label="Hint"
        >
          <FaInfoCircle />
        </button>
      </div>
      
      {showHint && (
        <div className="p-3 bg-blue-900 text-white rounded">
          Hint: The word is related to animals and starts with "C".
        </div>
      )}
    </div>
  )
}