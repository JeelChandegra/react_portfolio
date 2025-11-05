import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import './ChatBot.css';
import Orb from './Orb';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const ChatBot = () => {
  const navigate = useNavigate();
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
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const silenceTimerRef = useRef<number | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      console.log('✅ Speech Recognition is supported!');
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true; // Keep listening for silence detection
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.maxAlternatives = 1;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('');

        console.log('📝 Transcript:', transcript);
        setInput(transcript);

        // Reset silence timer on speech
        if (silenceTimerRef.current) {
          clearTimeout(silenceTimerRef.current);
        }

        // Auto-detect silence (1 second for faster detection)
        if (event.results[event.results.length - 1].isFinal) {
          console.log('✅ Final result detected, setting 1s timer for auto-send');
          const finalTranscript = transcript; // Capture the transcript
          silenceTimerRef.current = window.setTimeout(() => {
            console.log('⏰ Silence detected, sending:', finalTranscript);
            stopListening(false);
            if (finalTranscript.trim()) {
              handleSend(finalTranscript);
            }
          }, 1000); // Reduced to 1 second for faster response
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'aborted') {
          console.log('Recognition was aborted, this is normal when stopping/starting');
        } else if (event.error === 'no-speech') {
          console.log('No speech detected, waiting...');
        } else {
          setIsListening(false);
        }
      };

      recognitionRef.current.onend = () => {
        console.log('Recognition ended. isListening:', isListening);
        // Auto-restart if still in listening mode (prevents premature stops)
        if (isListening) {
          console.log('🔄 Auto-restarting recognition...');
          try {
            recognitionRef.current.start();
          } catch (e) {
            console.log('Could not restart recognition:', e);
            setIsListening(false);
          }
        }
      };
    } else {
      console.error('❌ Speech Recognition is NOT supported in this browser. Please use Chrome or Edge.');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [isListening]);

  const startListening = () => {
    if (recognitionRef.current) {
      console.log('🎤 Starting to listen...');
      setIsListening(true);
      setInput('');
      try {
        // Stop any existing recognition first
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Ignore if already stopped
        }
        // Small delay to ensure previous recognition is fully stopped
        setTimeout(() => {
          if (recognitionRef.current) {
            recognitionRef.current.start();
          }
        }, 100);
      } catch (error) {
        console.error('Error starting recognition:', error);
        setIsListening(false);
      }
    } else {
      console.error('❌ Speech recognition not initialized');
      alert('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
    }
  };

  const stopListening = (autoSend: boolean = false) => {
    console.log('🛑 Stopping listening. AutoSend:', autoSend);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.log('Recognition already stopped');
      }
      setIsListening(false);
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = null;
      }
    }
  };

  const toggleVoiceMode = () => {
    console.log('🔄 Toggling voice mode. Current:', isVoiceMode, '→ New:', !isVoiceMode);
    setIsVoiceMode(!isVoiceMode);
    if (isListening) {
      stopListening(false);
    }
  };

  const toggleListening = () => {
    console.log('🎤 Toggle listening. Currently:', isListening);
    if (isListening) {
      stopListening(false);
    } else {
      startListening();
    }
  };

  const stopSpeaking = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsSpeaking(false);
    }
  };

  const speakText = async (text: string) => {
    try {
      // Clean up markdown formatting for better speech
      const cleanText = text
        .replace(/\*\*\*/g, '') // Remove bold-italic ***
        .replace(/\*\*/g, '')   // Remove bold **
        .replace(/\*/g, '')     // Remove italic *
        .replace(/_/g, '')      // Remove underscores
        .replace(/`/g, '')      // Remove backticks
        .replace(/#{1,6}\s/g, '') // Remove headers #
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to text only
        .replace(/\n+/g, '. ')  // Replace line breaks with pauses
        .trim();

      console.log('🔊 Starting text-to-speech for:', cleanText.substring(0, 50) + '...');
      setIsSpeaking(true);
      
      // Try primary API key first, then fallback to secondary
      const apiKeys = [
        import.meta.env.VITE_ELEVENLABS_API_KEY,
        import.meta.env.VITE_ELEVENLABS_API_KEY_2
      ].filter(Boolean);
      
      const voiceId = import.meta.env.VITE_ELEVENLABS_VOICE_ID;

      console.log('Available API Keys:', apiKeys.length);
      console.log('Voice ID:', voiceId ? '✅ Present' : '❌ Missing');

      if (apiKeys.length === 0 || !voiceId) {
        console.error('❌ Missing ElevenLabs credentials');
        setIsSpeaking(false);
        return;
      }

      let response: Response | null = null;
      let lastError = '';
      
      // Try each API key until one works
      for (let i = 0; i < apiKeys.length; i++) {
        const apiKey = apiKeys[i];
        console.log(`Trying API key ${i + 1}/${apiKeys.length}...`);
        
        try {
          response = await fetch(
            `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
            {
              method: 'POST',
              headers: {
                'Accept': 'audio/mpeg',
                'Content-Type': 'application/json',
                'xi-api-key': apiKey,
              },
              body: JSON.stringify({
                text: cleanText,
                model_id: 'eleven_monolingual_v1',
                voice_settings: {
                  stability: 0.5,
                  similarity_boost: 0.75,
                },
              }),
            }
          );

          console.log(`ElevenLabs Response Status (Key ${i + 1}):`, response.status);

          if (response.ok) {
            console.log(`✅ Success with API key ${i + 1}`);
            break; // Success, exit loop
          } else if (response.status === 401 || response.status === 402) {
            // Quota exceeded or unauthorized, try next key
            const errorText = await response.text();
            lastError = `Key ${i + 1}: ${response.status} - ${errorText}`;
            console.warn(`⚠️ ${lastError}`);
            response = null; // Reset to try next key
            continue;
          } else {
            // Other error, stop trying
            lastError = await response.text();
            break;
          }
        } catch (error) {
          lastError = String(error);
          console.error(`❌ Error with API key ${i + 1}:`, error);
          continue;
        }
      }

      if (response && response.ok) {
        console.log('✅ Audio received, playing...');
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        
        if (audioRef.current) {
          audioRef.current.src = audioUrl;
          audioRef.current.play().catch(error => {
            console.error('❌ Audio play error:', error);
          });
          
          audioRef.current.onended = () => {
            console.log('✅ Audio playback finished');
            setIsSpeaking(false);
            URL.revokeObjectURL(audioUrl);
          };
        }
      } else {
        console.error('❌ All ElevenLabs API keys failed:', lastError);
        setIsSpeaking(false);
      }
    } catch (error) {
      console.error('❌ Text-to-speech error:', error);
      setIsSpeaking(false);
    }
  };

  const suggestedQuestions = [
    "What are your skills?",
    "Tell me about your best project",
    "Do you know Flutter?",
    "How can I contact you?"
  ];

  const handleSend = async (voiceInput?: string) => {
    const messageText = voiceInput || input;
    if (!messageText.trim() || isLoading) return;

    console.log('📤 Sending message:', messageText);

    const userMessage: Message = {
      role: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const questionText = messageText;
    setInput('');
    setIsLoading(true);

    try {
      const isDev = import.meta.env.DEV;
      let answer = '';

      if (isDev) {
        const kbResponse = await fetch('/knowledge-base.json');
        const knowledgeBase = await kbResponse.json();
        
        const context = `
ABOUT JEEL CHANDEGRA:
${knowledgeBase.profile.bio}

CONTACT:
- Email: ${knowledgeBase.profile.contact.email}
- GitHub: ${knowledgeBase.profile.contact.github}
- Location: ${knowledgeBase.profile.location}

SKILLS:
- Languages: ${knowledgeBase.skills.languages?.join(', ') || 'N/A'}
- Frameworks: ${knowledgeBase.skills.frameworks?.join(', ') || 'N/A'}
- Databases: ${knowledgeBase.skills.databases?.join(', ') || 'N/A'}
- AI/ML: ${knowledgeBase.skills.ai?.join(', ') || 'N/A'}
- Cloud/DevOps: ${knowledgeBase.skills.cloudDevOps?.join(', ') || 'N/A'}

TOP PROJECTS:
${knowledgeBase.projects.map((p: any) => `
- ${p.title}: ${p.shortDescription}
  Tech: ${p.tech.join(', ')}
  ${p.features ? 'Key Features: ' + p.features.slice(0, 3).join('; ') : ''}
`).join('\n')}

EXPERIENCE:
${knowledgeBase.experience?.map((e: any) => `
- ${e.role} at ${e.company} (${e.period})
  ${e.achievements.slice(0, 2).join('. ')}
`).join('\n') || 'Machine Learning Internship at Brainybeam Info-Tech PVT LTD.'}

CERTIFICATES:
${knowledgeBase.certificates?.map((c: any) => `- ${c.title} (${c.year})`).join('\n') || 'N/A'}
`;

        const conversationHistory = messages.slice(-6).map(m => 
          `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`
        ).join('\n');

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
                  text: `You are an AI assistant for Jeel Chandegra's portfolio. Use the context below to answer questions professionally and helpfully. Remember the conversation history to provide contextual responses.

CONTEXT:
${context}

CONVERSATION HISTORY:
${conversationHistory}

CURRENT QUESTION: ${questionText}

Instructions:
- If the user asks follow-up questions (like "tell me more", "what about", "how"), refer to the conversation history
- Provide concise answers (2-4 sentences)
- Use emojis where appropriate
- If asked about projects, mention specific ones with details
- If asked about skills, be specific
- Include relevant links or contact info when appropriate
- Be conversational and remember what was discussed earlier

Answer:`
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

      // Speak the response if in voice mode
      if (isVoiceMode) {
        await speakText(answer);
      }
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
      {/* Hidden audio element */}
      <audio ref={audioRef} style={{ display: 'none' }} />

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
              <div className="chat-header-actions">
                {isVoiceMode ? (
                  <button 
                    className="icon-btn back-btn"
                    onClick={toggleVoiceMode}
                    title="Back to text mode"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M19 12H5M5 12l7 7M5 12l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                ) : (
                  <button className="chat-close" onClick={() => setIsOpen(false)}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {isVoiceMode ? (
              /* Voice Mode Orb UI */
              <div className="voice-container">
                <div className="voice-orb-wrapper">
                  <div className="webgl-orb">
                    <Orb 
                      hue={isListening ? 330 : isSpeaking ? 140 : 280}
                      hoverIntensity={0.6}
                      isActive={isListening || isSpeaking}
                    />
                  </div>
                </div>

                <div className="voice-controls">
                  {!isSpeaking && !isLoading && (
                    <button 
                      className={`voice-btn ${isListening ? 'active' : ''}`}
                      onClick={toggleListening}
                    >
                      {isListening ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <rect x="6" y="4" width="4" height="16" rx="2"/>
                          <rect x="14" y="4" width="4" height="16" rx="2"/>
                        </svg>
                      ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" stroke="currentColor" strokeWidth="2"/>
                          <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      )}
                    </button>
                  )}
                  {isLoading && (
                    <div className="voice-thinking">
                      <div className="thinking-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <span>Thinking...</span>
                    </div>
                  )}
                  {isSpeaking && (
                    <button className="voice-stop-btn" onClick={stopSpeaking}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="6" width="12" height="12" rx="2"/>
                      </svg>
                      <span>Stop Speaking</span>
                    </button>
                  )}
                </div>
              </div>
            ) : (
              /* Text Mode */
              <>
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
                        {message.role === 'assistant' ? (
                          <ReactMarkdown
                            components={{
                              a: ({ node, href, children, ...props }) => (
                                <a
                                  href={href}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    if (href && href.startsWith('/')) {
                                      navigate(href);
                                      setIsOpen(false);
                                    } else if (href) {
                                      window.open(href, '_blank');
                                    }
                                  }}
                                  {...props}
                                >
                                  {children}
                                </a>
                              ),
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        ) : (
                          message.content
                        )}
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
                    className="voice-mode-btn"
                    onClick={toggleVoiceMode}
                    title="Voice Mode"
                  >
                    🎤
                  </button>
                  <button
                    className="chat-send"
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isLoading}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
