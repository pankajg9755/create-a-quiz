# Create a Quiz

### **Clone the Repository**

To get started, clone the repository:

```bash
git clone https://github.com/pankajg9755/create-a-quiz.git
cd create-a-quiz
```

### **Pull the Latest Changes**

Ensure your local repository is up-to-date:

```bash
git pull --all
```

### **Install Dependencies**

Install all necessary dependencies using:

```bash
npm install
```

### **Run Migrations**

Set up the database by running migrations:

```bash
npm run migrate
```

### **Start the Application**

Run the application:

```bash
npm start
```

---

# base url

http://localhost:5001/api

# swagger url

http://localhost:5001/api-docs/

## **API Endpoints**

### **1. Create Quiz**

- **Endpoint:** `POST http://localhost:5001/api/quiz/create`
- **Description:** Create a new quiz with a title and a set of questions.
- **Request Body:**
  ```json
  {
    "title": "Sample Quiz",
    "questions": [
      {
        "question": "What is 2 + 2 = ?",
        "options": ["1", "2", "3", "4"],
        "correct_option": 4
      },
      {
        "question": "What is the capital of India?",
        "options": ["Delhi", "Mumbai", "Bangalore", "Indore"],
        "correct_option": 1
      }
    ]
  }
  ```
- **Response:**
  ```json
  {
    "status": 201,
    "message": "Quiz created successfully",
    "quiz_id": "12345"
  }
  ```

---

### **2. Get Quiz**

- **Endpoint:** `GET http://localhost:5001/api/quiz/list?limit=10&offset=0`
- **Description:** Retrieve a quiz list without revealing the correct answers.
- **Response:**

  ```json
    "status": 201,
    "msg": "Successful",
    "data": [
        {
            "id": 5,
            "title": "General Knowledge Quiz",
            "questions": [
                {
                    "id": 7,
                    "options": [
                        "1",
                        "2",
                        "3",
                        "4"
                    ],
                    "question": "What is 2 + 2 = ?"
                },
                {
                    "id": 8,
                    "options": [
                        "Dehli",
                        "Mumbai",
                        "Banglore",
                        "Indore"
                    ],
                    "question": "What is the capital of India?"
                }
        }

        ]

  ```

---

### **2. Get Quiz**

- **Endpoint:** `GET http://localhost:5001/api/quiz/detail?id=5`
- **Description:** Retrieve a quiz by its ID without revealing the correct answers.
- **Response:**
  ```json
  {
    "id": "1",
    "title": "Sample Quiz",
    "questions": [
      {
        "id": "q1",
        "question": "What is 2 + 2 = ?",
        "options": ["1", "2", "3", "4"]
      },
      {
        "id": "q2",
        "question": "What is the capital of India?",
        "options": ["Delhi", "Mumbai", "Bangalore", "Indore"]
      }
    ]
  }
  ```

---

### **3. Submit Answer**

- **Endpoint:** `POST http://localhost:5001/api/quiz/answers`
- **Description:** Submit an answer for a specific question in a quiz.
- **Request Body:**
  ```json
  {
    "quizId": 5,
    "questionId": 15,
    "selectedOption": "3"
  }
  ```
- **Response (Correct Answer):**
  ```json
  {
    "is_correct": true,
    "message": "Correct answer!"
  }
  ```
- **Response (Incorrect Answer):**
  ```json
  {
    "is_correct": false,
    "message": "Incorrect answer. The correct answer is: 4."
  }
  ```

---

### **4. Get Results**

- **Endpoint:** `GET http://localhost:5001/api/quiz/result?quizId=5`
- **Description:** Retrieve the user's results for a specific quiz.
- **Response:**
  ```json
  {
    "quiz_id": "12345",
    "user_id": "u123",
    "score": 2,
    "answers": [
      {
        "question_id": "q1",
        "selected_option": 1,
        "is_correct": true
      },
      {
        "question_id": "q2",
        "selected_option": 2,
        "is_correct": false,
        "correct_answer": "4"
      }
    ]
  }
  ```

---

### **1. Create user**

