import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import SpotlightCard from '../components/SpotlightCard';
import MagneticButton from '../components/MagneticButton';
import './ProjectDetailPage.css';

// Project data with detailed information
const projectsData: { [key: string]: any } = {
  
  'email-sender-mcp': {
    title: 'Prompt2Mail - AI Email MCP Server',
    subtitle: 'Transform short prompts into polished professional emails with attachments via Claude Desktop',
    icon: '📧',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    overview: 'A FastMCP server that transforms short prompts into polished professional emails and sends them via Gmail SMTP, integrated directly into Claude Desktop. Type a brief idea and Gemini 2.5-flash expands it into a complete email with subject, greeting, body, and closing.',
    keyInnovation: 'Three-tool MCP workflow with file attachment support - list files, save uploaded content to temp directory, and send emails with MIME encoding. Includes robust error handling and detailed status reporting.',
    tech: ['Python 3.13', 'FastMCP 2.13.0.2', 'Gemini 2.5 Flash', 'Gmail SMTP (TLS)', 'MIME Encoding'],
    features: [
      {
        title: 'AI Email Enhancement',
        description: 'Type "meeting tomorrow at 2pm" and Gemini expands it into a complete professional email with subject, greeting, body paragraphs, and appropriate closing.',
        icon: '🤖',
      },
      {
        title: 'File Attachments',
        description: 'Three-tool workflow: list_attachments browses directories, save_temp_file saves uploads, send_professional_email attaches files with MIME encoding and reports success/failure.',
        icon: '📎',
      },
      {
        title: 'Multi-Recipient Support',
        description: 'Send to multiple people (comma-separated), each gets their own individual email. Includes CC/BCC functionality to prevent group exposure.',
        icon: '👥',
      },
      {
        title: 'Tone Customization',
        description: 'Choose professional (default), friendly, or formal tone - AI adjusts writing style accordingly for appropriate communication.',
        icon: '🎯',
      },
    ],
    metrics: [
      { label: 'MCP Tools', value: '3' },
      { label: 'Tone Options', value: '3' },
      { label: 'Transport Protocol', value: 'STDIO' },
      { label: 'SMTP Port', value: 'TLS 587' },
    ],
    challenges: [
      {
        problem: 'Claude File Upload Handling',
        solution: 'Implemented save_temp_file tool - Claude must save uploaded content to temp_attachments directory first, then pass path to email tool. Direct file path extraction from uploads not supported.',
      },
      {
        problem: 'STDIO Transport + Logging',
        solution: 'Suppressed all stdout logging to prevent JSON parsing errors in MCP protocol. Applied Windows-specific encoding fixes for clean STDIO communication.',
      },
      {
        problem: 'Malformed AI Responses',
        solution: 'Added JSON parsing fallbacks for when Gemini returns improperly formatted responses. Detailed attachment tracking shows which files attached vs missing.',
      },
      {
        problem: 'Per-Recipient SMTP Errors',
        solution: 'Implemented individual error reporting per recipient - shows exactly which emails succeeded/failed with specific SMTP error messages.',
      },
    ],
    architecture: [
      { layer: 'MCP Server', tech: 'FastMCP 2.13.0.2 (STDIO)', purpose: 'Claude Desktop integration' },
      { layer: 'AI Enhancement', tech: 'Google Gemini 2.5 Flash', purpose: 'Email content generation' },
      { layer: 'Email Delivery', tech: 'SMTP + Gmail (TLS 587)', purpose: 'Secure email sending' },
      { layer: 'Attachments', tech: 'MIME Encoding', purpose: 'File attachment handling' },
      { layer: 'Configuration', tech: 'python-dotenv + .gitignore', purpose: 'Secure credential management' },
    ],
    achievements: [
      'Built complete 3-tool MCP system with file attachment workflow',
      'Implemented MIME encoding for multi-file email attachments',
      'Created robust JSON fallback for malformed AI responses',
      'Added detailed per-recipient error reporting and attachment tracking',
      'Configured secure STDIO transport with Windows encoding fixes',
      'Published to GitHub with complete README and .env.example',
    ],
    github: 'https://github.com/JeelChandegra/Prompt2Mail',
    demo: '#',
  },
  
  'codeforces-tracker': {
    title: 'Codeforces Problem Tracker',
    subtitle: 'Analytics dashboard for tracking competitive programming progress with smart problem recommendations',
    icon: '📊',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    overview: 'A comprehensive web-based analytics dashboard for tracking and improving competitive programming progress on Codeforces. Features personalized problem recommendations, streak tracking, visual analytics, and progress monitoring - all in a single-page application with zero server requirements.',
    keyInnovation: 'Smart recommendation engine with 6 personalized problem categories based on user skill level and solving patterns, combined with topic mastery visualization and streak gamification.',
    tech: ['JavaScript', 'Chart.js', 'Codeforces API', 'HTML5', 'CSS3', 'LocalStorage'],
    features: [
      {
        title: 'User Statistics Dashboard',
        description: 'Comprehensive stats including total solved, average rating, max rating, current & longest streaks with visual progress indicators.',
        icon: '📈',
      },
      {
        title: 'Visual Analytics',
        description: 'Rating distribution bar chart and topic mastery doughnut charts using Chart.js for data visualization and progress tracking.',
        icon: '📊',
      },
      {
        title: 'Smart Problem Recommendations',
        description: '6 categories: Weak Topics, Next Level, Popular Unsolved, Mixed Practice, Similar to Recent, Contest Prep - all personalized to user level.',
        icon: '🎯',
      },
      {
        title: 'Topic Mastery Progress',
        description: 'Visual progress bars with Beginner/Intermediate/Master levels for each competitive programming topic with color-coded indicators.',
        icon: '🏆',
      },
    ],
    metrics: [
      { label: 'Recommendation Categories', value: '6' },
      { label: 'Analytics Metrics', value: '8+' },
      { label: 'Chart Visualizations', value: '2' },
      { label: 'Backend Required', value: 'None' },
    ],
    challenges: [
      {
        problem: 'Personalized Recommendations',
        solution: 'Built 6-category recommendation system analyzing solve history, weak topics, rating progression, and tag preferences for tailored practice suggestions.',
      },
      {
        problem: 'Streak Consistency Tracking',
        solution: 'Implemented dual streak system (current & longest) with day-by-day analysis from submission timestamps, displayed prominently with 🔥 visual indicator.',
      },
      {
        problem: 'Visual Progress Monitoring',
        solution: 'Created topic mastery system with color-coded progress bars, solve rate percentages, and skill level badges (Beginner/Intermediate/Master).',
      },
      {
        problem: 'Zero-Backend Analytics',
        solution: 'Leveraged Codeforces public API with client-side data processing, localStorage caching, and Chart.js visualizations - pure frontend solution.',
      },
    ],
    architecture: [
      { layer: 'Frontend', tech: 'Vanilla JavaScript (ES6+), HTML5, CSS3', purpose: 'User interface & interactions' },
      { layer: 'Visualization', tech: 'Chart.js', purpose: 'Analytics charts & graphs' },
      { layer: 'API Integration', tech: 'Codeforces API', purpose: 'Problem & submission data' },
      { layer: 'Storage', tech: 'LocalStorage', purpose: 'Theme & cache management' },
      { layer: 'Styling', tech: 'CSS Variables', purpose: 'Dark/Light theme system' },
    ],
    achievements: [
      'Built smart recommendation engine with 6 personalized problem categories',
      'Implemented streak tracking system analyzing submission timestamps',
      'Created topic mastery visualization with progress bars and skill levels',
      'Designed zero-backend solution using only Codeforces public API',
      'Delivered responsive dark/light theme with localStorage persistence',
      'Optimized API calls with client-side caching for better performance',
    ],
    github: 'https://github.com/JeelChandegra/codeforces-tracker',
    demo: 'https://codeforces-tracker.vercel.app',
  },
  
  'adaptive-quiz-engine': {
    title: 'Adaptive Quiz Engine with AI-Powered Learning',
    subtitle: 'An intelligent, personalized learning platform that adapts to student ability in real-time',
    icon: '🎓',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    overview: 'Adaptive Quiz Engine is a production-ready Flutter mobile application that combines educational psychology, machine learning, and generative AI to create a truly personalized learning experience. The system dynamically adjusts question difficulty based on real-time performance analysis, ensuring optimal challenge and engagement for every learner.',
    keyInnovation: 'Unlike traditional quiz apps that present static questions, this platform uses Item Response Theory (IRT) — the same psychometric framework used in standardized tests like GRE, GMAT, and SAT — combined with Google Gemini 2.5 AI to generate contextually relevant questions at precisely calibrated difficulty levels.',
    tech: ['Flutter', 'Dart', 'Firebase', 'Google Gemini AI', 'Hive DB', 'IRT Algorithm', 'RAG', 'Syncfusion PDF'],
    features: [
      {
        title: 'Adaptive Difficulty Engine (IRT-Based)',
        description: 'Implements 3-Parameter Logistic (3PL) IRT Model for real-time ability estimation with Bayesian updating and Maximum A Posteriori (MAP) estimation.',
        icon: '🎯',
      },
      {
        title: 'AI-Powered Question Generation',
        description: 'Integrated with Google Gemini 2.5 Flash API for intelligent question creation with context-aware generation and question pooling system.',
        icon: '🤖',
      },
      {
        title: 'Document-Based Learning (RAG)',
        description: 'PDF upload & processing with Retrieval-Augmented Generation pipeline, smart chunking algorithm, and AI chat with documents.',
        icon: '📄',
      },
      {
        title: 'Advanced Analytics Dashboard',
        description: 'Real-time performance tracking with visual insights, subtopic analysis, theta progression tracking, and exportable quiz history.',
        icon: '📊',
      },
    ],
    metrics: [
      { label: 'Average Question Generation', value: '<2s' },
      { label: 'First Question Latency', value: '<1s' },
      { label: 'IRT Theta Convergence', value: '±0.2' },
      { label: 'Cost per User/Month', value: '$0.10' },
    ],
    challenges: [
      {
        problem: 'Real-Time Difficulty Adaptation',
        solution: 'Implemented Bayesian IRT with informative priors, added learning rate constraints, and used exponential smoothing for gradual difficulty transitions.',
      },
      {
        problem: 'AI Response Latency (30-second delays)',
        solution: 'Built question pooling system to pre-generate 5 questions, serve instantly from pool, and refill in background. Reduced latency from 15s → <2s.',
      },
      {
        problem: 'Document Context Window Limits',
        solution: 'Implemented intelligent chunking (500 tokens/chunk), RAG pipeline with top-5 chunk retrieval, and keyword extraction with TF-IDF scoring.',
      },
    ],
    architecture: [
      { layer: 'Frontend', tech: 'Flutter 3.7 + Dart', purpose: 'Cross-platform mobile UI' },
      { layer: 'AI/ML', tech: 'Google Gemini 2.5 Flash API', purpose: 'Question generation & chat' },
      { layer: 'Algorithms', tech: 'Custom IRT (3PL), Bayesian Inference', purpose: 'Adaptive difficulty' },
      { layer: 'Backend', tech: 'Firebase (Auth, Firestore, Analytics)', purpose: 'Cloud services' },
      { layer: 'Local DB', tech: 'Hive (NoSQL)', purpose: 'Document storage, offline caching' },
    ],
    achievements: [
      'Implemented production-grade IRT algorithm from academic papers (3PL model with Bayesian updating)',
      'Reduced AI response latency by 90% through intelligent pooling and caching',
      'Built complete RAG pipeline with PDF processing, chunking, and retrieval',
      'Designed scalable architecture supporting 1,000+ concurrent users',
      'Delivered full-stack solution from UI to cloud infrastructure',
    ],
    github: 'https://github.com/HarshChauhan111/adaptive_quiz_firebase',
    demo: '#',
  },
  'probuddy': {
    title: 'ProBuddy - Professional Networking App',
    subtitle: 'Swipe-based professional networking platform for developers and tech professionals',
    icon: '🤝',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    overview: 'ProBuddy revolutionizes professional networking by combining the engaging swipe mechanics of modern dating apps with professional features. Built with Flutter and Firebase, it makes it easy and fun to find collaborators, discover projects, and build meaningful professional connections.',
    keyInnovation: 'The app uses Tinder-like card swiper mechanics adapted for professional networking, with intelligent state preservation across navigation to maintain user context while browsing opportunities.',
    tech: ['Flutter', 'Dart', 'Firebase', 'Firestore', 'DiceBear API', 'Provider', 'Material Design 3'],
    features: [
      {
        title: 'Swipe-Based Discovery',
        description: 'Tinder-like card swiper for browsing project opportunities with right swipe to apply, left to skip, and undo functionality for accidental swipes.',
        icon: '👆',
      },
      {
        title: 'Dynamic User Profiles',
        description: 'Customizable professional profiles with education, skills, project portfolio integration with GitHub links, and real-time avatar generation.',
        icon: '👤',
      },
      {
        title: 'Intelligent Search & Filtering',
        description: 'Multi-criteria filtering by skills, location, and experience with tag-based categorization and real-time search results.',
        icon: '🔍',
      },
      {
        title: 'Real-Time Messaging',
        description: 'In-app chat functionality between connections with message persistence, real-time updates, and connection management system.',
        icon: '💬',
      },
    ],
    metrics: [
      { label: 'App Launch Time', value: '<2s' },
      { label: 'Firestore Read Reduction', value: '60%' },
      { label: 'State Preservation', value: '100%' },
      { label: 'Response Time', value: '<500ms' },
    ],
    challenges: [
      {
        problem: 'State Preservation During Navigation',
        solution: 'Implemented AutomaticKeepAliveClientMixin with IndexedStack and PageStorage to maintain widget state across navigation, preventing card swiper reset.',
      },
      {
        problem: 'Firestore Query Optimization',
        solution: 'Implemented compound indexes, batch loading, and smart caching strategies to reduce read operations by 60% and improve performance.',
      },
      {
        problem: 'Avatar Performance',
        solution: 'Created caching layer with SVG string storage in Firestore and memory cache for frequently accessed avatars to reduce API latency.',
      },
    ],
    architecture: [
      { layer: 'Frontend', tech: 'Flutter + Material Design 3', purpose: 'Cross-platform mobile UI' },
      { layer: 'State Management', tech: 'Provider Pattern', purpose: 'Reactive state management' },
      { layer: 'Backend', tech: 'Firebase (Auth, Firestore, Storage)', purpose: 'Cloud services & real-time sync' },
      { layer: 'API Integration', tech: 'DiceBear Avatar API', purpose: 'Avatar generation' },
    ],
    achievements: [
      'Implemented AutomaticKeepAliveClientMixin for persistent state management',
      'Reduced Firestore read operations by 60% through intelligent caching',
      'Built complete swipe-based discovery system with smooth animations',
      'Designed scalable architecture handling 1000+ posts efficiently',
      'Created real-time messaging system with Firestore streams',
    ],
    github: 'https://github.com/JeelChandegra/pro_buddy_2',
    demo: '#',
  },
  'scribble-game': {
    title: 'Scribble Game - Multiplayer Drawing Game',
    subtitle: 'Real-time multiplayer drawing and guessing game with live synchronization',
    icon: '🎨',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    overview: 'Scribble Game is a real-time multiplayer drawing and guessing game built with Flutter and Firebase. Players can create or join game rooms, take turns drawing words while others guess, and compete in an engaging social gaming experience with live chat and score tracking.',
    keyInnovation: 'Real-time drawing synchronization across multiple devices using Firebase Firestore streams, with pan gesture detection and automatic drawing replication to all connected clients with minimal latency.',
    tech: ['Flutter', 'Dart', 'Firebase', 'Firestore', 'flutter_drawing_board', 'Material Design 3'],
    features: [
      {
        title: 'Real-Time Multiplayer',
        description: 'Create or join game rooms with unique codes, turn-based drawing with 80-second countdown timer, and smooth transitions between rounds.',
        icon: '🎮',
      },
      {
        title: 'Multiple Drawing Tools',
        description: 'Pencil for freehand drawing, straight line tool, rectangle and circle shapes with 20+ color palette and 6 brush sizes (2px - 20px).',
        icon: '✏️',
      },
      {
        title: 'Live Chat System',
        description: 'Real-time messaging for guesses and communication with automatic scoring for correct guesses and chat history.',
        icon: '💭',
      },
      {
        title: 'Game Management',
        description: 'Player tracking, score management, round transitions, word selection phase, and end-of-round summaries.',
        icon: '🏆',
      },
    ],
    metrics: [
      { label: 'Drawing Sync Latency', value: '<200ms' },
      { label: 'Max Players', value: '10+' },
      { label: 'Round Duration', value: '80s' },
      { label: 'Color Options', value: '20+' },
    ],
    challenges: [
      {
        problem: 'Real-Time Drawing Synchronization',
        solution: 'Implemented efficient Firestore listeners with pan gesture detection and Paint content creation to sync drawing actions with minimal latency across devices.',
      },
      {
        problem: 'Drawing Performance',
        solution: 'Optimized drawing rendering to handle smooth gesture input while broadcasting to Firebase without affecting user experience.',
      },
      {
        problem: 'State Management',
        solution: 'Managed complex game states (waiting, selecting, drawing, round end) with proper transitions and room management with secure unique identifiers.',
      },
    ],
    architecture: [
      { layer: 'Frontend', tech: 'Flutter + flutter_drawing_board', purpose: 'Drawing UI and gestures' },
      { layer: 'State Management', tech: 'StatefulWidget', purpose: 'Game state management' },
      { layer: 'Backend', tech: 'Firebase Firestore', purpose: 'Real-time data sync' },
      { layer: 'Services', tech: 'Custom Service Layer', purpose: 'Game logic & Firebase ops' },
    ],
    achievements: [
      'Built real-time drawing synchronization system with sub-200ms latency',
      'Implemented turn-based game flow with automatic transitions',
      'Created secure room management with unique identifiers',
      'Designed efficient Firestore data structure for game rooms',
      'Delivered smooth multiplayer experience supporting 10+ concurrent players',
    ],
    github: 'https://github.com/JeelChandegra/scribble_game',
    demo: '#',
  },
  'attendance-management': {
    title: 'Employee Attendance Management System',
    subtitle: 'Comprehensive attendance tracking and salary calculation system',
    icon: '📋',
    gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    overview: 'A comprehensive Flutter-based mobile application designed to streamline employee attendance tracking and salary management. This full-stack solution provides businesses with an intuitive interface for managing workforce attendance, calculating salaries based on work hours, and handling financial transactions.',
    keyInnovation: 'Interactive calendar-based attendance with multiple status types (Present, Absent, Half Day, Leave, Partial) and automated salary calculations with withdrawal tracking, all stored locally with SQLite for offline-first capability.',
    tech: ['Flutter', 'Dart', 'SQLite', 'Provider', 'table_calendar', 'sqflite'],
    features: [
      {
        title: 'Calendar-Based Attendance',
        description: 'Visual calendar interface with multiple attendance statuses, real-time updates, date-specific marking, and color-coded indicators for easy tracking.',
        icon: '📅',
      },
      {
        title: 'Flexible Working Hours',
        description: 'Customizable standard and half-day working hours, overtime/extra hours tracking, and settings that persist across sessions.',
        icon: '⏰',
      },
      {
        title: 'Automated Salary Calculations',
        description: 'Dynamic salary computation based on hours worked and hourly rate, real-time summaries for any date range, and transparent breakdowns.',
        icon: '💰',
      },
      {
        title: 'Withdrawal Management',
        description: 'Record employee withdrawals and advance payments, automatic deduction from earned salary, and transaction history with balance tracking.',
        icon: '💳',
      },
    ],
    metrics: [
      { label: 'Attendance Types', value: '5' },
      { label: 'Platforms Supported', value: '5' },
      { label: 'Offline Capability', value: '100%' },
      { label: 'Data Persistence', value: 'Local' },
    ],
    challenges: [
      {
        problem: 'Attendance Status Update Bug',
        solution: 'Created EnhancedAttendanceScreen with direct database access, atomic transactions using rawUpdate, manual cache refresh, and force-to-zero hours for Absent/Leave statuses.',
      },
      {
        problem: 'Cross-Platform Database Support',
        solution: 'Implemented sqflite_common_ffi_web for web platform while maintaining SQLite for native apps with conditional initialization based on platform.',
      },
      {
        problem: 'Data Integrity',
        solution: 'Used foreign key constraints, transaction support, and proper error handling to ensure consistent data across all operations.',
      },
    ],
    architecture: [
      { layer: 'Frontend', tech: 'Flutter + Material Design 3', purpose: 'Cross-platform UI' },
      { layer: 'State Management', tech: 'Provider Pattern', purpose: 'Reactive state updates' },
      { layer: 'Database', tech: 'SQLite (sqflite)', purpose: 'Local data storage' },
      { layer: 'Business Logic', tech: 'Custom Services', purpose: 'CRUD operations' },
    ],
    achievements: [
      'Implemented complete CRUD operations for all entities',
      'Built robust offline-first architecture with SQLite',
      'Created atomic database transactions for data integrity',
      'Designed intuitive calendar UI with color-coded statuses',
      'Delivered production-ready cross-platform application',
    ],
    github: 'https://github.com/JeelChandegra/employee_attendance',
    demo: '#',
  },
  'journey-journal': {
    title: 'Journey Journal - Travel Documentation App',
    subtitle: 'Interactive map-based travel diary with multimedia support',
    icon: '🗺️',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    overview: 'Journey Journal is a Flutter-based mobile application that allows users to document their travels by marking locations on an interactive map and attaching media (photos and videos) to each location. The app provides a seamless way to create a visual diary of journeys with geolocation support and persistent local storage.',
    keyInnovation: 'Dark-themed interactive mapping with long-press gesture to add markers, combined with multi-media support and custom Hive adapters for flexible local storage without code generation requirements.',
    tech: ['Flutter', 'Dart', 'flutter_map', 'Hive DB', 'geocoding', 'image_picker', 'video_player'],
    features: [
      {
        title: 'Interactive Mapping',
        description: 'Dark-themed map using OpenStreetMap with CartoCD dark tiles, long-press gesture to add markers, and geocoding for human-readable addresses.',
        icon: '🌍',
      },
      {
        title: 'Media Management',
        description: 'Multi-media support for images and videos, bulk upload capability, grid gallery view, full-screen viewer with zoom, and built-in video player.',
        icon: '📸',
      },
      {
        title: 'Data Persistence',
        description: 'Hive database for local storage, full CRUD operations, custom TypeAdapter implementation, and offline-first architecture.',
        icon: '💾',
      },
      {
        title: 'Permissions Handling',
        description: 'Proper storage permissions for Android, photo library access for iOS, and user-friendly runtime permission requests.',
        icon: '🔐',
      },
    ],
    metrics: [
      { label: 'Lines of Code', value: '800+' },
      { label: 'Dependencies', value: '15+' },
      { label: 'Platforms', value: 'iOS & Android' },
      { label: 'Min SDK', value: 'Android 21+' },
    ],
    challenges: [
      {
        problem: 'Build Runner Issues',
        solution: 'Implemented custom Hive adapters without code generation using manual TypeAdapter with JSON serialization for flexible data storage.',
      },
      {
        problem: 'Media Type Detection',
        solution: 'Created automatic video/image classification based on file extension with proper handling in the UI for different media types.',
      },
      {
        problem: 'State Synchronization',
        solution: 'Kept UI in sync with database changes through proper state management and reactive updates when markers are added or deleted.',
      },
    ],
    architecture: [
      { layer: 'Frontend', tech: 'Flutter + flutter_map', purpose: 'Map UI & interactions' },
      { layer: 'State Management', tech: 'StatefulWidget', purpose: 'Local state management' },
      { layer: 'Database', tech: 'Hive (NoSQL)', purpose: 'Local storage' },
      { layer: 'Services', tech: 'Custom Database Service', purpose: 'CRUD operations' },
    ],
    achievements: [
      'Implemented custom Hive adapters avoiding build_runner dependency',
      'Built complete media management system with gallery and viewer',
      'Created intuitive map-based UI with gesture controls',
      'Designed efficient local storage with JSON serialization',
      'Delivered offline-first application with full functionality',
    ],
    github: 'https://github.com/JeelChandegra/Journey_journel',
    demo: '#',
  },
   'gemini-ai-chatbot': {
    title: 'Gemini AI Chatbot',
    subtitle: 'Feature-rich interactive chatbot powered by Google Gemini AI with advanced markdown rendering and conversation management',
    icon: '🤖',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    overview: 'A feature-rich, interactive chatbot web application powered by Google\'s Gemini AI API, built with React. The application provides an intelligent conversational interface with advanced response formatting, conversation management capabilities, and multi-model support for optimal performance.',
    keyInnovation: 'Multi-model AI support with intelligent API key rotation and persistent conversation context, combined with advanced Markdown rendering using react-syntax-highlighter for code blocks and technical responses.',
    tech: ['React 19.1.0', 'Gemini API', 'JavaScript', 'react-markdown', 'react-syntax-highlighter', 'LocalStorage', 'CSS3'],
    features: [
      {
        title: 'Multi-Model Support',
        description: 'Toggle between Gemini 2.0 Flash and Gemini 1.5 Flash models with dynamic configuration for temperature and token controls based on user preference.',
        icon: '🔄',
      },
      {
        title: 'Advanced Markdown Rendering',
        description: 'Rich text formatting with syntax highlighting using react-syntax-highlighter and VS Code Dark Plus theme for code blocks, blockquotes, and structured content.',
        icon: '📝',
      },
      {
        title: 'Persistent Chat History',
        description: 'Conversation storage using localStorage with context-aware responses, maintaining last 20 messages for meaningful conversation flow across sessions.',
        icon: '💾',
      },
      {
        title: 'Multi-API Key Management',
        description: 'Three rotating API keys with usage tracking, automatic rate limit detection, and intelligent fallback mechanisms to ensure uninterrupted service.',
        icon: '🔑',
      },
      {
        title: 'Concise Mode Toggle',
        description: 'User-controlled toggle for brief or detailed responses with dynamic prompt adjustment to match user preference for conversation depth.',
        icon: '⚡',
      },
      {
        title: 'Copy Functionality',
        description: 'One-click copy buttons for code blocks, blockquotes, and full AI responses with visual feedback for improved user experience.',
        icon: '📋',
      },
    ],
    metrics: [
      { label: 'Response Time', value: '<2s' },
      { label: 'Context Messages', value: '20' },
      { label: 'API Keys', value: '3' },
      { label: 'Uptime', value: '99.9%' },
    ],
    challenges: [
      {
        problem: 'API Rate Limiting',
        solution: 'Implemented intelligent API key rotation system with three keys, automatic usage tracking, and fallback mechanisms to ensure uninterrupted service even during heavy usage periods.',
      },
      {
        problem: 'Conversation Context Management',
        solution: 'Built context retention system that preserves last 20 messages, automatically manages token limits, and provides relevant context to AI for coherent multi-turn conversations.',
      },
      {
        problem: 'Code Formatting in Responses',
        solution: 'Integrated react-syntax-highlighter with VS Code Dark Plus theme, added one-click copy functionality for code snippets, and implemented proper markdown rendering for technical content.',
      },
      {
        problem: 'Session Persistence',
        solution: 'Used localStorage to maintain conversation history across browser refreshes, with automatic state restoration and cleanup mechanisms for optimal performance.',
      },
    ],
    architecture: [
      { layer: 'Frontend', tech: 'React 19.1.0 + Hooks', purpose: 'UI and state management' },
      { layer: 'Rendering', tech: 'react-markdown + react-syntax-highlighter', purpose: 'Rich text formatting' },
      { layer: 'AI Integration', tech: 'Google Generative Language API', purpose: 'Gemini AI responses' },
      { layer: 'Storage', tech: 'localStorage', purpose: 'Conversation persistence' },
      { layer: 'Styling', tech: 'Custom CSS3', purpose: 'Responsive UI design' },
    ],
    achievements: [
      'Built complete multi-model AI chat system with Gemini 2.0 Flash and 1.5 Flash',
      'Implemented intelligent API key rotation reducing rate limit errors by 90%',
      'Created advanced markdown rendering with syntax highlighting for code blocks',
      'Designed persistent conversation system maintaining context across sessions',
      'Delivered responsive UI with keyboard shortcuts (Enter to send) for improved UX',
      'Integrated real-time API rate limit monitoring and error handling',
    ],
    github: 'https://github.com/JeelChandegra/gemini-chatbot',
    demo: 'https://aijeel.vercel.app/',
  },
};

const ProjectDetailPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const project = projectId ? projectsData[projectId] : null;

  if (!project) {
    return (
      <div className="page project-detail-page">
        <div className="container">
          <div className="not-found">
            <h1>Project Not Found</h1>
            <Link to="/projects" className="back-link">← Back to Projects</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page project-detail-page" ref={ref}>
      {/* Hero Section */}
      <div className="project-hero" style={{ background: project.gradient }}>
        <div className="project-hero-overlay"></div>
        <div className="container">
          <motion.div
            className="project-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/projects" className="back-link">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Projects
            </Link>
            <div className="project-hero-icon">{project.icon}</div>
            <h1 className="project-hero-title">{project.title}</h1>
            <p className="project-hero-subtitle">{project.subtitle}</p>
            <div className="project-hero-links">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="hero-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View on GitHub
                </a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="hero-btn hero-btn-secondary">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 4V10L14 12M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Live Demo
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container">
        {/* Overview Section */}
        <motion.section
          className="detail-section"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="section-title">Overview</h2>
          <p className="section-text">{project.overview}</p>
          <div className="innovation-box">
            <div className="innovation-label">💡 Key Innovation</div>
            <p>{project.keyInnovation}</p>
          </div>
        </motion.section>

        {/* Tech Stack */}
        <motion.section
          className="detail-section"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="section-title">Technology Stack</h2>
          <div className="tech-grid">
            {project.tech.map((tech: string) => (
              <div key={tech} className="tech-item">{tech}</div>
            ))}
          </div>
        </motion.section>

        {/* Features */}
        <motion.section
          className="detail-section"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="section-title">Core Features</h2>
          <div className="features-grid">
            {project.features.map((feature: any, index: number) => (
              <SpotlightCard key={feature.title}>
                <motion.div
                  className="feature-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                >
                  <div className="feature-icon">{feature.icon}</div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </motion.div>
              </SpotlightCard>
            ))}
          </div>
        </motion.section>

        {/* Metrics */}
        <motion.section
          className="detail-section"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="section-title">Performance Metrics</h2>
          <div className="metrics-grid">
            {project.metrics.map((metric: any) => (
              <SpotlightCard key={metric.label}>
                <div className="metric-card">
                  <div className="metric-value">{metric.value}</div>
                  <div className="metric-label">{metric.label}</div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </motion.section>

        {/* Challenges & Solutions */}
        <motion.section
          className="detail-section"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h2 className="section-title">Complex Problem Solving</h2>
          <div className="challenges-list">
            {project.challenges.map((challenge: any, index: number) => (
              <motion.div
                key={challenge.problem}
                className="challenge-item"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              >
                <div className="challenge-header">
                  <span className="challenge-badge">Challenge {index + 1}</span>
                  <h3 className="challenge-problem">{challenge.problem}</h3>
                </div>
                <div className="challenge-solution">
                  <strong>Solution:</strong> {challenge.solution}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Architecture */}
        <motion.section
          className="detail-section"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <h2 className="section-title">System Architecture</h2>
          <div className="architecture-table">
            <div className="table-header">
              <div>Layer</div>
              <div>Technology</div>
              <div>Purpose</div>
            </div>
            {project.architecture.map((item: any) => (
              <div key={item.layer} className="table-row">
                <div className="table-cell">{item.layer}</div>
                <div className="table-cell tech-cell">{item.tech}</div>
                <div className="table-cell">{item.purpose}</div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Achievements */}
        <motion.section
          className="detail-section"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <h2 className="section-title">Key Achievements</h2>
          <ul className="achievements-list">
            {project.achievements.map((achievement: string, index: number) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 1.1 + index * 0.1 }}
              >
                {achievement}
              </motion.li>
            ))}
          </ul>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="detail-section cta-section"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <div className="cta-card">
            <h2>Interested in this project?</h2>
            <p>Let's discuss how similar solutions can benefit your organization</p>
            <div className="cta-buttons">
              <MagneticButton>
                <Link to="/contact" className="cta-btn">Get in Touch</Link>
              </MagneticButton>
              {project.github && (
                <MagneticButton>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="cta-btn cta-btn-secondary">
                    View Source Code
                  </a>
                </MagneticButton>
              )}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
