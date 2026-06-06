# Images

Drop Denise's photos here, then reference them in `src/content/site.ts`.

Expected files (rename your photos to match, or update the paths in site.ts):

- `hero.jpg` — large, beautiful room shot for the homepage hero (landscape)
- `denise.jpg` — portrait of Denise for the About page (portrait orientation)
- `project-1.jpg` … `project-6.jpg` — portfolio covers

## After adding photos

Open `src/components/Frame.tsx` and set:

```ts
export const IMAGES_READY = true;
```

Every placeholder will instantly become a real, optimized image.

## Tips

- Use high-quality JPGs (Next.js auto-converts to AVIF/WebP for speed).
- Aim for ~2000px on the long edge — large enough to look crisp, small enough to load fast.
```
