/*
  =========================================================
  CAMPUSQUEST GAME LOGIC
  =========================================================
  This file runs the game. Most students won't need to edit
  this — to add locations, edit js/locations.js instead.

  If you DO want to change how the game behaves (scoring,
  number of rounds, etc.), this is the place.
  =========================================================
*/

// ---- Game state ----
let current = 0;       // which location we're on
let guessX = null;     // player's guess, in full-image pixels
let guessY = null;
let viewer;            // the Pannellum panorama viewer
let guessLocked = false; // stops re-guessing after submitting

// ---- Tuning: change these to adjust scoring ----
const MAX_SCORE = 5000;
const SCORE_FALLOFF = 4; // higher = harsher penalty for distance

// Grab elements once
const mapEl = document.getElementById("map");
const pinEl = document.getElementById("pin");
const correctPinEl = document.getElementById("correctPin");
const lineLayerEl = document.getElementById("lineLayer");
const distanceLineEl = document.getElementById("distanceLine");
const resultEl = document.getElementById("result");

// ---- Load the current location ----
function loadLocation() {
  resultEl.innerText = "";
  pinEl.style.display = "none";
  correctPinEl.style.display = "none";
  lineLayerEl.style.display = "none";

  guessX = null;
  guessY = null;
  guessLocked = false;

  if (viewer) {
    viewer.destroy();
  }

  viewer = pannellum.viewer("panorama", {
    type: "equirectangular",
    panorama: locations[current].pano,
    autoLoad: true,
    showControls: true
  });
}

// ---- Convert full-image pixels to on-screen pixels ----
// The map may be displayed smaller than its true size, so we
// scale between "natural" (true) pixels and displayed pixels.
function toDisplayCoords(naturalX, naturalY) {
  const rect = mapEl.getBoundingClientRect();
  return {
    x: naturalX / mapEl.naturalWidth * rect.width,
    y: naturalY / mapEl.naturalHeight * rect.height
  };
}

// ---- Handle a click on the map ----
mapEl.addEventListener("click", function(event) {
  if (guessLocked) return;          // already submitted this round
  if (!mapEl.naturalWidth) return;  // image not loaded yet

  const rect = mapEl.getBoundingClientRect();
  const scaleX = mapEl.naturalWidth / rect.width;
  const scaleY = mapEl.naturalHeight / rect.height;

  // Store the guess in full-image pixels
  guessX = (event.clientX - rect.left) * scaleX;
  guessY = (event.clientY - rect.top) * scaleY;

  // Show the pin where they clicked (in screen pixels)
  pinEl.style.left = (event.clientX - rect.left) + "px";
  pinEl.style.top = (event.clientY - rect.top) + "px";
  pinEl.style.display = "block";
});

// ---- Submit the guess and score it ----
function submitGuess() {
  if (guessX === null || guessY === null) {
    resultEl.innerText = "Click the map first!";
    return;
  }

  guessLocked = true;

  const correctX = locations[current].answerX;
  const correctY = locations[current].answerY;

  // Draw the correct flag and the line, in display coordinates
  const correct = toDisplayCoords(correctX, correctY);
  const guess = toDisplayCoords(guessX, guessY);

  correctPinEl.style.left = correct.x + "px";
  correctPinEl.style.top = correct.y + "px";
  correctPinEl.style.display = "block";

  distanceLineEl.setAttribute("x1", guess.x);
  distanceLineEl.setAttribute("y1", guess.y);
  distanceLineEl.setAttribute("x2", correct.x);
  distanceLineEl.setAttribute("y2", correct.y);
  lineLayerEl.style.display = "block";

  // Score is based on distance in full-image pixels
  const distance = Math.sqrt(
    Math.pow(guessX - correctX, 2) + Math.pow(guessY - correctY, 2)
  );
  const score = Math.max(0, Math.round(MAX_SCORE - distance * SCORE_FALLOFF));

  resultEl.innerText =
    "Location: " + locations[current].name +
    " | Score: " + score + "/" + MAX_SCORE;
}

// ---- Move to the next location ----
function nextLocation() {
  current = (current + 1) % locations.length;
  loadLocation();
}

// ---- Wire up the buttons ----
document.getElementById("submitBtn").addEventListener("click", submitGuess);
document.getElementById("nextBtn").addEventListener("click", nextLocation);

// ---- Start the game ----
loadLocation();
