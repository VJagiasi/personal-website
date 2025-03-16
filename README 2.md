# Personal Website

A modern personal website built with Next.js.

## Project Structure

The project follows a clean, feature-oriented architecture for better maintainability:

```
/personal-website
├── public/                 # Static assets
├── src/                    # Source code
│   ├── app/                # Next.js App Router
│   │   ├── (site)/         # Main site group
│   │   ├── api/            # API routes
│   │   ├── favorites/      # Favorites page
│   │   ├── writings/       # Writings/blog pages
│   │   ├── work/           # Work/portfolio pages
│   │   ├── camcorders/     # Camcorders feature
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   └── globals.css     # Global styles
│   ├── components/         # Reusable components
│   │   ├── common/         # Common components (e.g., ThemeProvider)
│   │   ├── layout/         # Layout components (e.g., Navbar)
│   │   ├── features/       # Feature-specific components
│   │   └── ui/             # UI components (buttons, cards, etc.)
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions and libraries
│   ├── context/            # React context providers
│   ├── styles/             # CSS and style-related files
│   └── types/              # TypeScript type definitions
├── dist/                   # Build output
├── .next/                  # Next.js build cache
├── .git/                   # Git repository
├── node_modules/           # Dependencies
├── jsconfig.json           # JavaScript configuration
├── next.config.mjs         # Next.js configuration
├── package.json            # Project metadata and dependencies
├── package-lock.json       # Dependency lock file
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## Path Aliases

The project uses path aliases to simplify imports:

- `@/*` - Imports from the src directory
- `@components/*` - Imports from the components directory
- `@app/*` - Imports from the app directory  
- `@hooks/*` - Imports from the hooks directory
- `@lib/*` - Imports from the lib directory
- `@styles/*` - Imports from the styles directory
- `@context/*` - Imports from the context directory
- `@types/*` - Imports from the types directory

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

The site will be available at http://localhost:3000 (or another port if 3000 is busy). 