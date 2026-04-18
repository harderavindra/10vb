# Single Page Website with Vite and GSAP

This is a simple single-page website built with Vite and featuring GSAP animations.

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Building for Production

To build the project for production:
```
npm run build
```

The built files will be in the `dist` directory.

## Preview Production Build

To preview the production build locally:
```
npm run preview
```

## Deployment to Vercel

### Option 1: Using Vercel CLI
1. Install Vercel CLI globally:
   ```
   npm install -g vercel
   ```

2. Deploy:
   ```
   vercel
   ```

   Follow the prompts to link your project and deploy.

### Option 2: Using GitHub and Vercel Dashboard
1. Push your code to a GitHub repository.
2. Go to [Vercel](https://vercel.com) and sign in.
3. Click "New Project" and import your GitHub repository.
4. Vercel will automatically detect it as a Vite project and deploy it.

## Features

- Built with Vite for fast development
- GSAP animations for smooth interactions
- Responsive design
- Ready for deployment on Vercel

## Troubleshooting

- If you encounter issues with GSAP, ensure it's properly installed: `npm install gsap`
- For Vercel deployment issues, check the Vercel documentation or ensure your `package.json` has the correct build script.