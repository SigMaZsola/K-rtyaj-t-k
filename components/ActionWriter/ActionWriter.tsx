import React, { useEffect, useState } from 'react'
import style from './ActionWriter.module.css'

export type ActionProps = {

    weapon: string;
    health: number;
    setStart: React.Dispatch<React.SetStateAction<boolean>>;
    setMonsterSlain: React.Dispatch<React.SetStateAction<number>>;
    setPlayerHP: React.Dispatch<React.SetStateAction<number>>;
    monsterSlain: number;
}

const ActionWriter = ({ weapon, health, monsterSlain, setStart, setPlayerHP, setMonsterSlain }: ActionProps) => {
  const [message, setMessage] = useState("");
  useEffect(() => {
  if (health > 0) {
    setMessage(
      `You are wielding a ${weapon}, have ${health} HP, and have slain ${monsterSlain} monsters.`
    );
  } else {
    setMessage("You lose!");

    const timer = setTimeout(() => {
      setPlayerHP(20);
      setMonsterSlain(0);
      setStart(false);
      
    }, 2000);

    return () => clearTimeout(timer);
  }
}, [health, weapon, monsterSlain, setStart]);
  return (
<div
    key={message}
    className={style.actionWriter}
  >
    {message}
  </div>
  )
}

export default ActionWriter
