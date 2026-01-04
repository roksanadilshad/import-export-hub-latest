# 🌐 Import Export Hub

**Import Export Hub** is a high-performance B2B trade platform engineered to streamline global commerce. By bridging the gap between international importers and exporters, the platform provides a unified ecosystem for asset tracking, inventory management, and secure trade synchronization.

---

## 🚀 Core Functionalities

### 📦 Dynamic Asset Management
* **Full CRUD Lifecycle:** Seamlessly add, update, and archive trade assets.
* **Real-time Synchronization:** Instant updates across global nodes using MongoDB synchronization.

### 🔐 Secure Terminal Access
* **Protocol-based Auth:** Multi-factor identity verification using Firebase & JWT.
* **Role-based Dashboards:** Dedicated command centers for Importers and Exporters.

### 📊 Intelligent Inventory Control
* **Auto-scaling Stocks:** Dynamic quantity adjustment during transaction processing.
* **Validation Logic:** Prevents over-importing and stock discrepancies.

### 🎨 Advanced UX/UI
* **Industrial Aesthetic:** A high-end dark/light theme designed with Tailwind CSS and DaisyUI.
* **Fluid Responsiveness:** Optimized for every device, from mobile terminals to desktop monitors.

---

## 🛠️ Tech Stack

- **Frontend:** React.js (Vite), Tailwind CSS, DaisyUI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Firebase Auth & JWT (JSON Web Token)
- **Image Hosting:** ImgBB API
- **Hosting:** Vercel / Firebase

---

## ⚙️ Run Process & Setup

Follow these steps to initialize the project environment on your local machine.

### 1. Clone the Repository
```bash
git clone [https://github.com/roksanadilshad/import-export-hub-latest.git](https://github.com/your-username/import-export-hub.git)
cd import-export-hub

2.Install Dependencies
npm install

3.Configure Environment Variables
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_auth_domain
VITE_projectId=your_project_id
VITE_storageBucket=your_storage_bucket
VITE_messagingSenderId=your_messaging_sender_id
VITE_appId=your_app_id

VITE_IMGBB_API_KEY=your_imgbb_api_key


4. Launch Development Server
npm run dev 

🛰️ API Endpoints Summary

Method,Endpoint,Description
GET,/api/products,Fetch all active trade assets
POST,/api/add-export,Register a new export item
PATCH,/api/update-stock,Modify inventory quantities
DELETE,/api/product/:id,Remove asset from terminal

🔗 Live Deployment
Access the production terminal here:
https://import-export-hub-latest-73qy.vercel.app/

🛡️ License
Distributed under the MIT License.

Developed with ⚡ by Roksana Dilshad