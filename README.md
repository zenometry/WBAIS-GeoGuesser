# CampusQuest

A GeoGuessr-style game for our school. You're shown a 360° photo from
somewhere on campus, and you click on the map to guess where it is.

## How the project is organized

All files live together in one folder (flat layout):

```
campusquest/
├── index.html          The page structure (rarely needs editing)
├── style.css           How the game looks
├── locations.js        ← THE LOCATIONS. Edit this to add new spots.
├── game.js             The game logic (only edit to change rules)
├── map.jpeg            The campus map
└── ...                 One panorama photo per location
```

## I just want to add a new location

You only need to edit **`locations.js`**. Open it and follow the
instructions at the top of the file. In short:

1. Add your 360° panorama photo to this folder (next to index.html).
2. Find the correct pixel coordinates on `map.jpeg`.
3. Copy an existing block in `locations.js`, paste it, and change the
   four values (`pano`, `answerX`, `answerY`, `name`).

You don't need to understand `game.js` to add locations.

## How to find map coordinates

`answerX` is how many pixels from the **left** edge of the full-size
map image, and `answerY` is how many pixels from the **top**. An easy
way: open `map.jpeg` in an image editor (even MS Paint or Preview) and
hover/click on the spot — most editors show the pixel coordinates of
your cursor.

## Running it locally

Because the game loads separate files, opening `index.html` directly
sometimes gets blocked by the browser. Run a tiny local server instead:

```
# from inside the campusquest folder:
python3 -m http.server 8000
```

Then visit http://localhost:8000 in your browser.

## Photos

Panoramas must be **equirectangular** (the standard format phone
"360 photo" / Google Street View style). A normal flat photo won't
display correctly in the viewer.
