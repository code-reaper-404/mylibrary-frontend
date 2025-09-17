````markdown
# Referral Program Frontend

---

## Setup Instructions

### Prerequisites
- Node.js (v20+ recommended)
- npm package manager

### Installation

1. Clone the repository and navigate to the frontend folder:
   ```bash
   git clone https://github.com/iam-dev-deva/referral-program-frontend.git
   cd referral-program-frontend
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and go to:

   ```
   http://localhost:5173
   ```

---

## Known Issues / Limitations

* **CORS Restrictions:**
  The backend API must allow CORS from the frontend origin (`http://localhost:5173` or https://referral-program2.netlify.app) with credentials enabled for authentication to work correctly.

* **Authentication:**
  JWT tokens are stored in HttpOnly cookies; the frontend cannot directly access tokens and relies on cookies for authenticated requests.

* **Protected Routes:**
  Some routes require users to be logged in; unauthenticated users will be redirected to the signup/login pages.

* **No Offline Support:**
  The app requires network connectivity to interact with the backend.

* **Error Handling:**
  Basic error handling is implemented; further enhancements can improve user feedback.