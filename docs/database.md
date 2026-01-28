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

## Status

In design