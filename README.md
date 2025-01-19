# Financial Data Filtering App 💸 📊 💵

Developed an elegant React-based web application using Chadcn components, featuring beautiful React charts for visualizing and analyzing Apple Inc.'s financial data.

![image](https://github.com/user-attachments/assets/b1ddfb05-df31-4fca-ada1-98d46e37081f)

  <img src="https://github.com/Govindv7555/Govindv7555/blob/main/49e76e0596857673c5c80c85b84394c1.gif" width="1000px" height="100px">

  ![image](https://github.com/user-attachments/assets/94d587bf-64a8-46bd-ae3f-6ca56cec8d0f)
  <img src="https://github.com/Govindv7555/Govindv7555/blob/main/49e76e0596857673c5c80c85b84394c1.gif" width="1000px" height="100px">


![image](https://github.com/user-attachments/assets/24ec1a1e-0070-4728-8db3-f01abfcbe77f)
  <img src="https://github.com/Govindv7555/Govindv7555/blob/main/49e76e0596857673c5c80c85b84394c1.gif" width="1000px" height="100px">

![image](https://github.com/user-attachments/assets/fb038386-a85f-4c1f-abe3-26c045951265)

  <img src="https://github.com/Govindv7555/Govindv7555/blob/main/49e76e0596857673c5c80c85b84394c1.gif" width="1000px" height="100px">


![image](https://github.com/user-attachments/assets/0b0c706d-9a39-4a9c-845e-a79b155ed7d2)

  <img src="https://github.com/Govindv7555/Govindv7555/blob/main/49e76e0596857673c5c80c85b84394c1.gif" width="1000px" height="100px">

![image](https://github.com/user-attachments/assets/2f76d0d3-638f-4ea6-8f0d-6e8cc644c561)

  <img src="https://github.com/Govindv7555/Govindv7555/blob/main/49e76e0596857673c5c80c85b84394c1.gif" width="1000px" height="100px">

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
