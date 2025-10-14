# Scribble Game - Real-Time Multiplayer Drawing & Guessing Game

## 🎨 Project Overview

Scribble Game is a real-time multiplayer drawing and guessing game built with Flutter and Firebase. Players can create or join game rooms, take turns drawing words while others guess, and compete in an engaging social gaming experience.

## 🚀 Key Features

### Core Gameplay
- **Real-Time Multiplayer**: Create or join game rooms with unique room codes
- **Turn-Based Drawing**: Players take turns being the "drawer" who illustrates a word
- **Word Guessing**: Other players compete to guess the word by typing in chat
- **Multiple Drawing Tools**: 
  - Pencil for freehand drawing
  - Straight line tool
  - Rectangle shapes
  - Circle shapes
- **Customizable Drawing**: 
  - 20+ color palette options
  - 6 different brush sizes (2px - 20px)
- **Timed Rounds**: 80-second countdown timer for each drawing session

### Social Features
- **Live Chat System**: Real-time messaging for guesses and communication
- **Player Management**: Track all players in the current game room
- **Score Tracking**: Automatic scoring system for correct guesses
- **Round Management**: Smooth transitions between drawing rounds

### User Experience
- **Room Sharing**: Copy room ID to clipboard for easy sharing
- **Responsive UI**: Clean, intuitive interface with Material Design 3
- **Drawing Canvas**: Full-featured whiteboard with gesture controls
- **Game States**: 
  - Waiting lobby
  - Word selection phase
  - Active drawing phase
  - Round end summaries

## 🛠️ Technical Stack

### Frontend
- **Framework**: Flutter (Dart)
- **UI Design**: Material Design 3
- **State Management**: StatefulWidget with setState
- **Drawing Library**: flutter_drawing_board package

### Backend & Services
- **Database**: Cloud Firestore (Firebase)
- **Authentication**: Firebase Auth
- **Real-Time Sync**: Firestore real-time listeners
- **Drawing Synchronization**: Custom Firebase service layer

### Architecture
- **Pattern**: Clean Architecture with service layer
- **Models**: 
  - GameState (game status, current word, player turns)
  - Player (player information and status)
  - DrawingAction (drawing data for synchronization)
  - DrawMode (enum for drawing tools)
- **Services**:
  - GameService (game logic and Firebase operations)
  - FirebaseDrawingService (drawing synchronization)
  - FirebaseConfig (Firebase initialization)

## 📱 Technical Implementation

### Real-Time Drawing Synchronization
```dart
- Pan gesture detection for drawing input
- Paint content creation with custom properties
- Firebase Firestore for action broadcasting
- Automatic drawing replication across all clients
```

### Game Flow
1. **Room Creation/Joining**: 
   - Generate unique room IDs
   - Firebase room document creation
   - Player registration in room

2. **Word Selection**:
   - Random word options presented to drawer
   - Word stored securely (hidden from guessers)

3. **Drawing Phase**:
   - Real-time canvas updates
   - Drawing actions synchronized via Firebase
   - Chat-based guessing system

4. **Round Completion**:
   - Reveal word to all players
   - Calculate scores for correct guesses
   - Transition to next round

### Firebase Data Structure
```
rooms/
  ├── {roomId}/
  │   ├── gameState/ (status, word, scores, timing)
  │   ├── players/ (player list and info)
  │   ├── drawings/ (drawing action stream)
  │   ├── chat/ (messages and guesses)
  │   └── specialOps/ (clear, undo operations)
```

## 🎯 Key Challenges Solved

1. **Real-Time Synchronization**: Implemented efficient Firestore listeners to sync drawing actions with minimal latency across multiple devices

2. **Drawing Performance**: Optimized drawing rendering to handle smooth gesture input while broadcasting to Firebase

3. **State Management**: Managed complex game states (waiting, selecting, drawing, round end) with proper transitions

4. **Cross-Platform Compatibility**: Ensured consistent drawing experience across Android, iOS, and web platforms

5. **Room Management**: Implemented secure room creation and joining with unique identifiers

## 📊 Project Statistics

- **Lines of Code**: ~1,200+ (Dart)
- **Models**: 6+ data models
- **Services**: 3 custom service layers
- **UI Screens**: 2 main screens (Home, Game)
- **Widgets**: 15+ custom widgets
- **Firebase Collections**: 5+ Firestore collections per room

## 🎨 UI/UX Highlights

- **Gradient Background**: Attractive purple gradient theme
- **Responsive Layout**: Adapts to different screen sizes
- **Drawing Tools Drawer**: Side panel with all drawing options
- **Player Sidebar**: Live player list with status indicators
- **Chat Interface**: Scrollable chat with auto-scroll
- **Game Status Bar**: Timer, current word hints, player indicators

## 🔧 Code Quality

- **Clean Code Principles**: Modular, readable, and maintainable code structure
- **Error Handling**: Comprehensive try-catch blocks and user feedback
- **Type Safety**: Strong typing with Dart's null safety features
- **Documentation**: Inline comments for complex logic
- **Best Practices**: Following Flutter and Firebase best practices

## 🚀 Future Enhancements

- [ ] Add player avatars and profiles
- [ ] Implement difficulty levels for words
- [ ] Add drawing replay feature
- [ ] Include voice chat option
- [ ] Create tournament mode
- [ ] Add achievement system
- [ ] Implement spectator mode
- [ ] Add drawing templates/stencils

## 💡 Learning Outcomes

Through this project, I gained expertise in:
- Real-time data synchronization with Firebase
- Complex state management in Flutter
- Gesture handling and custom painting
- Multiplayer game architecture
- NoSQL database design
- Cross-platform mobile development
- Performance optimization techniques

## 🔗 Project Links

- **Repository**: [GitHub Link]
- **Live Demo**: [Demo Link]
- **Video Demo**: [YouTube Link]

## 📝 License

This project is developed for educational and portfolio purposes.

---

**Technologies**: Flutter • Firebase • Dart • Cloud Firestore • Material Design

**Platform**: Android • iOS • Web

**Type**: Real-Time Multiplayer Game

**Status**: Active Development
