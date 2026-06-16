// ============================================================
// AIS GeoGuessur — CAMPUS MAP (SVG)
// ============================================================
const { useRef } = React;

function MapPin({ x, y, color='#C8102E', scale=1, drop=false, label }){
  // Outer <g> holds the positioning transform; the inner <g> carries the
  // drop animation. They MUST be separate: the CSS keyframes animate the
  // `transform` property, which would otherwise override this positioning
  // transform and snap the pin to the SVG origin.
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <g className={`pin-marker ${drop?'pin-drop':''}`}>
        <ellipse cx="0" cy="2" rx="9" ry="3.4" fill="rgba(0,0,0,.25)" />
        <path d="M0 0 C-13 -20 -13 -34 0 -42 C13 -34 13 -20 0 0 Z"
              fill={color} stroke="#fff" strokeWidth="2.4" />
        <circle cx="0" cy="-29" r="5.4" fill="#fff" />
        {label && (
          <text x="0" y="-25.6" textAnchor="middle" fontSize="7.4" fontWeight="700"
                fontFamily="Fredoka, sans-serif" fill={color}>{label}</text>
        )}
      </g>
    </g>
  );
}

function Building({ b, showCode }){
  const { x, y, w, h, type } = b;
  const X = x - w/2, Y = y - h/2, r = 9;

  if(type === 'field'){
    return (
      <g>
        <rect x={X} y={Y} width={w} height={h} rx="12" fill="#6FB86A" stroke="#4E9A4E" strokeWidth="2.5" />
        <rect x={X+10} y={Y+10} width={w-20} height={h-20} rx="6" fill="none" stroke="#fff" strokeWidth="2" opacity=".75" />
        <line x1={x} y1={Y+10} x2={x} y2={Y+h-10} stroke="#fff" strokeWidth="2" opacity=".75" />
        <circle cx={x} cy={y} r="20" fill="none" stroke="#fff" strokeWidth="2" opacity=".75" />
        <rect x={X+10} y={y-16} width="6" height="32" fill="none" stroke="#fff" strokeWidth="1.6" opacity=".7" />
        <rect x={X+w-16} y={y-16} width="6" height="32" fill="none" stroke="#fff" strokeWidth="1.6" opacity=".7" />
      </g>
    );
  }
  if(type === 'pool'){
    return (
      <g>
        <rect x={X} y={Y} width={w} height={h} rx="14" fill="#46AAD6" stroke="#2E93C2" strokeWidth="2.5" />
        {[1,2,3,4].map(i=>(
          <line key={i} x1={X+8} y1={Y + (h/5)*i} x2={X+w-8} y2={Y + (h/5)*i}
                stroke="#EAF6FB" strokeWidth="2.2" opacity=".7" strokeDasharray="3 9" />
        ))}
      </g>
    );
  }
  if(type === 'tennis'){
    return (
      <g>
        <rect x={X} y={Y} width={w} height={h} rx="8" fill="#C97A4E" stroke="#9C5733" strokeWidth="2.5" />
        <rect x={X+12} y={Y+12} width={w-24} height={h-24} fill="none" stroke="#fff" strokeWidth="1.8" opacity=".8" />
        <line x1={x} y1={Y+6} x2={x} y2={Y+h-6} stroke="#fff" strokeWidth="2" opacity=".85" strokeDasharray="2 4" />
      </g>
    );
  }
  if(type === 'bball'){
    return (
      <g>
        <rect x={X} y={Y} width={w} height={h} rx="8" fill="#E0913E" stroke="#B86C24" strokeWidth="2.5" />
        <line x1={x} y1={Y+6} x2={x} y2={Y+h-6} stroke="#fff" strokeWidth="1.6" opacity=".8" />
        <circle cx={x} cy={y} r="13" fill="none" stroke="#fff" strokeWidth="1.6" opacity=".8" />
      </g>
    );
  }
  if(type === 'gym'){
    return (
      <g>
        <rect x={X} y={Y} width={w} height={h} rx={r} fill="#E3A35C" stroke="#B0712E" strokeWidth="2.5" />
        <path d={`M${X} ${Y+14} L${x} ${Y-6} L${X+w} ${Y+14}`} fill="#D08A4A" stroke="#B0712E" strokeWidth="2.5" strokeLinejoin="round" />
        {showCode && <text x={x} y={y+18} textAnchor="middle" className="mono" fontSize="15" fontWeight="700" fill="#6A3D12">{b.code||'GYM'}</text>}
      </g>
    );
  }
  if(type === 'plaza'){
    return (
      <g>
        <rect x={X} y={Y} width={w} height={h} rx="16" fill="#EFE7D2" stroke="#CFC4A6" strokeWidth="2.5" />
        <circle cx={x} cy={y} r="26" fill="#fff" stroke="#C8102E" strokeWidth="2.5" />
        <text x={x} y={y+9} textAnchor="middle" fontSize="26">🦅</text>
      </g>
    );
  }
  if(type === 'gate'){
    return (
      <g>
        <rect x={X} y={Y} width={w} height={h} rx="8" fill="#9AA6BC" stroke="#6E7B92" strokeWidth="2.5" />
        <line x1={x} y1={Y+6} x2={x} y2={Y+h-6} stroke="#fff" strokeWidth="2" opacity=".6" />
        {showCode && <text x={x} y={y+5} textAnchor="middle" className="mono" fontSize="13" fontWeight="700" fill="#3A4456">GATE</text>}
      </g>
    );
  }
  // default building with simple roof
  const accent = b.accent || '#C0607A';
  return (
    <g>
      <rect x={X} y={Y+10} width={w} height={h-10} rx={r} fill="#F6F1E5" stroke="#D8CFB8" strokeWidth="2.5" />
      <path d={`M${X-4} ${Y+16} L${x} ${Y-4} L${X+w+4} ${Y+16} Z`} fill={accent} stroke={shade(accent)} strokeWidth="2.5" strokeLinejoin="round" />
      <rect x={X} y={Y+16} width={w} height="7" fill={accent} opacity=".9" />
      {showCode
        ? <text x={x} y={y+24} textAnchor="middle" className="mono" fontSize="15" fontWeight="700" fill={shade(accent)}>{b.code}</text>
        : <>
            <rect x={x-w*0.28} y={Y+34} width={w*0.2} height={h*0.32} rx="2" fill={accent} opacity=".28" />
            <rect x={x+w*0.08} y={Y+34} width={w*0.2} height={h*0.32} rx="2" fill={accent} opacity=".28" />
          </>}
    </g>
  );
}

