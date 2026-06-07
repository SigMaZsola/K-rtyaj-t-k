import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import type { Card } from './types/Card'
import CardContainer from './components/Cardcontainer/CardContainer'
import ActionWriter from './components/ActionWriter/ActionWriter'


function App() {

  //Játék kezdése
  const [start, setStart] = useState(false);

  const [playerHP, setPlayerHP] = useState(20);
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
          weapon={weapon ? weapon.value : "none"}
          health={playerHP}
          monsterSlain={0}
        />
      </>
    )}
    </div>
  );

}

export default App
