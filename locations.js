/*
  =========================================================
  CAMPUSQUEST LOCATIONS
  =========================================================
  This is the ONLY file you need to edit to add new locations.
  You do NOT need to touch game.js or index.html.

  HOW TO ADD A LOCATION:
  1. Take a 360° photo (equirectangular panorama) and put it
     in the images/ folder, e.g. images/cafeteria.jpg
  2. Figure out the correct spot on the map:
       - Open images/map.jpeg and find the pixel coordinates
         of the location. answerX is pixels from the LEFT,
         answerY is pixels from the TOP, measured on the
         FULL-SIZE image.
  3. Copy one of the blocks below, paste it, and change the
     four values. Don't forget the comma between blocks.

  Each location needs:
    pano    -> path to the panorama image
    answerX -> correct horizontal pixel position on the map
    answerY -> correct vertical pixel position on the map
    name    -> the location's name (shown after guessing)
  =========================================================
*/

const locations = [
  {
    pano: "images/basketball-court.jpeg",
    answerX: 1213,
    answerY: 682,
    name: "Basketball court"
  },
  {
    pano: "images/under-the-library.jpeg",
    answerX: 1072,
    answerY: 656,
    name: "Under the Library"
  },
  {
    pano: "images/art-exhibit.jpeg",
    answerX: 773,
    answerY: 540,
    name: "Art Exhibit"
  }
  // <-- Add new locations here. Put a comma after the } above,
  //     then paste your new { ... } block.
];
