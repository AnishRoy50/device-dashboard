<div align="center">

# 🏥 Device Status Dashboard

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)

A full-stack device monitoring dashboard for laboratory equipment built with modern web technologies.

[Features](#-features) •
[Installation](#-getting-started) •
[API](#-api-reference)



</div>

---

## 🎬 Demo

> **Live Demo:** Coming Soon! Deploy your own version with one click using the buttons below.

### Key Highlights

- 🎯 **Real-time Monitoring** - Track device status instantly
- 📊 **Interactive Charts** - Visualize test result trends
- 📱 **Fully Responsive** - Works seamlessly on all devices
- ⚡ **Lightning Fast** - Built with Next.js 15 and React 19
- 🔒 **Secure** - Following industry best practices

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🔌 Backend API

- ✅ **POST** `/api/devices/register` - Register devices
- ✅ **GET** `/api/devices` - List all devices
- ✅ **PATCH** `/api/devices/:uuid/status` - Update status
- ✅ **GET** `/api/devices/:uuid/data` - Fetch test results
- 🗄️ In-memory storage (no database needed)
- ✔️ Full input validation with Zod

</td>
<td width="50%">

### 🎨 Frontend Dashboard

- 📊 Real-time device monitoring
- 🎯 Status filtering (Online/Offline)
- 📈 Interactive data visualization
- 📱 Fully responsive design
- 🔄 Optimistic UI updates
- ⚡ Fast and intuitive interface

</td>
</tr>
</table>

### 💎 Code Quality

- 🔷 **TypeScript** - Full type safety
- 📝 **React Hook Form** - Efficient form management
- 🎨 **Tailwind CSS** - Modern utility-first styling
- ✨ **Zod** - Runtime schema validation
- 🔄 **Loading States** - Smooth user experience
- 🛡️ **Error Handling** - Graceful error management

## 🛠️ Tech Stack

<table>
<tr>
<td align="center" width="96">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" width="48" height="48" alt="Next.js" />
<br>Next.js 15
</td>
<td align="center" width="96">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="48" height="48" alt="TypeScript" />
<br>TypeScript
</td>
<td align="center" width="96">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="48" height="48" alt="React" />
<br>React 19
</td>
<td align="center" width="96">
<img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" width="48" height="48" alt="Tailwind" />
<br>Tailwind CSS
</td>
<td align="center" width="96">

</td>
</tr>
</table>

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 18.0 or higher
- **npm** or **yarn** package manager

### Installation

1️⃣ **Clone the repository**
```bash
git clone https://github.com/AnishRoy50/device-dashboard.git
cd device-dashboard
```

2️⃣ **Install dependencies**
```bash
npm install
```

3️⃣ **Run the development server**
```bash
npm run dev
```

4️⃣ **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) 

## 📁 Project Structure

```
📦 device-dashboard
 ┣ 📂 app
 ┃ ┣ 📂 api
 ┃ ┃ ┗ 📂 devices
 ┃ ┃   ┣ 📂 [uuid]
 ┃ ┃   ┃ ┣ 📂 data
 ┃ ┃   ┃ ┃ ┗ 📜 route.ts           # GET test results
 ┃ ┃   ┃ ┗ 📂 status
 ┃ ┃   ┃   ┗ 📜 route.ts           # PATCH update status
 ┃ ┃   ┣ 📂 register
 ┃ ┃   ┃ ┗ 📜 route.ts             # POST register device
 ┃ ┃   ┗ 📜 route.ts               # GET all devices
 ┃ ┣ 📂 dashboard
 ┃ ┃ ┗ 📂 devices
 ┃ ┃   ┗ 📜 page.tsx               # Main dashboard
 ┃ ┣ 📜 globals.css
 ┃ ┣ 📜 layout.tsx
 ┃ ┗ 📜 page.tsx                   # Landing page
 ┣ 📂 components
 ┃ ┣ 📜 AddDeviceForm.tsx          # Device registration
 ┃ ┣ 📜 DeviceDetailsModal.tsx     # Device details modal
 ┃ ┗ 📜 DeviceList.tsx              # Device list table
 ┣ 📂 lib
 ┃ ┣ 📜 api.ts                     # API client
 ┃ ┣ 📜 store.ts                   # In-memory storage
 ┃ ┗ 📜 types.ts                   # TypeScript types
 ┗ 📜 README.md
```

## 📡 API Reference

### Register Device

```http
POST /api/devices/register
```

**Request Body:**
```json
{
  "deviceId": "DEV-001",
  "deviceName": "Blood Analyzer Pro",
  "deviceType": "Laboratory Equipment",
  "status": "online"
}
```

**Response:** `201 Created`

---

### Get All Devices

```http
GET /api/devices
GET /api/devices?status=online
GET /api/devices?status=offline
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | `string` | **Optional**. Filter by `online` or `offline` |

**Response:** `200 OK`

---

### Update Device Status

```http
PATCH /api/devices/:uuid/status
```

**Request Body:**
```json
{
  "status": "offline"
}
```

**Response:** `200 OK`

---

### Get Device Test Results

```http
GET /api/devices/:uuid/data
```

**Response:** `200 OK` - Returns 5-10 mock test results

##  Additional Features


### 📊 Data Visualization
- Beautiful interactive line charts with **Recharts**
- Real-time trend analysis
- Hover tooltips for detailed data points

### ⚡ Optimistic Updates
- Instant UI feedback on actions
- Smooth loading states
- Automatic rollback on errors

### 🔒 Security Best Practices
<details>
<summary>Click to expand security overview</summary>

- 🔐 **Authentication & Authorization** - JWT, OAuth 2.0, RBAC
- 🔒 **Transport Security** - HTTPS/TLS, mTLS, Certificate pinning
- 💾 **Data Security** - AES-256 encryption, data sanitization
- 🛡️ **API Security** - Rate limiting, CORS, input validation
- 🔑 **Device Security** - Registration verification, token rotation

</details>



## 💻 Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build optimized production bundle |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint for code quality |

## 🧪 Testing the Application

### Quick Test Guide

1. **Register a Device** 📝
   - Fill out the form on the right sidebar
   - Click "Register Device"
   - Watch it appear instantly in the list

2. **Filter Devices** 🔍
   - Use the filter buttons: All, Online, Offline
   - Observe real-time statistics update

3. **View Device Details** 👁️
   - Click any device row
   - Explore test results and charts
   - Refresh data with the refresh button

4. **Update Status** 🔄
   - Click "Set Online/Offline" buttons
   - See optimistic UI updates






## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Anish Roy**

- GitHub: [@AnishRoy50](https://github.com/AnishRoy50)


<div align="center">

Made with ❤️ using Next.js and TypeScript

[⬆ Back to Top](#-device-status-dashboard)

</div>
