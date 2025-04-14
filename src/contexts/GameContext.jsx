import { createContext, useContext, useState } from 'react'

const GameContext = createContext()

export function GameProvider({ children }) {
  const [isMuted, setIsMuted] = useState(false)
  const [currentRound, setCurrentRound] = useState(1)
  const [totalRounds, setTotalRounds] = useState(3)
  const [timer, setTimer] = useState(60)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentWord, setCurrentWord] = useState('')

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <GameContext.Provider
      value={{
        isMuted,
        toggleMute,
        currentRound,
        totalRounds,
        timer,
        isDrawing,
        currentWord,
        setCurrentWord,
        setIsDrawing
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  return useContext(GameContext)
}