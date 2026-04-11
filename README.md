# Jacob S. Harlow — Portfolio

A clean, minimal single-page portfolio built with React + Vite.

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder — ready to deploy to S3, Netlify, Vercel, etc.

## Deploying to AWS S3 + CloudFront

1. Build: `npm run build`
2. Create an S3 bucket with static website hosting enabled
3. Upload the `dist/` folder contents
4. Set up a CloudFront distribution pointing to the bucket
5. (Optional) Add a custom domain via Route 53

## Tech Stack

- React 18
- Vite
- DM Sans + DM Mono (Google Fonts)
- No external UI libraries — all custom CSS-in-JS