function shade(hex){
  const n = parseInt(hex.slice(1),16);
  let r=(n>>16)&255, g=(n>>8)&255, b=n&255;
  r=Math.round(r*.7); g=Math.round(g*.7); b=Math.round(b*.7);
  return `rgb(${r},${g},${b})`;
}

/* Preview flag shown before the guess is submitted */
function FlagPin({ x, y }){
  // Positioning lives on the outer <g>; the drop animation on the inner <g>.
  // (The CSS `pin-drop` keyframes animate `transform`, so keeping them on the
  // same node as the translate would override it and drop the flag at 0,0.)
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="pin-marker pin-drop">
        <ellipse cx="0" cy="2" rx="8" ry="3" fill="rgba(0,0,0,.28)" />
        {/* pole */}
        <line x1="0" y1="0" x2="0" y2="-40" stroke="#C8102E" strokeWidth="2.8" strokeLinecap="round" />
        {/* flag */}
        <path d="M0 -40 L20 -32 L0 -24 Z" fill="#C8102E" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
        {/* base */}
        <circle cx="0" cy="0" r="4.5" fill="#C8102E" stroke="#fff" strokeWidth="2" />
      </g>
    </g>
  );
}

function CampusMap({ mode='guess', guess, actual, onPlace, showCodes=false, pinScale=1 }){
  const containerRef = useRef(null);

  function handleClick(e){
    if(mode !== 'guess' || !onPlace) return;
    const rect = containerRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width * MAP_W;
    const py = (e.clientY - rect.top) / rect.height * MAP_H;
    onPlace({ x: Math.max(4, Math.min(MAP_W-4, px)), y: Math.max(4, Math.min(MAP_H-4, py)) });
  }

  return (
    <div ref={containerRef}
         className={`map-canvas ${mode==='reveal'?'reveal':''}`}
         style={{ position:'relative' }}
         onClick={handleClick}>
      {/* real campus map photo */}
      <img src="map.jpeg" alt="WBAIS campus map"
           draggable="false"
           style={{ position:'absolute', inset:0, width:'100%', height:'100%',
                    objectFit:'fill', display:'block', userSelect:'none' }} />
      {/* SVG overlay for pins and lines only */}
      <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', overflow:'visible' }}
           viewBox={`0 0 ${MAP_W} ${MAP_H}`} preserveAspectRatio="none">
        {mode==='reveal' && guess && actual && (
          <line x1={guess.x} y1={guess.y} x2={actual.x} y2={actual.y}
                className="dash-line" stroke="#0A2A5E" strokeWidth="3" strokeLinecap="round" opacity=".85" />
        )}
        {mode==='reveal' && actual && (
          <MapPin x={actual.x} y={actual.y} color="#1F8A4C" scale={pinScale} drop />
        )}
        {mode==='reveal' && guess && (
          <MapPin x={guess.x} y={guess.y} color="#C8102E" scale={pinScale} />
        )}
        {mode==='guess' && guess && (
          <FlagPin x={guess.x} y={guess.y} />
        )}
      </svg>
    </div>
  );
}

Object.assign(window, { CampusMap, MapPin, FlagPin });
