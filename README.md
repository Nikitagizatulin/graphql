# Blog App

A GraphQL blog application built with Node.js, TypeScript, Apollo Server, and Prisma ORM. This app allows users to sign up, sign in, create, update, publish, and delete blog posts, as well as manage user profiles.

## Features
- User authentication (sign up & sign in with JWT)
- Create, update, publish/unpublish, and delete blog posts
- User profiles with bio
- MySQL database via Prisma ORM
- GraphQL API with queries and mutations

## Tech Stack
- **Node.js** & **TypeScript**
- **Apollo Server** (GraphQL)
- **Prisma ORM** (MySQL)
- **JWT** for authentication
- **bcryptjs** for password hashing

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- MySQL database

### Installation
1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd blog-app
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**
   Create a `.env` file in the root directory with the following variables:
   ```env
   DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
   JWT_SIGNATURE="your_jwt_secret"
   ```
4. **Run Prisma migrations:**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```
5. **Start the development server:**
   ```bash
   npm run dev
   ```
   The server will start at `http://localhost:4000`.

## Available Scripts
- `npm run dev` – Start the server in development mode with hot-reloading
- `npm run compile` – Compile TypeScript to JavaScript
- `npm start` – Compile and run the server

## GraphQL API Overview

### Queries
- `posts(filter: PostFilter): [Post!]` – List published posts, optionally filtered by title
- `post(postId: ID!): Post` – Get a single post by ID
- `me: User` – Get the currently authenticated user
- `profile(userId: ID!): Profile` – Get a user's profile by user ID

### Mutations
- `signup(email, bio, name, password): AuthPayload!` – Register a new user
- `signin(email, password): AuthPayload!` – Log in and receive a JWT
- `postCreate(post: PostInput!): PostPayload!` – Create a new post
- `postUpdate(postId: ID!, post: PostInput!): PostPayload!` – Update a post
- `postDelete(postId: ID!): Boolean!` – Delete a post
- `postPublishSwitch(postId: ID!, publish: Boolean!): PostPayload!` – Publish/unpublish a post

### Main Types
- **Post**: `id`, `title`, `content`, `createdAt`, `published`, `author`
- **User**: `id`, `name`, `email`, `posts`, `profile`
- **Profile**: `id`, `bio`, `user`

## Environment Variables
- `DATABASE_URL` – MySQL connection string
- `JWT_SIGNATURE` – Secret for signing JWT tokens

## Project Structure
```
blog-app/
  src/
    resolvers/         # GraphQL resolvers (queries, mutations, types)
    utils/             # Utility functions (auth, permissions)
    schema.ts          # GraphQL schema definitions
    index.ts           # Server entry point
  prisma/
    schema.prisma      # Prisma data model
  package.json         # Project metadata and scripts
  tsconfig.json        # TypeScript configuration
```

## License
ISC 