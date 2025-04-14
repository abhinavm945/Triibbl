import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [currentWord, setCurrentWord] = useState('Draw');
  const words = ['Draw', 'Guess', 'Laugh', 'Win', 'Repeat'];
  const [isHoveringPlay, setIsHoveringPlay] = useState(false);
  const [isHoveringCreate, setIsHoveringCreate] = useState(false);

  // Word rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord(prev => {
        const currentIndex = words.indexOf(prev);
        return words[(currentIndex + 1) % words.length];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Player count animation
  const [playerCount, setPlayerCount] = useState(12453);
  useEffect(() => {
    const interval = setInterval(() => {
      setPlayerCount(prev => prev + Math.floor(Math.random() * 10));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Column - Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Welcome to <span className="text-indigo-600">Tribbl</span>
            </motion.h1>
            
            <motion.div
              key={currentWord}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text mb-8 h-14"
            >
              {currentWord}
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto lg:mx-0"
            >
              The ultimate online multiplayer drawing and guessing game. Create private rooms, play with friends, and unleash your creativity!
            </motion.p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-12">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setIsHoveringPlay(true)}
                onHoverEnd={() => setIsHoveringPlay(false)}
              >
                <Link 
                  to="/play" 
                  className="relative overflow-hidden block bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xl font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  {isHoveringPlay && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full"
                    />
                  )}
                  <span className="relative z-10">Play Now</span>
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setIsHoveringCreate(true)}
                onHoverEnd={() => setIsHoveringCreate(false)}
              >
                <Link 
                  to="/create" 
                  className="relative overflow-hidden block border-2 border-indigo-600 text-indigo-600 text-xl font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  {isHoveringCreate && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute inset-0 bg-indigo-100 rounded-full"
                    />
                  )}
                  <span className="relative z-10">Create Room</span>
                </Link>
              </motion.div>
            </div>

            {/* Player Count */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center lg:justify-start gap-3 text-gray-600"
            >
              <div className="flex items-center">
                <div className="relative flex space-x-1">
                  {[0, 0, 0].map((_, i) => (
                    <div key={i} className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                  ))}
                </div>
              </div>
              <span>{playerCount.toLocaleString()} players online</span>
            </motion.div>
          </div>

          {/* Right Column - Illustration */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-purple-200 rounded-full filter blur-3xl opacity-50"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-indigo-200 rounded-full filter blur-3xl opacity-50"></div>
              
              <div className="relative bg-white p-6 rounded-3xl shadow-2xl border-8 border-indigo-100 transform rotate-1">
                <div className="bg-gray-100 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-sm font-medium text-gray-500">Tribbl.io</div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-3 mb-3">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-sm font-medium">Guess the word:</div>
                      <div className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">80s</div>
                    </div>
                    <div className="h-40 bg-indigo-50 rounded flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">🎨</div>
                        <div className="text-lg font-bold text-indigo-700">Drawing in progress...</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center">Y</div>
                      <div className="text-sm font-medium">You</div>
                    </div>
                    <div className="flex">
                      <input 
                        type="text" 
                        placeholder="Type your guess..." 
                        className="flex-1 border rounded-l-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <button className="bg-indigo-600 text-white px-4 rounded-r-lg text-sm font-medium">Send</button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            Why Players Love <span className="text-indigo-600">Tribbl</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎨',
                title: 'Easy Drawing Tools',
                description: 'Simple yet powerful drawing tools with multiple brush sizes and colors'
              },
              {
                icon: '👥',
                title: 'Play with Friends',
                description: 'Private rooms to play with friends or join public games'
              },
              {
                icon: '🏆',
                title: 'Competitive Fun',
                description: 'Earn points for correct guesses and climb the leaderboards'
              },
              {
                icon: '💬',
                title: 'Live Chat',
                description: 'Chat with players during the game with our real-time system'
              },
              {
                icon: '🌐',
                title: 'Global Community',
                description: 'Join thousands of players from around the world'
              },
              {
                icon: '🔒',
                title: 'Safe Environment',
                description: 'Robust moderation and reporting tools for a safe experience'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-all"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Play Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 text-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            How to Play
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Create or Join',
                description: 'Start a private room or join an existing game'
              },
              {
                step: '2',
                title: 'Draw or Guess',
                description: 'When it\'s your turn, draw the word or try to guess'
              },
              {
                step: '3',
                title: 'Earn Points',
                description: 'Score points for correct guesses or when others guess your drawing'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white bg-opacity-10 p-8 rounded-xl backdrop-filter backdrop-blur-sm border border-white border-opacity-20"
              >
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto text-black">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3 text-center text-black">{item.title}</h3>
                <p className="text-black text-opacity-80 text-center">{item.description}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center mt-16"
          >
            <Link 
              to="/play" 
              className="inline-block bg-white text-indigo-600 text-xl font-bold py-4 px-12 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Start Playing Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;