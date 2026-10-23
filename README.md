# 3 Sixtey — Project and Media Solution

> **"Built for College Students, Tuned for Impact."**  
> A complete, production-ready, full-stack application engineered for **3 Sixtey**, delivering college academic project solutions (CSE, IT, ECE, EEE, Mechanical, Civil, Arts and Science) and studio-grade media production (video editing, 3D animation, posters, logo reveals).

---

## 1. System Architecture & Tech Stack

The repository is organized into a clean, decoupled **MERN** full-stack structure:

```
project-root/
│
├── frontend/                  ← Client-side SPA
│   ├── public/                ← Logo assets (logo.png, logo-icon.png, favicon, og-image)
│   ├── src/
│   │   ├── components/        ← 3D Canvas, Floating Logo, Navbar, Cursor, Preloader, Modals
│   │   ├── sections/          ← Hero, Marquee, Built for Students, Services, Work, HowItWorks, FAQ
│   │   ├── pages/             ← HomePage, LoginPage, SignupPage, DashboardPage, AdminPage
│   │   ├── services/          ← Axios/Fetch API callers (authService, reviewService, callbackService, orderService)
│   │   ├── context/           ← AuthContext (Google Identity Services One Tap + JWT session)
│   │   ├── types/             ← TypeScript interfaces
│   │   ├── lib/               ← Constants, sample datasets, fallback offline client
│   │   ├── App.tsx            ← React Router & Lenis smooth scroll
│   │   └── main.tsx
│   ├── .env                   ← Frontend environment configuration
│   └── package.json
│
├── backend/                   ← Production Express + MongoDB REST API
│   ├── src/
│   │   ├── config/            ← Database connection (db.js) & Google Token Verifier (google.js)
│   │   ├── models/            ← User.js, Review.js, Post.js, Callback.js, Order.js
│   │   ├── controllers/       ← authController.js, reviewController.js, postController.js, callbackController.js, orderController.js
│   │   ├── routes/            ← authRoutes.js, reviewRoutes.js, postRoutes.js, callbackRoutes.js, orderRoutes.js
│   │   ├── middleware/        ← authMiddleware.js, upload.js (Multer 2MB), errorHandler.js
│   │   ├── common/            ← constants.js, validators.js, responseHelper.js
│   │   ├── uploads/           ← Uploaded images and screenshots
│   │   ├── app.js             ← Express app setup & CORS
│   │   └── server.js          ← Server launcher & seed data
│   ├── .env                   ← Backend environment configuration
│   └── package.json
│
├── .gitignore                 ← Includes .env files and uploads/
└── README.md
```

### Frontend Technologies:
- **Framework**: React 19 + Vite 8 + TypeScript
- **Styling**: Tailwind CSS with custom rose-copper design system tokens
- **3D Graphics**: Three.js + `@react-three/fiber` (interactive 3D particle network sphere & perspective float)
- **Animation**: Framer Motion + GSAP + Lenis smooth scrolling
- **Icons**: `react-icons` only (**ZERO EMOJIS** across the entire project)
- **Authentication**: Google Identity Services (One Tap popup) & JWT-based authentication

### Backend Technologies:
- **Runtime**: Node.js (ESM modules)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Security**: `bcryptjs` password hashing, `jsonwebtoken` (JWT), `google-auth-library` ID token verification
- **File Handling**: `multer` with 2MB limits and image-only filters

---

## 2. Authentication & Duplicate Account Linking

Per specifications, users can authenticate via two paths without account collision:
1. **Email + Password**:
   - Passwords are encrypted using high-cost `bcrypt` salts and never stored in plain text.
   - If an account with this email already exists, signup returns: `"Account already exists. Please log in."`
   - If a Google-only account attempts password sign-in, the system returns: `"This account uses Google sign-in. Please click Continue with Google."`
2. **Continue with Google & One Tap**:
   - Instant sign-in via Google Identity Services One Tap prompt or the visible Google button.
   - If a user previously signed up with Email/Password and later clicks Google Sign-In with that same email, the system automatically links `googleId` to the existing account rather than creating a duplicate.
3. **Admin Privileges**:
   - `gokilas333@gmail.com` is automatically granted the `admin` role upon sign-in.
   - Admin features include user activity logs, review approval/moderation, call-back status updates, and order management with CSV export.

---

## 3. Strict Rules & Branding Checklist

| Rule | Implementation Details |
|---|---|
| **Zero Emojis** | Verified: All visual markers use semantic `react-icons` (`FaWhatsapp`, `MdCall`, `FcGoogle`, `FiMic`, `FaStar`, `TbCube3dSphere`, `PiGraduationCapFill`, etc.). |
| **Footer Attribution** | Contains exactly: **`This website created by Kogilasundhararaj`**. |
| **Brand Palette** | `#070504` near-black background, `#ffc7a6` -> `#f0a07a` -> `#c8714d` metallic rose-copper gradient, warm off-white `#f6e9e1`. |
| **Phone & WhatsApp** | `+91 9025132379` (Direct Call link + WhatsApp chat link with dynamic prefilled message). |
| **Department Tabs** | Dedicated tabs for **CSE, IT, ECE, EEE, Mechanical, Civil, and Arts & Science** featuring sample IEEE project titles and deliverables. |
| **Voice-to-Text** | Web Speech API integration in the review form supporting **Tamil (`ta-IN`)**, **English (`en-IN`)**, and **Hindi (`hi-IN`)**. |

---

## 4. Setup & Running Locally

### Step 1: Install Dependencies

```bash
# Frontend dependencies
cd frontend
npm install

# Backend dependencies
cd ../backend
npm install
```

### Step 2: Environment Variables

1. In `frontend/.env`:
```env
VITE_API_URL="http://localhost:5000/api"
VITE_GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com"
VITE_WHATSAPP_NUMBER="919025132379"
VITE_PHONE_NUMBER="+919025132379"
```

2. In `backend/.env`:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/3sixty_db
JWT_SECRET=super_secret_jwt_key_3sixty_brand_2026_rose_copper
GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com"
ADMIN_EMAILS="gokilas333@gmail.com"
CLIENT_URL="http://localhost:5173"
```

### Step 3: Run the Application

In terminal 1 (Backend):
```bash
cd backend
npm run dev
# Server will start on http://localhost:5000
```

In terminal 2 (Frontend):
```bash
cd frontend
npm run dev
# Vite dev server will start on http://localhost:5173
```

---

## 5. Google Cloud OAuth Setup (Google One Tap)

1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create or select a project.
3. Navigate to **APIs & Services** → **OAuth consent screen** and configure user type as **External**.
4. Navigate to **Credentials** → **Create Credentials** → **OAuth client ID**.
5. Select **Web application**.
6. Under **Authorized JavaScript origins**, add:
   - `http://localhost:5173`
   - `http://localhost:5000`
   - `https://your-production-domain.com`
7. Copy the generated **Client ID** into both `frontend/.env` (`VITE_GOOGLE_CLIENT_ID`) and `backend/.env` (`GOOGLE_CLIENT_ID`).

---

## 6. Author

- **Brand**: 3 Sixtey – Project and Media Solution
- **Admin**: gokilas333@gmail.com
- **Website Creator**: Kogilasundhararaj
