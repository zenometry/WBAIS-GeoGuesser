// ============================================================
// AIS GeoGuessur — SCREENS
// ============================================================
const { useState, useEffect, useRef: useRefS } = React;

/* ---------------- LOGO ---------------- */
function Logo({ size = 26 }) {
  return (
    <span className="logo" style={{ fontSize: size }}>
      <span className="pin" style={{ width: size * 0.92, height: size * 0.92, fontSize: size * 0.5 }}>
        <span>🦅</span>
      </span>
      <span><span className="wm-ais">AIS</span><span className="wm-rest"> GeoGuessur</span></span>
    </span>
  );
}

/* ---------------- START ---------------- */
function StartScreen({ onStart, settings, setSettings, onHelp }) {
  return (
    <div className="start fade-in">
      <div className="start-bg">
        <div style={{
          position: 'absolute', inset: '-6%', filter: 'blur(2px)', opacity: .55,
          maskImage: 'radial-gradient(120% 90% at 50% 30%, #000 30%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(120% 90% at 50% 30%, #000 30%, transparent 78%)',
        }}>
          <div style={{ width: '100%', aspectRatio: '1000/700' }}>
            <CampusMap mode="reveal" />
          </div>
        </div>
      </div>
      <div className="start-scrim"></div>

      <div className="start-topbar">
        <Logo size={24} />
        <div className="topbar-tag">
          <span className="flagdot" style={{ background: '#C8102E' }}></span>
          <span className="flagdot" style={{ background: '#0A2A5E' }}></span>
          <span>WBAIS · Even Yehuda</span>
        </div>
      </div>

      <div className="start-main">
        <span className="eyebrow">NEW EAGLES ORIENTATION</span>
        <h1 className="hero-title">
          <span className="t-ais">FIND YOUR</span><br /><span className="t-geo">WAY @ WBAIS</span>
        </h1>
        <p className="hero-sub">
          New to the nest? See a spot somewhere on the WBAIS campus, then <b>drop a pin</b> where
          you think it is. The closer you guess, the more points you score — learn your way around
          before day one. <b>Go Eagles!</b>
        </p>

        <div className="cta-row">
          <button className="btn btn-primary btn-lg" onClick={onStart}>
            <Icon d={ICONS.play} size={18} /> Start Exploring
          </button>
          <button className="btn btn-ghost btn-lg" onClick={onHelp}>
            <Icon d={ICONS.help} size={18} /> How to play
          </button>
        </div>

        <div className="opt-row">
          <span className="opt-label">Difficulty</span>
          <div className="seg">
            <button className={settings.diff === 'easy' ? 'on' : ''}
                    onClick={() => setSettings(s => ({ ...s, diff: 'easy' }))}>Easy · labels</button>
            <button className={settings.diff === 'normal' ? 'on' : ''}
                    onClick={() => setSettings(s => ({ ...s, diff: 'normal' }))}>Normal</button>
          </div>
          <span className="opt-label" style={{ marginLeft: 8 }}>Timer</span>
          <div className="seg">
            <button className={settings.timer ? 'on' : ''}
                    onClick={() => setSettings(s => ({ ...s, timer: true }))}>On · 60s</button>
            <button className={!settings.timer ? 'on' : ''}
                    onClick={() => setSettings(s => ({ ...s, timer: false }))}>Off</button>
          </div>
        </div>
      </div>

      <div className="start-foot">
        <div className="how-grid">
          <div className="how-card">
            <div className="how-num">1</div>
            <h4>Look around</h4>
            <p>A photo of a real spot on campus appears — the cafeteria, the pool, a classroom wing.</p>
          </div>
          <div className="how-card">
            <div className="how-num">2</div>
            <h4>Drop your pin</h4>
            <p>Open the campus map and click where you think that spot is. Move it until it feels right.</p>
          </div>
          <div className="how-card">
            <div className="how-num">3</div>
            <h4>Score &amp; learn</h4>
            <p>See the real location, how close you were, and a fun fact. Five rounds, one final score.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- PANORAMA PLACEHOLDER ---------------- */
function Pano({ loc, round, total }) {
  return (
    <div className="pano">
      {loc.img
        ? <img className="pano-img" src={loc.img} alt={loc.name} />
        : <div className="pano-placeholder"
               style={{ background: `linear-gradient(135deg, ${loc.c1} 0%, ${loc.c2} 100%)` }}>
            <div className="pano-stripes"></div>
            <div className="pano-watermark"><span className="mark">?</span></div>
            <div className="pano-vignette"></div>
            <div className="pano-cap">
              <div className="q">Where on campus is this?</div>
              <div className="hint">Round <b>{round}</b> of {total} &nbsp;·&nbsp; photo coming soon</div>
            </div>
          </div>
      }
    </div>
  );
}

/* ---------------- GAME ---------------- */
function GameScreen({ round, roundIndex, total, results, settings, onGuess, onQuit }) {
  const [guess, setGuess] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [time, setTime] = useState(settings.timer ? 60 : 0);
  const guessRef = useRefS(null);
  guessRef.current = guess;

  useEffect(() => { setGuess(null); setTime(settings.timer ? 60 : 0); }, [roundIndex]);

  useEffect(() => {
    if (!settings.timer) return;
    const id = setInterval(() => {
      setTime(t => {
        if (t <= 1) { clearInterval(id); submit(guessRef.current, true); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [roundIndex, settings.timer]);

  function submit(pt, timedOut) {
    const g = pt || { x: MAP_W / 2, y: MAP_H / 2, none: !pt };
    const d = dist(g, round);
    const sc = pt ? scoreFor(d) : 0;
    onGuess({ guess: pt || g, score: sc, distUnits: d, location: round, timedOut: !!timedOut && !pt });
  }

  return (
    <div className="game fade-in">
      <Pano loc={round} round={roundIndex + 1} total={total} />

      <div className="hud-top">
        <div className="hud-cluster">
          <div className="hud-pill"><Logo size={18} /></div>
          <div className="progress-dots">
            {Array.from({ length: total }).map((_, i) =>
              <span key={i} className={`pdot ${i < roundIndex ? 'done' : ''} ${i === roundIndex ? 'cur' : ''}`}></span>
            )}
          </div>
        </div>
        <div className="hud-cluster">
          <div className="hud-pill">
            <span className="k">Score</span>
            <span className="v">{results.reduce((a, r) => a + r.score, 0).toLocaleString()}</span>
          </div>
          {settings.timer &&
            <div className={`hud-pill timer ${time <= 10 ? 'low' : ''}`}>
              <span className="k">Time</span>
              <span className="v">0:{String(time).padStart(2, '0')}</span>
            </div>
          }
          <button className="icon-btn" title="Quit to menu" onClick={onQuit}>
            <Icon d={ICONS.close} size={18} />
          </button>
        </div>
      </div>

      <div className="compass">
        <span className="n">N</span>
        <div className="needle"></div>
      </div>

      <div className="minimap-wrap">
        <div className={`minimap ${expanded ? 'expanded' : ''}`}
             onMouseEnter={() => setExpanded(true)}>
          <div className="minimap-head">
            <div className="title">
              <Icon d={ICONS.pin} size={15} /> WBAIS Campus Map
              <span className="chip">{settings.diff === 'easy' ? 'Labels on' : 'Guess mode'}</span>
            </div>
            <button className="minimap-toggle"
                    onClick={e => { e.stopPropagation(); setExpanded(x => !x); }}>
              <Icon d={expanded ? ICONS.shrink : ICONS.expand} size={15} />
            </button>
          </div>
          <CampusMap mode="guess" guess={guess} onPlace={setGuess}
                     showCodes={settings.diff === 'easy'} pinScale={1} />
        </div>
        <div className="guess-btn"
             style={{ width: expanded ? 'clamp(420px,52vw,720px)' : 'clamp(290px,34vw,470px)' }}>
          {guess
            ? <button className="btn btn-primary" onClick={() => submit(guess)}>
                <Icon d={ICONS.flag} size={17} /> Make Guess
              </button>
            : <button className="btn btn-primary disabled" onClick={() => setExpanded(true)}>
                Click the map to drop your pin
              </button>
          }
        </div>
      </div>
    </div>
  );
}

/* ---------------- ROUND RESULT / REVEAL ---------------- */
function RoundResult({ result, roundIndex, total, onNext }) {
  const { guess, score, distUnits, location, timedOut } = result;
  const [barW, setBarW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setBarW(score / MAX_PTS * 100), 120); return () => clearTimeout(t); }, []);
  const meters = metersFrom(distUnits);
  const last = roundIndex + 1 >= total;

  return (
    <div className="reveal-screen fade-in">
      <div className="reveal-map-col">
        <div className="reveal-map pop-in">
          <CampusMap mode="reveal" guess={timedOut ? null : guess}
                     actual={location} showCodes pinScale={1.05} />
        </div>
      </div>
      <div className="reveal-info pop-in">
        <div>
          <div className="score-big">{score.toLocaleString()}<span className="pts">/ 5,000 pts</span></div>
          <div className="score-bar"><div style={{ width: `${barW}%` }}></div></div>
        </div>

        <div className="reveal-loc">
          <div className="badge">{location.code}</div>
          <div>
            <h3>{location.name}</h3>
            <div className="dist">
              {timedOut
                ? "⏱ Out of time — no guess placed"
                : <>Your guess was <b style={{ color: 'var(--text)' }}>{meters} m</b> away</>
              }
            </div>
          </div>
        </div>

        <div className="fact">
          <div className="lab">🦅 Did you know</div>
          <p>{location.fact}</p>
        </div>

        <div className="reveal-actions">
          <button className="btn btn-primary btn-lg" onClick={onNext} style={{ flex: 1 }}>
            {last ? 'See final score' : 'Next round'} <Icon d={ICONS.arrow} size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- FINAL ---------------- */
function FinalScreen({ results, onPlayAgain, onMenu }) {
  const total = results.reduce((a, r) => a + r.score, 0);
  const rank = rankTitle(total, results.length);
  const [name, setName] = useState('');
  const [saved, setSaved] = useState(null);

  function handleSave() {
    const res = saveScore(name.trim(), total);
    setSaved(res);
  }
  const lb = saved ? saved.lb : loadLB();

  return (
    <div className="final fade-in">
      <div className="start-topbar" style={{ maxWidth: 1040, margin: '0 auto', width: '100%' }}>
        <Logo size={22} />
        <div className="topbar-tag"><span>Final results</span></div>
      </div>
      <div className="final-inner">
        <div className="final-hero">
          <div className="final-rankicon float-eagle">{rank.icon}</div>
          <div className="final-title">{rank.title}</div>
          <div className="final-score">{total.toLocaleString()}<small> / {(results.length * MAX_PTS).toLocaleString()}</small></div>
          <p className="final-sub">{rank.sub}</p>

          <div className="rounds-list">
            {results.map((r, i) =>
              <div className="round-row" key={i}>
                <span className="n">{i + 1}</span>
                <span className="nm">{r.location.name}</span>
                <div className="mini-bar"><div style={{ width: `${r.score / MAX_PTS * 100}%` }}></div></div>
                <span className="sc">{r.score.toLocaleString()}</span>
              </div>
            )}
          </div>

          <div className="reveal-actions" style={{ marginTop: 22 }}>
            <button className="btn btn-primary btn-lg" onClick={onPlayAgain} style={{ flex: 1 }}>
              <Icon d={ICONS.play} size={17} /> Play again
            </button>
            <button className="btn btn-ghost btn-lg" onClick={onMenu}>Menu</button>
          </div>
        </div>

        <div className="panel-card">
          <h3>🏆 Eagle Leaderboard</h3>
          {!saved &&
            <div className="name-entry">
              <input value={name} maxLength={14} placeholder="Enter your name…"
                     onChange={e => setName(e.target.value)}
                     onKeyDown={e => { if (e.key === 'Enter') handleSave(); }} />
              <button className="btn btn-primary" onClick={handleSave} style={{ padding: '12px 18px' }}>Save</button>
            </div>
          }
          {lb.slice(0, 8).map((e, i) =>
            <div className={`lb-row ${i === 0 ? 'top1' : ''} ${e.you ? 'you' : ''}`} key={i}>
              <span className="lb-rank">{i + 1}</span>
              <span className="lb-name">{e.name}{e.you && <span className="tag">YOU</span>}</span>
              <span className="lb-score">{e.score.toLocaleString()}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- HELP MODAL ---------------- */
function HelpModal({ onClose }) {
  return (
    <div className="modal-back fade-in" onClick={onClose}>
      <div className="modal pop-in" onClick={e => e.stopPropagation()}>
        <h2>How to play 🦅</h2>
        <p>A quick way for new Eagles to learn the WBAIS campus before the first bell.</p>
        <div className="row"><div><div className="lab">1 · See the spot</div><div className="desc">A photo from somewhere on campus appears full-screen.</div></div></div>
        <div className="row"><div><div className="lab">2 · Drop your pin</div><div className="desc">Click the campus map (bottom-right) where you think it is.</div></div></div>
        <div className="row"><div><div className="lab">3 · Make your guess</div><div className="desc">Hit "Make Guess" — closer pins score up to 5,000 points.</div></div></div>
        <div className="row"><div><div className="lab">4 · Learn &amp; repeat</div><div className="desc">Read the fun fact, then on to the next of 5 rounds.</div></div></div>
        <button className="btn btn-primary btn-lg" onClick={onClose} style={{ width: '100%', marginTop: 20 }}>Got it!</button>
      </div>
    </div>
  );
}

Object.assign(window, { Logo, StartScreen, GameScreen, RoundResult, FinalScreen, HelpModal, Pano });
