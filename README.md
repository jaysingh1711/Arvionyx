# Arvionyx

Arvionyx is an AI-focused marketing website with a contact workflow backed by a Node.js/Express API.

This repository contains:
- **frontend/**: Static landing page built with HTML, CSS, and vanilla JavaScript
- **backend/**: Express + MongoDB API for capturing contact leads and sending email notifications

## Repository Structure

```text
Arvionyx/
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   ├── assets/
│   └── README.md
└── backend/
    ├── server.js
    ├── routes/contact.js
    ├── models/Lead.js
    └── package.json
```

## Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript
- **Backend:** Node.js, Express, Mongoose, Nodemailer
- **Database:** MongoDB

## Prerequisites

- Node.js 18+ (recommended)
- npm
- MongoDB connection URI
- Gmail account with an App Password (for email delivery)

## Backend Setup

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Create a `.env` file inside `backend/`:
   ```env
   MONGO_URI=your_mongodb_connection_string
   EMAIL_USER=your_gmail_address
   EMAIL_PASS=your_gmail_app_password
   PORT=5000
   ```

3. Run the backend:
   ```bash
   npm run dev
   ```
   or
   ```bash
   npm start
   ```

4. Health check:
   - `GET /api/health` → `Server is awake`

## Contact API

- **Endpoint:** `POST /api/contact`
- **Payload:**
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "company": "Example Inc",
    "message": "We need support with automation."
  }
  ```
- **Behavior:**
  - Saves lead to MongoDB
  - Sends team notification email
  - Sends confirmation email to the user

## Frontend Setup

The frontend is static and can be run directly:

```bash
cd frontend
python3 -m http.server 8080
```

Open: `http://localhost:8080`

The contact form in `frontend/script.js` currently posts to:
- `https://arvionyx.onrender.com/api/contact`

For local full-stack testing, update that URL to your local backend (for example `http://localhost:5000/api/contact`).

## Scripts

Inside `backend/package.json`:
- `npm start` → Run backend with Node
- `npm run dev` → Run backend with Nodemon

## Notes

- No automated lint or test scripts are currently configured in this repository.
- Frontend-specific details are also available in `frontend/README.md`.
