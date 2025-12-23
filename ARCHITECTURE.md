# WordVibe Architecture Documentation

This document outlines the architectural decisions, design patterns, and structural choices made for the WordVibe Frontend application.

## 1. Project Structure & Organization

The project follows a **Feature-First + Centralized Configuration** approach.

- **`src/routes/`**: Unlike typical setups where routes are scattered in `App.jsx`, we centralized routing in `src/routes/index.jsx`. This acts as the "Switchboard" of the application.
    - **Guard Pattern**: `ProtectedRoute.jsx` wraps sensitive routes. It implements the "Guard" pattern, checking `AuthContext` state before rendering children or redirecting to `/login`.
- **`src/services/`**: API logic is decoupled from UI components. `api.js` handles Axios instances, interceptors, and endpoint definitions. This allows for easy swapping of backend implementations or mocking.
- **`src/components/Layout.jsx`**: We use the **Layout Pattern**. Instead of repeating the Navbar and Footer in every page, a wrapper component handles the persistent UI frame and standardized spacing (`pb-5` to avoid footer overlap).

## 2. Component Design Principles

- **Atomic Design Influence**:
    - **Atoms/Molecules**: `Navbar`, `PostCard` (Small, reusable parts).
    - **Organisms**: `PostDetailModal` (Complex interactive components).
    - **Templates/Pages**: `Home`, `About`, `Profile`.
- **Container vs. Presentational**:
    - `Home.jsx` acts as a **Container**. It fetches data, handles state (`loading`, `error`), and manages the "Mock Data Fallback" logic.
    - `PostCard.jsx` is **Presentational**. It receives data via props and focuses purely on rendering the UI.

## 3. Styling Strategy

We adopted a **Modern CSS** approach over heavy utility frameworks (like Tailwind) for this specific iteration to demonstrate robust vanilla CSS capabilities.

- **CSS Variables**: Defined in `:root` (e.g., `--primary`, `--bg-surface`) to enable easy theming and dark mode future-proofing.
- **Glassmorphism**: The `Navbar` uses `backdrop-filter: blur(10px)` with semi-transparent gradients to create a premium feel.
- **Bootstrap 5 (Hybrid)**: We use Bootstrap for the reliable Grid System (Rows/Cols) and basic utilities (`d-flex`, `mb-4`), but override all visual components (Buttons, Cards, Navbars) with custom CSS to avoid the "Generic Bootstrap Look".

## 4. Robustness & Error Handling

A key architectural feature is the **Resilient Data Layer**.
- **Issue**: Standard frontends crash or show empty states when the backend is down.
- **Solution**: The `fetchPosts` Logic in `Home.jsx` implements a "Graceful Degradation" strategy.
    - **Try**: Fetch from API.
    - **Catch**: If API fails, inject high-fidelity `mockPosts`.
    - **Result**: The app *always* feels alive to the user, even during backend outages.

## 6. Testing Strategy

We employ a **Pyramid Testing Approach** utilizing `Vitest` and `React Testing Library`.

- **Unit Tests (`src/components/*.test.jsx`)**:
    - Focus: Individual components (e.g., `Alert`, `PostCard`).
    - Goal: Verification of rendering logic, conditional styles (success/danger), and event handlers.
    - Example: `Alert.test.jsx` checks if the close button triggers the `onClose` callback.
- **Integration Tests (`src/*.test.jsx`)**:
    - Focus: Feature flows (e.g., App Mounting, Authentication checks).
    - Goal: Verifying that components work together. `App.test.jsx` renders the entire app shell to ensure routing and Layout contexts are wired correctly.
    - Mocks: External services (API, Auth) are mocked to ensure tests are deterministic and do not rely on a live backend.

## 7. Deployment & DevOps

The application is "Write Once, Run Anywhere" compliant via Docker.

### Docker Strategy
- **Multi-Stage Build**:
    1.  **Build Stage** (`node:20-alpine`): Installs dependencies and runs `npm run build`. This keeps the heavy `node_modules` out of the final image.
    2.  **Production Stage** (`nginx:alpine`): Copies only the static `dist/` folder. This results in a tiny, secure image.
- **Nginx Configuration**: Custom `nginx.conf` tackles the SPA Client-Side Routing issue (`try_files $uri $uri/ /index.html`) so refreshing on sub-routes works in production.

### CI Pipeline
- **GitHub Actions**: A standard `.yml` workflow enforces code integrity by building the app on every push. This prevents broken builds from ever reaching production.
