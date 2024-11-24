# Todo Application

This is a full-stack Todo Application that consists of a **.NET backend** (using SQL Server) and a **React frontend**.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Backend Setup (.NET)](#backend-setup-net)
3. [Frontend Setup (React)](#frontend-setup-react)
4. [Running the Application](#running-the-application)

---

## Prerequisites

Before running this project, ensure that you have the following software installed on your machine:

- **Visual Studio 2022** (with .NET 6 or higher installed)
- **SQL Server** (Local SQL Server that comes with Visual Studio 2022 is sufficient)
- **Node.js** (Latest stable version, includes npm)
- **Git** (for cloning the repository)

---

## Backend Setup (.NET)

1. **Clone the Repository**:

   Clone this repository to your local machine:

   ```bash
   git clone https://github.com/Shreyash-Shedge/Todo-Application.git
   ```

2. **Open the Backend Project in Visual Studio**:

   - Navigate to the backend project directory.
   - Open the `.sln` file with Visual Studio 2022.

3. **Configure the SQL Server Connection**:

   The application is configured to use the **local SQL Server** (default instance from Visual Studio). If needed, update the connection string in `appsettings.json` to match your local setup:

   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=(localdb)\\MSSQLLocalDB;Database=TodoAppDb;Trusted_Connection=True;MultipleActiveResultSets=true"
     }
   }
   ```

4. **Run Migrations**:

   Ensure the database is set up properly by running the Entity Framework migrations:

   - Open the **Package Manager Console** in Visual Studio ( Make sure the project selected is TodoApplicationAPI.Data).
   - Run the following command:

     ```bash
     Add-Migration InitialMigration ( Optional )
     
     Update-Database
     ```

   This will create the necessary tables in the SQL Server database.

5. **Run the Backend**:

   Once the database is configured, run the backend by pressing `F5` or selecting the **Run** option in Visual Studio. The backend will start on `http://localhost:5000` (or a similar port).

---

## Frontend Setup (React)

1. **Navigate to the Frontend Directory**:

   Open your terminal and navigate to the frontend project folder:

   ```bash
   cd "C:Client/my-todo-app"
   ```

2. **Install Dependencies**:

   Before starting the React frontend, you need to install the necessary packages. Run the following command:

   ```bash
   npm install
   ```

   This will install all dependencies listed in the `package.json` file.

3. **Configure the Backend API URL** (Optional):

   If your backend is running on a different port or server, update the API URL in the frontend. You can do this in the `.env` file or directly in the code `src/api/api.js`.

   ```bash
   REACT_APP_API_URL=http://localhost:5081/api
   ```

4. **Run the Frontend**:

   Start the React development server by running:

   ```bash
   npm run dev
   ```

   The frontend will start on `http://localhost:5173`. It should automatically open in your browser, but if it doesn't, you can manually visit `http://localhost:5173` in your web browser.

---

## Running the Application

Once both the backend and frontend are running:

- The **backend** will be running on `http://localhost:5081`.
- The **frontend** will be running on `http://localhost:5173`.

You can interact with the Todo Application through the frontend, and it will make API requests to the backend to perform operations like creating, updating, and deleting tasks.

---

## Notes

- Ensure that both the backend and frontend are running simultaneously.
- If you're using a different SQL Server setup, ensure that the connection string is properly updated in `appsettings.json`.

---
