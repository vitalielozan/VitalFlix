# Movie App VitalFlix

A simple and responsive Movie App built with *Vite +*React.

## Tech Stack

- _Vite_ – Lightning-fast development and build tool
- _React_ (assumed, since you're using Vite + Axios + frontend logic)
- _Tailwind CSS_ – Utility-first CSS framework
- _DaisyUI_ – Tailwind CSS component library
- _Axios_ – For handling HTTP requests
- _Supabase_ – For storing favorite movies
- _Clerk_ - For authenthication

## Features

- Search for movies using a public API
- Save favorite movies to LocalStorage
- Responsive and styled with Tailwind CSS and DaisyUI
- Fast load times thanks to Vite

## Installation

- Clone the repo

bash```
git clone <https://github.com/vitalielozan/VitalFlix.git>
cd movie-app
npm install
npm run dev

bash```

## 🌐 API

- This app uses a public movie API [The Movie Database (TMDb)] (<https://www.themoviedb.org/>).
- Your API key is stored securely in a local `config.js` file that is ignored by version control (see `.gitignore`)
- // src/config/config.js
- export const API_KEY = "your_api_key_here";

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
