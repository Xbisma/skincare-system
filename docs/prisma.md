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