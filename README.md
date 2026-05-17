# TalentHub (Spring Boot & React JWT Candidate Portal / ATS)

[![Java Version](https://img.shields.io/badge/Java-17-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.1.0-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue.svg)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

An enterprise-grade, secure, full-stack **Applicant Tracking System (ATS) and Candidate Portal** built with **Spring Boot 3.x** and **React 18**. The application implements robust **Role-Based Access Control (RBAC)** secured via **JSON Web Tokens (JWT)** and **Spring Security**, persisting candidate and authentication data in a **PostgreSQL** database.

---

## 🚀 Key Features

### 🔐 Authentication & Security
- **Secure Authentication**: Sign up and Login flow powered by JWT.
- **Spring Security integration**: Robust stateless session management with JWT filters.
- **Role-Based Access Control (RBAC)**: Distinct permissions for **Candidates (`ROLE_USER`)** and **Recruiters/Administrators (`ROLE_ADMIN`)**.

### 💼 Candidate Portal (Role: `USER`)
- **Job Application Wizard**: Dynamic creation of Candidate profiles including:
  - **Education History**: Multiple school, degree, and GPA records.
  - **Work Experience**: Multiple company, position, and duration entries.
  - **Training & Certifications**: Course details, institutions, and year of completion.
- **My Applications**: Interactive board to view, update, or delete submitted applications.
- **Profile Page**: Live view of authenticated user details.

### 🔍 Recruiter Dashboard (Role: `ADMIN`)
- **Advanced Search Engine**: Search applicants by **Name**, **Position Applied**, or **Education Level** in real-time.
- **Comprehensive Profiles**: View complete resumes of applicants (including work experience, education, and certificates).
- **Centralized Management**: Full administrative read access to all registered candidate data.

---

## 🛠️ Tech Stack

### Backend
- **Core Framework**: Spring Boot 3.1.0 (Java 17)
- **Security**: Spring Security & JJWT (JSON Web Token)
- **Database**: PostgreSQL (JDBC, JPA/Hibernate)
- **ORM & Persistence**: Spring Data JPA
- **Validation**: Jakarta Bean Validation

### Frontend
- **Library**: React 18.2.0 (Functional Components & Hooks)
- **Routing**: React Router DOM v6
- **Styling**: Bootstrap 4.6.2 & FontAwesome 6.6.0
- **HTTP Client**: Axios (configured with interceptors/auth-headers)
- **Validation**: React Validation & Validator

---

## 📂 Project Structure

```text
springboot-react-jwt/
├── backend/            # Spring Boot REST API
│   ├── src/            # Java backend source code
│   ├── pom.xml         # Maven project configuration
│   └── mvnw            # Maven Wrapper
└── frontend/           # React Single Page Application (SPA)
    ├── src/            # React components, services, and routing
    └── package.json    # npm scripts and packages
```

---

## ⚙️ Local Setup & Installation

### Prerequisites
- **Java JDK 17** or higher
- **Node.js** (v16+) and **npm** or **Yarn**
- **PostgreSQL** database service

---

### 1. Database Setup
Create a PostgreSQL database named `postgres` (or as configured in your local `application.properties`):
```sql
CREATE DATABASE postgres;
```

---

### 2. Backend Configuration & Launch
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Open `src/main/resources/application.properties` and verify your PostgreSQL credentials:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/postgres
   spring.datasource.username=postgres
   spring.datasource.password=your_db_password
   ```
3. Run the Spring Boot application using Maven:
   ```bash
   ./mvnw spring-boot:run
   ```
4. On startup, Hibernate will automatically create the required database tables. 
5. Initialize the default user roles by running the following SQL commands (which are also defined in `backend/src/main/resources/insert.sql`):
   ```sql
   INSERT INTO roles(name) VALUES('ROLE_USER');
   INSERT INTO roles(name) VALUES('ROLE_MODERATOR');
   INSERT INTO roles(name) VALUES('ROLE_ADMIN');
   ```

---

### 3. Frontend Configuration & Launch
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server (configured to run on port `8081`):
   ```bash
   npm start
   ```
4. Open your browser and navigate to `http://localhost:8081`.

---

## 🛡️ API Endpoints

### Authentication & Authorization
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/signup` | Register a new user | Public |
| `POST` | `/api/auth/signin` | Login & receive JWT Token | Public |

### Candidate & Application Management
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/candidates` | Fetch candidates (All for Admin, User's own for Candidate) | Candidate, Admin |
| `GET` | `/api/candidates/{id}` | Get candidate details by ID | Candidate (own), Admin |
| `POST` | `/api/candidates` | Create new candidate application profile | Candidate |
| `PUT` | `/api/candidates` | Update candidate application profile | Candidate |
| `GET` | `/api/candidates/search` | Search candidates by name, position, or education | Admin |
| `POST` | `/api/candidates/{id}/education` | Add education to candidate profile | Candidate |
| `POST` | `/api/candidates/{id}/workExperience` | Add work experience to candidate profile | Candidate |
| `POST` | `/api/candidates/{id}/training` | Add training to candidate profile | Candidate |

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/nichsedge/springboot-react-jwt/issues).

## 📄 License
This project is licensed under the MIT License.
