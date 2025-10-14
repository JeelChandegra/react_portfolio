# Employee Attendance Management System

## 📋 Project Overview

A comprehensive Flutter-based mobile application designed to streamline employee attendance tracking and salary management. This full-stack solution provides businesses with an intuitive interface for managing workforce attendance, calculating salaries based on work hours, and handling financial transactions.

## 🎯 Key Features

### 1. **Interactive Calendar-Based Attendance Tracking**
- Visual calendar interface using `table_calendar` package
- Multiple attendance status types:
  - **Present**: Full day attendance with standard working hours
  - **Absent**: Mark employee as absent with zero hours
  - **Half Day**: Partial attendance with configurable hours
  - **Leave**: Official leave with zero working hours
  - **Partial Day**: Custom hours for unique situations
- Real-time status updates with color-coded indicators
- Date-specific attendance marking with historical tracking

### 2. **Flexible Working Hours Configuration**
- Customizable standard working hours (default: 9 hours)
- Adjustable half-day hours through in-app settings
- Overtime/Extra hours tracking for accurate compensation
- Settings persist across app sessions

### 3. **Automated Salary Calculations**
- Dynamic salary computation based on:
  - Total hours worked (regular + extra hours)
  - Employee hourly rate
  - Currency: Indian Rupee (₹)
- Real-time salary summaries for any date range
- Gross salary calculation with transparent breakdowns

### 4. **Withdrawal/Advance Salary Management**
- Record employee withdrawals and advance payments
- Automatic deduction from total earned salary
- Net salary calculation (Gross Salary - Withdrawals)
- Transaction history with dates and reasons
- Balance tracking for financial transparency

### 5. **Comprehensive Employee Management**
- Employee profiles with position and hourly rate information
- Individual employee detail screens
- Multi-tab interface for easy navigation:
  - Attendance tracking
  - Salary overview
  - Transaction history

## 🛠️ Technical Architecture

### **Frontend**
- **Framework**: Flutter (Cross-platform: iOS, Android, Web, Desktop)
- **UI Components**: Material Design 3
- **Calendar UI**: `table_calendar` package
- **State Management**: Provider pattern
- **Date Formatting**: `intl` package

### **Backend & Database**
- **Local Database**: SQLite via `sqflite` package
- **Web Support**: `sqflite_common_ffi_web` for browser compatibility
- **CRUD Operations**: Custom `DatabaseHelper` singleton class
- **Data Models**:
  - Employee (id, name, hourlyRate, position)
  - Attendance (id, employeeId, date, status, hours, extraHours, notes)
  - Withdrawal (id, employeeId, amount, date, reason)
  - SalaryCalculation (id, employeeId, startDate, endDate, totalHours, hourlyRate, grossSalary, withdrawnAmount, netSalary)
  - Settings (id, standardWorkingHours, halfDayHours)

### **State Management**
- **Provider Pattern**: Reactive state management
- Dedicated providers for:
  - `EmployeeProvider`: Employee CRUD operations
  - `AttendanceProvider`: Attendance tracking and queries
  - `WithdrawalProvider`: Financial transaction management
  - `SalaryProvider`: Salary calculations
  - `SettingsProvider`: App configuration

### **Database Architecture**
- Relational database design with foreign key relationships
- Optimized queries for date-range filtering
- Transaction support for data integrity
- Direct database access layer for critical operations

## 🔧 Technical Challenges Solved

### **Challenge 1: Attendance Status Update Bug**
**Problem**: Users couldn't change attendance from "Present" to "Absent" for current or previously marked days.

**Root Causes Identified**:
1. In-memory caching conflicts with database state
2. Provider layer not reflecting immediate database changes
3. Inconsistent handling of hours/extraHours during status transitions
4. Model validation conflicts with explicit value updates

**Solution Implemented**:
1. Created `EnhancedAttendanceScreen` with direct database access
2. Implemented atomic database transactions using `rawUpdate` for guaranteed updates
3. Added manual database refresh after each status change
4. Force hours and extraHours to 0.0 for Absent/Leave statuses at the SQL level
5. Added "Force Mark As Absent" emergency button for edge cases
6. Implemented local caching with explicit cache invalidation

**Technical Details**:
```dart
// Direct SQL update bypassing provider cache
final count = await txn.rawUpdate(
  'UPDATE attendance SET status = ?, hours = ?, extraHours = ? WHERE id = ?',
  [newStatus.index, finalHours, extraHours, id]
);
```

