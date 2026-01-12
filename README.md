# 💻 Maria Clara | Dev Portfolio

![Portfolio Preview](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-6.3.1-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.5-38B2AC?style=for-the-badge&logo=tailwind-css)

Welcome to my personal portfolio! This project showcases my skills, projects, and journey as a developer through a clean, responsive, and multilingual interface.

## ✨ About

A modern full-stack portfolio application featuring:

- **Frontend**: React 19 with Vite for blazing-fast development
- **Backend**: Python Flask API with MongoDB for dynamic content management
- **Styling**: Tailwind CSS 4 for modern, responsive design
- **Internationalization**: Multi-language support (Portuguese/English) with react-i18next
- **Admin Panel**: Protected dashboard for content management (Projects, Skills, Achievements)
- **Authentication**: Secure password-based access to admin features

## 🛠️ Technologies Used

### Frontend

- **React** 19.0.0 - UI library
- **Vite** 6.3.1 - Build tool and dev server
- **React Router DOM** 7.12.0 - Client-side routing
- **Tailwind CSS** 4.1.5 - Utility-first CSS framework
- **react-i18next** 15.6.1 - Internationalization
- **FontAwesome** 6.7.2 - Icons
- **Vercel Analytics** - Performance monitoring

### Backend

- **Python Flask** - REST API
- **MongoDB** - NoSQL database
- **Flask-CORS** - Cross-Origin Resource Sharing

### Development Tools

- **ESLint** 9.22.0 - Code linting
- **Prettier** - Code formatting
- **Git** - Version control

## 📁 Project Structure

```
portfolio/
├── src/                          # Frontend source code
│   ├── assets/                   # Images, icons, and static files
│   ├── components/               # Reusable React components
│   │   ├── AchievementCards.jsx  # Achievement display cards
│   │   ├── BackToTop.jsx         # Scroll to top button
│   │   ├── Carousel.jsx          # Image carousel
│   │   ├── Footer.jsx            # Footer component
│   │   ├── Header.jsx            # Navigation header
│   │   ├── LanguageSwitcher.jsx  # Language toggle (PT/EN)
│   │   ├── ProtectedRoute.jsx    # Route protection for admin
│   │   └── i18n.js              # i18n configuration
│   ├── config/                   # Configuration files
│   │   └── api.js               # API endpoints configuration
│   ├── contexts/                 # React Context providers
│   │   └── AuthContext.jsx      # Authentication state management
│   ├── locales/                  # Translation files
│   │   ├── en/                  # English translations
│   │   │   └── translation.json
│   │   └── pt/                  # Portuguese translations
│   │       └── translation.json
│   ├── pages/                    # Main page components
│   │   ├── About-me.jsx         # About section
│   │   ├── Achievements.jsx     # Achievements showcase
│   │   ├── AdminAchievements.jsx # Admin: Manage achievements
│   │   ├── AdminDashboard.jsx   # Admin: Main dashboard
│   │   ├── AdminLogin.jsx       # Admin: Login page
│   │   ├── AdminProjects.jsx    # Admin: Manage projects
│   │   ├── AdminSkills.jsx      # Admin: Manage skills
│   │   ├── Contact.jsx          # Contact form
│   │   ├── Home.jsx             # Landing page
│   │   ├── Projects.jsx         # Projects showcase
│   │   └── Skills.jsx           # Skills display
│   ├── styles/                   # Global styles
│   │   └── global.css           # Global CSS styles
│   ├── App.jsx                  # Main App component with routing
│   ├── main.jsx                 # React entry point
│   └── Script.js                # Custom JavaScript utilities
│
├── Backend/                      # Backend API
│   ├── app.py                   # Flask application
│   ├── requirements.txt         # Python dependencies
│   └── .env.example             # Environment variables template
│
├── api/                          # Vercel serverless functions
│   ├── achievements.py          # Achievements API endpoint
│   ├── projects.py              # Projects API endpoint
│   ├── skills.py                # Skills API endpoint
│   └── translations.py          # Translations API endpoint
│
├── public/                       # Static assets
│   ├── sitemap.xml              # SEO sitemap
│   ├── Certificates/            # Certificate images
│   └── Flags/                   # Language flag icons
│
├── .env                         # Environment variables (not in git)
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore rules
├── .prettierrc                  # Prettier configuration
├── eslint.config.js             # ESLint configuration
├── index.html                   # HTML entry point
├── package.json                 # Node.js dependencies
├── robots.txt                   # SEO robots file
├── tailwind.config.js           # Tailwind CSS configuration
├── vercel.json                  # Vercel deployment config
└── vite.config.js               # Vite configuration
```

