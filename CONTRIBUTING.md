# Contributing to Silmaril Green Dragon

Thank you for your interest in contributing to Green Dragon! This guide will help you get your development environment set up and walk you through the contribution process.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js 20 LTS** - Download from [nodejs.org](https://nodejs.org/)
- **pnpm 9.x** - Install with `npm install -g pnpm`
- **Neon PostgreSQL account** - Required for the database. Sign up at [neon.tech](https://neon.tech/)
- **Vercel Redis** - Serverless Redis for caching. Set up through your Vercel project dashboard
- **Vercel account** - For Blob storage and AI Gateway. Sign up at [vercel.com](https://vercel.com/)

## Environment Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-org/SilmarilGreenDragon.git
cd SilmarilGreenDragon
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in each variable:

#### AUTH_SECRET

A secret key used for encrypting session tokens. Generate one with:

```bash
openssl rand -base64 32
```

Or visit [generate-secret.vercel.app/32](https://generate-secret.vercel.app/32)

#### POSTGRES_URL

Your Neon PostgreSQL connection string. See the Database Setup section below for details.

#### BLOB_READ_WRITE_TOKEN

Token for Vercel Blob storage. Get this from your Vercel project settings under Storage > Blob.

#### REDIS_URL

Your Vercel Redis connection URL. Get this from your Vercel project settings under Storage > Redis.

#### AI_GATEWAY_API_KEY

Your Vercel AI Gateway API key. Get this from [vercel.com/ai-gateway](https://vercel.com/ai-gateway).

## Database Setup

Green Dragon uses Neon PostgreSQL for data storage. Follow these steps to set up your database:

### 1. Create a Neon project

1. Go to [console.neon.tech](https://console.neon.tech/)
2. Click "New Project"
3. Choose a project name and region
4. Once created, copy the connection string from the dashboard

The connection string looks like:

```
postgresql://username:password@ep-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

Paste this as your `POSTGRES_URL` in `.env.local`.

### 2. Run database migrations

Migrations create all the necessary tables in your database:

```bash
pnpm db:migrate
```

### 3. Seed challenge data

The seed command populates the challenges table with the default security challenges:

```bash
pnpm db:seed
```

This reads challenge definitions from `lib/db/seed-challenges.ts` and inserts them into your database. Without seeding, users won't see any challenges in the application.

### Useful database commands

- `pnpm db:studio` - Opens Drizzle Studio, a visual database browser
- `pnpm db:generate` - Generates new migration files after schema changes
- `pnpm db:push` - Pushes schema directly to database (development only)

## Running the Project

### Development server

Start the development server with hot reloading:

```bash
pnpm dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

### Production build

Build the application for production:

```bash
pnpm build
```

This runs migrations, seeds challenges, and builds the Next.js application.

### Start production server

```bash
pnpm start
```

## Code Quality

Before submitting changes, ensure your code meets our quality standards:

### Linting

Check for code issues:

```bash
pnpm lint
```

### Formatting

Auto-fix formatting issues:

```bash
pnpm format
```

### Testing

Run the full test suite:

```bash
pnpm test
```

## Making Changes

### 1. Create a feature branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make your changes

Write your code, following existing patterns in the codebase.

### 3. Format and lint

```bash
pnpm format
pnpm lint
```

### 4. Run tests

```bash
pnpm test
```

### 5. Commit your changes

Write a clear, descriptive commit message:

```bash
git commit -m "Add feature: description of what you added"
```

## Pull Requests

### Requirements

Before your PR can be merged:

- All tests must pass
- Code must pass linting (`pnpm lint`)
- Changes should be formatted (`pnpm format`)

### Submitting a PR

1. Push your branch to GitHub
2. Open a pull request against the `main` branch
3. Fill in the PR template with:
   - A summary of your changes
   - Any related issues
   - Steps to test your changes

### PR Review

A maintainer will review your PR and may request changes. Once approved, your PR will be merged.

## Creating Issues

### Bug Reports

When reporting a bug, include:

- A clear description of the issue
- Steps to reproduce the bug
- Expected behavior vs actual behavior
- Browser and OS information
- Screenshots if applicable

### Feature Requests

When proposing a feature:

- Describe the problem you're trying to solve
- Explain your proposed solution
- Consider any alternatives you've thought of

## Project Structure

```
/app                 - Next.js app router pages and API routes
  /(auth)            - Authentication pages (sign-in, sign-up)
  /(chat)            - Main chat interface and challenge pages
/lib                 - Core business logic
  /ai                - AI model configuration and prompts
  /db                - Database schema, queries, and migrations
/components          - React components
/hooks               - Custom React hooks
/tests               - Playwright test suites
  /e2e               - End-to-end tests
  /routes            - API route tests
```

## Adding New Challenges

Challenges are defined in `lib/db/seed-challenges.ts`. Each challenge requires:

- `slug` - URL-friendly identifier (unique, used for upsert)
- `title` - Display name
- `description` - Challenge description (can include quoted text)
- `category` - One of: prompt-injection, indirect-prompt-injection, excessive-agency, insecure-plugin-design, jailbreaking, rag-exploits, agent-attacks, model-theft, adversarial-ml, data-poisoning, evasion
- `difficulty` - novice, easy, medium, hard, nightmare
- `points` - Points awarded for completion
- `successType` - How to detect success (see below)
- `successValue` - Pattern to match in AI response
- `systemPrompt` - Challenge-specific AI instructions
- `sortOrder` - Display order (lower = first)
- `isActive` - Whether challenge is visible

### Success Types

- `response_contains` - AI response must contain the value (case-insensitive)
- `response_regex` - AI response must match regex pattern
- `custom` - Custom validation (not yet implemented)

### How Seeding Works

Run `pnpm db:seed` to apply changes. The seed script:

1. **Upserts challenges** - Inserts new challenges or updates existing ones (matched by `slug`)
2. **Removes orphaned challenges** - Challenges in the database but NOT in the code are deleted
3. **Recalculates user stats** - When challenges are removed, user points and solve counts are recalculated

### Important Warnings

- Removing a challenge from the code will delete it from the database when seeding
- Users who solved a removed challenge will lose those points
- ChallengeProgress records are cascade-deleted when challenges are removed
- Always back up the database before removing challenges in production
- Changing a challenge's `points` value does NOT automatically recalculate existing user stats (only removal triggers recalculation)

## Questions?

If you have questions or need help, feel free to open an issue on GitHub.
