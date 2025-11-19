# React Example

To test the React hook example:

## Option 1: Use in an existing React project

1. Copy `App.jsx` to your React project
2. Import and use it in your app

## Option 2: Quick test with Vite

```bash
# Create a new Vite React project
npm create vite@latest test-react-app -- --template react
cd test-react-app

# Install dependencies
npm install

# Copy this App.jsx to src/App.jsx
# Update the import path in App.jsx to point to your built library

# Run the dev server
npm run dev
```

## Option 3: Use npm link

```bash
# In the universal-rate-limiter root directory
npm link

# In your React test project
npm link universal-rate-limiter

# Then update App.jsx import:
# import { useRateLimit } from "universal-rate-limiter";
```
