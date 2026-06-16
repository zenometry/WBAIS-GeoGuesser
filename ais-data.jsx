// ============================================================
// AIS GeoGuessur — DATA + HELPERS
// ============================================================
// Map coordinate space: 1000 (wide) x 700 (tall). North is up.
// To use REAL photos: add `img: "your-photo.jpg"` to any location
// below and drop the file in the project — it renders instead of
// the placeholder panorama.
// ============================================================

const MAP_W = 1000, MAP_H = 700;

// Guessable spots. x/y = true location on the campus map.
const LOCATIONS = [
  { id:'field',  name:'Athletic Field',          code:'FIELD',  x:215, y:150, c1:'#5AA259', c2:'#3C7E45',
    fact:"Home turf for the WBAIS Falcons — soccer, track and field days all happen here. It's the biggest open space on campus." },
  { id:'pool',   name:'Olympic Pool',             code:'POOL',   x:660, y:128, c1:'#3FA0CE', c2:'#1F6E9C',
    img:'PXL_20260602_095025885.PHOTOSPHERE.jpg',
    fact:"WBAIS has an Olympic-sized swimming pool used for PE and the swim team. Not many schools in Israel can say that!" },
  { id:'tennis', name:'Tennis Courts',            code:'TENNIS', x:438, y:120, c1:'#C97A4E', c2:'#9C5733',
    fact:"The campus has tennis courts plus basketball courts — part of the athletics complex on the north side." },
  { id:'pac',    name:'Performing Arts Center',   code:'PAC',    x:335, y:248, c1:'#7E6BC4', c2:'#52429C',
    img:'PXL_20260602_094536204.PHOTOSPHERE.jpg',
    fact:"A 400-seat auditorium hosts plays, concerts and assemblies. The drama and music programs basically live here." },
  { id:'gym',    name:'Gymnasium',                code:'GYM',    x:822, y:215, c1:'#D08A4A', c2:'#A6622C',
    img:'PXL_20260602_095317048.PHOTOSPHERE.jpg',
    fact:"The double gymnasium fits full basketball and volleyball courts, plus seating for Falcons home games and pep rallies." },
  { id:'bball',  name:'Basketball Courts',        code:'BBALL',  x:565, y:268, c1:'#E0913E', c2:'#B86C24',
    img:'basketball-court.jpeg',
    fact:"Outdoor courts where pick-up games happen at recess and lunch. A favourite hangout when the weather's nice — which is often." },
  { id:'early',  name:'Early Years Building',     code:'EY',     x:182, y:548, c1:'#E0913E', c2:'#C26A2E',
    fact:"Preschool & Early Years (PK3–KG). It moved to the Even Yehuda campus in 2007 so the littlest Falcons are part of campus life." },
  { id:'elem',   name:'Elementary School',        code:'ES',     x:188, y:372, c1:'#5C82C4', c2:'#39579C',
    img:'PXL_20260602_093739045.PHOTOSPHERE.jpg',
    fact:"Elementary classrooms for the younger grades, with their own playground and entrance on the west side of campus." },
  { id:'lib',    name:'Library & Media Center',   code:'LIB',    x:500, y:398, c1:'#D85A6A', c2:'#A53546',
    img:'Qw5UR91.jpeg',
    fact:"The Library & Media Center sits at the heart of campus — books, computers, study nooks and a great place to meet up." },
  { id:'middle', name:'Middle School',            code:'MS',     x:762, y:378, c1:'#5C82C4', c2:'#39579C',
    fact:"Middle School covers grades 6–8. Its own wing helps new MS students find their footing before high school." },
  { id:'high',   name:'High School',              code:'HS',     x:822, y:548, c1:'#D85A6A', c2:'#A53546',
    img:'p1f659O.jpeg',
    fact:"The High School (grades 9–12) leads to a U.S. high school diploma — WBAIS is the only U.S.-accredited school in Israel." },
  { id:'cafe',   name:'Cafeteria',                code:'CAF',    x:560, y:540, c1:'#D9A23E', c2:'#B07A1E',
    fact:"Lunch HQ and the unofficial social centre of campus. Students from 40+ nationalities share tables here every day." },
  { id:'plaza',  name:'Falcon Plaza',             code:'PLAZA',  x:492, y:472, c1:'#C8102E', c2:'#8E0B20',
    fact:"The central courtyard — look for the WBAIS Falcon. Everyone passes through here between classes, so learn it first!" },
  { id:'gate',   name:'Main Entrance',            code:'GATE',   x:500, y:646, c1:'#7C8AA6', c2:'#566480',
    fact:"The main gate and security checkpoint. Every WBAIS day starts and ends here, just off the road in Even Yehuda." },
];

// Building footprints for drawing the stylized map (center x/y, w/h).
const BUILDINGS = [
  { id:'field',  type:'field',    x:215, y:150, w:300, h:175 },
  { id:'pool',   type:'pool',     x:660, y:128, w:200, h:120 },
  { id:'tennis', type:'tennis',   x:438, y:120, w:150, h:120 },
  { id:'bball',  type:'bball',    x:565, y:268, w:120, h:78 },
  { id:'gym',    type:'gym',      x:822, y:215, w:190, h:150 },
  { id:'pac',    type:'building', x:335, y:248, w:175, h:120, accent:'#7E6BC4' },
  { id:'elem',   type:'building', x:188, y:372, w:175, h:135, accent:'#5C82C4' },
  { id:'early',  type:'building', x:182, y:548, w:175, h:120, accent:'#E0913E' },
  { id:'lib',    type:'building', x:500, y:398, w:165, h:110, accent:'#D85A6A' },
  { id:'middle', type:'building', x:762, y:378, w:175, h:130, accent:'#5C82C4' },
  { id:'high',   type:'building', x:822, y:548, w:185, h:135, accent:'#D85A6A' },
  { id:'cafe',   type:'building', x:560, y:540, w:160, h:105, accent:'#D9A23E' },
  { id:'plaza',  type:'plaza',    x:492, y:472, w:120, h:90 },
  { id:'gate',   type:'gate',     x:500, y:646, w:150, h:46 },
];

