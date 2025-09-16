# Resume & Portfolio Builder

This is a full-stack web application designed to help users create, customize, and export professional resumes. It features a decoupled architecture with a Node.js/Express.js REST API backend and a Next.js/React frontend.

## Core Features

-   **User Authentication**: Secure JWT-based authentication for user sign-up and login.
-   **Modular Resume Editor**: A dynamic form interface to edit personal details, experience, education, and skills.
-   **Live Preview**: A real-time preview pane that updates as the user fills out the form.
-   **Persistent Drafts**: Unsaved form changes are automatically saved to the browser's local storage and restored on page refresh.
-   **PDF Export**: Server-side generation of a professionally formatted PDF from the live form data.

## Tech Stack

### Backend
-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **Language**: TypeScript
-   **Database**: PostgreSQL
-   **ORM**: Prisma
-   **Authentication**: JSON Web Tokens (JWT) via httpOnly cookies
-   **Validation**: Zod
-   **PDF Generation**: Puppeteer

### Frontend
-   **Framework**: Next.js (App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **UI Components**: shadcn/ui
-   **Forms**: React Hook Form with Zod for validation
-   **API Client**: Axios

## Project Structure

This project is a monorepo managed with `pnpm` workspaces.

-   `packages/backend`: Contains the Node.js REST API.
-   `packages/frontend`: Contains the Next.js client application.

## Getting Started

### Prerequisites
-   Node.js (v18 or later)
-   `pnpm` ( `npm install -g pnpm` )
-   Docker and Docker Compose

### Local Development Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/uttam-on-git/resume-builder.git
    cd resume-builder
    ```

2.  **Install dependencies** from the root directory:
    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**
    -   Create a `.env` file in `packages/backend`.
    -   **`packages/backend/.env`**:
        ```
        DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/resumedb?schema=public"
        JWT_SECRET="your-super-secret-and-long-random-string"
        ```
    -   The frontend does not require any environment variables for local development as the API URL is hardcoded in the Axios instance.

4.  **Start the database** using Docker Compose from the root directory:
    ```bash
    docker-compose up -d
    ```

5.  **Apply database migrations:**
    ```bash
    pnpm --filter backend prisma migrate dev
    ```

6.  **Run the development servers:** Open two separate terminals from the root directory.
    -   **Terminal 1 (Backend):**
        ```bash
    pnpm dev:backend
        ```
    -   **Terminal 2 (Frontend):**
        ```bash
    pnpm dev:frontend
        ```

The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:8000`.

## API Endpoints

All endpoints are prefixed with `/api`. Protected routes require a valid JWT cookie.

| Method | Endpoint                      | Description                           | Protected |
| :----- | :---------------------------- | :------------------------------------ | :-------- |
| `POST` | `/users/register`             | Register a new user.                  | No        |
| `POST` | `/users/login`                | Log in a user and set JWT cookie.     | No        |
| `GET`  | `/users/me`                   | Get the current authenticated user.   | Yes       |
| `GET`  | `/resumes/my-resume`          | Get the user's saved resume data.     | Yes       |
| `PUT`  | `/resumes/my-resume`          | Update the user's resume data.        | Yes       |
| `POST` | `/resumes/preview/download`   | Generate a PDF from live form data.   | Yes       |

## Future Work

-   Implementation of a full Portfolio builder section.
-   Guest mode for using the editor without an account.
-   Password recovery functionality.