import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaMicrophone, FaMicrophoneSlash, FaUserPlus, FaSignOutAlt, FaEraser, FaPencilAlt } from 'react-icons/fa';

const Play = () => {
  const navigate = useNavigate();
  // Game state
  const [gameState, setGameState] = useState('lobby'); // lobby, drawing, guessing, results
  const [players, setPlayers] = useState([
    { id: 1, name: 'You', score: 0, isDrawing: false, avatar: '👨', isMuted: false },
    { id: 2, name: 'Player2', score: 0, isDrawing: false, avatar: '👩', isMuted: true },
    { id: 3, name: 'Player3', score: 0, isDrawing: false, avatar: '🧑', isMuted: false },
    { id: 4, name: 'Player4', score: 0, isDrawing: false, avatar: '👵', isMuted: true },
  ]);
  const [currentWord, setCurrentWord] = useState('');
  const [wordOptions, setWordOptions] = useState([]);
  const [selectedWord, setSelectedWord] = useState('');
  const [timeLeft, setTimeLeft] = useState(80);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(5);
  const [brushColor, setBrushColor] = useState('#000000');
  const [canvasHistory, setCanvasHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const [canExit, setCanExit] = useState(true);
  const [drawingTool, setDrawingTool] = useState('pencil'); // 'pencil' or 'eraser'
  const [isDrawingActive, setIsDrawingActive] = useState(false);

  // Refs
  const canvasRef = useRef(null);
  const chatContainerRef = useRef(null);
  const messageInputRef = useRef(null);
  const ctxRef = useRef(null);

  // Word bank
  const wordBank = [
    'Dog', 'Cat', 'House', 'Car', 'Tree', 'Sun', 'Mountain', 'River',
    'Pizza', 'Computer', 'Phone', 'Book', 'Chair', 'Table', 'Guitar',
    'Doctor', 'Teacher', 'Astronaut', 'Dinosaur', 'Dragon', 'Unicorn'
  ];

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctxRef.current = ctx;
  }, []);

  // Exit timer logic
  useEffect(() => {
    if (!canExit) {
      const timer = setTimeout(() => {
        setCanExit(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [canExit]);

  // Start game logic
  useEffect(() => {
    if (gameState === 'lobby') {
      const timer = setTimeout(() => {
        startGame();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [gameState]);

  // Timer logic
  useEffect(() => {
    if (gameState === 'drawing' || gameState === 'guessing') {
      const timer = timeLeft > 0 && setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, gameState]);

  // Auto-scroll chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Start the game
  const startGame = () => {
    const updatedPlayers = [...players];
    updatedPlayers[0].isDrawing = true;
    setPlayers(updatedPlayers);
    setIsDrawing(true);
    setGameState('wordSelection');
    generateWordOptions();
  };

  // Generate word options
  const generateWordOptions = () => {
    const options = [];
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * wordBank.length);
      options.push(wordBank[randomIndex]);
    }
    setWordOptions(options);
  };

  // Handle word selection
  const handleWordSelect = (word) => {
    setSelectedWord(word);
    setCurrentWord(word);
    setGameState('drawing');
  };

  // Handle exit confirmation
  const handleExit = () => {
    if (canExit) {
      setShowExitConfirmation(true);
    } else {
      alert('Please wait 5 seconds before exiting the game');
    }
  };

  // Confirm exit
  const confirmExit = () => {
    navigate('/');
  };

  // Toggle mute
  const toggleMute = (playerId) => {
    setPlayers(players.map(player => 
      player.id === playerId ? { ...player, isMuted: !player.isMuted } : player
    ));
  };

  // Handle canvas drawing
  const startDrawing = (e) => {
    if (!isDrawing || !isDrawingActive) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(x, y);
    ctxRef.current.strokeStyle = drawingTool === 'eraser' ? '#ffffff' : brushColor;
    ctxRef.current.lineWidth = drawingTool === 'eraser' ? brushSize * 2 : brushSize;
    ctxRef.current.lineCap = 'round';
    ctxRef.current.lineJoin = 'round';
    
    setCanvasHistory([...canvasHistory.slice(0, historyIndex + 1), { 
      x, y, 
      color: drawingTool === 'eraser' ? '#ffffff' : brushColor,
      size: drawingTool === 'eraser' ? brushSize * 2 : brushSize,
      tool: drawingTool
    }]);
    setHistoryIndex(historyIndex + 1);
  };

  const draw = (e) => {
    if (!isDrawing || !isDrawingActive) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctxRef.current.lineTo(x, y);
    ctxRef.current.stroke();
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(x, y);
    
    setCanvasHistory([...canvasHistory, { 
      x, y, 
      color: drawingTool === 'eraser' ? '#ffffff' : brushColor,
      size: drawingTool === 'eraser' ? brushSize * 2 : brushSize,
      tool: drawingTool
    }]);
    setHistoryIndex(historyIndex + 1);
  };

  const stopDrawing = () => {
    ctxRef.current.beginPath();
    setIsDrawingActive(false);
  };

  // Clear canvas
  const clearCanvas = () => {
    ctxRef.current.fillStyle = '#ffffff';
    ctxRef.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setCanvasHistory([]);
    setHistoryIndex(-1);
  };

  // Undo last drawing action
  const undoDrawing = () => {
    if (historyIndex < 0) return;
    
    ctxRef.current.fillStyle = '#ffffff';
    ctxRef.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    for (let i = 0; i < historyIndex; i++) {
      const stroke = canvasHistory[i];
      if (i === 0) {
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(stroke.x, stroke.y);
      } else {
        ctxRef.current.lineTo(stroke.x, stroke.y);
        ctxRef.current.strokeStyle = stroke.color;
        ctxRef.current.lineWidth = stroke.size;
        ctxRef.current.stroke();
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(stroke.x, stroke.y);
      }
    }
    
    setHistoryIndex(historyIndex - 1);
  };

  // Send message
  const sendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    
    const newMessage = {
      id: Date.now(),
      player: 'You',
      text: messageInput,
      isCorrect: messageInput.toLowerCase() === currentWord.toLowerCase()
    };
    
    setMessages([...messages, newMessage]);
    setMessageInput('');
    messageInputRef.current.focus();
    
    if (newMessage.isCorrect) {
      const updatedPlayers = [...players];
      const playerIndex = updatedPlayers.findIndex(p => p.name === 'You');
      if (playerIndex !== -1) {
        updatedPlayers[playerIndex].score += 100;
        setPlayers(updatedPlayers);
      }
      
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          player: 'System',
          text: 'You guessed correctly! +100 points',
          isSystem: true
        }]);
      }, 500);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 relative">
      {/* Exit Confirmation Modal */}
      {showExitConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full"
          >
            <h3 className="text-xl font-bold mb-4">Leave Game?</h3>
            <p className="mb-6">Are you sure you want to leave the current game?</p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowExitConfirmation(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={confirmExit}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Leave
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Left sidebar - Players list */}
      <div className="w-full md:w-64 bg-white shadow-md p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Players ({players.length})</h2>
          <button 
            onClick={handleExit}
            className="text-red-500 hover:text-red-700 flex items-center gap-1"
          >
            <FaSignOutAlt /> Exit
          </button>
        </div>
        <div className="space-y-3">
          {players.map(player => (
            <motion.div 
              key={player.id}
              whileHover={{ scale: 1.02 }}
              className={`flex items-center p-2 rounded ${player.isDrawing ? 'bg-indigo-100' : 'bg-gray-50'}`}
            >
              <span className="text-2xl mr-3">{player.avatar}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{player.name} {player.isDrawing && '🎨'}</p>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => toggleMute(player.id)}
                      className={`p-1 rounded-full ${player.isMuted ? 'bg-gray-200 text-gray-600' : 'bg-indigo-100 text-indigo-600'}`}
                    >
                      {player.isMuted ? <FaMicrophoneSlash size={14} /> : <FaMicrophone size={14} />}
                    </button>
                    {player.name !== 'You' && (
                      <button className="p-1 rounded-full bg-gray-200 text-gray-600 hover:bg-indigo-100 hover:text-indigo-600">
                        <FaUserPlus size={14} />
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-600">{player.score} points</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Game info */}
        <div className="mt-6 p-3 bg-gray-50 rounded">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Round:</span>
            <span>1/3</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Time:</span>
            <span className={`font-bold ${timeLeft < 10 ? 'text-red-500' : 'text-gray-700'}`}>
              {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
      
      {/* Main game area */}
      <div className="flex-1 flex flex-col p-4">
        {/* Game header */}
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          {gameState === 'wordSelection' && (
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">Choose a word to draw:</h3>
              <div className="flex justify-center gap-4">
                {wordOptions.map((word, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-full"
                    onClick={() => handleWordSelect(word)}
                  >
                    {word}
                  </motion.button>
                ))}
              </div>
            </div>
          )}
          
          {gameState === 'drawing' && (
            <div className="text-center">
              <h3 className="text-xl font-bold">Draw:</h3>
              <p className="text-2xl font-bold text-indigo-700">{currentWord}</p>
            </div>
          )}
          
          {gameState === 'guessing' && (
            <div className="text-center">
              <h3 className="text-xl font-bold">Guess what's being drawn!</h3>
              <p className="text-lg text-gray-600">Current drawer: {players.find(p => p.isDrawing)?.name}</p>
            </div>
          )}
        </div>
        
        {/* Canvas area */}
        <div 
          className="flex-1 bg-white rounded-lg shadow-md overflow-hidden relative"
          onMouseDown={() => setIsDrawingActive(true)}
          onMouseUp={() => setIsDrawingActive(false)}
          onMouseLeave={() => setIsDrawingActive(false)}
        >
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className="w-full h-full cursor-crosshair bg-white"
          />
          
          {/* Drawing tools (only visible to drawer) */}
          {isDrawing && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-md flex flex-col items-center gap-3"
            >
              <div className="flex gap-2">
                <button
                  onClick={() => setDrawingTool('pencil')}
                  className={`p-1 rounded ${drawingTool === 'pencil' ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100'}`}
                  title="Pencil"
                >
                  <FaPencilAlt />
                </button>
                <button
                  onClick={() => setDrawingTool('eraser')}
                  className={`p-1 rounded ${drawingTool === 'eraser' ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100'}`}
                  title="Eraser"
                >
                  <FaEraser />
                </button>
              </div>
              
              <div className="flex gap-2">
                {['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'].map(color => (
                  <button
                    key={color}
                    className={`w-6 h-6 rounded-full ${brushColor === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      setBrushColor(color);
                      setDrawingTool('pencil');
                    }}
                  />
                ))}
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  className="p-1 bg-gray-200 rounded"
                  onClick={() => setBrushSize(Math.max(2, brushSize - 2))}
                >
                  -
                </button>
                <div className="w-8 text-center">{brushSize}</div>
                <button 
                  className="p-1 bg-gray-200 rounded"
                  onClick={() => setBrushSize(Math.min(20, brushSize + 2))}
                >
                  +
                </button>
              </div>
              
              <div className="flex gap-2">
                <button 
                  className="px-3 py-1 bg-gray-200 rounded text-sm"
                  onClick={undoDrawing}
                >
                  Undo
                </button>
                <button 
                  className="px-3 py-1 bg-gray-200 rounded text-sm"
                  onClick={clearCanvas}
                >
                  Clear
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Right sidebar - Chat */}
      <div className="w-full md:w-80 bg-white shadow-md flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Chat</h2>
        </div>
        
        <div 
          ref={chatContainerRef}
          className="flex-1 p-4 overflow-y-auto"
        >
          {messages.map(message => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-3 ${message.isCorrect ? 'bg-green-100 p-2 rounded' : ''}`}
            >
              <p className="font-medium">
                {message.player === 'System' ? (
                  <span className="text-gray-500">{message.text}</span>
                ) : (
                  <>
                    <span className={message.player === 'You' ? 'text-indigo-600' : 'text-gray-700'}>
                      {message.player}:
                    </span>{' '}
                    <span>{message.text}</span>
                  </>
                )}
              </p>
            </motion.div>
          ))}
        </div>
        
        <form onSubmit={sendMessage} className="p-4 border-t">
          <div className="flex gap-2">
            <input
              ref={messageInputRef}
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type your guess..."
              className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              autoFocus
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-indigo-600 text-white px-4 rounded-full"
            >
              Send
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Play;