import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import type { Card } from './types/Card'
import CardContainer from './components/Cardcontainer/CardContainer'
import ActionWriter from './components/ActionWriter/ActionWriter'
import Player from './components/Player/Player'


function App() {

  //Játék kezdése
  const [start, setStart] = useState(false);
  const [gameOver, setGameOver] = useState(false);


  const [playerHP, setPlayerHP] = useState(20);
  const [monsterSlain, setMonsterSlain] = useState(0);

  const [weapon, setWeapon] = useState<Card | null>(null);
  return (
    <div>
      {/* Kimapeljük a kártyákat */}
    {!start ? (
      <button onClick={() => setStart(true)}>Start Game</button>
    ) : (
      <>
        <CardContainer
          playerHP={playerHP}
          setPlayerHP={setPlayerHP}
          weapon={weapon}
          setWeapon={setWeapon}
        />

      <ActionWriter
        key={`${weapon}-${playerHP}-${monsterSlain}`}
        weapon={weapon ? weapon.value : "none"}
        health={playerHP}
        monsterSlain={monsterSlain}
      />
      <Player health={playerHP} weapon={weapon ? weapon.value : "none"} monsterSlain={monsterSlain} />
      </>
    )}
    </div>
  );

}

export default App
