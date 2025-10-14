# Journey Journal - Flutter Map Application

## 📱 Overview

Journey Journal is a Flutter-based mobile application that allows users to document their travels by marking locations on an interactive map and attaching media (photos and videos) to each location. The app provides a seamless way to create a visual diary of your journeys with geolocation support and persistent local storage.

## ✨ Key Features

### 🗺️ Interactive Mapping
- **Dark-themed map interface** using OpenStreetMap with CartoCD dark tiles
- **Long-press gesture** to add new markers at any location
- **Interactive marker popups** showing location details and media count
- **Geocoding integration** to display human-readable addresses for marked locations

### 📸 Media Management
- **Multi-media support**: Add both images and videos to each location
- **Bulk upload**: Select multiple files at once
- **Image gallery**: Grid view of all media associated with a location
- **Full-screen viewer**: Interactive image viewer with zoom and pan capabilities
- **Video player**: Built-in video playback with play/pause controls
- **Media deletion**: Remove individual images or videos from markers

### 💾 Data Persistence
- **Hive database** for local storage without requiring code generation
- **CRUD operations**: Full Create, Read, Update, Delete functionality
- **Custom adapters**: Manual TypeAdapter implementation for flexible data storage
- **Offline-first**: All data stored locally on device

### 🔐 Permissions Handling
- **Storage permissions**: Proper Android storage access
- **Photo library access**: iOS photo library permissions
- **Runtime permission requests**: User-friendly permission dialogs

## 🏗️ Technical Architecture

### Project Structure
```
lib/
├── main.dart                          # App entry point
├── screens/
│   └── map_screen.dart               # Main map interface
├── widgets/
│   ├── full_screen_image_viewer.dart # Image viewer component
│   └── video_player_screen.dart     # Video player component
└── services/
    └── database_service_no_gen.dart  # Hive database service
```

### Technology Stack
- **Framework**: Flutter 3.7.2
- **Language**: Dart
- **State Management**: StatefulWidget with setState
- **Maps**: flutter_map (^8.2.1)
- **Database**: Hive (^2.2.3) & Hive Flutter (^1.1.0)
- **Geocoding**: geocoding (^4.0.0)
- **Media**: 
  - image_picker (^1.2.0)
  - file_picker (^10.3.3)
  - video_player (^2.8.2)
- **Permissions**: permission_handler (^11.3.1)
- **UI Components**: flutter_map_marker_popup (^8.1.0)

## 🎯 Core Functionality

### Adding Markers
1. Long-press anywhere on the map
2. Select images/videos from device
3. Marker automatically created with media attached
4. Address reverse-geocoded and saved

### Viewing Marker Details
1. Tap on any marker to see popup
2. Click "View" to open full details sheet
3. Swipe-up sheet shows:
   - Location address
   - Grid of all media
   - Add/delete options

### Managing Media
- **Add**: Tap + button in marker details
- **View**: Tap any image for full-screen view with pinch-zoom
- **Delete**: Tap X on any media thumbnail
- **Play Videos**: Tap video thumbnails to play in dedicated player

### Data Persistence
- All markers automatically saved to Hive database
- App state persists across sessions
- Markers reload on app restart
- Efficient storage using JSON serialization

## 🔧 Implementation Highlights

### Custom Hive Adapters
Implemented manual TypeAdapters to avoid build_runner code generation issues:
```dart
class MediaFileManualAdapter extends TypeAdapter<Map> {
  @override
  final typeId = 1;
  
  @override
  Map read(BinaryReader reader) {
    return Map<String, dynamic>.from(json.decode(reader.readString()));
  }
  
  @override
  void write(BinaryWriter writer, Map obj) {
    writer.writeString(json.encode(obj));
  }
}
```

### Data Models
- **MediaFile**: Stores file path and video flag
- **MarkerData**: Contains coordinates, media list, address, and unique ID
- **Database Service**: Static methods for all CRUD operations

### User Experience
- Loading indicators during media selection
- Confirmation snackbars for actions
- Draggable scrollable sheet for marker details
- Smooth animations and transitions
- Error handling with user feedback

## 🚀 Future Enhancements

### Potential Features
- [ ] Cloud sync for backup and multi-device support
- [ ] Social sharing of journeys
- [ ] Trip grouping and timeline view
- [ ] Search and filter markers
- [ ] Export journey as PDF or slideshow
- [ ] Custom marker icons based on media type
- [ ] Notes/captions for each location
- [ ] Route visualization between markers
- [ ] Dark/light theme toggle
- [ ] Multi-language support

### Technical Improvements
- [ ] Unit and integration tests
- [ ] State management with Provider or Bloc
- [ ] Image caching and optimization
- [ ] Offline map tiles
- [ ] Performance optimization for large datasets

## 📊 App Statistics
- **Lines of Code**: ~800+
- **Screens**: 3 (Map, Image Viewer, Video Player)
- **Dependencies**: 15+ packages
- **Supported Platforms**: Android & iOS
- **Minimum SDK**: Android 21+ (Android 5.0)

## 🎨 Design Principles
- **Material Design**: Following Flutter's material design guidelines
- **Responsive**: Adapts to different screen sizes
- **Intuitive**: Simple gesture-based interactions
- **Visual Feedback**: Clear indicators for all actions
- **Performance**: Optimized for smooth scrolling and interactions

## 🔍 Technical Challenges Solved
1. **Build Runner Issues**: Implemented custom Hive adapters without code generation
2. **Media Type Detection**: Automatic video/image classification based on file extension
3. **State Synchronization**: Keeping UI in sync with database changes
4. **Permission Flow**: Graceful handling of denied permissions
5. **Memory Management**: Efficient handling of multiple media files

## 📱 Screenshots & Demo
*[Add screenshots of your app here]*
- Map view with markers
- Marker detail view
- Image gallery
- Full-screen image viewer
- Video player

## 💻 Installation & Setup

### Prerequisites
```bash
Flutter SDK: >=3.7.2
Dart SDK: >=2.19.0
```

### Run the App
```bash
# Install dependencies
flutter pub get

# Run on connected device
flutter run
```

### Build for Release
```bash
# Android
flutter build apk --release

# iOS
flutter build ios --release
```

## 📄 License
[Add your license here]

## 👨‍💻 Developer
**[Your Name]**
- GitHub: [@JeelChandegra](https://github.com/JeelChandegra)
- Repository: [Journey_journel](https://github.com/JeelChandegra/Journey_journel)

## 🤝 Contributions
Contributions, issues, and feature requests are welcome!

---

**Built with ❤️ using Flutter**
