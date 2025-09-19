import React, { useState, useEffect } from 'react';
import { Play, Award, Users, BookOpen, Gamepad2, Trophy, Star, TreePine, Recycle, HelpCircle, Wind, Droplets, GraduationCap, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube, Landmark, Building2, School, University, Heart, Menu, X } from 'lucide-react';

const EcoQuestApp = () => {
  const [userPoints, setUserPoints] = useState(2570);
  const [userLevel, setUserLevel] = useState(3);
  const [progress, setProgress] = useState(75);
  const [activeNav, setActiveNav] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [completedMissions, setCompletedMissions] = useState([]);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [notifications, setNotifications] = useState([]);

  // Quiz data
  const quizData = [
    {
      question: "What percentage of Earth's water is freshwater?",
      options: ["3%", "10%", "25%", "50%"],
      correct: 0,
      points: 100
    },
    {
      question: "Which gas is primarily responsible for global warming?",
      options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
      correct: 2,
      points: 100
    },
    {
      question: "How long does it take for plastic to decompose?",
      options: ["10 years", "50 years", "100 years", "400+ years"],
      correct: 3,
      points: 150
    }
  ];

  // Environmental stats with animation
  const [stats, setStats] = useState({
    treesPlanted: 0,
    participants: 0,
    villagesCovered: 0,
    wasteReduction: 0
  });

  const targetStats = {
    treesPlanted: 2500000,
    participants: 75000,
    villagesCovered: 250,
    wasteReduction: 35
  };

  // Animate stats on component mount
  useEffect(() => {
    const animateStats = () => {
      const duration = 2000;
      const steps = 50;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        if (currentStep >= steps) {
          clearInterval(timer);
          setStats(targetStats);
          return;
        }

        const progress = currentStep / steps;
        setStats({
          treesPlanted: Math.floor(targetStats.treesPlanted * progress),
          participants: Math.floor(targetStats.participants * progress),
          villagesCovered: Math.floor(targetStats.villagesCovered * progress),
          wasteReduction: Math.floor(targetStats.wasteReduction * progress)
        });

        currentStep++;
      }, stepDuration);
    };

    const timer = setTimeout(animateStats, 500);
    return () => clearTimeout(timer);
  }, []);

  // Add notification system
  const addNotification = (message, type = 'success') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const startQuest = () => {
    setUserPoints(prev => prev + 50);
    addNotification('🌟 Mission started! +50 points earned!');
    
    // Simulate mission progress
    setTimeout(() => {
      setProgress(prev => Math.min(prev + 10, 100));
      if (progress >= 90) {
        setUserLevel(prev => prev + 1);
        addNotification('🎉 Level up! Welcome to Level ' + (userLevel + 1));
      }
    }, 1000);
  };

  const openQuiz = () => {
    setCurrentQuiz(0);
    setQuizScore(0);
    setShowQuizModal(true);
  };

  const answerQuiz = (answerIndex) => {
    const question = quizData[currentQuiz];
    const isCorrect = answerIndex === question.correct;
    
    if (isCorrect) {
      const newScore = quizScore + question.points;
      setQuizScore(newScore);
      setUserPoints(prev => prev + question.points);
      addNotification(`✅ Correct! +${question.points} points`);
    } else {
      addNotification('❌ Incorrect answer. Try again!', 'error');
    }

    // Move to next question or end quiz
    if (currentQuiz < quizData.length - 1) {
      setTimeout(() => setCurrentQuiz(currentQuiz + 1), 1500);
    } else {
      setTimeout(() => {
        setShowQuizModal(false);
        addNotification(`🏆 Quiz completed! Total score: ${quizScore + (isCorrect ? question.points : 0)} points`);
        if (!completedMissions.includes('quiz')) {
          setCompletedMissions(prev => [...prev, 'quiz']);
        }
      }, 1500);
    }
  };

  const openReforestation = () => {
    setUserPoints(prev => prev + 25);
    addNotification('🌳 Reforestation mission started! +25 points');
    if (!completedMissions.includes('reforestation')) {
      setCompletedMissions(prev => [...prev, 'reforestation']);
    }
  };

  const openRecycling = () => {
    setUserPoints(prev => prev + 30);
    addNotification('♻️ Recycling challenge accepted! +30 points');
    if (!completedMissions.includes('recycling')) {
      setCompletedMissions(prev => [...prev, 'recycling']);
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M+';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K+';
    }
    return num.toString();
  };

  const NavigationItem = ({ id, label, isActive, onClick }) => (
    <button
      onClick={() => {
        setActiveNav(id);
        setMobileMenuOpen(false);
        onClick && onClick();
      }}
      className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
        isActive 
          ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg' 
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-blue-700">
      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg shadow-lg transform transition-all duration-300 ${
              notification.type === 'error' 
                ? 'bg-red-500 text-white' 
                : 'bg-green-500 text-white'
            } animate-slide-in`}
          >
            {notification.message}
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="bg-white/95 backdrop-blur-lg shadow-xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="text-4xl">🌍</div>
              <div>
                <div className="text-2xl font-bold text-blue-800">EcoQuest</div>
                <div className="text-sm text-green-600 font-medium">Green Future Initiative</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              <NavigationItem id="home" label="Home" isActive={activeNav === 'home'} />
              <NavigationItem id="missions" label="Missions" isActive={activeNav === 'missions'} />
              <NavigationItem id="initiatives" label="Initiatives" isActive={activeNav === 'initiatives'} />
              <NavigationItem id="leaderboard" label="Leaderboard" isActive={activeNav === 'leaderboard'} />
              <NavigationItem id="about" label="About" isActive={activeNav === 'about'} />
              <NavigationItem id="contact" label="Contact" isActive={activeNav === 'contact'} />
            </nav>

            {/* User Points & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full font-bold flex items-center space-x-2">
                <Trophy className="w-4 h-4" />
                <span>{userPoints.toLocaleString()} Points</span>
              </div>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-2">
                <NavigationItem id="home" label="Home" isActive={activeNav === 'home'} />
                <NavigationItem id="missions" label="Missions" isActive={activeNav === 'missions'} />
                <NavigationItem id="initiatives" label="Initiatives" isActive={activeNav === 'initiatives'} />
                <NavigationItem id="leaderboard" label="Leaderboard" isActive={activeNav === 'leaderboard'} />
                <NavigationItem id="about" label="About" isActive={activeNav === 'about'} />
                <NavigationItem id="contact" label="Contact" isActive={activeNav === 'contact'} />
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-600 to-green-700 text-white p-8 lg:p-12 my-8 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                ENVIRONMENTAL QUEST
              </h1>
              <p className="text-lg lg:text-xl mb-6 opacity-95 leading-relaxed">
                Join the ultimate gamified learning experience that transforms environmental education into an exciting adventure. Complete missions, earn points, and become an eco-warrior!
              </p>
              <p className="text-green-200 font-medium">
                Supported by Environment Protection Department
              </p>
            </div>

            {/* Interactive Game Interface */}
            <div className="bg-white/15 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="bg-black/20 rounded-xl p-6 text-center mb-6">
                <h2 className="text-3xl font-bold mb-4">LEVEL {userLevel}</h2>
                <div className="bg-white/30 h-3 rounded-full overflow-hidden mb-4">
                  <div 
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="flex items-center justify-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span>Eco Warrior Status</span>
                </p>
              </div>
              
              <button
                onClick={startQuest}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold py-4 px-6 rounded-xl text-lg uppercase tracking-wider transform hover:scale-105 hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Play className="w-5 h-5" />
                <span>START MISSION</span>
              </button>
            </div>
          </div>
        </section>

        {/* Interactive Activities Grid */}
        <div className="grid md:grid-cols-3 gap-6 my-12">
          <div 
            onClick={openQuiz}
            className="bg-gradient-to-br from-purple-500 to-blue-600 text-white rounded-2xl p-8 text-center cursor-pointer transform hover:scale-105 hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent group-hover:from-white/20 transition-all duration-300"></div>
            <div className="relative z-10">
              <HelpCircle className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">ECO QUIZ</h3>
              <p className="mb-4 opacity-90">Test your environmental knowledge with interactive quizzes</p>
              <div className="flex justify-center space-x-1">
                {completedMissions.includes('quiz') ? (
                  <>
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  </>
                ) : (
                  <>
                    <Star className="w-5 h-5 text-white/50" />
                    <Star className="w-5 h-5 text-white/50" />
                    <Star className="w-5 h-5 text-white/50" />
                  </>
                )}
              </div>
            </div>
          </div>

          <div 
            onClick={openReforestation}
            className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-8 text-center cursor-pointer transform hover:scale-105 hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent group-hover:from-white/20 transition-all duration-300"></div>
            <div className="relative z-10">
              <TreePine className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">REFORESTATION</h3>
              <p className="mb-4 opacity-90">Plant virtual trees and learn about forest conservation</p>
              {completedMissions.includes('reforestation') && (
                <div className="text-yellow-300 font-medium">✓ Completed</div>
              )}
            </div>
          </div>

          <div 
            onClick={openRecycling}
            className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-2xl p-8 text-center cursor-pointer transform hover:scale-105 hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent group-hover:from-white/20 transition-all duration-300"></div>
            <div className="relative z-10">
              <Recycle className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">RECYCLING</h3>
              <p className="mb-4 opacity-90">Master waste segregation and recycling techniques</p>
              {completedMissions.includes('recycling') && (
                <div className="text-yellow-300 font-medium">✓ Completed</div>
              )}
            </div>
          </div>
        </div>

        {/* Animated Stats Section */}
        <section className="bg-gradient-to-r from-blue-800 to-purple-900 text-white p-8 lg:p-12 rounded-3xl my-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Environmental Progress</h2>
            <p className="text-lg opacity-90">Tracking our collective impact on the environment</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-4xl lg:text-5xl font-bold text-yellow-400 mb-2">
                {formatNumber(stats.treesPlanted)}
              </h3>
              <p className="text-lg opacity-90">Trees Planted</p>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-4xl lg:text-5xl font-bold text-yellow-400 mb-2">
                {formatNumber(stats.participants)}
              </h3>
              <p className="text-lg opacity-90">Active Participants</p>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-4xl lg:text-5xl font-bold text-yellow-400 mb-2">
                {stats.villagesCovered}+
              </h3>
              <p className="text-lg opacity-90">Villages Covered</p>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-4xl lg:text-5xl font-bold text-yellow-400 mb-2">
                {stats.wasteReduction}%
              </h3>
              <p className="text-lg opacity-90">Waste Reduction</p>
            </div>
          </div>
        </section>

        {/* Interactive Features */}
        <section className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-8 lg:p-12 rounded-3xl my-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Why Join EcoQuest?</h2>
            <p className="text-lg opacity-90">Discover the benefits of our environmental education platform</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: GraduationCap, title: 'Educational', desc: 'Learn with curated, region-specific content' },
              { icon: Gamepad2, title: 'Gamified', desc: 'Earn badges, points, and rewards' },
              { icon: Users, title: 'Community', desc: 'Join growing eco-warrior community' },
              { icon: Trophy, title: 'Recognition', desc: 'Get certificates from authorities' }
            ].map((feature, index) => (
              <div key={index} className="bg-white/15 backdrop-blur-lg rounded-xl p-6 text-center transform hover:scale-105 transition-all duration-300">
                <feature.icon className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="opacity-90">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-8 lg:p-12 rounded-3xl my-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to make a difference?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of people making a difference in their communities through environmental action.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-500 px-8 py-3 rounded-full font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300">
              Register Now
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-white hover:text-orange-500 transition-all duration-300">
              Learn More
            </button>
          </div>
        </section>
      </div>

      {/* Quiz Modal */}
      {showQuizModal && currentQuiz !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full transform animate-scale-in">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Environmental Quiz</h3>
              <p className="text-gray-600">Question {currentQuiz + 1} of {quizData.length}</p>
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-800 mb-4">
                {quizData[currentQuiz].question}
              </h4>
              <div className="space-y-3">
                {quizData[currentQuiz].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => answerQuiz(index)}
                    className="w-full p-4 text-left rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors duration-200"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-600">Current Score: {quizScore} points</p>
            </div>
            
            <button
              onClick={() => setShowQuizModal(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-900 to-purple-900 text-white mt-16">
        <div className="max-w-6xl mx-auto p-8 lg:p-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-yellow-400">EcoQuest</h3>
              <p className="opacity-90 leading-relaxed">
                A government initiative promoting environmental education and sustainable practices.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Quick Links</h3>
              <ul className="space-y-2">
                {['Home', 'Missions', 'Initiatives', 'Leaderboard'].map(link => (
                  <li key={link}>
                    <button className="opacity-80 hover:opacity-100 transition-opacity">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Resources</h3>
              <ul className="space-y-2">
                {['Educational Materials', 'Research Papers', 'Environmental Laws', 'Annual Reports'].map(link => (
                  <li key={link}>
                    <button className="opacity-80 hover:opacity-100 transition-opacity">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm opacity-90">Environment Dept, Chandigarh</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm opacity-90">0172-1234567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm opacity-90">info@ecoquest.gov.in</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center space-x-6 mb-8">
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
              <button key={index} className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <Icon className="w-5 h-5" />
              </button>
            ))}
          </div>
          
          <div className="text-center pt-8 border-t border-white/20">
            <p className="opacity-80">© 2023 Government Environment Protection Department. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes scale-in {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default EcoQuestApp;