// decorative trees (small circles)
const TREES = [
  [70,250],[95,300],[72,470],[110,640],[360,400],[400,470],[420,540],
  [650,300],[690,470],[710,540],[930,400],[915,470],[640,640],[760,640],
  [310,140],[120,150],[930,128],[490,210],
];

// pathways (simple walkways)
const PATHS = [
  "M500 700 L500 540 L500 472",
  "M500 472 L188 472 L188 410",
  "M500 472 L822 472 L822 480",
  "M500 398 L500 472",
  "M188 472 L188 548",
  "M335 308 L335 360 L500 360",
  "M565 307 L565 398",
  "M660 188 L660 300 L560 300 L560 488",
  "M438 180 L438 300 L500 300",
  "M822 290 L822 472",
];

// ---- scoring ----
const MAX_PTS = 5000;
const METERS_PER_UNIT = 0.26;
function dist(a,b){ return Math.hypot(a.x-b.x, a.y-b.y); }
function metersFrom(units){ return Math.round(units * METERS_PER_UNIT); }
function scoreFor(units){
  const m = units * METERS_PER_UNIT;
  const s = MAX_PTS * Math.exp(-m/55);
  return Math.max(0, Math.round(s));
}

// ---- panoramas ----
// Every available equirectangular photosphere on campus. Each round is shown
// one of these, chosen at random, so the player always sees a real 360° photo
// instead of the "photo coming soon" placeholder.
const PANO_POOL = [
  'PXL_20260602_093739045.PHOTOSPHERE.jpg',
  'PXL_20260602_094536204.PHOTOSPHERE.jpg',
  'PXL_20260602_095025885.PHOTOSPHERE.jpg',
  'PXL_20260602_095317048.PHOTOSPHERE.jpg',
  'basketball-court.jpeg',
  'p1f659O.jpeg',
  'Qw5UR91.jpeg',
];

function shuffle(arr){
  const a = arr.slice();
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}

// ---- rounds ----
function pickRounds(n){
  const chosen = shuffle(LOCATIONS).slice(0, n);
  // Hand out a freshly shuffled photosphere to each round (distinct while the
  // pool lasts, then cycling) so the displayed image is randomised.
  const panos = shuffle(PANO_POOL);
  return chosen.map((loc, i) => ({ ...loc, img: panos[i % panos.length] }));
}

// ---- leaderboard (localStorage) ----
const LB_KEY = 'wbais_geo_leaderboard_v1';
const SEED_LB = [
  { name:'Maya R.',   score:21840 },
  { name:'Eitan K.',  score:20110 },
  { name:'Sophia L.', score:18750 },
  { name:'Noam B.',   score:16320 },
  { name:'Dani P.',   score:14200 },
];
function loadLB(){
  try{ const raw = localStorage.getItem(LB_KEY); if(raw) return JSON.parse(raw); }catch(e){}
  return SEED_LB.slice();
}
function saveScore(name, score){
  const lb = loadLB();
  const entry = { name: name || 'New Falcon', score, you:true, ts:Date.now() };
  lb.forEach(e=>delete e.you);
  lb.push(entry);
  lb.sort((a,b)=>b.score-a.score);
  const trimmed = lb.slice(0, 20);
  try{ localStorage.setItem(LB_KEY, JSON.stringify(trimmed.map(({you,...r})=>({...r})))); }catch(e){}
  return { lb: trimmed, rank: trimmed.findIndex(e=>e.ts===entry.ts)+1 };
}

// ---- rank titles ----
function rankTitle(total, rounds){
  const avg = total / rounds;
  if(avg >= 4500) return { icon:'🦅', title:'Campus Legend',  sub:"You know WBAIS like the back of your hand. Are you sure you're new?" };
  if(avg >= 3500) return { icon:'⭐', title:'Falcon Scout',    sub:"Seriously good. You'll never be late to class." };
  if(avg >= 2400) return { icon:'🧭', title:'Getting Around',  sub:"Solid sense of direction — a few more laps and you've got it." };
  if(avg >= 1300) return { icon:'🗺️', title:'New Explorer',    sub:"You're finding your way. Play again to learn the tricky spots." };
  return { icon:'🌱', title:'Fresh Arrival', sub:"Welcome to WBAIS! Everyone starts here — give it another go." };
}

// tiny inline icon set (stroke-based, no complex art)
const Icon = ({d, size=20, sw=2, fill='none'}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor"
       strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);
const ICONS = {
  play:  <polygon points="6 4 20 12 6 20 6 4" fill="currentColor" stroke="none" />,
  expand:<><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></>,
  shrink:<><polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" y1="10" x2="21" y2="3"/><line x1="3" y1="21" x2="10" y2="14"/></>,
  close: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
  gear:  <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
  help:  <><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
  flag:  <><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></>,
  arrow: <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
  pin:   <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>,
};

Object.assign(window, {
  MAP_W, MAP_H, LOCATIONS, BUILDINGS, TREES, PATHS,
  MAX_PTS, dist, metersFrom, scoreFor, pickRounds,
  loadLB, saveScore, rankTitle, Icon, ICONS,
});
