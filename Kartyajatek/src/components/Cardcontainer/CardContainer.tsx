import React from 'react'
import { useState, useEffect } from 'react'
import type { Card } from '../../types/Card'
import CardComponent, { getCardCategory, type CardType } from '../Card/Card'
import {createDeck, drawCards } from '../../services/deckApi'
import style from './CardContainer.module.css'
type CardContainerProps = {
  playerHP: number;
  setPlayerHP: React.Dispatch<React.SetStateAction<number>>;

  weapon: Card | null;
  setWeapon: React.Dispatch<React.SetStateAction<Card | null>>;
};


const CardContainer = ({
      playerHP,
      setPlayerHP,
      weapon,
      setWeapon,
    }: CardContainerProps) => {
      const [cards, setCards] = useState<Card[]>([]);

      //Szoba kártyái
      const [roomCards, setRoomCards] = useState([]);
      //Kártxyák pakliból

  useEffect(() => {
    async function startGame() {
      const deck = await createDeck();
      //Húzunk 4 lapot a pakliból mert ig annyi van egy dungeonben
      const drawnCards = await drawCards(deck.deck_id, 4);
      setCards(drawnCards.cards);
    }
    startGame();
    
  }, []);


  const handleCardClick = (card: CardType) => {
  const type = getCardCategory(card.suit);

  const value = Number(card.value);

  console.log(type);

  if (type === "weapon") {
    setWeapon(card);
    return;
  }

  if (type === "potion") {
    setPlayerHP(prev => Math.min(20, prev + value));
    return;
  }


  if (type === "monster") {
    const weaponValue = weapon ? Number(weapon.value) : 0;

    let damage = value - weaponValue;

    if (damage < 0) damage = 0;

    setPlayerHP(prev => prev - damage);

    if (weapon) {
      const newWeaponValue = Number(weapon.value) - value;

      if (newWeaponValue <= 0) {
        setWeapon(null);
      } else {
        setWeapon({
          ...weapon,
          value: String(newWeaponValue),
        });
      }
    }
    //LALALA kitöröljük a kártyát
    setCards(prev =>
    prev.filter(c => c.code !== card.code)
  );
    return;
  }
};

  return (
    
    <div>
        <h1 className={style.roomTitle}>x.edik szoba</h1>
        
        <div className={style.cardContainer}>
        {cards.map((card) => (
        <CardComponent key={card.code} card={card} onClick={handleCardClick} />))}
        </div>



    </div>

  )
}

export default CardContainer