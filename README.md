# Stop Cooking Wrong

**Stop Cooking Wrong** is a bilingual cooking platform built with modern Next.js, React, TypeScript, and PostgreSQL.

The project combines recipe content with video instructions and focuses on a clean user experience, performance, responsive design, and SEO.

🌐 **Live:** https://stopcookingwrong.com/

## Features

- Bilingual interface
- Recipe categories and individual recipe pages
- Step-by-step recipe content
- Embedded YouTube cooking videos
- Responsive layout for desktop, tablet, and mobile
- SEO-friendly page structure
- Metadata and structured content
- Semantic HTML and accessible UI
- Optimized images and fonts
- Fast page loading and performance optimization
- Reusable UI components
- Responsive navigation

## Tech Stack

### Frontend

- **Next.js 16**
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **shadcn/ui**
- **Base UI**
- **Lucide React**

### Backend & Data

- **PostgreSQL**
- **Prisma ORM**
- Next.js server-side functionality

### Deployment

- **Vercel**
- Git-based deployment workflow

## Architecture

The application is built with the Next.js App Router and uses a combination of server and client components depending on the functionality.

The project follows a component-based architecture with reusable UI elements and separates presentation, data access, and application logic.

Recipe content and application data are stored in PostgreSQL and accessed through Prisma.

## SEO & Performance

SEO and performance are important parts of the project.

The application includes:

- Page-specific metadata
- Semantic HTML structure
- Search-engine-friendly URLs
- Structured content
- Optimized images
- Responsive layouts
- Server-side rendering where appropriate
- Attention to Core Web Vitals
- Minimal client-side JavaScript where possible

## Project Structure

```text
app/
├── [routes]/
├── components/
├── ...
├── layout.tsx
└── page.tsx

components/
├── ui/
└── ...

lib/
├── ...
└── ...

prisma/
├── schema.prisma
└── ...

public/
└── images/
```

## Development

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

The application will be available at:

```text
http://localhost:3000
```

Build the application:

```bash
pnpm build
```

Run the production build:

```bash
pnpm start
```

## Environment Variables

Create a `.env.local` file and provide the required environment variables for the local environment.

For example:

```env
DATABASE_URL=...
```

Additional variables may be required depending on the enabled application features.

## Project Status

The project is actively developed.

Current work focuses on:

- SEO improvements
- Performance optimization
- UI/UX refinement
- Code refactoring
- Content expansion
- Improving the overall architecture

## Author

**Sergiy Gubriy**

Full-Stack Developer

GitHub: https://github.com/perseus-sergey
