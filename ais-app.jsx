// ============================================================
// AIS GeoGuessur — APP STATE MACHINE
// ============================================================
const { useState: useStateA } = React;

const ROUNDS = 5;

function App(){
  const [screen, setScreen] = useStateA('start');   // start | play | result | final
  const [settings, setSettings] = useStateA({ diff:'easy', timer:true });
  const [rounds, setRounds] = useStateA([]);
  const [idx, setIdx] = useStateA(0);
  const [results, setResults] = useStateA([]);
  const [help, setHelp] = useStateA(false);

  function startGame(){
    setRounds(pickRounds(ROUNDS));
    setIdx(0);
    setResults([]);
    setScreen('play');
  }
  function handleGuess(result){
    setResults(r=>[...r, result]);
    setScreen('result');
  }
  function nextRound(){
    if(idx+1 >= ROUNDS){ setScreen('final'); }
    else { setIdx(i=>i+1); setScreen('play'); }
  }
  function quit(){ setScreen('start'); }

  return (
    <div className="stage">
      {screen==='start' && (
        <StartScreen onStart={startGame} settings={settings} setSettings={setSettings} onHelp={()=>setHelp(true)} />
      )}

      {screen==='play' && rounds[idx] && (
        <GameScreen
          round={rounds[idx]} roundIndex={idx} total={ROUNDS}
          results={results} settings={settings}
          onGuess={handleGuess} onQuit={quit} />
      )}

      {screen==='result' && results[idx] && (
        <RoundResult result={results[idx]} roundIndex={idx} total={ROUNDS} onNext={nextRound} />
      )}

      {screen==='final' && (
        <FinalScreen results={results} onPlayAgain={startGame} onMenu={quit} />
      )}

      {help && <HelpModal onClose={()=>setHelp(false)} />}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
