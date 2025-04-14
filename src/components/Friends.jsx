import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Friends = () => {
  // User profile data
  const [profile, setProfile] = useState({
    id: 'TRBL-7842-5921',
    name: 'PlayerOne',
    avatar: '👨‍🎨',
    level: 12,
    xp: 1250,
    gamesPlayed: 42,
    wins: 28,
    friendsCount: 17,
  });

  // Friend list data
  const [friends, setFriends] = useState([
    {
      id: 'TRBL-1234-5678',
      name: 'SketchMaster',
      avatar: '👩‍🎨',
      status: 'online',
      level: 15,
      lastActive: 'Now',
      isPlaying: false,
    },
    {
      id: 'TRBL-2345-6789',
      name: 'ArtLover',
      avatar: '🧑‍🎨',
      status: 'online',
      level: 8,
      lastActive: 'Now',
      isPlaying: true,
      currentGame: 'TRBL-GAME-1357',
    },
    {
      id: 'TRBL-3456-7890',
      name: 'DoodlePro',
      avatar: '👨‍💻',
      status: 'offline',
      level: 22,
      lastActive: '2 hours ago',
      isPlaying: false,
    },
    {
      id: 'TRBL-4567-8901',
      name: 'PicassoFan',
      avatar: '👩‍💻',
      status: 'online',
      level: 5,
      lastActive: 'Now',
      isPlaying: false,
    },
    {
      id: 'TRBL-5678-9012',
      name: 'QuickDraw',
      avatar: '🧑‍💻',
      status: 'away',
      level: 18,
      lastActive: '30 mins ago',
      isPlaying: false,
    },
  ]);

  // State for adding new friends
  const [newFriendId, setNewFriendId] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showAddFriend, setShowAddFriend] = useState(false);

  // Search for friends by ID
  const searchFriend = () => {
    if (!newFriendId.trim()) return;
    
    // Simulate API call
    setTimeout(() => {
      setSearchResults([
        {
          id: newFriendId.toUpperCase(),
          name: `User${Math.floor(Math.random() * 1000)}`,
          avatar: ['👨', '👩', '🧑', '👵', '👴'][Math.floor(Math.random() * 5)],
          level: Math.floor(Math.random() * 30),
          status: ['online', 'offline', 'away'][Math.floor(Math.random() * 3)],
        }
      ]);
    }, 500);
  };

  // Add a new friend
  const addFriend = (friend) => {
    if (friends.some(f => f.id === friend.id)) {
      alert('This user is already in your friends list!');
      return;
    }
    
    setFriends([...friends, {
      ...friend,
      lastActive: 'Now',
      isPlaying: false,
    }]);
    setProfile(prev => ({
      ...prev,
      friendsCount: prev.friendsCount + 1,
    }));
    setNewFriendId('');
    setSearchResults([]);
    setShowAddFriend(false);
  };

  // Remove a friend
  const removeFriend = (friendId) => {
    setFriends(friends.filter(f => f.id !== friendId));
    setProfile(prev => ({
      ...prev,
      friendsCount: prev.friendsCount - 1,
    }));
  };

  // Invite to game
  const inviteToGame = (friendId) => {
    alert(`Invitation sent to ${friends.find(f => f.id === friendId).name}!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Friends</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="text-5xl">{profile.avatar}</div>
                <span className="bg-white text-indigo-600 px-3 py-1 rounded-full text-sm font-bold">
                  Level {profile.level}
                </span>
              </div>
              <h2 className="text-2xl font-bold mt-4">{profile.name}</h2>
              <p className="text-indigo-100">ID: {profile.id}</p>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Progress to next level</span>
                  <span className="font-medium">{profile.xp}/2000 XP</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-indigo-600 h-2.5 rounded-full" 
                    style={{ width: `${(profile.xp / 2000) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-indigo-600">{profile.gamesPlayed}</p>
                  <p className="text-gray-600">Games Played</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-indigo-600">{profile.wins}</p>
                  <p className="text-gray-600">Wins</p>
                </div>
              </div>
              
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                Edit Profile
              </button>
            </div>
          </motion.div>
          
          {/* Friends List Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">
                  Friends ({profile.friendsCount})
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddFriend(!showAddFriend)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  {showAddFriend ? 'Cancel' : 'Add Friend'}
                </motion.button>
              </div>
              
              {/* Add Friend Form */}
              {showAddFriend && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-6 border-b border-gray-200"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <input
                      type="text"
                      value={newFriendId}
                      onChange={(e) => setNewFriendId(e.target.value)}
                      placeholder="Enter Player ID (e.g., TRBL-XXXX-XXXX)"
                      className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button
                      onClick={searchFriend}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Search
                    </button>
                  </div>
                  
                  {searchResults.length > 0 && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      {searchResults.map((result) => (
                        <div key={result.id} className="flex items-center justify-between p-3">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">{result.avatar}</div>
                            <div>
                              <p className="font-medium">{result.name}</p>
                              <p className="text-sm text-gray-600">ID: {result.id} • Level {result.level}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => addFriend(result)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                          >
                            Add Friend
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
              
              {/* Friends List */}
              <div className="divide-y divide-gray-200">
                {friends.length > 0 ? (
                  friends.map((friend) => (
                    <motion.div
                      key={friend.id}
                      whileHover={{ backgroundColor: '#f9fafb' }}
                      className="p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="text-3xl">{friend.avatar}</div>
                          <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                            friend.status === 'online' ? 'bg-green-500' : 
                            friend.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                          }`}></div>
                        </div>
                        <div>
                          <p className="font-medium">{friend.name}</p>
                          <p className="text-sm text-gray-600">
                            {friend.status === 'online' ? (
                              friend.isPlaying ? (
                                <span className="text-red-500">In Game</span>
                              ) : (
                                <span className="text-green-500">Online</span>
                              )
                            ) : (
                              `Last active ${friend.lastActive}`
                            )}
                            {friend.isPlaying && friend.currentGame && (
                              <Link 
                                to={`/play?room=${friend.currentGame}`} 
                                className="ml-2 text-indigo-600 hover:underline"
                              >
                                Join Game
                              </Link>
                            )}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {friend.status === 'online' && !friend.isPlaying && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => inviteToGame(friend.id)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                          >
                            Invite to Game
                          </motion.button>
                        )}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => removeFriend(friend.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          title="Remove friend"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </motion.button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    <p>You don't have any friends yet. Add some to start playing together!</p>
                  </div>
                )}
              </div>
            </motion.div>
            
            {/* Friendly Match Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden mt-8"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">Start a Friendly Match</h2>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium">Select Friends</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {friends.filter(f => f.status === 'online').map(friend => (
                      <div key={friend.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`friend-${friend.id}`}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`friend-${friend.id}`} className="ml-2 flex items-center">
                          <span className="text-xl mr-2">{friend.avatar}</span>
                          <span>{friend.name}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium">Game Settings</label>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Rounds</label>
                      <select className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                        <option>3</option>
                        <option>5</option>
                        <option>7</option>
                        <option>10</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Drawing Time</label>
                      <select className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                        <option>60 seconds</option>
                        <option>80 seconds</option>
                        <option>100 seconds</option>
                        <option>120 seconds</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Word Categories</label>
                      <select className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                        <option>All Categories</option>
                        <option>Animals</option>
                        <option>Food</option>
                        <option>Objects</option>
                        <option>Places</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 px-6 rounded-lg font-bold text-lg shadow-md transition-all"
                >
                  Create Friendly Match
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friends;