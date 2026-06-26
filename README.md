# SAARK Digital Platform

A modern, responsive React.js website for the **SAARK Philanthropy Foundation** — empowering communities through education, healthcare, sustainable agriculture, women empowerment, and environmental conservation.

## Features

- **Home Page** with Hero carousel, Impact Dashboard, Focus Areas, Flagship Programs, News, Stories, Partners, and CTA sections
- **Six Portals**: Donor, Volunteer, Beneficiary, Farmer, Women SHG, and Admin Dashboard
- **Responsive Design** for mobile, tablet, and desktop
- **Reusable UI Components** (Button, Card, SectionHeader, StatItem)
- **React Router** for multi-page navigation
- **Environment Variables** for configurable values

## Tech Stack

- React 19 + Vite 6
- React Router DOM 7
- CSS (custom properties, no framework dependency)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── assets/           # Static assets
├── components/
│   ├── common/       # Header, Footer, BackToTop
│   ├── home/         # Home page sections
│   └── ui/           # Reusable UI components
├── constants/        # App config, navigation, content data
├── hooks/            # Custom React hooks
├── layouts/          # MainLayout, PortalLayout
├── pages/            # Page components
├── routes/           # React Router configuration
├── services/         # API service layer
├── styles/           # Global CSS
└── utils/            # Utility functions
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```
VITE_APP_NAME=SAARK Philanthropy Foundation
VITE_CONTACT_EMAIL=info@saarkfoundation.org
VITE_API_BASE_URL=http://localhost:3000/api
```

## Portals

| Portal | Route | Features |
|--------|-------|----------|
| Donor | `/donor` | Donations, Tax Receipts, History, Impact Reports |
| Volunteer | `/volunteer` | Registration, Training, Assignments, Certificates |
| Beneficiary | `/beneficiary` | Profile, Tracking, Support, Case Management |
| Farmer | `/farmer` | Crop Advisory, Training, Market Linkages, Schemes |
| Women SHG | `/shg` | Groups, Savings, Enterprise, Capacity Building |
| Admin | `/admin` | Projects, Finance, HR, GIS, Analytics, Reports |

## License

Private — SAARK Philanthropy Foundation
