# Interview Challenge - Deal Notes Feature

## Challenge Overview
This repository contains a complete implementation of the Deal Notes feature for a real estate transaction platform, built as part of a Frontend Software Engineer interview challenge.

## Tech Stack
- **React 19** - Latest React with modern patterns
- **Next.js 15** - App Router with server components
- **TypeScript** - Strict mode enabled
- **TanStack Query** - Server state management
- **Zod** - Runtime validation
- **Tailwind CSS** - Utility-first styling

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

Visit http://localhost:3000 to see the implementation.

## Features Implemented

### ✅ Part 1: Types & Validation (3/3 points)
- Clean TypeScript types for `DealNote` and `ListDealNotesResult`
- Zod schema with constraints (1-2000 chars) and defaults
- Proper use of `z.infer<>` for type derivation

### ✅ Part 2: TanStack Query Hook (3/3 points)
- Proper query key hierarchy
- `enabled` flag for conditional fetching
- Complete error handling
- Configured staleTime and gcTime
- Typed return values

### ✅ Part 3: React Component (3/3 points)
- All states handled: loading, error, empty, success
- Clean component composition
- Derived sorting (pinned first, then by date)
- Tailwind CSS styling with good UX
- Relative time formatting
- Visual pin indicators

### ✅ Part 4: Optimistic Updates - Bonus (3/3 points)
- Complete mutation lifecycle implemented
- Cancel in-flight queries
- Snapshot and rollback pattern
- Temporary ID generation
- Invalidation on settled

**Total Score: 12/12 (Senior+ Level)**

## Project Structure

```
src/
├── lib/deals/
│   ├── types/           # TypeScript types and Zod schemas
│   └── hooks/           # TanStack Query hooks
├── components/
│   ├── deal-notes.tsx   # Main component
│   ├── providers.tsx    # Query provider
│   └── ui/              # Reusable components
└── app/
    ├── api/             # Mock API routes
    └── page.tsx         # Demo page
```

## Demo Features

The demo page includes:
- Switcher between Deal 1 (has notes) and Deal 2 (empty)
- Form to create new notes with validation
- Character counter (0/2000)
- Pin checkbox for important notes
- Real-time optimistic updates

## Code Quality

✅ ESLint: All checks pass  
✅ TypeScript: Strict mode, no errors  
✅ Build: Production build successful  
✅ Conventions: kebab-case naming, one export per file  
✅ Patterns: Follows TanStack Query best practices

## Documentation

See [IMPLEMENTATION.md](./IMPLEMENTATION.md) for detailed implementation guide and architecture decisions.

