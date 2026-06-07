import React from 'react'
import style from './Player.module.css'

type PlayerProps = {
    health: number;
    weapon: string;
    monsterSlain: number;
}

const Player = ({ health, weapon, monsterSlain }: PlayerProps) => {
  return (
    <div className={style.player}>
      <div>Health❤️: {health}</div>
      <div>Weapon⚔️: {weapon}</div>
      <div>Monsters Slain☠️: {monsterSlain}</div>
    </div>
  )
}

export default Player