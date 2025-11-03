import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import './ChatBot.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Context-aware answer function with conversation memory
function getAnswer(question: string, conversationHistory: Message[]): string {
  const q = question.toLowerCase();
  
  // Build context from previous messages
  const recentMessages = conversationHistory.slice(-4); // Last 2 exchanges
  const context = recentMessages.map(m => m.content.toLowerCase()).join(' ');
  
  // Check for follow-up questions
  const isFollowUp = q.match(/\b(more|tell me more|what about|how about|and|also|else|other|another|details|specific)\b/);
  
  // Detect what topic we were discussing
  const discussingProjects = context.includes('project') || context.includes('app') || context.includes('built');
  const discussingSkills = context.includes('skill') || context.includes('technology') || context.includes('know');
  const discussingExperience = context.includes('experience') || context.includes('work') || context.includes('job');
  const discussingFirebase = context.includes('firebase');
  const discussingFlutter = context.includes('flutter');
  const discussingQuiz = context.includes('quiz') || context.includes('adaptive');
  const discussingProbuddy = context.includes('probuddy');
  const discussingScribble = context.includes('scribble') || context.includes('game');
  
  // Handle follow-up questions based on context
  if (isFollowUp) {
    if (discussingQuiz) {
      return "**More about Adaptive Quiz Engine:**\n\nChallenges Solved:\n• Reduced AI response time from 15s to <2s using question pooling\n• Implemented IRT 3-Parameter Logistic Model with Bayesian updating\n• Built RAG pipeline with smart chunking for large PDFs\n• Achieved <200ms latency for ability estimation\n\n🔗 GitHub: github.com/HarshChauhan111/adaptive_quiz_firebase";
    }
    if (discussingProbuddy) {
      return "**ProBuddy Deep Dive:**\n\nTechnical Achievements:\n• Implemented AutomaticKeepAliveClientMixin for state preservation\n• Reduced Firestore reads by 60% through smart caching\n• Built swipe card system with smooth animations\n• Real-time messaging with Firestore streams\n• Handles 1000+ posts efficiently\n\n🔗 GitHub: github.com/JeelChandegra/pro_buddy_2";
    }
    if (discussingScribble) {
      return "**Scribble Game Details:**\n\n• Real-time drawing sync across devices (<200ms latency)\n• Pan gesture detection + Firebase broadcasting\n• 20+ colors, 6 brush sizes (2px-20px)\n• Turn-based game flow with 80s rounds\n• Supports 10+ concurrent players\n\n🔗 GitHub: github.com/JeelChandegra/scribble_game";
    }
    if (discussingFirebase) {
      return "Jeel uses Firebase extensively across projects:\n\n**Authentication:** User login/signup with email & social providers\n**Firestore:** Real-time NoSQL database for live data sync\n**Storage:** File uploads (images, videos, documents)\n**Analytics:** Track user behavior and app performance\n**Cloud Functions:** Backend logic and triggers\n**Hosting:** Deploy web apps\n\nAll 5 featured apps use Firebase as the backend!";
    }
    if (discussingFlutter) {
      return "**Jeel's Flutter Expertise:**\n\n📱 **5 Production Apps:**\n• Adaptive Quiz Engine (AI + IRT algorithms)\n• ProBuddy (Networking with swipe UI)\n• Scribble Game (Real-time multiplayer)\n• Attendance Manager (SQLite + Calendar)\n• Journey Journal (Maps + Hive DB)\n\n🎯 **Specializations:**\n• State Management (Provider, StatefulWidget)\n• Real-time sync with Firebase\n• Custom animations & gestures\n• Cross-platform (iOS, Android, Web)";
    }
    if (discussingProjects) {
      return "Here are the other projects:\n\n📊 **Attendance Manager** - Employee tracking with automated salary calculations\nTech: Flutter, SQLite, Provider\nGitHub: github.com/JeelChandegra/employee_attendance\n\n🗺️ **Journey Journal** - Map-based travel diary with photos/videos\nTech: Flutter, Hive DB, Maps, Geocoding\nGitHub: github.com/JeelChandegra/Journey_journel\n\nWant details on any specific one?";
    }
    if (discussingSkills) {
      return "**Additional Technical Skills:**\n\n🏗️ **Architecture:** MVVM, Clean Architecture, MVI, Repository Pattern\n🌐 **Networking:** Retrofit, OkHttp, Ktor, REST APIs, GraphQL\n🧪 **Testing:** JUnit, Espresso, Mockito\n☁️ **DevOps:** Docker, GitHub Actions, CI/CD pipelines\n🎨 **UI/UX:** Material Design 3, Custom animations, Responsive design\n\nNeed info about a specific technology?";
    }
    if (discussingExperience) {
      return "**Career Highlights:**\n\n🚀 At Tech Solutions Inc.:\n• Led migration to Jetpack Compose (40% faster performance)\n• Mentored team of 5 developers\n• Set up automated CI/CD reducing deploy time by 60%\n\n📱 At Mobile Apps Co.:\n• Shipped e-commerce app to 1M+ users\n• Cut crash rate from high to <1% (75% reduction)\n• Built real-time chat with Firebase\n\n💡 Key strengths: Problem-solving, Clean code, Team leadership";
    }
  }
  
  // Contact questions
  if (q.match(/\b(contact|email|reach|hire|available|availability)\b/)) {
    return "You can reach Jeel at:\n📧 Email: chandegrajeel@gmail.com\n💼 GitHub: github.com/jeelchandegra\n📍 Location: Rajkot, India\n✅ Status: Available for opportunities!";
  }
  
  // Skills questions
  if (q.match(/\b(skill|technology|tech|know|language|framework)\b/)) {
    if (q.includes('flutter') || q.includes('dart')) {
      return "Yes! Jeel is highly skilled in Flutter and Dart. He's built 5 production apps including:\n• Adaptive Quiz Engine (AI-powered with IRT algorithms)\n• ProBuddy (Professional networking app)\n• Scribble Game (Real-time multiplayer)\n• Attendance Manager\n• Journey Journal\n\n💡 Ask 'tell me more' for details on any project!";
    }
    if (q.includes('firebase')) {
      return "Absolutely! Jeel is an expert in Firebase, using it extensively for:\n• Authentication & User Management\n• Cloud Firestore (real-time databases)\n• Firebase Storage\n• Analytics\n• Hosting\nMost of his Flutter apps are powered by Firebase.\n\n💡 Want to know more about Firebase usage?";
    }
    if (q.includes('kotlin') || q.includes('android')) {
      return "Yes! Jeel specializes in Android development with Kotlin and Jetpack Compose. He has 5+ years of professional Android experience and expertise in MVVM architecture, Clean Architecture, and modern Android best practices.\n\n💡 Ask about his work experience for more details!";
    }
    return "Jeel's technical skills include:\n\n💻 Languages: Kotlin, Java, Dart, Python, JavaScript, TypeScript, C++, C#\n🎨 Frameworks: Flutter, Jetpack Compose, React, Node.js\n🗄️ Databases: Firebase, SQLite, Room DB, Hive, MySQL, MongoDB\n☁️ Cloud: Firebase, AWS, Google Cloud, Docker\n🏗️ Architecture: MVVM, Clean Architecture, MVI\n\n💡 Ask 'tell me more' for additional skills or ask about a specific technology!";
  }
  
  // Project questions
  if (q.match(/\b(project|app|built|work|portfolio|best|complex)\b/)) {
    if (q.includes('complex') || q.includes('best') || q.includes('impressive')) {
      return "🎓 **Adaptive Quiz Engine** is Jeel's most complex project!\n\nIt combines:\n• Item Response Theory (IRT) algorithms (same as used in GRE/GMAT)\n• Google Gemini 2.5 AI for question generation\n• RAG pipeline for document-based learning\n• Real-time adaptive difficulty adjustment\n• Reduced AI latency from 15s → <2s through intelligent pooling\n\nTech: Flutter, Firebase, AI/ML, IRT algorithms, RAG\n🔗 GitHub: github.com/HarshChauhan111/adaptive_quiz_firebase\n\n💡 Want more details or info on other projects?";
    }
    if (q.includes('ai') || q.includes('quiz')) {
      return "🎓 **Adaptive Quiz Engine** - An AI-powered learning platform that adapts to student ability in real-time using IRT algorithms and Google Gemini AI.\n\nKey features:\n• Real-time difficulty adaptation\n• AI question generation (<2s)\n• PDF document learning (RAG)\n• Performance analytics\n\nTech: Flutter, Firebase, AI/ML, IRT, RAG\n\n💡 Ask 'tell me more' for technical challenges solved!";
    }
    if (q.includes('probuddy') || q.includes('network')) {
      return "🤝 **ProBuddy** - A professional networking app with Tinder-like swipe mechanics for developers.\n\nFeatures:\n• Swipe to discover projects\n• Real-time messaging\n• Smart filtering & search\n• Dynamic profiles\n\nTech: Flutter, Firebase, Firestore, Provider\n🔗 GitHub: github.com/JeelChandegra/pro_buddy_2\n\n💡 Want to know more about the technical implementation?";
    }
    if (q.includes('game') || q.includes('scribble') || q.includes('multiplayer')) {
      return "🎨 **Scribble Game** - Real-time multiplayer drawing and guessing game.\n\nFeatures:\n• Live drawing synchronization (<200ms)\n• Turn-based gameplay\n• Multiple drawing tools (20+ colors, 6 brush sizes)\n• Real-time chat & scoring\n\nTech: Flutter, Firebase, Real-time Sync\n🔗 GitHub: github.com/JeelChandegra/scribble_game\n\n💡 Interested in how real-time sync works? Ask me more!";
    }
    return "Jeel has built 5 featured projects:\n\n🎓 Adaptive Quiz Engine - AI-powered learning with IRT algorithms\n🤝 ProBuddy - Professional networking app\n🎨 Scribble Game - Multiplayer drawing game\n📊 Attendance Manager - Employee tracking system\n🗺️ Journey Journal - Map-based travel diary\n\nAll built with Flutter & Firebase.\n💡 Ask about any specific project or say 'tell me more' for additional projects!";
  }
  
  // Experience questions
  if (q.match(/\b(experience|work|job|career|years)\b/)) {
    return "Jeel has **5+ years** of professional Android development experience:\n\n💼 **Senior Android Developer** at Tech Solutions Inc. (2022-Present)\n• Migrated legacy code to Jetpack Compose (40% performance improvement)\n• Mentored 5 junior developers\n• Implemented CI/CD pipeline\n\n💼 **Android Developer** at Mobile Apps Co. (2020-2022)\n• Built e-commerce app with 1M+ downloads\n• Reduced crash rate by 75%\n\n💼 **Junior Android Developer** at StartUp Innovations (2019-2020)\n\n💡 Want to hear about specific achievements? Just ask!";
  }
  
  // Achievement questions
  if (q.match(/\b(achievement|award|certificate|accomplish|won)\b/)) {
    return "🏆 **Recent Achievements:**\n\n🥈 Mission Blackout CTF - 1st Runner Up (2025)\n🥉 Mission Blackout CTF - 2nd Runner Up (2025)\n📜 Docker 101 Workshop Certificate (2024)\n🎤 Google I/O Extended Speaker (2024)\n⭐ 100K+ App Downloads (2023)\n📱 App Featured in Google Play Store (2023)\n🎓 Google Associate Android Developer Certified (2022)\n\n💡 Ask me anything else about Jeel's work!";
  }
  
  // About/Who questions
  if (q.match(/\b(who|about|introduce|yourself)\b/)) {
    return "👋 I'm **Jeel Chandegra**, a Senior Android Developer based in Rajkot, India.\n\n✨ I specialize in building scalable mobile applications using Kotlin, Jetpack Compose, and Flutter. With 5+ years of experience, I focus on clean architecture, modern design patterns, and creating smooth user experiences.\n\n📊 Quick Stats:\n• 30+ projects completed\n• 5+ years experience\n• 20+ technologies mastered\n\n📧 Contact: chandegrajeel@gmail.com\n\n💡 Want to know about my skills, projects, or experience?";
  }
  
  // Conversational responses
  if (q.match(/\b(hi|hello|hey|greetings)\b/)) {
    return "Hey! 👋 I'm here to tell you about Jeel's work. You can ask me about:\n\n💻 Skills & technologies\n🚀 Featured projects\n💼 Work experience\n🏆 Achievements\n📧 Contact info\n\nWhat interests you?";
  }
  
  if (q.match(/\b(thanks|thank you|great|awesome|cool|nice)\b/)) {
    return "You're welcome! 😊 Feel free to ask me anything else about Jeel's skills, projects, or experience!";
  }
  
  if (q.match(/\b(yes|yeah|yep|sure|ok|okay)\b/) && isFollowUp) {
    return "Great! What would you like to know more about? You can ask about:\n• Specific projects\n• Technologies used\n• Technical challenges solved\n• Work experience\n• How to get in touch";
  }
  
  // Default response with suggestions
  return "I can help you learn about Jeel's:\n\n💻 **Skills** - Kotlin, Flutter, Firebase, React, and more\n🚀 **Projects** - 5 featured apps including AI-powered quiz engine\n💼 **Experience** - 5+ years in Android development\n🏆 **Achievements** - CTF wins, certifications, featured apps\n📧 **Contact** - Email and GitHub\n\nWhat would you like to know? (You can also ask follow-up questions like 'tell me more'!)";
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! 👋 I'm here to answer questions about Jeel. You can ask me anything and even follow up with 'tell me more' for details. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestedQuestions = [
    "What are your skills?",
    "Tell me about your best project",
    "Do you know Flutter?",
    "How can I contact you?"
  ];

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const questionText = input;
    setInput('');
    setIsLoading(true);

    try {
      // Get instant answer from built-in knowledge with conversation context
      const answer = getAnswer(questionText, messages);

      const assistantMessage: Message = {
        role: 'assistant',
        content: answer,
        timestamp: new Date()
      };

      // Small delay to feel natural
      await new Promise(resolve => setTimeout(resolve, 300));
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, something went wrong. Please try again!',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (question: string) => {
    setInput(question);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        className="chat-button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M8 10h.01M12 10h.01M16 10h.01M9 16h6M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chat-modal"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="chat-header">
              <div className="chat-header-content">
                <div className="chat-avatar">🤖</div>
                <div>
                  <h3>AI Assistant</h3>
                  <p>Ask me anything about Jeel</p>
                </div>
              </div>
              <button className="chat-close" onClick={() => setIsOpen(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="chat-messages">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`message ${message.role}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="message-content">
                    {message.content}
                  </div>
                  <div className="message-time">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  className="message assistant"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {messages.length === 1 && (
              <div className="suggested-questions">
                <p>Try asking:</p>
                <div className="suggestions-grid">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      className="suggestion-chip"
                      onClick={() => handleSuggestionClick(question)}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="chat-input-container">
              <input
                type="text"
                className="chat-input"
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
              />
              <button
                className="chat-send"
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
