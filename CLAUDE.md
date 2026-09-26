# CLAUDE.md

Nuxt 4 starter template: Nuxt UI 4, Tailwind CSS 4, TypeScript (strict), pnpm. Optional features live in `layers/`.

## Commands

- `pnpm dev` – dev server on http://localhost:3000
- `pnpm lint` / `pnpm lint:fix` – ESLint (also handles formatting; no Prettier)
- `pnpm typecheck` – vue-tsc via `nuxt typecheck`
- `pnpm test` – Vitest (`**/test/unit/**` runs in node, `**/test/nuxt/**` in a Nuxt environment; includes `layers/*/test`)
- `pnpm build`

Run lint, typecheck and test before considering a change done.

## Conventions

- Use **pnpm** only (enforced via `devEngines`). Never create `package-lock.json` or `yarn.lock`.
- Keep `vue` and `vue-router` as direct dependencies — otherwise pnpm can install two Vue copies, which breaks rendering (blank page).
- Source lives in `app/` (Nuxt 4 layout). Server code in `server/`. Code used by both goes in `shared/` (import via `#shared/...`).
- Site name/description and theme colors: `app/app.config.ts` (`useAppConfig().site`). Don't hardcode the project name.
- Header/footer shell: `app/layouts/default.vue`; other layouts in `app/layouts/`, selected with `definePageMeta({ layout })`.
- Prefer Nuxt UI components (`U*`) and semantic color classes (`text-muted`, `bg-elevated`, `text-primary`, …) over raw Tailwind colors, so light/dark mode keeps working.
- Icons: `i-lucide-*` (and `i-simple-icons-*` for brands).
- Forms: `UForm` + Zod schema (`import * as z from 'zod'`). Reuse the same schema in API routes via `readValidatedBody(event, schema.parse)`.
- Data fetching: `useFetch` for page data (SSR), `$fetch` for user actions.
- Env config: add keys to `runtimeConfig` in `nuxt.config.ts` and to `.env.example` (`NUXT_*`, `NUXT_PUBLIC_*`).
- Images: `<NuxtImg>` / `<NuxtPicture>` from `@nuxt/image`.
- Composables: VueUse is auto-imported (`@vueuse/nuxt`).
- Anything that depends on the browser (localStorage, window size, color mode value, clipboard support) must not render differently on the server — wrap it in `<ClientOnly>` to avoid hydration mismatches.
- Fonts: default is Public Sans (`--font-sans`). Inter is opt-in via `font-inter`. New fonts: `fonts.families` in `nuxt.config.ts` + a `--font-*` token in `main.css`.
- Code style: no semicolons, single quotes, no trailing commas (enforced by ESLint).

## Layers

- `layers/pinia` – Pinia; stores in `app/stores/` or `layers/pinia/app/stores/` are auto-imported.
- `layers/i18n` – `@nuxtjs/i18n`, `no_prefix` strategy, locales in `layers/i18n/i18n/locales/`. Keep all locale files in sync (a unit test checks the keys).
- Layers must stay removable: the base app must not import from a layer. Layers can contribute header actions via global components (see `optionalHeaderActions` in `app/layouts/default.vue`) and examples via `definePageMeta({ example })`.

## Examples

`app/pages/examples/`, the `example*`/`Example*` files and `layers/*/app/pages/examples/` are demo code. The README lists every file to delete.
