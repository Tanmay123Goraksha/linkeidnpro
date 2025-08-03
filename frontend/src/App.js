import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Plus, Heart, MessageCircle, Share2, Calendar, UserCircle, Home, Search, Bell, Menu, X } from 'lucide-react';

// Mock data for demonstration
const initialUsers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    bio: "Full Stack Developer passionate about React and Node.js. Building innovative solutions for modern web applications.",
    avatar: "SJ"
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael@example.com",
    bio: "UI/UX Designer with 8+ years experience. Love creating beautiful, user-centered digital experiences.",
    avatar: "MC"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily@example.com",
    bio: "Product Manager | Tech Enthusiast | Helping startups scale their products from 0 to 1.",
    avatar: "ER"
  }
];

const initialPosts = [
  {
    id: 1,
    userId: 1,
    content: "Just finished building a React application with TypeScript! The type safety really makes a difference in large projects. What's your favorite development stack?",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    likes: 12,
    comments: 3
  },
  {
    id: 2,
    userId: 2,
    content: "Design tip: Always consider accessibility from the start of your design process. It's not just about compliance—it's about creating inclusive experiences for everyone.",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    likes: 8,
    comments: 2
  },
  {
    id: 3,
    userId: 3,
    content: "Excited to announce that our startup just reached 10K users! Grateful for the amazing team and all the lessons learned along the way.",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    likes: 25,
    comments: 7
  }
];

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState(initialUsers);
  const [posts, setPosts] = useState(initialPosts);
  const [currentView, setCurrentView] = useState('login');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [newPost, setNewPost] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auth states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerBio, setRegisterBio] = useState('');

  // Demo login
  useEffect(() => {
    const demoUser = users[0];
    setCurrentUser(demoUser);
    setCurrentView('feed');
  }, []);

  const handleLogin = (e) => {
    const user = users.find(u => u.email === loginEmail);
    if (user) {
      setCurrentUser(user);
      setCurrentView('feed');
      setLoginEmail('');
      setLoginPassword('');
    }
  };

  const handleRegister = (e) => {
    const newUser = {
      id: users.length + 1,
      name: registerName,
      email: registerEmail,
      bio: registerBio,
      avatar: registerName.split(' ').map(n => n[0]).join('').toUpperCase()
    };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    setCurrentView('feed');
    setRegisterName('');
    setRegisterEmail('');
    setRegisterPassword('');
    setRegisterBio('');
  };

  const handleCreatePost = (e) => {
    if (!newPost.trim()) return;
    
    const post = {
      id: posts.length + 1,
      userId: currentUser.id,
      content: newPost,
      timestamp: new Date(),
      likes: 0,
      comments: 0
    };
    setPosts([post, ...posts]);
    setNewPost('');
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    return 'now';
  };

  const PostCard = ({ post }) => {
    const author = users.find(u => u.id === post.userId);
    
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-4 hover:shadow-md transition-shadow">
        <div className="flex items-start space-x-4">
          <div 
            className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer hover:scale-105 transition-transform"
            onClick={() => {
              setSelectedProfile(author);
              setCurrentView('profile');
            }}
          >
            {author?.avatar}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 
                className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600"
                onClick={() => {
                  setSelectedProfile(author);
                  setCurrentView('profile');
                }}
              >
                {author?.name}
              </h3>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500 text-sm">{formatTime(post.timestamp)}</span>
            </div>
            <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>
            <div className="flex items-center space-x-6 text-gray-500">
              <button className="flex items-center space-x-2 hover:text-red-500 transition-colors">
                <Heart className="w-4 h-4" />
                <span className="text-sm">{post.likes}</span>
              </button>
              <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">{post.comments}</span>
              </button>
              <button className="flex items-center space-x-2 hover:text-green-500 transition-colors">
                <Share2 className="w-4 h-4" />
                <span className="text-sm">Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AuthForm = ({ isLogin }) => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <UserCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {isLogin ? 'Welcome Back' : 'Join Our Community'}
          </h1>
          <p className="text-gray-600">
            {isLogin ? 'Sign in to your account' : 'Create your professional profile'}
          </p>
        </div>

        <div className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                value={isLogin ? loginEmail : registerEmail}
                onChange={(e) => isLogin ? setLoginEmail(e.target.value) : setRegisterEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="password"
                value={isLogin ? loginPassword : registerPassword}
                onChange={(e) => isLogin ? setLoginPassword(e.target.value) : setRegisterPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea
                value={registerBio}
                onChange={(e) => setRegisterBio(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows="3"
                placeholder="Tell us about yourself..."
                required
              />
            </div>
          )}

          <button
            onClick={isLogin ? handleLogin : handleRegister}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-[1.02]"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setCurrentView(isLogin ? 'register' : 'login')}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        {isLogin && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700 text-center">
              Demo: Use sarah@example.com or any existing email
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const Navigation = () => (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 hidden sm:block">LinkedCommunity</h1>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => setCurrentView('feed')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                currentView === 'feed' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>
            <button
              onClick={() => {
                setSelectedProfile(currentUser);
                setCurrentView('profile');
              }}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                currentView === 'profile' && selectedProfile?.id === currentUser?.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <UserCircle className="w-4 h-4" />
              <span>Profile</span>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
              {currentUser?.avatar}
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-2">
          <button
            onClick={() => {
              setCurrentView('feed');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50"
          >
            Home
          </button>
          <button
            onClick={() => {
              setSelectedProfile(currentUser);
              setCurrentView('profile');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50"
          >
            Profile
          </button>
          <button
            onClick={() => {
              setCurrentUser(null);
              setCurrentView('login');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left px-3 py-2 rounded-lg text-red-600 hover:bg-red-50"
          >
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );

  const FeedView = () => (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Create Post */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
              {currentUser?.avatar}
            </div>
            <div className="flex-1">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full p-4 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
              />
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleCreatePost}
                  disabled={!newPost.trim()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Post</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Feed */}
        <div>
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );

  const ProfileView = () => {
    const userPosts = posts.filter(p => p.userId === selectedProfile?.id);
    
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Profile Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {selectedProfile?.avatar}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{selectedProfile?.name}</h1>
                <p className="text-gray-600 mb-4">{selectedProfile?.bio}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Mail className="w-4 h-4" />
                    <span>{selectedProfile?.email}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{userPosts.length} posts</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* User Posts */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Posts</h2>
            {userPosts.length > 0 ? (
              userPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                <p className="text-gray-500">No posts yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (!currentUser) {
    return <AuthForm isLogin={currentView === 'login'} />;
  }

  return (
    <div>
      {currentView === 'feed' && <FeedView />}
      {currentView === 'profile' && <ProfileView />}
      {currentView === 'login' && <AuthForm isLogin={true} />}
      {currentView === 'register' && <AuthForm isLogin={false} />}
    </div>
  );
};

export default App;