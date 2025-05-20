# Grammate - Grammar Checking Application

A MERN stack application that uses the Gemini API to check and correct English grammar. Built with Vite React for the frontend and Express.js for the backend.

## Features

- Real-time grammar checking
- Grammar score calculation
- Detailed explanations of corrections
- Modern and responsive UI

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (running locally or connection string)

## Setup

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/grammate
GEMINI_API_KEY=your_gemini_api_key
```

4. Start the backend server:
```bash
node server.js
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```
## Usage2
1. Open your browser and navigate to `http://localhost:5173`
2. Enter your text in the input field
3. Click "Check Grammar" to analyze your text
4. View the results including:
   - Original text
   - Corrected text
   - Grammar score
   - Explanation of corrections
## Technologies Used
- Frontend:
  - React
  - Vite
  - Material-UI
  - Axios

- Backend:
  - Express.js
  - MongoDB
  - Google Gemini API
  - CORS
  - dotenv 
