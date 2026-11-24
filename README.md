# Magic Lotus

A mobile-first storybook of hand-drawn works. Live at [magic-lotus.vercel.app](https://magic-lotus.vercel.app). The previous address, [art-2-liart.vercel.app](https://art-2-liart.vercel.app), still works.

The site opens on an illustrated cover. Tap **Open**, or swipe, to turn to the contents page. From there, [The Story](/story) and [The Art](/art) are the next pages in the book. A **Skip** link bypasses the cover. Once the book has been opened, `sessionStorage` remembers it for the rest of the visit, so going back does not replay the intro. If JavaScript is off, the contents page is shown directly.

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

3. Add a matching card to the gallery in `art.html` so the work is visible even if JavaScript does not load. Point the thumbnail at `thumb` (or `file`) and `data-full` at the large image. Add a contents link in `index.html` if you want it listed on the first page.
4. Commit and push, then redeploy so the new work is live.

## Preview locally

From this folder:

```bash
python3 -m http.server 4173
```

Then open [http://localhost:4173](http://localhost:4173).
