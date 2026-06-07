import React from 'react'
import style from './ActionWriter.module.css'

export type ActionProps = {

    weapon: string;
    health: number;
    monsterSlain: number;

}

const ActionWriter = ({ weapon, health, monsterSlain }: ActionProps) => {
    const message = `You are wielding a ${weapon}, have ${health} HP, and have slain ${monsterSlain} monsters.`;
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
