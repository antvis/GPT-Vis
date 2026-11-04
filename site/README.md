# GPT-Vis website

The 1.x website, chart examples, Theme Studio, and documentation share a Next.js 16 application. The site exports static files for GitHub Pages.

## Development

Install the main package dependencies and build it from the repository root, then install the site dependencies:

```bash
pnpm install
pnpm build
cd site
pnpm install
pnpm dev
```

Live previews use the library source so the homepage, examples, and documentation stay aligned. The SDK snippets use the published `@antv/gpt-vis` API.

## Code organization

- Keep homepage-only components and their CSS Modules together in `app/components/home/`.
- Keep components reused by multiple pages, such as `GenerationDemo` and `LiveChart`, in `app/components/` with their own styles.
- Keep route-specific components inside that route, such as `app/examples/components/` and `app/docs/components/`.
- Use `app/home.module.css` for homepage layout and `app/globals.css` for site-wide foundations and shared controls. Put feature styles next to their components.

## Production

```bash
cd site
pnpm build
```

Deploy the generated `out/` directory. `next start` does not serve a static export.

## Documentation

- Author guides in `content/docs/*.mdx`.
- Register each guide in `app/lib/docs.ts` and `content/docs/index.ts`.
- `app/docs/layout.tsx` supplies the reading layout, search, and navigation.
- `app/docs/components/DocPage.tsx` reads the source for Copy Markdown.
- Old `/docs#...` links are mapped in `legacyDocLinks`.
- Maintain and commit `public/llms.txt` by hand. When adding, renaming, or removing guides, update its titles, descriptions, and URLs in the same change. Also update its usage guidance when the public API or installation instructions change.
- `pnpm check:docs` validates document and chart links without generating files.
- Use “theme configuration” in product copy and guides. Reserve `ThemeSpec` for the actual TypeScript type in code and API references.
- Copy Markdown reads MDX source directly and removes live UI components; separate `.md` files are not generated.
- Development and production builds package `skills/chart-visualization/` into `public/downloads/chart-visualization.zip`. This generated ZIP is not committed.

The homepage theme showcase uses local selection only. Theme Studio keeps its own draft and supports importing, exporting, and sharing theme JSON. Documentation and chart examples render the settings shown in their code. The SDK and website share presets from `src/theme/presets.ts`; Studio usage code uses names for unchanged presets and complete JSON objects for custom themes.

Third-party source attribution for the Pop gallery preset is recorded in [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md).

Agent Skill is an existing capability. Terminal Skill installation uses the third-party skills installer; GPT-Vis does not ship an independent chart CLI. Future features on the homepage must stay labeled Coming soon until released.

The analysis showcase pairs AVA's existing analysis-to-visualization workflow with live GPT-Vis charts. Its scenarios use fixed sample data and predefined findings; it does not call an analysis service. Keep chart values, metrics, source tables, and copied JSON consistent. AVA links point to its analysis interface and visualization documentation; planned analytical expression remains in the Coming soon cards below.
