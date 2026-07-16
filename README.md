# AnorTechWebUI

Centralized Hugo theme (UI layer) for Anor Technologies websites.
Consumed by child sites via Hugo Modules:

```toml
[module]
  [[module.imports]]
    path = "github.com/Anor-Technologies/AnorTechWebUI"
```

## Architecture

```
              AnorTechWebUI  (this repo — the design system)
                    │  layouts · components · CSS · motion · footer · head
        ┌───────────┼───────────────┐
        ▼           ▼               ▼
  anor-tech.com   njlcs.com    future sites
   brand config   brand config   brand config     (hugo.yaml → params.brand)
   content        content        content          (content/*.md front matter)
   logo + i18n    logo + i18n    logo + i18n
```

Child sites carry **no layouts and no CSS** — only content, config, logo,
and translations. Brand identity is pure configuration; the same components
render every site.

## Creating a new child site

1. **Copy an existing child** (e.g. `njlcs.com`) or start bare with:
   `content/`, `static/images/` (logo), `hugo.yaml`, `go.mod`.

2. **Point `go.mod` at the design system**

   ```
   module github.com/Anor-Technologies/<your-site>
   go 1.23.0
   require github.com/Anor-Technologies/AnorTechWebUI v0.4.0
   ```

3. **Brand it in `hugo.yaml`** — everything visual is config:

   ```yaml
   params:
     brand:
       name: ACME            # accent part of the footer wordmark
       suffix: Systems       # rest of the wordmark
       accent: "#2BC199"     # brand accent (buttons, eyebrows, links)
       accentHover: "#4ED9B4"
       accentInk: "#06251C"  # text on accent surfaces
       bg1: "#0A100E"        # page background gradient stops
       bg2: "#080D0B"
       bg3: "#060A09"
       glow1: "rgba(43,193,153,0.16)"   # cool lighting anchor
       glow2: "rgba(59,130,246,0.10)"   # warm lighting anchor
       fontsUrl: "https://fonts.googleapis.com/css2?family=..."
       fontSans: "'Noto Sans SC', 'Inter', sans-serif"
       fontMono: "'JetBrains Mono', ui-monospace, monospace"
       forceDark: true
     description: One-line tagline (footer + meta)
     copyright: "© 2026 ACME"
     footer_status: "status line under the wordmark"
     footer_mark: City
     footer_social: [{ title: hello@acme.com, link: "mailto:hello@acme.com" }]
   menu:
     footer:          # first footer column
       - { name: Platform, url: /platform, weight: 1 }
     footer_company:  # second footer column
       - { name: About, url: /about, weight: 1 }
   ```

4. **Compose the homepage** in `content/_index.md` with `layout: an-home` —
   hero / trust / features (visual: `console | feed | code | toggle | none`) /
   pillars / metrics / cta, all from front matter. Content pages use
   `layout: an-page`.

5. **Run locally**

   ```sh
   HUGO_MODULE_REPLACEMENTS="github.com/Anor-Technologies/AnorTechWebUI -> ../AnorTechWebUI" hugo server
   ```

6. **Deploy** — push to `main`; Cloudflare builds from the pinned module tag.

7. **Stay current** — copy `.github/workflows/update-theme.yml` from an
   existing child. It bumps the theme on the daily cron and instantly on
   every theme release (`repository_dispatch: theme-release`, sent by this
   repo's `release-dispatch.yml`; requires the `ANOR_DISPATCH_TOKEN` secret
   here and the child listed in its matrix).

## Releasing the design system

```sh
git commit … && git tag v0.X.0 && git push origin main --tags
```

Never move or reuse a tag — the Go module proxy caches tag contents forever.
Children pick the release up automatically (dispatch or daily cron).

## Credits

Built and maintained by [Conan Zhang](https://isolatedcommand.com/who-we-are/conanzhangtech/).
