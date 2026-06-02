# CampusEvent Hub

CampusEvent Hub is a web-based Event Registration Management System built using Node.js, Express.js, MongoDB, HTML, CSS, and JavaScript. The application allows administrators to create and manage events while enabling students to register for and track their event participation.

## Features

### Admin Features

* Login as Admin
* Create new events
* View all events
* View registration counts
* View event fill percentages
* View students registered for a specific event

### Student Features

* Login as Student
* View upcoming events
* Register for events
* Prevent duplicate registrations
* View personal registrations
* Automatic event capacity enforcement
* Full events displayed as unavailable

## Technology Stack

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

## Project Structure

```text
frontend/
├── index.html
├── login.html
├── admin.html
├── student.html
├── style.css
├── script.js
├── admin.js
└── student.js

backend/
├── models/
│   ├── User.js
│   ├── Event.js
│   └── Registration.js
├── routes/
│   ├── authRoutes.js
│   ├── eventRoutes.js
│   └── registrationRoutes.js
├── server.js
├── seed.js
├── package.json
├── package-lock.json
└── .env.example
```

## Local Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Shreshta-Panchami/inspirante-shreshta.git
```

### 2. Navigate to Backend Folder

```bash
cd backend
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Create Environment File

Create a file named `.env` inside the `backend` folder.

Example:

```env
MONGO_URI=<your_mongodb_connection_string>
PORT=4731
```

### 5. Seed the Database

```bash
node seed.js
```

This creates:

* 1 Admin account
* Sample student accounts
* Sample events

### 6. Start the Backend Server

```bash
npm start
```

Server runs on:

```text
http://localhost:4731
```

### 7. Launch the Frontend

Open `frontend/index.html` in your browser.

Make sure the backend server is running before using the application.

## Sample Credentials

### Admin

```text
Username: admin
Password: inspirante2026
Role: admin
```

### Student

```text
Username: asha.rao
Password: student123
Role: student
```

## Functionalities Implemented

* User Authentication
* Event Creation
* Event Listing
* Event Registration
* Duplicate Registration Prevention
* Capacity Validation
* Registration Tracking
* Registration Statistics
* Student Registration History
* Registered Student Listing

## Environment Variables

Required variables are documented in `backend/.env.example`.

## Known Issues

No known issues at the time of submission.

## Future Improvements

* JWT Authentication
* Password Hashing
* Event Editing and Deletion
* Event Search and Filtering
* Email Notifications
* Responsive Mobile Design
