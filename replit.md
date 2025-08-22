# StudyCove - Premium Study Space Platform

## Overview

StudyCove is a comprehensive web application for managing premium study spaces across multiple cities in India. The platform enables students to book guaranteed quiet seats, access study amenities, and participate in educational events. Built as a modern full-stack application with React frontend and Express backend, it supports both member and administrative functionality with PWA capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React + Vite**: Modern frontend framework with fast hot-reload development
- **Bootstrap 5**: Primary CSS framework for responsive design and components
- **Framer Motion**: Animation library for smooth UI transitions and interactions
- **React Router**: Client-side routing for multi-page application structure
- **TypeScript**: Type-safe JavaScript for better development experience
- **PWA Ready**: Service worker configuration for offline functionality

### State Management
- **React Context**: Authentication state management through custom useAuth hook
- **TanStack React Query**: Server state management for API data fetching and caching
- **Local Storage**: Persistent user session and preferences storage

### Styling System
- **CSS Custom Properties**: Centralized theme management with dark color scheme
- **Inter + Manrope**: Typography system with UI and display font families
- **Component-based**: Reusable UI components following atomic design principles

### Backend Architecture
- **Express.js**: RESTful API server with TypeScript support
- **Modular Route System**: Organized API endpoints with /api prefix convention
- **Storage Interface**: Abstract storage layer supporting both memory and database implementations
- **Middleware Pipeline**: Request logging, error handling, and CORS support

### Database Design
- **Drizzle ORM**: Type-safe database operations with PostgreSQL
- **Schema Management**: Centralized database schema definitions in shared directory
- **Migration System**: Database version control through Drizzle migrations

### Data Architecture
- **Mock Data Strategy**: JSON-based dummy data for frontend development
- **Shared Types**: Common TypeScript interfaces between frontend and backend
- **RESTful Structure**: Standard HTTP methods and status codes for API consistency

### Authentication System
- **Context-based Auth**: React Context for authentication state management
- **Role-based Access**: Support for member and admin user roles
- **Session Persistence**: Local storage-based session management

### Development Workflow
- **Monorepo Structure**: Frontend, backend, and shared code in single repository
- **Hot Reload**: Vite development server with instant updates
- **Type Checking**: Shared TypeScript configuration across all modules
- **Build Pipeline**: Separate build processes for client and server deployment

## External Dependencies

### Core Framework Dependencies
- **@vitejs/plugin-react**: React support for Vite bundler
- **express**: Node.js web application framework
- **drizzle-orm**: TypeScript ORM for database operations
- **@tanstack/react-query**: Data fetching and state management

### UI and Styling
- **bootstrap**: CSS framework for responsive design
- **framer-motion**: Animation library for React components
- **@radix-ui/***: Headless UI components for accessibility
- **class-variance-authority**: Utility for component variant management

### Database and Storage
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **drizzle-kit**: CLI tools for database migrations
- **connect-pg-simple**: PostgreSQL session store for Express

### Development Tools
- **typescript**: Static type checking
- **tsx**: TypeScript execution environment
- **esbuild**: Fast JavaScript bundler for production builds
- **@replit/vite-plugin-***: Replit-specific development enhancements

### Authentication and Validation
- **@hookform/resolvers**: Form validation resolvers
- **drizzle-zod**: Zod integration for schema validation
- **zod**: Runtime type validation library

### Utilities
- **date-fns**: Date manipulation and formatting
- **nanoid**: Unique ID generation
- **clsx**: Conditional className utility
- **cmdk**: Command palette component