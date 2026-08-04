# Nova Voice Assistant

An AI-powered Voice Assistant built using the MERN Stack and Google Gemini AI. The application enables users to interact with an intelligent virtual assistant through voice commands and text input, providing real-time AI-generated responses with speech synthesis for a natural conversational experience.

---

## Features

- Voice-based interaction using Speech Recognition
- Text-based AI conversation
- AI-powered responses using Google Gemini AI
- Speech synthesis for AI responses
- JWT-based user authentication
- Secure HTTP-only cookie authentication
- User profile image upload with Cloudinary
- Responsive and modern user interface

---

## Tech Stack

### Frontend

- React.js
- React Router DOM
- Tailwind CSS
- Axios
- React Icons
- Vite

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### AI Integration

- Google Gemini AI API

### Authentication

- JWT (JSON Web Token)
- HTTP-only Cookies

### Other Tools

- Cloudinary
- Multer
- Cookie Parser
- CORS

---

## Project Structure

```text
Nova-Voice-Assistant
│
├── Backend
│   ├── config
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── gemini.js
│   ├── server.js
│   └── package.json
│
├── Frontend
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   └── package.json
│
└── README.md
```

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/anjali22334455/nova-voice-assistant.git
```

### Install Backend Dependencies

```bash
cd Backend
npm install
```

### Install Frontend Dependencies

```bash
cd Frontend
npm install
```

---

## Environment Variables

Create a `.env` file inside the **Backend** directory and add the following variables:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_google_gemini_api_key

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

---

## Running the Project

### Start the Backend

```bash
cd Backend
npm start
```

or

```bash
npm run dev
```

### Start the Frontend

```bash
cd Frontend
npm run dev
```

The frontend will be available at:

```
http://localhost:5173
```

---

## Future Enhancements

- Dark mode support
- Wake-word detection
- Multi-language voice interaction
- Progressive Web App (PWA)
- Conversation history export
- Multiple AI voice options
- Personalized AI memory
- AI usage analytics

---

## Author

**Anjali Jaiswal**

- GitHub: https://github.com/anjali22334455
- LinkedIn: https://www.linkedin.com/in/anjali-jaiswal-438a1328b/

---

GitHub:
https://github.com/anjali22334455

LinkedIn:
(https://www.linkedin.com/in/anjali-jaiswal-438a1328b/)
---

##  Support

If you like this project, consider giving it a ⭐ on GitHub.
