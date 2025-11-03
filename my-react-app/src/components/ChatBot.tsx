import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import './ChatBot.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
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
      // For production: use Vercel serverless function
      // For development: call Gemini API directly
      const isDev = import.meta.env.DEV;
      let answer = '';

      if (isDev) {
        // Load knowledge base
        const kbResponse = await fetch('/knowledge-base.json');
        const knowledgeBase = await kbResponse.json();
        
        // Build comprehensive context
        const context = `
ABOUT JEEL CHANDEGRA:
${knowledgeBase.profile.bio}

CONTACT:
- Email: ${knowledgeBase.profile.contact.email}
- GitHub: ${knowledgeBase.profile.contact.github}
- Location: ${knowledgeBase.profile.location}

SKILLS:
- Languages: ${knowledgeBase.skills.languages.join(', ')}
- Frameworks: ${knowledgeBase.skills.frameworks.join(', ')}
- Architecture: ${knowledgeBase.skills.architecture.join(', ')}
- Databases: ${knowledgeBase.skills.databases.join(', ')}
- Cloud/DevOps: ${knowledgeBase.skills.cloudDevOps.join(', ')}

TOP PROJECTS:
${knowledgeBase.projects.map((p: any) => `
- ${p.title}: ${p.shortDescription}
  Tech: ${p.tech.join(', ')}
  ${p.features ? 'Key Features: ' + p.features.slice(0, 3).join('; ') : ''}
`).join('\n')}

EXPERIENCE:
${knowledgeBase.experience.map((e: any) => `
- ${e.role} at ${e.company} (${e.period})
  ${e.achievements.slice(0, 2).join('. ')}
`).join('\n')}

ACHIEVEMENTS:
${knowledgeBase.achievements.map((a: any) => `- ${a.title} (${a.year})`).join('\n')}

STATS: ${knowledgeBase.stats.projectsCompleted} projects, ${knowledgeBase.stats.yearsExperience} years experience
`;

        // Direct Gemini API call for local development
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        const geminiResponse = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: `You are an AI assistant for Jeel Chandegra's portfolio. Use the context below to answer questions professionally and helpfully.

CONTEXT:
${context}

USER QUESTION: ${questionText}

Provide a concise, helpful answer (2-3 sentences max). Use emojis where appropriate. If asked about projects, mention specific ones with details. If asked about skills, be specific. Include relevant links or contact info when appropriate.`
                }]
              }],
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 400,
              }
            }),
          }
        );

        console.log('Gemini Response Status:', geminiResponse.status);
        
        if (geminiResponse.ok) {
          const data = await geminiResponse.json();
          console.log('Gemini Response Data:', data);
          answer = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response. Please try asking differently.";
        } else if (geminiResponse.status === 429) {
          answer = "I'm getting too many requests right now. Please wait a moment and try again, or contact Jeel directly at chandegrajeel@gmail.com.";
        } else {
          const errorData = await geminiResponse.json().catch(() => ({}));
          console.error('Gemini API Error:', errorData);
          throw new Error('Gemini API error');
        }
      } else {
        // Production: use Vercel serverless function
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question: questionText }),
        });

        if (!response.ok) {
          throw new Error('Failed to get response');
        }

        const data = await response.json();
        answer = data.answer || "Sorry, I couldn't generate a response.";
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: answer,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting right now. Please try again in a moment or contact Jeel directly at chandegrajeel@gmail.com.",
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
