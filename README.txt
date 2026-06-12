All image files live in this folder (same folder as index.html) and are
committed to the repo, so the game works straight from the repo with no
download step:

  map.jpeg                              -> the campus map
  basketball-court.jpeg                 -> a 360° panorama
  PXL_20260602_093739045.PHOTOSPHERE.jpg-> a 360° panorama
  PXL_20260602_094536204.PHOTOSPHERE.jpg-> a 360° panorama
  PXL_20260602_095025885.PHOTOSPHERE.jpg-> a 360° panorama
  PXL_20260602_095317048.PHOTOSPHERE.jpg-> a 360° panorama
  Qw5UR91.jpeg                          -> a 360° panorama
  p1f659O.jpeg                          -> a 360° panorama
  ...                                   -> add more as you add locations

The file names here must match the "pano" values in locations.js (and the
map src in index.html). To add a location, drop the image in this folder
and add a block in locations.js — no Imgur, no external hosting needed.
