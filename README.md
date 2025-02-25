# VisaApp

## Project Overview
This project is a web application that collects user information (First Name and Last Name) using a frontend built with Next.js and stores it in a PostgreSQL database via a FastAPI backend.

The US Web Design System (USWDS) https://designsystem.digital.gov/components/overview/ is used to build the user interface in a consistent and accessible way. The open-source TrussWorks React Library is used https://trussworks.github.io/react-uswds/?path=/docs/welcome--docs to implement parts of this design system.

## Backend Setup

### Prerequisites
- Python 3.11 or higher
- PostgreSQL

### Installation Steps
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment:
   ```bash
   python3.11 -m venv venv
   ```
3. Activate the virtual environment:
   ```bash
   source venv/bin/activate
   ```
4. Install the required packages:
   ```bash
   pip install -r requirements.txt
   ```
5. Ensure PostgreSQL is running and create the database and table as needed.
For example, 
```
% brew install postgresql
% service postgresql start
% createdb visaapp
% psql -d visaapp

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL
);
```

### Running the Backend
1. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```
2. Open your browser and navigate to `http://localhost:8000` to access the application.
Also can check at http://localhost:8000/docs

## Frontend Setup

### Prerequisites
- Node.js and npm

### Installation Steps
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the required packages:
   ```bash
   npm install
   ```

### Running the Frontend
1. Start the Next.js development server:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to `http://localhost:3000` to access the application.
