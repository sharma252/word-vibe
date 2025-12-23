# WordVibe Frontend

WordVibe is a modern, responsive blog application built with React and Vite. It serves as a seamless platform for writers and thinkers to share their stories with the world. The application is robust, featuring mock data fallbacks, resilient error handling, and a premium UI design.

## Features

- **User Authentication**: Secure Login and Registration functionality.
- **Dynamic Content**: Browse, create, edit, and delete blog posts.
- **Robust Error Handling**: Automatic fallback to high-quality mock data when the backend is unreachable.
- **Premium UI/UX**:
    - **Glassmorphism** styling and modern gradients.
    - **Outfit** typography for excellent readability.
    - **Fully Responsive** design for Desktop, Tablet, and Mobile.
- **Routing**: Centralized routing implementation with Protected Route guards.
- **About Page**: Dedicated page showcasing the mission and brand identity.

## Tech Stack

- **Core**: React 18, Vite
- **Routing**: React Router DOM v6
- **Styling**: Bootstrap 5 + Custom CSS Variables + CSS Gradients
- **State Management**: React Context API (AuthContext)
- **Testing**: Vitest, React Testing Library
- **Icons**: Lucide React
- **Infrastructure**: Docker, Nginx, GitHub Actions (CI)

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm (v9+)
- Docker (Optional, for containerized run)

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/wordvibe-frontend.git
   cd wordvibe-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm ci
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api/v1
   ```

4. **Run Tests:** (Optional but recommended)
   ```bash
   npm test
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```
   Access the app at `http://localhost:5173`

### Running with Docker

This project includes a production-ready Docker setup using Nginx.

1. **Build and Run using Docker Compose:**
   ```bash
   docker-compose up --build
   ```
   Access the app at `http://localhost:8080`

2. **Manual Docker Run:**
   ```bash
   docker build -t wordvibe-frontend .
   docker run -p 8080:80 wordvibe-frontend
   ```

## Folder Structure

```
src/
├── components/     # Reusable UI components (Navbar, PostCard, Layout, etc.)
├── context/        # Global state providers (AuthContext)
├── pages/          # Full page views (Home, About, Login, Profile)
├── routes/         # Centralized routing configuration & Guards
├── services/       # API integration modules
├── tests/          # Unit and Integration tests
├── App.jsx         # App Entry point
├── main.jsx        # React DOM Entry point
└── index.css       # Global styles, Variables, and Resets
```

## CI/CD

## CI/CD

The project includes a GitHub Actions workflow (`.github/workflows/ci.yml`) that automatically:
- Installs dependencies
- Builds the production bundle
- **Runs Automated Tests**: Executes the Vitest suite to ensure no regressions.
- Runs validity checks on every Push and Pull Request to `main`.
