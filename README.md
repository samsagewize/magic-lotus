# Art 2

A minimal, mobile-first gallery. Drop in a photograph, add one line to a manifest, and it appears on the page.

## Add a photograph

1. Put the image file in the `images/` folder. JPG, PNG, WEBP, or AVIF all work well.
2. Add one object to the `works` array in `gallery.json`:

```json
{
  "file": "evening-study.jpg",
  "title": "Evening Study",
  "year": "2026",
  "medium": "Photograph"
}
```

`file` and `title` are the important fields. `year` and `medium` are optional.

The page reads `gallery.json` and builds the gallery from it. You do not need to edit the HTML.

3. Commit and push, then redeploy so the new work is live.

## Remove a placeholder

The six studies already in the gallery are local SVG placeholders, labeled as such, so the layout can be seen before any photographs arrive. To take one out, delete its object from `gallery.json`. You can also delete the matching file in `images/`.

## Preview locally

From this folder:

```bash
python3 -m http.server 4173
```

Then open [http://localhost:4173](http://localhost:4173).