- **Endpoint:** `POST http://localhost:5001/api/user/signUp`
- **Description:** Create a new user.
- **Request Body:**
  ```json
  {
    "firstName": "pankaj",
    "lastName": "Gupta",
    "email": "pankaj@gmail.com",
    "password": "pankaj@123"
  }
  ```
- **Response:**
  ```json
  {
    "status": 201,
    "message": "created successfully"
  }
  ```

---

### **1. Create user**

- **Endpoint:** `POST http://localhost:5001/api/user/signUp`
- **Description:** User Login.
- **Request Body:**
  ```json
  {
    "email": "pankaj@gmail.com",
    "password": "pankaj@123"
  }
  ```
- **Response:**
  ```json
  {
    "status": 200,
    "msg": "Login Successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJwYW5rYWpAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoicGFua2FqIiwibGFzdE5hbWUiOiJHdXB0YSIsImV4cCI6MTc0MDkyMzY5NiwiaWF0IjoxNzM1NzM5Njk2fQ.P3MoAPcdq2C3ijjyGEDiAYn1-8sIWHx1NsSs6DbSFh8",
    "userData": {
      "id": 1,
      "email": "pankaj@gmail.com",
      "firstName": "pankaj",
      "lastName": "Gupta"
    }
  }
  ```

---

# Data Base

# Create a Quiz

## Overview

Create a Quiz is a RESTful API-based quiz application that allows users to:

- Create quizzes with multiple-choice questions.
- Submit answers and get immediate feedback.
- Retrieve quiz results and performance summaries.

## Features

1. Create Quiz with questions and options.
2. Submit answers and receive feedback.
3. Retrieve user results for specific quizzes.

## Installation and Setup

### Prerequisites

- Node.js
- npm

## Database Schema

### Tables

#### `users`

| Column    | Type      | Description          |
| --------- | --------- | -------------------- |
| id        | Integer   | User ID              |
| email     | String    | User email           |
| firstName | String    | First name           |
| lastName  | String    | Last name            |
| password  | String    | User password        |
| createdAt | Timestamp | Record creation time |
| updatedAt | Timestamp | Record update time   |
| deletedAt | Timestamp | Record deletion time |

#### `quiz`

| Column    | Type      | Description          |
| --------- | --------- | -------------------- |
| id        | Integer   | Quiz ID              |
| title     | String    | Quiz title           |
| createdAt | Timestamp | Record creation time |
| updatedAt | Timestamp | Record update time   |
| deletedAt | Timestamp | Record deletion time |

#### `questions`

| Column         | Type      | Description          |
| -------------- | --------- | -------------------- |
| id             | Integer   | Question ID          |
| quiz_id        | Integer   | Associated quiz ID   |
| question       | String    | Question text        |
| options        | JSON      | Answer options       |
| correct_option | Integer   | Correct answer index |
| createdAt      | Timestamp | Record creation time |
| updatedAt      | Timestamp | Record update time   |
| deletedAt      | Timestamp | Record deletion time |

#### `answers`

| Column          | Type      | Description            |
| --------------- | --------- | ---------------------- |
| id              | Integer   | Answer ID              |
| quiz_id         | Integer   | Associated quiz ID     |
| question_id     | Integer   | Associated question ID |
| user_id         | Integer   | User ID                |
| selected_option | Integer   | Selected option index  |
| is_correct      | Boolean   | Correctness flag       |
| createdAt       | Timestamp | Record creation time   |
| updatedAt       | Timestamp | Record update time     |

#### `result`

| Column    | Type      | Description          |
| --------- | --------- | -------------------- |
| id        | Integer   | Result ID            |
| quiz_id   | Integer   | Associated quiz ID   |
| user_id   | Integer   | User ID              |
| score     | Integer   | User score           |
| answers   | JSON      | User answers summary |
| createdAt | Timestamp | Record creation time |
| updatedAt | Timestamp | Record update time   |
| deletedAt | Timestamp | Record deletion time |

#### `knex_migrations`

| Column         | Type      | Description         |
| -------------- | --------- | ------------------- |
| id             | Integer   | Migration ID        |
| batch          | Integer   | Migration batch     |
| migration_time | Timestamp | Migration timestamp |

#### `knex_migrations_lock`

| Column    | Type    | Description |
| --------- | ------- | ----------- |
| is_locked | Boolean | Lock status |
