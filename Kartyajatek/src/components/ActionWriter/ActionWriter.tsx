import React from 'react'

export type ActionProps = {

    weapon: string;
    health: number;
    monsterSlain: number;

}

const ActionWriter = ({ weapon, health, monsterSlain }: ActionProps) => {
    const actionText = `You are wielding a ${weapon}, have ${health} HP, and have slain ${monsterSlain} monsters.`;
  return (
    <div>
      <p>{actionText}</p>
    </div>
  )
}

export default ActionWriter
