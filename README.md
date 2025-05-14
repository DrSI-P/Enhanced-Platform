# EdPsych Connect Enhanced Platform (2025)

## Overview

EdPsych Connect is an AI-powered educational platform bridging psychology and education. This enhanced implementation provides a comprehensive solution for educators, psychologists, and specialists to collaborate and create personalized learning experiences.

## Features

- **AI-Powered Personalization**: Adaptive learning paths tailored to individual student needs
- **Assessment Portal**: Comprehensive tools for educational psychologists
- **Curriculum Planning**: Evidence-based planning tools aligned with UK educational standards
- **Collaborative Workspace**: Secure environment for stakeholders to collaborate

## Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom components
- **Authentication**: NextAuth.js
- **Database**: Prisma ORM
- **Deployment**: Vercel

## Project Structure

```
deploy-enhanced-platform-2025/
├── public/                  # Static assets
│   ├── images/              # Image assets
│   ├── fonts/               # Font files
│   └── icons/               # Icon assets
├── src/
│   ├── components/          # React components
│   │   ├── layout/          # Layout components
│   │   ├── ui/              # UI components
│   │   └── features/        # Feature-specific components
│   ├── pages/               # Next.js pages
│   │   ├── api/             # API routes
│   │   ├── auth/            # Authentication pages
│   │   └── dashboard/       # Dashboard pages
│   ├── styles/              # Global styles
│   ├── lib/                 # Utility functions
│   ├── hooks/               # Custom React hooks
│   ├── context/             # React context providers
│   └── types/               # TypeScript type definitions
├── package.json             # Project dependencies
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
└── tsconfig.json            # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/edpsych-connect-platform.git
   cd edpsych-connect-platform/deploy-enhanced-platform-2025
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-nextauth-secret
   
   # Add other environment variables as needed
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

This project is configured for deployment on Vercel:

1. Push your code to a GitHub repository
2. Connect the repository to Vercel
3. Configure environment variables in Vercel
4. Set the root directory to "deploy-enhanced-platform-2025"
5. Deploy

## Contact

Dr Scott Ighavongbe-Patrick CPsychol, Educational Psychologist  
+44 7376113640  
38 Buckingham View, Chesham Buckinghamshire, HP5 3HA