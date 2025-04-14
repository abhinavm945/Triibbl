import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const navigate = useNavigate();
  const [roomSettings, setRoomSettings] = useState({
    roomName: '',
    maxPlayers: 8,
    rounds: 3,
    drawingTime: 80,
    wordCategories: ['All'],
    isPublic: false,
    customWords: '',
    language: 'English'
  });

  const [copied, setCopied] = useState(false);
  const [generatedRoomCode, setGeneratedRoomCode] = useState('');
  const [step, setStep] = useState(1); // 1: Settings, 2: Invite

  const categories = [
    'All', 'Objects', 'Animals', 'Food', 'Nature', 
    'Technology', 'Transportation', 'Fantasy', 'People'
  ];

  const languages = [
    'English', 'Spanish', 'French', 'German', 
    'Italian', 'Portuguese', 'Dutch', 'Russian'
  ];

  // Generate a random room code when component mounts
  useEffect(() => {
    setGeneratedRoomCode(generateRoomCode());
  }, []);

  const generateRoomCode = () => {
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const handleSettingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRoomSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCategoryToggle = (category) => {
    setRoomSettings(prev => {
      if (category === 'All') {
        return { ...prev, wordCategories: ['All'] };
      }
      
      const newCategories = prev.wordCategories.includes(category)
        ? prev.wordCategories.filter(c => c !== category)
        : [...prev.wordCategories.filter(c => c !== 'All'), category];
      
      return { ...prev, wordCategories: newCategories.length ? newCategories : ['All'] };
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedRoomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCreateRoom = () => {
    // In a real app, you would send these settings to your backend
    console.log('Creating room with settings:', roomSettings);
    
    // For demo purposes, we'll navigate to the play page with the room code
    navigate(`/play?room=${generatedRoomCode}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 p-6 text-white">
          <h1 className="text-3xl font-bold">Create Private Room</h1>
          <div className="flex items-center mt-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-white text-indigo-600' : 'bg-indigo-500'} font-bold`}>
              1
            </div>
            <div className={`h-1 mx-2 flex-1 ${step >= 2 ? 'bg-white' : 'bg-indigo-400'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-white text-indigo-600' : 'bg-indigo-500'} font-bold`}>
              2
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {step === 1 ? (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-6">Room Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Room Name */}
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Room Name</label>
                  <input
                    type="text"
                    name="roomName"
                    value={roomSettings.roomName}
                    onChange={handleSettingChange}
                    placeholder="My Awesome Room"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                {/* Language */}
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Language</label>
                  <select
                    name="language"
                    value={roomSettings.language}
                    onChange={handleSettingChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {languages.map(lang => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </div>

                {/* Max Players */}
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Max Players: {roomSettings.maxPlayers}</label>
                  <input
                    type="range"
                    name="maxPlayers"
                    min="2"
                    max="12"
                    value={roomSettings.maxPlayers}
                    onChange={handleSettingChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>2</span>
                    <span>12</span>
                  </div>
                </div>

                {/* Rounds */}
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Rounds: {roomSettings.rounds}</label>
                  <input
                    type="range"
                    name="rounds"
                    min="1"
                    max="10"
                    value={roomSettings.rounds}
                    onChange={handleSettingChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>1</span>
                    <span>10</span>
                  </div>
                </div>

                {/* Drawing Time */}
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Drawing Time: {roomSettings.drawingTime} seconds</label>
                  <input
                    type="range"
                    name="drawingTime"
                    min="30"
                    max="120"
                    step="10"
                    value={roomSettings.drawingTime}
                    onChange={handleSettingChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>30s</span>
                    <span>120s</span>
                  </div>
                </div>

                {/* Visibility */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isPublic"
                    checked={roomSettings.isPublic}
                    onChange={handleSettingChange}
                    className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-gray-700">Public Room (show in lobby)</label>
                </div>
              </div>

              {/* Word Categories */}
              <div className="mt-6">
                <label className="block text-gray-700 mb-3 font-medium">Word Categories</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <motion.button
                      key={category}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => handleCategoryToggle(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                        roomSettings.wordCategories.includes(category)
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {category}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Custom Words */}
              <div className="mt-6">
                <label className="block text-gray-700 mb-2 font-medium">Custom Words (optional)</label>
                <textarea
                  name="customWords"
                  value={roomSettings.customWords}
                  onChange={handleSettingChange}
                  placeholder="Enter custom words, separated by commas"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-24"
                />
                <p className="text-sm text-gray-500 mt-1">Add your own words to the game (e.g., "Pizza, Spaceship, Unicorn")</p>
              </div>

              <div className="mt-8 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setStep(2)}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium"
                >
                  Continue to Invite
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-6">Invite Friends</h2>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-medium mb-4">Your Room Code</h3>
                <div className="flex items-center">
                  <div className="bg-white border-2 border-indigo-500 px-6 py-3 rounded-lg text-2xl font-mono font-bold tracking-wider flex-1 text-center">
                    {generatedRoomCode}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={copyToClipboard}
                    className="ml-4 bg-indigo-600 text-white px-4 py-2 rounded-lg"
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </motion.button>
                </div>
                <p className="text-sm text-gray-500 mt-2">Share this code with friends so they can join your room</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Quick Invite</h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Discord
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share Link
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Invite Friends Directly</h3>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Search friends..."
                    className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
                    Invite
                  </button>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between p-2 hover:bg-gray-100 rounded">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">JD</div>
                      <span>John Doe</span>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-800">Invite</button>
                  </div>
                  <div className="flex items-center justify-between p-2 hover:bg-gray-100 rounded">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold">AS</div>
                      <span>Alice Smith</span>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-800">Invite</button>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setStep(1)}
                  className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium"
                >
                  Back
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleCreateRoom}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium"
                >
                  Start Game
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Create;