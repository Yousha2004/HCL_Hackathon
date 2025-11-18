# 🏥 HealthSync: Wellness & Preventive Care Portal

A secure, modern web portal designed to seamlessly integrate frontend and backend technologies to help patients achieve basic health goals and maintain compliance with critical preventive checkups. Built with security (HIPAA principles) and personalization as core priorities.

## ✨ Project Highlights 

This Minimum Viable Product (MVP) focuses on delivering a coherent, limited user experience that showcases core functionalities:

  * **Dual-Role Access:** Secure, separate views for **Patients** and **Healthcare Providers**.
  * **Preventive Care Compliance:** Automated, personalized reminders for checkups.
  * **Secure & Compliant:** Focus on basic **HIPAA compliance measures**, JWT-based sessions, and user action logging.
  * **Wellness Tracking:** Patient-facing dashboard for logging and viewing progress on daily goals.

## 🚀 Key Features Implemented

| \# | Role | Feature | Description |
| :--- | :--- | :--- | :--- |
| **1.** | Public / All | **Secure Authentication System** | **JWT-based session management** with expiration and **Password Hashing**. |
| **2.** | Patient | **Patient Dashboard** | Displays wellness progress (e.g., steps taken, hours of sleep) and **Preventive Care Reminders** (e.g., "Upcoming: Annual blood test"). Includes a "simple health tip of the day." |
| **3.** | Patient | **Goal Tracker for Patients** | Allows patients to log daily goals like steps or water intake. |
| **4.** | Patient | **Profile Management** | Allows patients to view and edit their profile, including fields for basic health information (allergies, current medications). |
| **5.** | Provider | **Healthcare Provider View** | Dashboard to view assigned patients and their **compliance status** (e.g., "Goal Met" or "Missed Preventive Checkup"). Patient list is **clickable** to see goals and compliance details. |
| **6.** | Public / All | **Public Health Information Page** | Static page displaying general health information and the portal's privacy policy. |
| **7.** | All | **Privacy & Security Measures** | Logging for user actions related to data access. **Consent checkbox** for data usage during registration. |

-----

## 💻 Technical Stack

The architecture separates the frontend, backend, and data layers to ensure scalability, security, and maintainability.

| Layer | Technology | Role in Project |
| :--- | :--- | :--- |
| **Frontend** | **Next.js** | Building a responsive, accessible user interface. |
| **Styling** | **Tailwind Css** | Structured, maintainable styling. |
| **Backend / API** | **Node.js with Express.js** | Robust backend runtime for building the RESTful API. |
| **Database** | MongoDB | Scalable data storage for patient profiles, sessions, and tracking data. |
| **Authentication** | **Better-Auth.js** | Secure session management and **Role-Based Access Control (RBAC)**. |
| **Deployment** | **Vercel** | Cloud platforms for deploying frontend and backend applications. |

## 🏛️ Architecture & DevOps Considerations

### Architecture & Security

  * **Scalable Design:** Clear separation of Frontend, Backend (API), and Data layers.
  * **Secure Data Flow:** Implementation of secure communication protocols between frontend and backend.
  * **RBAC Enforcement:** Strict implementation of **Role-Based Access Control (Patient vs. Provider)** at the API level.
  * **Error Handling:** Proper error handling and logging mechanisms.
  * **Configuration:** Use of environment variables for sensitive settings.

### DevOps

  * **CI/CD Pipeline:** Implementation of a basic **GitHub Actions** workflow for automated testing and deployment.
  * **Version Management:** Git and GitHub for collaborative version control.

-----

## 🛠️ Local Development Setup

### Prerequisites

  * Node.js (LTS version)
  * MongoDB Atlas connection string.

### Installation & Run

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/Yousha2004/HCL_Hackathon
    cd HCL_Hackathon
    ```

2.  **Backend Setup (API):**

    ```bash
    cd backend
    pnpm install
    # Create .env file with PORT, MONGO_URI, and JWT_SECRET
    pnpm start
    ```

3.  **Frontend Setup (UI):**

    ```bash
    cd ../frontend
    pnpm install
    # Ensure API_BASE_URL is set in .env.local
    pnpm run dev
    ```
