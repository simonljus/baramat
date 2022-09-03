# Bara mat
A page for food content
## How to configure
* npm install
* npx prisma db push: Configure db with schema
## How to run 
* npm run dev: Start dev server
* npm run test: Start vitest
## Template
This is an app bootstrapped according to the [init.tips](https://init.tips) stack, also known as the T3-Stack.
## Stack
* DB: [Prisma ORM](https://www.prisma.io/) + any supported database (SQLite by default)
* Framework: [Next.js](https://nextjs.org/)
* Test: [Vitest](https://vitest.dev/)
* Style: [Sass](https://sass-lang.com/) and [Tailwind CSS](https://tailwindcss.com/)
  
## Components
* Mosaic: Display 6 clickable images in a grid with responsive layout

## Endpoints
* api/cron/documents: Add documents (currently only supports json on disk) to db 
* api/documents: Get all documents in db
