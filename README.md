# Magic Lotus

A mobile-first gallery of hand-drawn works. Live at [magic-lotus.vercel.app](https://magic-lotus.vercel.app). The previous address, [art-2-liart.vercel.app](https://art-2-liart.vercel.app), still works.

## Add a photograph

1. Put the image file in the `images/` folder. JPG, PNG, WEBP, or AVIF all work well. A smaller thumbnail, named `your-work-thumb.jpg`, is optional but keeps the page lighter.
2. Add one object to the `works` array in `gallery.json`:

```json
{
  "file": "evening-study.jpg",
  "thumb": "evening-study-thumb.jpg",
  "title": "Evening Study",
  "year": "2026",
  "medium": "Colored pencil"
}
```

`file` and `title` are the important fields. `thumb`, `year`, and `medium` are optional.

3. Add a matching card to the gallery in `index.html` so the work is visible even if JavaScript does not load. Point the thumbnail at `thumb` (or `file`) and `data-full` at the large image.
4. Commit and push, then redeploy so the new work is live.

## Preview locally

From this folder:

```bash
python3 -m http.server 4173
```

Then open [http://localhost:4173](http://localhost:4173).
