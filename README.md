# Eisenhower Matrix Prioritizer

## Project Overview
A productivity application that implements the Eisenhower Matrix decision-making framework. 
**Deployed Application:** https://matrix-app-beta-eight.vercel.app/

## Problem Statement & Target Users
Many people struggle with task prioritization, creating flat to-do lists that treat all tasks equally. This leads to time wasted on urgent but unimportant tasks. This app targets students and professionals who need a structured way to filter tasks by urgency and importance to maximize productivity.

## Key Features & Application Logic
- **Boolean Quadrant Sorting:** Uses state filtering logic to automatically sort tasks into four distinct quadrants based on boolean variables (`isUrgent`, `isImportant`).
- **Data Persistence:** Utilizes browser `LocalStorage` to persist state, ensuring task data remains intact across sessions and page reloads.
- **Dynamic State Management:** Built with React `useState` and `useEffect` to instantly update the UI when tasks are added or deleted.

## Technology Stack
- **Frontend:** React.js (Vite)
- **Styling:** Vanilla CSS 
- **Database:** Browser LocalStorage
- **Deployment:** Vercel