## 🎯 Features

### Public Features

- ✅ **Multilingual Support**: Switch between Portuguese and English
- ✅ **Smooth Navigation**: Anchor-based scroll navigation
- ✅ **Responsive Design**: Mobile-first approach, works on all devices
- ✅ **Dynamic Content**: Projects, skills, and achievements loaded from database
- ✅ **Contact Form**: Direct communication channel
- ✅ **CV Download**: One-click resume download
- ✅ **Carousel Gallery**: Image showcases with navigation
- ✅ **Back to Top**: Quick scroll to top button
- ✅ **SEO Optimized**: Sitemap and robots.txt included

### Admin Features

- 🔐 **Protected Dashboard**: Secure admin panel with password authentication
- 📊 **Content Management**: Full CRUD operations for:
  - Projects (with images, technologies, tags, URLs)
  - Skills (with progress bars, categories, icons)
  - Achievements (with certificates, institutions, dates)
- 🌐 **Translation Management**: Auto-update translation files
- 📱 **Unified Interface**: Tabbed dashboard for all admin operations
- 💾 **Image Upload**: Support for both file upload and URL input
- 🎨 **Real-time Preview**: See changes immediately

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Python 3.8+
- MongoDB database (local or Atlas)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/claracayres/claracayres-portfolio.git
cd claracayres-portfolio
```

2. **Install frontend dependencies**

```bash
npm install
```

3. **Install backend dependencies**

```bash
cd Backend
pip install -r requirements.txt
```

4. **Set up environment variables**

Create `.env` file in the root:

```env
VITE_ADMIN_PASSWORD=your_admin_password
VITE_API_URL=http://localhost:5000
```

Create `.env` file in Backend/:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

5. **Start development servers**

Terminal 1 - Frontend:

```bash
npm run dev
```

Terminal 2 - Backend:

```bash
cd Backend
python app.py
```

Visit `http://localhost:5173` to see the portfolio.

## 🔒 Admin Access

To access the admin dashboard:

1. Navigate to `/admin-login`
2. Enter the password configured in `.env` (VITE_ADMIN_PASSWORD)
3. Manage your content through the dashboard

**Important**: Never commit the `.env` file. Use `.env.example` as a template.

## 📦 Deployment

### Vercel Deployment (Recommended)

1. **Push to GitHub**

```bash
git push origin main
```

2. **Deploy to Vercel**

```bash
npm run deploy
```

3. **Set environment variables in Vercel dashboard**:
   - `VITE_ADMIN_PASSWORD`
   - `VITE_API_URL`
   - `MONGO_URI`

### Manual Build

```bash
npm run build
npm run preview
```

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to customize the color scheme:

```js
colors: {
  darkBlue: "#0a192f",
  pink: "#ec4899",
  purple: "#8b5cf6",
  lightPurple: "#a78bfa"
}
```

### Translations

Add or modify translations in:

- `src/locales/pt/translation.json` (Portuguese)
- `src/locales/en/translation.json` (English)

## 📸 Live Preview

🌐 [**View Live Portfolio**](https://claracayres-portfolio.vercel.app)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/claracayres/claracayres-portfolio/issues).

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📬 Contact

**Maria Clara Cayres**

- 💼 LinkedIn: [Maria Clara Cayres](https://www.linkedin.com/in/maria-clara-cayres-de-almeida/)
- 📧 Email: [clara.cayres1205@gmail.com](mailto:clara.cayres1205@gmail.com)
- 🌐 Portfolio: [claracayres-portfolio.vercel.app](https://claracayres-portfolio.vercel.app)


## ☕ Support & Recognition

If you enjoyed this project, feel free to give it a ⭐ or support my work by buying me a coffee ☕✨

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support%20my%20work-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/claracayres) [![GitHub Stars](https://img.shields.io/github/stars/claracayres/claracayres-portfolio?style=for-the-badge&logo=github&logoColor=white)](https://github.com/claracayres/claracayres-portfolio)
