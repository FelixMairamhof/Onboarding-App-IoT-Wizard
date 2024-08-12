# Onboarding App IoT Wizard

![image](https://github.com/user-attachments/assets/d0a26bcb-df38-476c-9dad-e5f2ef79ae74)

<img src="https://github.com/user-attachments/assets/d5f2676a-8a1b-41d6-90ea-91e306b9f946" align="right" width="40%" z="10" >

### Overview

The **Onboarding App IoT Wizard** is a streamlined Progressive Web Application (PWA) designed for rapid IoT device onboarding. It enables users to quickly set up IoT devices, from scanning serial numbers to configuring them in IoT platforms like ChirpStack and ThinkBoard. The app provides step-by-step guidance, complete with instructional YouTube videos, to ensure smooth device integration. The backend is powered by a robust Postgres database, and the app features an extensive admin panel for comprehensive device, data, and user management.

As a PWA, the app is optimized for both desktop and mobile use, allowing admins to manage the system from their desktops while field users can onboard devices directly from their smartphones.

### Key Features

- **Rapid IoT Device Onboarding**: Quickly onboard devices by scanning or typing the serial number. Devices are automatically created in ChirpStack with DevEUI, AppKey, and AppEUI.
- **Step-by-Step Guide**: Users are provided with a step-by-step guide and YouTube videos to assist in the setup process.
- **Device Naming & Building Assignment**: Easily assign names to devices and associate them with specific buildings, with automatic creation in ThinkBoard.
- **Comprehensive Admin Panel**: Manage everything from user roles to sensor data and profiles with full CRUD capabilities.
- **Postgres Database**: Backend is supported by a robust Postgres database, ensuring reliable data storage and retrieval.
- **Progressive Web App (PWA)**: Accessible on both desktop and mobile, allowing seamless use across different devices.

### Technology Stack

- **Frontend**: React (built with Vite), Tailwind CSS for styling
- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL
- **Package Manager**: Bun
- **State Management**: Zustand
- **API Handling**: Axios for making API requests

### Installation

#### Prerequisites

- Node.js (version 14.x or higher)
- Bun (preferred package manager)
- PostgreSQL

#### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/FelixMairamhof/Onboarding-App-IoT-Wizard.git
   cd Onboarding-App-IoT-Wizard
   ```

2. **Install dependencies**:

   Navigate to both the `backend` and `frontend` directories and install the necessary dependencies using Bun.

   ```bash
   cd backend
   bun install

   cd ../frontend
   bun install
   ```

3. **Database Setup**:

   Ensure PostgreSQL is installed and running. Set up your database by running the provided SQL scripts or migration files.

4. **Start the application**:

   In two separate terminal windows, start both the frontend and backend servers.

   ```bash
   # In the backend directory
   bun start

   # In the frontend directory
   bun run dev
   ```

   The application should now be running locally. You can access the frontend by navigating to `http://localhost:3000`.

### Usage

1. **Onboarding Devices**:
   - **Scan or Enter Serial Number**: Begin by scanning or typing the device's serial number.
   - **Automatic Configuration**: The device is configured in ChirpStack with its DevEUI, AppKey, and AppEUI.
   - **Step-by-Step Guide**: Follow the guide and video instructions to complete the setup.
   - **Name the Device**: Assign a name to the device and associate it with a building, with automatic creation in ThinkBoard.

2. **Admin Panel**:
   - Access the admin panel to manage users, sensor data, and sensor profiles.
   - Perform CRUD operations on admins, sensor data, and sensor profiles directly from the admin interface.

### Contributing

Contributions are welcome! To contribute, please fork the repository, create a new branch for your feature or bugfix, and submit a pull request.

### License

This project is open-source and available under the [MIT License](LICENSE).

---

For any issues or suggestions, please open an issue in the repository. Your contributions are appreciated!
