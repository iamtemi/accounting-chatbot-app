# Chat Application

A simple React-based chat application that allows users to start new chat sessions, send messages, and view chat histories.

## Features

- Start new chat sessions
- Send and receive messages
- View chat histories

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/) (version 14 or higher)
- [npm](https://www.npmjs.com/)

### Steps

1. **Clone the repository:**

   ```sh
   git clone https://github.com/iamtemi/accounting-chatbot-app
   cd accounting-chatbot-app
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root of the project and add:

   ```env
   VITE_BACKEND_URL=http://your-backend-url.com
   ```

4. **Run the application:**

   ```sh
   npm run dev
   ```

## Backend Setup

This chat application requires a backend to function. You can find the backend repository [here](https://github.com/iamtemi/accounting-chatbot-api).

Follow the instructions in the backend repository to set up and run the backend server.

## Usage

1. **Start the Application:**

   ```sh
   npm run dev
   ```

2. **Open your browser and navigate to:**

   ```text
   e.g http://localhost:5173
   ```

3. **Using the Chat Application:**

   - **Start a New Chat:** Click "Start New Chat".
   - **Send a Message:** Type your message and click "Send".
   - **View Chat History:** Select a chat session from the sidebar.
