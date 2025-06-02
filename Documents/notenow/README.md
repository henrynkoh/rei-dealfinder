# 🚀 NoteFlow - Your Ultimate Note-Taking & Automation Hub

<div align="center">

![NoteFlow Logo](assets/noteflow-banner.png)

[![iOS](https://img.shields.io/badge/iOS-16.0+-blue.svg)](https://developer.apple.com/ios/)
[![Swift](https://img.shields.io/badge/Swift-5.7+-orange.svg)](https://swift.org)
[![SwiftUI](https://img.shields.io/badge/SwiftUI-4.0+-green.svg)](https://developer.apple.com/xcode/swiftui/)
[![CloudKit](https://img.shields.io/badge/CloudKit-Enabled-purple.svg)](https://developer.apple.com/icloud/cloudkit/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Combining the best of Notion, Evernote, OneNote, and n8n automation in one powerful iOS app**

[📱 Download](#installation) • [📖 Documentation](#documentation) • [🎯 Features](#features) • [🔧 Contributing](#contributing)

</div>

---

## ✨ **What is NoteFlow?**

NoteFlow is a revolutionary hybrid note-taking application that combines:

- 📝 **Rich Text Notes** (like Notion)
- 🗃️ **Custom Databases** (like Airtable) 
- 🎤 **Voice Recording** with AI transcription
- 🔍 **Universal Search** across all content
- 🤖 **Automation Workflows** (like n8n)
- ☁️ **iCloud Sync** for seamless device integration

Built with **SwiftUI** and **CloudKit** for native iOS performance and reliability.

---

## 🎯 **Core Features**

### 📝 **Smart Notes**
- Rich text editing with full formatting
- Real-time search and filtering
- Automatic timestamps and metadata
- iCloud sync across all devices

### 🗃️ **Custom Databases**
- Notion-style databases with custom fields
- Multiple field types: Text, Number, Date, Select, Email, Phone, URL
- Visual customization with icons and colors
- Record management with full CRUD operations

### 🎤 **AI-Powered Voice Notes**
- Real-time speech-to-text transcription
- Automatic theme and keyword extraction
- Sentiment analysis and categorization
- Audio visualization during recording

### 🔍 **Universal Search**
- Cross-platform search across notes, voice recordings, and databases
- Scoped filtering by content type
- Recent search history
- Quick action shortcuts

### 🤖 **Automation Workflows**
- n8n-style automation builder
- Multiple triggers: Note created, Voice note, Database records, Schedule
- Actions: Email, Slack, Google Drive, Asana, Webhooks
- Run history and performance monitoring

---

## 🚀 **Quick Start**

### **Prerequisites**
- Xcode 14.2+ (for iOS 16 compatibility)
- iOS 16.0+ device or simulator
- Apple Developer account (for device testing)

### **Installation**

1. **Clone the repository:**
```bash
git clone https://github.com/henrynkoh/notenow.git
cd notenow
```

2. **Open in Xcode:**
```bash
open NoteFlow.xcodeproj
```

3. **Configure CloudKit:**
   - Enable CloudKit capability in project settings
   - Configure your CloudKit container
   - Update `Info.plist` with your container identifier

4. **Build and Run:**
   - Select your target device/simulator
   - Press `Cmd+R` to build and run

### **First Launch**
The app will automatically:
- Request microphone and speech recognition permissions
- Set up Core Data with CloudKit sync
- Load sample data to demonstrate features

---

## 📖 **Documentation**

- [📚 **User Manual**](docs/USER_MANUAL.md) - Complete feature guide
- [🎯 **Tutorial**](docs/TUTORIAL.md) - Step-by-step walkthrough  
- [⚡ **Quick Starter**](docs/QUICKSTART.md) - Get up and running in 5 minutes
- [🔧 **API Reference**](docs/API.md) - Developer documentation
- [🏗️ **Architecture**](docs/ARCHITECTURE.md) - Technical overview

---

## 🛠️ **Technical Stack**

### **Frontend**
- **SwiftUI 4.0+** - Modern declarative UI framework
- **iOS 16.0+** - Latest iOS features and APIs
- **Combine** - Reactive programming framework

### **Backend & Data**
- **Core Data** - Local data persistence
- **CloudKit** - iCloud synchronization
- **Speech Framework** - Voice-to-text transcription
- **Natural Language** - AI content analysis

### **Architecture**
- **MVVM Pattern** - Clean separation of concerns
- **Repository Pattern** - Data access abstraction
- **Dependency Injection** - Testable and maintainable code

---

## 📱 **Screenshots**

<div align="center">

| Notes Interface | Database Management | Voice Recording | Search & Workflows |
|:---:|:---:|:---:|:---:|
| ![Notes](assets/screenshots/notes.png) | ![Databases](assets/screenshots/databases.png) | ![Voice](assets/screenshots/voice.png) | ![Search](assets/screenshots/search.png) |

</div>

---

## 🔧 **Development**

### **Project Structure**
```
NoteFlow/
├── 📱 App/
│   ├── NoteFlowApp.swift
│   └── ContentView.swift
├── 🎨 Views/
│   ├── NotesView.swift
│   ├── DatabasesView.swift
│   ├── VoiceNotesView.swift
│   ├── SearchView.swift
│   └── WorkflowsView.swift
├── 🧠 Managers/
│   ├── PersistenceController.swift
│   └── VoiceNoteManager.swift
├── 🗃️ Models/
│   └── NoteFlow.xcdatamodeld
└── 🔧 Extensions/
    └── StringExtensions.swift
```

### **Key Components**

#### **PersistenceController**
Manages Core Data stack with CloudKit integration:
```swift
class PersistenceController {
    static let shared = PersistenceController()
    let container: NSPersistentCloudKitContainer
}
```

#### **VoiceNoteManager**
Handles voice recording and AI analysis:
```swift
@MainActor
class VoiceNoteManager: ObservableObject {
    func startRecording()
    func stopRecording()
    func analyzeContent(_ text: String)
}
```

### **Building Features**

1. **Add a new view:**
   - Create SwiftUI view in `Views/` folder
   - Add to `ContentView.swift` tab navigation
   - Implement Core Data integration

2. **Add database entity:**
   - Open `NoteFlow.xcdatamodeld`
   - Create entity with CloudKit configuration
   - Generate NSManagedObject classes

3. **Add automation action:**
   - Extend `WorkflowActionType` enum
   - Implement action logic in `WorkflowsView`
   - Add UI configuration options

---

## 🧪 **Testing**

### **Unit Tests**
```bash
# Run all tests
xcodebuild test -scheme NoteFlow -destination 'platform=iOS Simulator,name=iPhone 14 Pro'

# Run specific test
xcodebuild test -scheme NoteFlow -destination 'platform=iOS Simulator,name=iPhone 14 Pro' -only-testing:NoteFlowTests/VoiceNoteManagerTests
```

### **UI Tests**
```bash
# Run UI automation tests
xcodebuild test -scheme NoteFlowUITests -destination 'platform=iOS Simulator,name=iPhone 14 Pro'
```

---

## 🚀 **Deployment**

### **App Store Release**
1. Update version in `Info.plist`
2. Archive build: `Product > Archive`
3. Upload to App Store Connect
4. Submit for review

### **TestFlight Beta**
1. Create beta build
2. Add external testers
3. Distribute via TestFlight

---

## 🤝 **Contributing**

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### **Development Workflow**
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open pull request

### **Code Style**
- Follow Swift API Design Guidelines
- Use SwiftLint for code formatting
- Write unit tests for new features
- Update documentation

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 **Team**

- **Lead Developer**: Henry Oh
- **UI/UX Design**: Design Team
- **Product Manager**: PM Team

---

## 🙏 **Acknowledgments**

- Apple for SwiftUI and CloudKit frameworks
- The iOS development community
- Open source contributors

---

## 📞 **Support**

- 📧 **Email**: support@noteflow.app
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/henrynkoh/notenow/issues)
- 💬 **Community**: [Discord Server](https://discord.gg/noteflow)
- 📖 **Documentation**: [docs.noteflow.app](https://docs.noteflow.app)

---

<div align="center">

**Made with ❤️ for the iOS community**

[⭐ Star this repo](https://github.com/henrynkoh/notenow) • [🐦 Follow on Twitter](https://twitter.com/noteflow) • [📧 Subscribe to Newsletter](https://noteflow.app/newsletter)

</div> 