### **Challenge 2: Cross-Platform Database Support**
**Problem**: SQLite doesn't work directly on web browsers.

**Solution**:
- Implemented `sqflite_common_ffi_web` for web platform
- Conditional initialization based on platform detection
- Maintained single codebase for all platforms

## 📱 User Interface Highlights

### **Screen Structure**
1. **Employee List Screen**: Overview of all employees with quick actions
2. **Employee Detail Screen**: Multi-tab interface with:
   - Attendance Calendar Tab
   - Salary Summary Tab
   - Settings access
3. **Enhanced Attendance Screen**: 
   - Calendar view with status indicators
   - Quick action buttons for status changes
   - Detailed attendance form with hours/notes
   - Real-time status updates
4. **Salary Screen**: 
   - Date range selector
   - Breakdown of hours worked
   - Withdrawal history
   - Net salary calculation
5. **Settings Screen**: 
   - Customizable working hours
   - Half-day hours configuration

### **Design Patterns**
- Material Design 3 components
- Color-coded status indicators (Green=Present, Red=Absent, Orange=Half Day, Blue=Leave, Amber=Partial)
- Responsive layouts for multiple screen sizes
- Loading states with progress indicators
- Snackbar notifications for user feedback

## 💾 Data Persistence

- **Local Storage**: All data stored locally using SQLite
- **No Internet Required**: Fully offline-capable application
- **Data Integrity**: Foreign key constraints and transaction support
- **Migration Support**: Database version management for future updates

## 🚀 Deployment & Platform Support

- **Android**: Native Android APK
- **iOS**: Native iOS app
- **Web**: Progressive Web App (PWA) ready
- **Windows/Linux/macOS**: Desktop application support

## 📊 Business Value

### **For Employers**
- Accurate attendance tracking reduces payroll errors
- Transparent salary calculations build employee trust
- Historical data for performance reviews
- Advance payment tracking for better cash flow management

### **For Employees**
- Clear visibility into hours worked and earnings
- Easy access to attendance history
- Transparent withdrawal/advance tracking
- Self-service attendance marking

## 🔐 Code Quality & Best Practices

- **Architecture**: Clean separation of concerns (Models, Providers, Services, UI)
- **Type Safety**: Strong typing throughout the application
- **Error Handling**: Try-catch blocks with debug logging
- **Code Documentation**: Inline comments for complex logic
- **Null Safety**: Full Dart null safety support
- **Debugging**: Extensive debug print statements for troubleshooting

## 📈 Future Enhancements (Potential)

- Biometric attendance (fingerprint/face recognition)
- Cloud sync with backend server
- Push notifications for attendance reminders
- Advanced reporting and analytics
- Export attendance/salary reports to PDF/Excel
- Multi-language support
- Role-based access control (Admin/Employee/Manager)
- Integration with payroll systems

## 🎓 Skills Demonstrated

- **Mobile Development**: Cross-platform Flutter development
- **State Management**: Provider pattern implementation
- **Database Design**: SQLite schema design and optimization
- **Problem Solving**: Complex bug investigation and resolution
- **UI/UX Design**: Intuitive interface design with Material Design
- **Testing & Debugging**: Systematic issue identification and fixing
- **Code Architecture**: Clean, maintainable, scalable code structure

## 📦 Dependencies

```yaml
dependencies:
  flutter:
    sdk: flutter
  provider: ^6.1.1
  sqflite: ^2.3.0
  sqflite_common_ffi_web: ^0.4.2+2
  path: ^1.8.3
  intl: ^0.18.1
  table_calendar: ^3.0.9
```

## 🏆 Project Achievements

✅ **Complete CRUD Operations**: Full create, read, update, delete functionality for all entities  
✅ **Robust Error Handling**: Graceful error recovery and user feedback  
✅ **Cross-Platform**: Single codebase for multiple platforms  
✅ **Performance Optimized**: Efficient database queries and UI rendering  
✅ **Production Ready**: Stable, tested, and deployable application  
✅ **Real-World Application**: Solves actual business problems  

## 🔗 Technical Stack Summary

| Category | Technology |
|----------|------------|
| Framework | Flutter |
| Language | Dart |
| Database | SQLite |
| State Management | Provider |
| UI Library | Material Design 3 |
| Architecture | MVVM Pattern |
| Platform Support | Android, iOS, Web, Desktop |

---

**Project Status**: ✅ Completed and Production-Ready  
**Development Time**: Multiple iterations with continuous improvements  
**Complexity**: Intermediate to Advanced  
**Use Case**: Small to Medium Business Employee Management