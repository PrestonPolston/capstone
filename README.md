##backend for capstone E-Commerce app
# Capstone

## Overview

This repository contains the backend for the **Capstone E-Commerce App**. It is built with **Node.js** and utilizes **Prisma** for database management. The backend provides APIs for user authentication, product management, and order handling.

## Getting Started

To set up the backend environment, follow these steps:

### Prerequisites

- Ensure you have **Node.js** and **npm** installed on your machine.
- Have PostgreSQL installed and running.

### Installation

touch .env

DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"

create WEB_TOKEN by calling node in the command line and pasting this require('crypto').randomBytes(64).toString('hex')

npx prisma migrate dev

npx prisma generate

npm run seed
