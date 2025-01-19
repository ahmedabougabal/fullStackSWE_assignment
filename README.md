# Financial Data Filtering App

built this React-based web application for viewing and analyzing Apple Inc.'s financial data. The app allows users to filter and sort financial metrics such as revenue, net income, and more.

## Features

- View Apple Inc.'s annual income statements
- Filter data by date range, revenue range, and net income range
- Sort data by date, revenue, and net income
- Responsive design for both desktop and mobile
- Docker support for easy deployment and easier local installation

## Prerequisites

- Node.js 20.x or later
- npm 9.x or later
- Docker (optional)

## Setup Instructions

### Local Development

1. Clone the repository
2. Create a `.env` file in the root directory with the following content:
   ```
   VITE_FMP_API_KEY=your_api_key
   VITE_API_BASE_URL=https://financialmodelingprep.com/api/v3
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### Docker Setup

1. Make sure Docker and Docker Compose are installed
2. Build and run the container:
   ```bash
   docker compose up --build -d
   ```

The app will be available at `http://localhost:5173`

## Project Structure

```
financial-filter/
├── src/
│   ├── components/     # React components
│   ├── services/       # API services
│   ├── types/         # TypeScript interfaces
│   └── utils/         # Utility functions
├── Dockerfile         # Docker configuration
├── docker-compose.yml # Docker Compose configuration
└── .env              # Environment variables
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Technologies Used

- React + TypeScript
- Vite
- Tailwind CSS
- Docker
- Financial Modeling Prep API
