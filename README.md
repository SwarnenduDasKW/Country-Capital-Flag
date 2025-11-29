# 🌍 Country-Capital-Flag Quiz App

A modern, interactive React application that helps users learn about countries, their capitals, flags, and geography through an engaging quiz game and interactive world map.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-5.0.0-purple)
![MUI](https://img.shields.io/badge/MUI-5.14.18-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🗺️ Interactive Country Explorer
- **250+ Countries**: Browse flags, capitals, and details for countries worldwide
- **Interactive World Map**: Click on flags to see countries highlighted on a world map
- **Rich Country Details**: View capital, currency, region, and country code (alpha3)
- **Beautiful Images**: Curated landmark photos for 253 countries from Wikimedia Commons

### 🎯 Quiz Game
- **Three Difficulty Levels**: Easy, Medium, and Hard
- **Timed Challenges**: 5-minute countdown timer with auto-submit
- **Score Tracking**: Real-time scoring with visual feedback (green/red)
- **Flag Display**: See country flags alongside questions
- **Summary Report**: Detailed results showing correct/incorrect answers

### 🎨 Modern UI/UX
- **Material-UI v5**: Beautiful, responsive design
- **Smooth Animations**: Hover effects and transitions
- **Dark Theme**: Eye-friendly color scheme
- **Responsive Layout**: Works on desktop, tablet, and mobile

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/Country-Capital-Flag.git

# Navigate to project directory
cd Country-Capital-Flag

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
Country-Capital-Flag/
├── src/
│   ├── components/          # React components
│   │   ├── App.jsx         # Main app component
│   │   ├── Navbar.jsx      # Navigation bar
│   │   ├── Countries.jsx   # Country list display
│   │   ├── Country.jsx     # Individual country card
│   │   ├── CountryDetails.jsx  # Country detail modal
│   │   ├── MapChart.jsx    # Interactive world map
│   │   ├── QuizLevel.jsx   # Quiz difficulty selector
│   │   ├── QuizMaster.jsx  # Quiz game controller
│   │   └── CountryCapitalQuiz.jsx  # Quiz question component
│   ├── contexts/           # React contexts
│   │   ├── CountryContext.js    # Country data state
│   │   └── answerContext.js     # Quiz answers state
│   ├── data/               # Static data files
│   │   ├── AllCountriesLight.json  # Country database (250 countries)
│   │   └── CountryCover.json       # Country images (253 entries)
│   ├── helpers/            # Utility functions
│   ├── images/             # Static images
│   └── stylesheets/        # CSS files
├── index.html              # HTML entry point
├── vite.config.js          # Vite configuration
└── package.json            # Dependencies and scripts
```

## 🛠️ Technologies Used

### Core
- **React 18.2.0** - Modern React with hooks
- **Vite 5.0.0** - Fast build tool and dev server
- **React Router v6** - Client-side routing

### UI Framework
- **Material-UI (MUI) v5** - Component library
- **@mui/icons-material** - Icon set
- **@emotion** - CSS-in-JS styling

### Data Visualization
- **react-simple-maps** - Interactive SVG maps
- **react-tooltip v5** - Tooltips for map interactions

### Data Sources
- **REST Countries API v3.1** - Live country data
- **Wikimedia Commons** - Country landmark images
- **Lorem Picsum** - Fallback placeholder images

## 🎮 How to Use

### Exploring Countries
1. **Browse**: Scroll through the country grid on the home page
2. **Search**: Use the search bar to find specific countries
3. **View Details**: Click on any flag to open a modal with:
   - Country name and ISO code
   - Capital city
   - Currency
   - Region information
   - Interactive map highlighting the country
   - Beautiful landmark photo

### Playing the Quiz
1. **Select Difficulty**: Choose Easy, Medium, or Hard
2. **Answer Questions**: Select the correct capital for each country
3. **Navigate**: Use Previous/Next buttons to move between questions
4. **Watch the Timer**: Complete the quiz within 5 minutes
5. **Submit**: Click Submit on the last question (or wait for auto-submit)
6. **Review Results**: See your score and review all answers

## 🔧 Configuration

### API Endpoints
The app uses the REST Countries API v3.1:
```javascript
// All countries
https://restcountries.com/v3.1/all?fields=name,capital,flags,currencies,cca2,cca3

// Search by name
https://restcountries.com/v3.1/name/{countryName}?fields=name,capital,flags,currencies,cca2,cca3
```

### Quiz Timer
Default: 5 minutes (300 seconds)
To change, edit `QuizMaster.jsx`:
```javascript
const [timeLeft, setTimeLeft] = useState(300); // Change to desired seconds
```

### Country Images
Images are sourced in this priority:
1. **CountryCover.json** - Curated images (253 countries)
2. **Lorem Picsum** - Fallback with country-based seed

## 📊 Data Structure

### Country Object (v3.1 API)
```javascript
{
  name: { common: "United States" },
  capital: ["Washington, D.C."],
  flags: { png: "https://flagcdn.com/w320/us.png" },
  currencies: { USD: { name: "United States dollar", symbol: "$" } },
  cca2: "US",
  cca3: "USA"
}
```

### Quiz Question Format
```javascript
{
  id: 1,
  name: "France",
  capital: "Paris",
  flag: "https://flagcdn.com/w320/fr.png",
  options: ["Paris", "London", "Berlin", "Madrid"]
}
```

## 🎨 Customization

### Styling
The app uses a combination of:
- **CSS files** in `src/stylesheets/`
- **MUI's `sx` prop** for inline styling
- **MUI's `makeStyles`** for component-specific styles

### Theme
To customize the theme, edit `src/components/App.jsx`:
```javascript
const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
});
```

## 🐛 Troubleshooting

### PowerShell Execution Policy Error
If you encounter script execution errors on Windows:
```bash
# Option 1: Use Command Prompt
cmd /c npm run dev

# Option 2: Bypass for current session
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
npm run dev
```

### Port Already in Use
Vite will automatically try alternative ports (5174, 5175, etc.)

### API Rate Limiting
The REST Countries API is free but may have rate limits. The app caches data in context to minimize requests.

## 📝 Recent Upgrades (2024)

This project was recently upgraded from a 4-year-old codebase to modern standards:

### Build System
- ✅ Migrated from Create React App to **Vite**
- ✅ Faster dev server and build times

### Dependencies
- ✅ React 16 → **React 18**
- ✅ Material-UI v4 → **MUI v5**
- ✅ React Router v5 → **v6**
- ✅ React Tooltip v4 → **v5**

### Features Added
- ✅ **Quiz timer** with countdown and auto-submit
- ✅ **Score tracking** with visual feedback
- ✅ **253 curated country images** from Wikimedia Commons
- ✅ **Modern API integration** (REST Countries v3.1)
- ✅ **Improved error handling** and loading states

### Code Quality
- ✅ Updated to modern React hooks
- ✅ Proper dependency management
- ✅ Fixed all deprecation warnings
- ✅ Added ThemeProvider for MUI v5 compatibility

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **REST Countries API** - Free API for country data
- **Wikimedia Commons** - Free, high-quality country images
- **Nations Online** - Additional curated country photos
- **React Simple Maps** - Interactive map component
- **Material-UI Team** - Beautiful React components

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Made with ❤️ using React, Vite, and MUI**
