# Device Status Dashboard

A full-stack device monitoring dashboard built with Next.js, React, TypeScript, and Tailwind CSS.

## Features

### Backend API (Next.js)
- **POST /api/devices/register** - Register new devices with validation
- **GET /api/devices** - Retrieve all devices with optional status filtering
- **PATCH /api/devices/:uuid/status** - Update device status
- **GET /api/devices/:uuid/data** - Get mock laboratory test results

### Frontend Dashboard
- **Device List** - View all devices with real-time status indicators
- **Status Filtering** - Filter devices by online/offline status
- **Device Details Modal** - View detailed device information and test results
- **Add Device Form** - Register new devices with form validation
- **Data Visualization** - Interactive charts showing test result trends
- **Responsive Design** - Works on desktop and mobile devices

### Code Quality
-  TypeScript with proper type definitions
-  React Hook Form + Zod for form validation
-  Tailwind CSS for styling
-  Loading and error state handling
-  Clean, readable code structure
-  In-memory data storage (no database required)

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Form Management:** React Hook Form
- **Validation:** Zod
- **Charts:** Recharts
- **ID Generation:** UUID

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd device-dashboard
```

2. Install dependencies (already done):
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
device-dashboard/
├── app/
│   ├── api/
│   │   └── devices/
│   │       ├── register/route.ts    # POST register device
│   │       ├── route.ts             # GET all devices
│   │       └── [uuid]/
│   │           ├── status/route.ts  # PATCH update status
│   │           └── data/route.ts    # GET test results
│   ├── dashboard/
│   │   └── devices/
│   │       └── page.tsx             # Main dashboard page
│   └── page.tsx                     # Home page
├── components/
│   ├── AddDeviceForm.tsx            # Device registration form
│   ├── DeviceList.tsx               # Device list table
│   └── DeviceDetailsModal.tsx       # Device details modal
├── lib/
│   ├── types.ts                     # TypeScript types & Zod schemas
│   ├── store.ts                     # In-memory device storage
│   └── api.ts                       # API client functions
└── README.md
```

## API Endpoints

### 1. Register Device
```
POST /api/devices/register
Content-Type: application/json

{
  "deviceId": "DEV-001",
  "deviceName": "Blood Analyzer Pro",
  "deviceType": "Laboratory Equipment",
  "status": "online"
}

Response: 201 Created
```

### 2. Get All Devices
```
GET /api/devices
GET /api/devices?status=online
GET /api/devices?status=offline
```

### 3. Update Device Status
```
PATCH /api/devices/:uuid/status
Content-Type: application/json

{
  "status": "offline"
}
```

### 4. Get Device Test Results
```
GET /api/devices/:uuid/data
```

## Bonus Features Implemented

###  Chart Visualization
- Interactive line charts showing test result trends over time
- Uses Recharts library for data visualization

### Optimistic Updates
- Device status updates provide immediate visual feedback
- Loading states during API calls

###  Security Considerations

**Device-to-Server Communication Security:**

1. **Authentication & Authorization**
   - Implement JWT tokens or API keys for device authentication
   - Use OAuth 2.0 for user authentication
   - Role-based access control (RBAC)

2. **Transport Security**
   - Enforce HTTPS/TLS for all communications
   - Use certificate pinning for mobile/IoT devices
   - Implement mutual TLS (mTLS)

3. **Data Security**
   - Encrypt sensitive data at rest and in transit
   - Use AES-256 for data encryption
   - Implement data sanitization and validation

4. **API Security**
   - Rate limiting to prevent abuse
   - CORS configuration for allowed origins
   - Input validation and sanitization
   - XSS protection through proper output encoding

5. **Device Security**
   - Device registration with verification
   - Unique device identifiers
   - Regular security token rotation



### Deploy to Railway

1. Create account at [Railway.app](https://railway.app)
2. Create new project from GitHub repo
3. Deploy automatically

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Testing the Application

1. **Register a Device** - Use the form on the right
2. **Filter Devices** - Click "All", "Online", "Offline"
3. **View Details** - Click any device row
4. **Update Status** - Click "Set Online/Offline" buttons

## License

MIT
