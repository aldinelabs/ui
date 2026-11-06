# @aldine/ui

Shared Astro layout for Aldine Labs sites: page head (SEO, structured data, theme and language scripts), header, footer, theme toggle, and the Neutral color theme with Tailwind CSS v4 tokens.

It ships **source** (`.astro` and `.ts` files), so a site builds it together with its own code. It does not include the Aldine logo or any other brand asset; each site supplies its own files.

## Install

```sh
bun add @aldine/ui@github:aldinelabs/ui#v0.1.0
```

Peer dependencies (install them in the site): `astro`, `tailwindcss`, `@tailwindcss/vite`, `@lucide/astro`, `@fontsource-variable/inter`, `@fontsource-variable/jetbrains-mono`.

## Use

Tailwind scans this package's components through the stylesheet it ships, so nothing extra is needed beyond the Tailwind Vite plugin in `astro.config.mjs`.

```astro
---
import Base from '@aldine/ui/layouts/Base.astro';
import { localeFromUrl, localize } from '@aldine/ui/i18n';

const locale = localeFromUrl(Astro.url);
---

<Base
  title="Getting started"
  description="…"
  siteTitle="Aldine Docs"
  organization={{ name: 'Aldine Labs', logo: '/brand/logo-light.svg' }}
  nav={[{ href: localize('/pine/', locale), label: 'Pine', active: true }]}
  footer={{
    org: 'Aldine Labs',
    columns: [{ title: 'Docs', links: [{ href: localize('/', locale), label: 'Home' }] }],
    contacts: [{ href: 'https://github.com/aldinelabs', label: 'aldinelabs', name: 'GitHub', icon: 'github' }],
  }}
>
  <h1>…</h1>
</Base>
```

The site must provide `/brand/logo-dark.svg` and `/brand/logo-light.svg` (or pass `logo={{ light, dark }}`), a favicon (`icons`), and a share image (`image`).

### Exports

| Import | Contents |
| --- | --- |
| `@aldine/ui/layouts/Base.astro` | Page shell: head, skip link, header, footer. Slots: default, `head`, `header-actions`, `header-menu`, `overlays` |
| `@aldine/ui/components/*.astro` | `BaseHead`, `Header`, `Footer`, `Logo`, `ThemeToggle` |
| `@aldine/ui/i18n` | Locales (`en`, `zh`), `localize`, `unlocalize`, `localeFromUrl`, and the chrome strings (`chrome(locale)`) |
| `@aldine/ui/ui` | Class recipes `button` and `container` |
| `@aldine/ui/styles.css` | Theme tokens, base styles, `.prose` (imported by `BaseHead`) |

Every locale is served under its own prefix (`/en/…`, `/zh/…`).
