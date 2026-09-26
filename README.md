# Nuxt Template

Starter for new projects: [Nuxt 4](https://nuxt.com), [Nuxt UI 4](https://ui.nuxt.com), Tailwind CSS 4, TypeScript, ESLint and a light/dark mode toggle.

## Start a new project from this template

```bash
pnpm dlx giget gh:<your-user>/nuxt_template my-new-app
```

Or use GitHub's **Use this template** button. Then:

1. Set `name` in `package.json`
2. Set `site.name` / `site.description` and the brand colors in `app/app.config.ts`
3. Replace `app/components/AppLogo.vue` and `public/favicon.ico`
4. Copy `.env.example` to `.env` if the project needs environment variables
5. Update or replace `LICENSE` and this README

## Development

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm lint         # pnpm lint:fix to auto-fix
pnpm typecheck
pnpm build && pnpm preview
```

## Structure

- `app/app.vue` – layout shell (header with color mode toggle, footer)
- `app/app.config.ts` – site identity and Nuxt UI theme colors
- `app/assets/css/main.css` – Tailwind / Nuxt UI imports and theme tokens
- `app/pages/` – file-based routes
- `app/error.vue` – 404 / error page
