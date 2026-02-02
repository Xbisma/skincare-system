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

## User

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

## GlobalProduct

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

## Routine

Represents a skincare routine created by a user.

Fields:
- id: unique routine identifier
- userId: owner of the routine
- name: routine name
- routineTime: AM or PM
- createdAt: creation timestamp

## RoutineStep

Represents a single step within a skincare routine.

Fields:
- id: unique step identifier
- routineId: parent routine
- userProductId: product used in this step
- stepOrder: position in routine
- instructions: optional usage notes
- createdAt: creation timestamp

## UsageLog

Represents a single instance of product usage by a user.

Fields:
- id: unique log identifier
- userId: user who performed the usage
- userProductId: product used
- routineId: associated routine (optional)
- usedAt: timestamp of usage
- notes: optional context
- createdAt: log creation timestamp

## SkinReaction

Represents a skin reaction reported by a user after product usage.

Fields:
- id: unique reaction identifier
- userId: user who experienced the reaction
- usageLogId: related product usage
- reactionType: type of reaction (e.g. irritation, breakout)
- severity: reaction intensity
- reportedAt: time reaction was noticed
- notes: optional user notes
- createdAt: record creation timestamp

## Initial Migration

- Created core entities (User, Product, UserProduct, Routine, RoutineStep, UsageLog, SkinReaction)
- Enums for skin type, routine time, reaction type
- Indexed user-centric queries

## Status

In design