# Wish List Application

A modern, full-featured wish list management application built with React, TypeScript, and Vite. This application allows users to create, view, update, and delete wishes with features like filtering, pagination, and detailed wish pages.

## Features

- **CRUD Operations**: Create, read, update, and delete wishes
- **Wish Management**:
  - Add new wishes with image, title, description, and price
  - Update existing wishes
  - Delete wishes with confirmation modal
- **Filtering & Sorting**:
  - Filter by date (newest/oldest)
  - Filter by price (lowest/highest)
  - Priority-based sorting
- **Pagination**: Navigate through wishes with pagination controls
- **Wish Detail Page**: View detailed information about individual wishes
- **Responsive Design**: Modern UI built with Tailwind CSS
- **Notifications**: Snackbar notifications for user actions
- **Image Support**: Upload and display images for wishes

## Tech Stack

- **Frontend Framework**: React 19.2.0
- **Language**: TypeScript
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 4.1.18
- **Routing**: React Router 7.11.0
- **Backend**: JSON Server 1.0.0-beta.3
- **Linting**: ESLint with TypeScript support

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Card.tsx        # Wish card component
│   ├── Modal.tsx       # Base modal component
│   ├── AddWishModal.tsx
│   ├── UpdateWishModal.tsx
│   ├── DeleteConfirmationModal.tsx
│   ├── Filters.tsx     # Filter controls
│   ├── Pagination.tsx  # Pagination controls
│   └── Snackbar.tsx    # Notification component
├── context/            # React Context providers
│   ├── WishContext.tsx # Wish state management
│   └── SnackbarContext.tsx
├── hooks/              # Custom React hooks
│   ├── useFilters.ts
│   ├── useModal.ts
│   ├── usePagination.ts
│   └── useWishDetail.ts
├── services/           # API service layer
│   └── api.ts
├── utils/              # Utility functions
│   ├── apiClient.ts
│   ├── imageUtils.ts
│   ├── sorting.ts
│   └── wishFormUtils.ts
├── Dashboard/          # Main dashboard page
├── WishPage/           # Wish detail page
└── buttons/            # Button components
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd wish-list/wish-list/wish-list
```

2. Install dependencies:

```bash
npm install
```

### Running the Application

The application requires two separate processes to run:

1. **Start the JSON Server** (backend API):

```bash
npm run server
```

This will start the JSON Server on `http://localhost:3000`

2. **Start the Development Server** (in a new terminal):

```bash
npm run dev
```

This will start the Vite development server, typically on `http://localhost:5173`

3. Open your browser and navigate to the development server URL (usually `http://localhost:5173`)

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist/` directory.

To preview the production build:

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start the Vite development server
- `npm run server` - Start the JSON Server backend API
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint to check code quality

## API Endpoints

The application uses JSON Server which provides RESTful API endpoints:

- `GET /wishes` - Get all wishes
- `GET /wishes/:id` - Get a specific wish by ID
- `POST /wishes` - Create a new wish
- `PUT /wishes/:id` - Update a wish
- `PATCH /wishes/:id` - Partially update a wish
- `DELETE /wishes/:id` - Delete a wish

## Data Structure

A wish object has the following structure:

```typescript
interface Wish {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
  createdAt?: string;
}
```

## Features in Detail

### Dashboard

- Displays all wishes in a grid layout
- Filter and sort wishes
- Pagination for large lists
- Add, update, and delete wishes

### Wish Detail Page

- View complete information about a specific wish
- Navigate back to the dashboard

### Modals

- **Add Wish Modal**: Create new wishes with form validation
- **Update Wish Modal**: Edit existing wishes
- **Delete Confirmation Modal**: Confirm before deleting wishes

### Filters

- Date filter: Sort by newest or oldest
- Price filter: Sort by lowest or highest price
- Priority-based sorting

## Development

### Code Style

The project uses ESLint for code quality. Run `npm run lint` to check for issues.

### TypeScript

The project is fully typed with TypeScript. Type definitions are available throughout the codebase.

## License

This project is private and not licensed for public use.

## Contributing

This is a private project. Contributions are not accepted at this time.
