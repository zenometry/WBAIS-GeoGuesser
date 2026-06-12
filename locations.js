/*
  =========================================================
  CAMPUSQUEST LOCATIONS
  =========================================================
  This is the ONLY file you need to edit to add new locations.
  You do NOT need to touch game.js or index.html.

  HOW TO ADD A LOCATION:
  1. Take a 360° photo (equirectangular panorama) and put the
     image file in THIS repo (same folder as index.html),
     e.g. cafeteria.jpg
  2. Figure out the correct spot on the map:
       - Open map.jpeg and find the pixel coordinates of the
         location. answerX is pixels from the LEFT, answerY is
         pixels from the TOP, measured on the FULL-SIZE image.
         The map is 1140 wide x 855 tall, so answerX must be
         0-1140 and answerY must be 0-855.
  3. Copy one of the blocks below, paste it, and change the
     four values. Don't forget the comma between blocks.

  Each location needs:
    pano    -> filename of the panorama image (in this folder)
    answerX -> correct horizontal pixel position on the map
    answerY -> correct vertical pixel position on the map
    name    -> the location's name (shown after guessing)

  NOTE: the photos below are the real images committed to this
  repo, so the game works straight from the repo with no Imgur
  download. The answerX / answerY values are PLACEHOLDERS spread
  across the map — open map.jpeg and set the true pixel position
  for each location.
  =========================================================
*/

const locations = [
  {
    pano: "basketball-court.jpeg",
    answerX: 760,
    answerY: 470,
    name: "Basketball court"
  },
  {
    pano: "PXL_20260602_093739045.PHOTOSPHERE.jpg",
    answerX: 300,
    answerY: 250,
    name: "Campus spot 1"
  },
  {
    pano: "PXL_20260602_094536204.PHOTOSPHERE.jpg",
    answerX: 520,
    answerY: 360,
    name: "Campus spot 2"
  },
  {
    pano: "PXL_20260602_095025885.PHOTOSPHERE.jpg",
    answerX: 880,
    answerY: 300,
    name: "Campus spot 3"
  },
  {
    pano: "PXL_20260602_095317048.PHOTOSPHERE.jpg",
    answerX: 420,
    answerY: 600,
    name: "Campus spot 4"
  },
  {
    pano: "Qw5UR91.jpeg",
    answerX: 950,
    answerY: 620,
    name: "Campus spot 5"
  },
  {
    pano: "p1f659O.jpeg",
    answerX: 200,
    answerY: 700,
    name: "Campus spot 6"
  }
  // <-- Add new locations here. Put a comma after the } above,
  //     then paste your new { ... } block.
];
