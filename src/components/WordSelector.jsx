import { useState } from 'react'
import { socket } from '../services/socket'

export default function WordSelector({ isDrawer, words }) {
  const [selectedWord, setSelectedWord] = useState(null)

  const selectWord = (word) => {
    if (isDrawer) {
      setSelectedWord(word)
      socket.emit('word_selected', word)
    }
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-3 text-white">
        {isDrawer ? 'Select a word to draw:' : 'Waiting for drawer to choose...'}
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {words.map((word, index) => (
          <button
            key={index}
            onClick={() => selectWord(word)}
            disabled={!isDrawer}
            className={`p-3 rounded text-center font-medium ${
              isDrawer
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-700 text-gray-400'
            } ${
              selectedWord === word ? 'ring-2 ring-yellow-400' : ''
            }`}
          >
            {word}
          </button>
        ))}
      </div>
    </div>
  )
}