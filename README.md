# **Resume & Portfolio Builder**

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?logo=tailwind-css&logoColor=white)


This full-stack web application helps users create, customize, and export professional resumes. It features a Node.js/Express.js backend and a Next.js/React frontend.

## **Core Features**

* **User Authentication**: Secure JWT-based authentication.
* **Modular Resume Editor**: A dynamic form to edit personal details, experience, education, and skills.
* **Live Preview**: A real-time preview that updates as you type.
* **Persistent Drafts**: Unsaved changes are automatically saved to local storage.
* **PDF Export**: Server-side generation of a professional PDF from your resume data.

## **Tech Stack**

**Backend**: Node.js, Express.js, TypeScript, PostgreSQL, Prisma, JWT, Zod, Puppeteer
**Frontend**: Next.js, React, TypeScript, Tailwind CSS, shadcn/ui, React Hook Form, Zod, Axios

## **Getting Started**

### **Prerequisites**

* Node.js (v18 or later)
* `pnpm` (`npm install -g pnpm`)
* Docker and Docker Compose

### **Local Development**

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/uttam-on-git/resume-builder.git
    cd resume-builder
    ```

2.  **Install dependencies** from the root directory:
    ```bash
    pnpm install
    ```

3.  **Set up environment variables**:
    * Create a `.env` file in `packages/backend`.
    * **`packages/backend/.env`**:
        ```
        DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/resumedb?schema=public"
        JWT_SECRET="your-super-secret-and-long-random-string"
        FRONTEND_URL="http://localhost:3000"
        SMTP_HOST=smtp.gmail.com
        SMTP_PORT=587
        SMTP_USER=your-email@gmail.com
        SMTP_PASS="your-gmail-app-password"
        ```

4.  **Start the database** using Docker Compose:
    ```bash
    docker-compose up -d
    ```

5.  **Apply database migrations**:
    ```bash
    pnpm --filter backend exec prisma migrate dev
    ```

6.  **Run the development servers** in two separate terminals:

    * **Backend**:
        ```bash
        pnpm dev:backend
        ```

    * **Frontend**:
        ```bash
        pnpm dev:frontend
        ```

The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:8000`.

## **API Endpoints**

All endpoints are prefixed with `/api`.

| Method | Endpoint | Description | Protected |
| :--- | :--- | :--- | :--- |
| `POST` | `/users/register` | Register a new user. | No |
| `POST` | `/users/login` | Log in a user and set JWT cookie. | No |
| `POST` | `/users/logout` | Log out a user and clear JWT cookie. | No |
| `GET` | `/users/me` | Get the current authenticated user. | Yes |
| `POST` | `/users/request-password-reset`| Request a password reset email. | No |
| `POST` | `/users/reset-password` | Reset the user's password with a token. | No |
| `GET` | `/resumes/my-resume` | Get the user's saved resume data. | Yes |
| `PUT` | `/resumes/my-resume` | Update the user's resume data. | Yes |
| `GET` | `/resumes/my-resume/download`| Generate and download a PDF of the resume. | Yes |

## **Contributing**

Contributions are welcome! Please follow these steps to contribute:

1.  **Fork the repository**.
2.  **Create a new branch**:
    ```bash
    git checkout -b feature/your-feature-name
    ```
3.  **Make your changes** and commit them with a descriptive message:
    ```bash
    git commit -m "feat: implement new feature"
    ```
4.  **Push to your branch**:
    ```bash
    git push origin feature/your-feature-name
    ```
5.  **Create a pull request**