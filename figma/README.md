# Personal Website

Astro/TypeScript website for Alan Clark's personal website.

## Tech Stack

- **Astro** - Static site generator
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling
- **Lucide Astro** for icons

## Project Structure

```
figma/
├── src/
│   ├── pages/          # Astro pages (file-based routing)
│   │   ├── index.astro       # Home page
│   │   └── experience.astro  # Experience page
│   ├── components/    # Astro components
│   │   ├── Home.astro        # Home content
│   │   ├── Experience.astro  # Experience timeline
│   │   ├── Header.astro      # Navigation
│   │   └── Footer.astro     # Footer
│   ├── layouts/       # Page layouts
│   │   └── BaseLayout.astro # Base HTML layout
│   ├── styles/        # Global styles
│   │   └── global.css # Tailwind + custom CSS
│   ├── assets/        # Image assets
│   ├── data/          # Data files (career, portfolio, etc.)
│   └── types/         # TypeScript type definitions
├── astro.config.mjs   # Astro configuration
├── tailwind.config.mjs # Tailwind configuration
└── package.json       # Dependencies
```

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

Starts the development server at `http://localhost:4321`

### Build

```bash
npm run build
```

Builds the production-ready static site to the `dist/` directory.

### Preview

```bash
npm run preview
```

Preview the production build locally.

## Pages

- **Home** (`/`): Landing page with introduction
- **Experience** (`/experience`): Career timeline and work history
