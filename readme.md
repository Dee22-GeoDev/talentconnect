# 🌐 TalentConnect

**TalentConnect** is a modern full-stack web platform that bridges the gap between skilled local professionals and companies seeking talent. It provides an intuitive interface for browsing job opportunities, discovering talented professionals, and facilitating meaningful connections within local communities.

---

## 🚀 Live Demo

- **Frontend:** [https://talentconnect-henna.vercel.app/](https://talentconnect-henna.vercel.app/)
- **Backend:** [https://talentconnect-deployment.onrender.com/](https://talentconnect-l79w.onrender.com/)

---

## ✨ Key Features

- **🧑‍💼 Job Listings** – Browse and search through job postings from verified local companies
- **👨‍💻 Talent Profiles** – Discover skilled professionals available for hire in your area
- **🔍 Smart Search** – Advanced filtering and keyword search for jobs and talents
- **🔐 Secure Authentication** – User registration and login with JWT-based authentication
- **📱 Responsive Design** – Fully responsive UI optimized for desktop, tablet, and mobile
- **⚡ Real-time Updates** – Live data synchronization powered by modern backend architecture
- **🎨 Modern UI/UX** – Clean, intuitive interface built with Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **State Management:** React Hooks
- **Routing:** React Router

### Backend
- **Runtime:** Node.js with Express
- **Database:** MongoDB / PostgreSQL
- **Authentication:** JWT
- **API:** RESTful API architecture

### DevOps
- **Deployment:** Vercel (Frontend), Render (Backend)
- **Version Control:** Git & GitHub
- **Package Manager:** npm / bun

---

## 📁 Project Structure

```
talentconnect/
├── client/                    # Frontend application
│   ├── node_modules/
│   ├── public/
│   ├── snippets/             # Screenshots and assets
│   └── src/
│       ├── components/       # Reusable React components
│       ├── config/           # Configuration files
│       ├── hooks/            # Custom React hooks
│       ├── lib/              # Utility libraries
│       ├── pages/            # Page components
│       ├── utils/            # Helper functions
│       ├── App.tsx           # Main app component
│       ├── index.css         # Global styles
│       ├── main.tsx          # Entry point
│       └── vite-env.d.ts     # Vite type definitions
│
├── server/                    # Backend application
│   ├── config/               # Server configuration
│   ├── controllers/          # Request handlers
│   ├── middleware/           # Express middleware
│   ├── models/               # Database models
│   ├── routes/               # API routes
│   ├── index.js              # Server entry point
│   └── package.json          # Backend dependencies
│
├── .env                       # Environment variables
├── .gitignore
├── package.json              # Root dependencies
├── postcss.config.js         # PostCSS configuration
├── tailwind.config.ts        # Tailwind CSS config
├── tsconfig.json             # TypeScript config
├── vite.config.ts            # Vite configuration
└── README.md
```

---

## ⚙️ Installation & Setup

### Prerequisites
- **Node.js** (v18 or higher) – [Download here](https://nodejs.org/)
- **npm** or **bun** package manager
- **MongoDB** or **PostgreSQL** (depending on your database choice)

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/talentconnect.git
cd talentconnect
```

### 2️⃣ Install Dependencies

**Option A: Using npm**
```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

**Option B: Using bun (faster alternative)**
```bash
# Install client dependencies
cd client
bun install

# Install server dependencies
cd ../server
bun install
```

### 3️⃣ Database Setup

**For MongoDB:**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Add your IP to the whitelist

**For PostgreSQL:**
1. Install PostgreSQL locally or use a hosted service
2. Create a new database: `CREATE DATABASE talentconnect;`
3. Note your connection credentials

### 4️⃣ Environment Configuration

**Client Configuration** – Create `client/.env`:
```env
VITE_API_URL=http://localhost:3000
```

### 5️⃣ Run Development Servers

Open **two terminal windows**:

**Terminal 1 - Backend Server:**
```bash
cd server
npm run dev
# or: bun run dev
```
✅ Server runs at: `http://localhost:3000`

**Terminal 2 - Frontend Client:**
```bash
cd client
npm run dev
# or: bun run dev
```
✅ Client runs at: `http://localhost:5173`

### 6️⃣ Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

The frontend will automatically proxy API requests to `http://localhost:3000`

### 7️⃣ Build for Production

**Build Frontend:**
```bash
cd client
npm run build
# Output: client/dist/
```

**Run Backend in Production:**
```bash
cd server
npm start
# or: node index.js
```

---

## 🗄️ Database Setup

The application supports both **MongoDB** and **PostgreSQL**. Choose the one that fits your needs.

### Database Schema
Refer to the `database/` directory for schema definitions and sample data.

---

## 📝 Available Scripts

### Client
- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run preview` – Preview production build
- `npm run lint` – Run ESLint

### Server
- `npm run dev` – Start with nodemon
- `npm start` – Start production server

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---

## 💙 Acknowledgements

- [React](https://react.dev/) – UI framework
- [Vite](https://vitejs.dev/) – Build tool
- [Tailwind CSS](https://tailwindcss.com/) – Styling
- [Express](https://expressjs.com/) – Server framework
- [MongoDB](https://www.mongodb.com/) / [PostgreSQL](https://www.postgresql.org/) – Database

---

## 📧 Contact

For questions or support, please open an issue or contact the maintainers.

---

**✨ Connecting Local Talents to Great Opportunities ✨**