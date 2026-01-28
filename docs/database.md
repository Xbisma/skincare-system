# Database Schema Design

This document describes the relational database schema for the Skincare Tracker & Routine Management System.

## Core Entities

- User
- GlobalProduct
- UserProduct
- Routine
- RoutineStep
- UsageLog
- SkinReaction

## High-Level Relationships

- A User owns UserProducts, Routines, UsageLogs, and SkinReactions
- GlobalProducts are shared across users
- UserProducts connect a User to a GlobalProduct
- Routines consist of ordered RoutineSteps
- RoutineSteps reference UserProducts
- UsageLogs record routine execution over time
- SkinReactions are analyzed against recent UsageLogs

## User Entitiy

Represents an authenticated user of the system.

Fields:
- id: unique user identifier
- email: login identifier (unique)
- passwordHash: hashed password
- name: display name
- dateOfBirth: used to derive age
- skinType: user's skin classification
- createdAt: account creation timestamp
- updatedAt: last update timestamp

## Product

Represents a skincare product available in the system.

Fields:
- id
- name
- brand
- category
- createdAt

## UserProduct

Represents a product owned and used by a specific user.

Fields:
- id
- userId
- productId
- openDate
- expiryDate
- paoMonths
- notes
- createdAt

## Status

In design