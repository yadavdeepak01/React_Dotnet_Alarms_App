# React + Vite Frontend Setup Guide

1. Tools Installation
- Install Node.js (v18 or later).
- Install VS Code (optional but recommended).

2. Create React + Vite Project
- Run: npm create vite@latest Alarms -- --template react
- Go into folder: cd Alarms
- Install dependencies: npm install
- Start dev server: npm run dev

3. Project Structure Setup
- Create pages folder with Login.jsx, Dashboard.jsx.
- Create CSS files: Login.css, dashboard.css.
- Use public/ folder for background images.

4. Implement React Router
- Install router: npm install react-router-dom
- Configure BrowserRouter in main.jsx
- Add routes in App.jsx (Login, Dashboard).

5. Build Login Page
- Create Login.jsx with inputs, state, handler.
- Redirect to Dashboard upon successful login.
- Show error message for invalid credentials.
- Use Login.css for styling + background image.

6. Protected Routes
- Create ProtectedRoute.jsx to prevent unauthorized access.
- Check localStorage for auth flag.
- Redirect unauthenticated users to Login page.

7. Build Dashboard Page
- Add heading: Alarm Statistics.
- Add buttons: Raw Alarms, Configured Alarms.
- Load table data dynamically based on button clicked.
- Use dashboard.css styling.
- Add Logout button top-right.



## Backend Implementation Guide for React + .NET + MySQL

1. Initial Setup

    1.1 Install .NET SDK (Required for Backend)
        Download and install .NET SDK from Microsoft website. After installation, verify it using:
        •	dotnet --version

2. Creating the Backend Project

    2.1 Create ASP.NET Web API Project
        Run these commands:
        • dotnet new webapi -n AuthBackend
        • cd AuthBackend

    2.2 Install Required Packages
        •	dotnet add package Pomelo.EntityFrameworkCore.MySql
        •	dotnet add package Microsoft.EntityFrameworkCore.Design

3. Configuring MySQL Database

    3.1 Create Database

    Open MySQL Workbench → Add New Connection → Run:
    •	CREATE DATABASE user_auth;

    3.2 Create Required Tables

    Create LoginUsers table:
    •	CREATE TABLE LoginUsers (Id INT AUTO_INCREMENT PRIMARY KEY, Username VARCHAR(100), PasswordHash VARCHAR(255), CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

    Create RawAlarms table:
    •	CREATE TABLE RawAlarms (Id INT AUTO_INCREMENT PRIMARY KEY, AlarmName VARCHAR(255), Severity VARCHAR(50), Timestamp DATETIME, Source VARCHAR(255), Message TEXT);

    Create ConfiguredAlarms table:
    •	CREATE TABLE ConfiguredAlarms (Id INT AUTO_INCREMENT PRIMARY KEY, TagName VARCHAR(255), Description VARCHAR(255), LimitValue FLOAT, Unit VARCHAR(50), Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP);

4. Backend Project Structure Explanation

    4.1 Models Folder
        Contains C# classes representing your database tables (LoginUser, RawAlarm, ConfiguredAlarm).

    4.2 Data Folder → AppDbContext.cs
        This class establishes connection with MySQL and defines DbSets for tables.

    4.3 Controllers Folder
        - AuthController.cs → Handles login
        - AlarmController.cs → Serves alarm data

    4.4 DTOs Folder
        Contains LoginRequest.cs used to receive login JSON data from React.

5. Adding Connection String

    In appsettings.json add:
    {
        "ConnectionStrings": {
        "DefaultConnection": "server=127.0.0.1;database=user_auth;user=root;password=YOURPASSWORD;"
        }
    }

6. Program.cs Configuration
    Register DbContext, CORS, and controllers.

7. Creating Login API
    AuthController.cs handles POST /api/auth/login and validates user.

8. Creating Alarms API
    AlarmController.cs returns raw and configured alarms via GET endpoints.

9. Running the Backend Server
    Use:
    •	dotnet run
    Backend must be running at all times when using React frontend.

10. Integrating React with Backend
    React uses fetch() to call your backend endpoints for login and alarm dashboard.

