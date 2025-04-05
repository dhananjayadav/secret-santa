# 🎁 Secret Santa Assignment - DigitalXC

A full-stack Node.js and React application to automate Secret Santa assignments within an organization. It ensures fair and randomized pairings, avoids self-assignments and repeated pairings from the previous year, and supports both `.csv` and `.xlsx` formats.

---

## ✨ Features

- 📁 Upload employee list and previous year’s pairings (`.csv` or `.xlsx`)
- ✅ Ensures:
  - No employee is assigned to themselves
  - No repeat pairings from last year
  - Every participant is uniquely assigned
- 📤 Download final Secret Santa assignments as a CSV
- 🚫 Detects and handles invalid or incomplete data
- 💻 Simple and intuitive UI for interaction
- 🧱 Modular backend using OOP principles
- 🧪 Complete test coverage for both frontend and backend

---

## 🛠 Tech Stack

| Layer     | Technology                     |
|-----------|--------------------------------|
| Frontend  | React, CSS                     |
| Backend   | Node.js, Express               |
| File Handling | express-fileupload, `xlsx`, `csv-parser` |
| Testing   | Jest, React Testing Library, Supertest |

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js v18 or later
- npm or yarn

---

## 📦 Installation & Setup

Clone the repository:

```bash
git clone https://github.com/dhananjayadav/secret-santa
```

### 📡 Start the Server
```bash
cd server
npm install      # Install backend dependencies
npm start        # Runs server at http://localhost:9000
```

### 📡 Start the Client
```bash
cd client
npm install      # Install backend dependencies
npm start        # Runs client at http://localhost:3000
```

### 🧪 Running Backend Tests
```bash
cd server
npm test
```

### 🧪 Running Client Tests
```bash
cd client
npm test
```

### 🧑‍💻 Author
Made with ❤️ by Dhananjay Yadav