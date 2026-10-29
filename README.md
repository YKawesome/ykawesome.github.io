# Yousef Khan

My personal portfolio: a full-screen animated introduction, concise experience, and projects in a swipeable carousel. Project cards open animated native dialogs, keeping the main portfolio on one scrolling page.

Built with React, Vite, Tailwind CSS, and DaisyUI. Hosted on GitHub Pages, with deployment through GitHub Actions on pushes to `main`.

## Development

```sh
npm ci
npm run dev
```

```sh
npm run build
npm run preview
```

## Keeping it fast

- The homepage renders immediately, without an image preload gate.
- Legacy project pages and tools load on demand with React `lazy` and `Suspense`. JSZip loads only when exporting images.
- Images use explicit imports, so unused artwork stays out of production builds. Project artwork and the landing poster use WebP.
- The original landing MP4 stays. Its poster renders before playback; the video pauses when offscreen or in a hidden tab. Reduced-motion and data-saving preferences use a still image. The landing has no playback controls.
- The typing introduction uses a short CSS animation, with the complete heading available to screen readers immediately.
- The carousel uses native scrolling and CSS scroll snapping. Project dialogs use browser focus trapping, Escape handling, and short CSS transitions.
- Navigation uses ordinary links and the system cursor. No animation library, global image preloader, screenshot preview service, or achievement tracking.
- Section links scroll smoothly, with instant navigation for reduced-motion preferences.
- Hand-drawn reaction stickers use small WebP derivatives from `src/assets/emojis`. Project stickers gently wiggle on hover or keyboard focus; navbar links reveal reaction faces. Original drawings stay unchanged, and reduced-motion preferences disable the animations.
- Retired blog, achievement, grade-calculator, and CheckersAI URLs redirect home. The banner splitter and `/ktane` remain available.

Update featured projects in `src/data/projects.js`, experience in `src/pages/Home/Home.jsx`, and the downloadable resume in `public/Yousef-Khan-Resume.pdf`. Grouper links to its public demo; Smart401K has no public demo or repository.

The about photo uses the lazy-loaded `public/yousef-boba.webp`; the original upload is retained locally as `public/yousef-boba.jpg` and excluded from Git. To replace it, update the WebP or the image source in `src/pages/Home/Home.jsx`. The frame preserves the photo’s proportions and stacks below the text on mobile.

GitHub Pages deep links are handled by `public/404.html` and the redirect recovery in `index.html`, based on [rafgraph/spa-github-pages](https://github.com/rafgraph/spa-github-pages).

## Deployment

Pushes to `main` deploy automatically. To deploy manually:

```sh
npm run deploy
```

MIT License © Yousef Khan
