# Prisma Schema

This document tracks how the database schema is translated into Prisma models.

Each model is derived directly from the database design in `database.md`.

## Enums

- SkinType: defines supported skin classifications
- RoutineTime: distinguishes AM and PM routines
- ReactionType: categorizes skin reactions

## Product

Global product definition shared across users.

## UserProduct

Represents a specific product instance owned by a user.
Tracks opening, expiry, and usage context.

## Routine
Represents a user-defined skincare routine (AM or PM).

## RoutineStep
Represents an ordered step within a routine, linked to a specific user-owned product.

## UsageLog
Represents a single instance of a product being used by a user.

## SkinReaction
Represents a skin reaction linked to a specific product usage.

# Prisma Migrations

- Initial migration created with `npx prisma migrate dev --name init`
- Tables generated according to design:
  - User
  - Product
  - UserProduct
  - Routine
  - RoutineStep
  - UsageLog
  - SkinReaction
- Prisma Studio can be used to explore & test the schema interactively
