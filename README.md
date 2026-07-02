# PassportKit

QR product passports and readiness tools for small fashion brands.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Vercel-ready configuration

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Useful Commands

```bash
npm run lint
npm run build
```

## GitHub Setup

Create a new empty GitHub repository, then connect this local repo:

```bash
git remote add origin git@github.com:YOUR_USERNAME/passportkit.git
git branch -M main
git push -u origin main
```

If you prefer HTTPS:

```bash
git remote add origin https://github.com/YOUR_USERNAME/passportkit.git
git branch -M main
git push -u origin main
```

## Vercel Setup

The easiest path is Git integration:

1. Push this repo to GitHub.
2. Open Vercel and choose **Add New Project**.
3. Import the `passportkit` GitHub repository.
4. Keep the framework preset as **Next.js**.
5. Deploy.

This repository includes `vercel.json` and pins Node to `22.x` for stable Vercel builds.

## Product Direction

The validation prototype will include:

- Landing page
- Product readiness dashboard
- Guided product passport wizard
- Public QR passport page
