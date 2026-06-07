import React from 'react'
import style from './Card.module.css'

export type CardType = {
    
    code: string;
    image: string;
    value: string;
    suit: string;
}

//Eldönit hogy melyiok kártya milyen típusú

export type CardCategory =
  | "monster"
  | "weapon"
  | "potion";

export function getCardCategory(suit: string): CardCategory {
  switch (suit) {
    case "SPADES":
    case "CLUBS":
      return "monster";

    case "DIAMONDS":
      return "weapon";

    case "HEARTS":
      return "potion";

    default:
      throw new Error("Unknown suit");
  }
}

type CardProps = {
  card: CardType;
  onClick: (card: CardType) => void;
};

const Card = ({ card, onClick }: CardProps) => {
  return (
    <div
      className={style.card}
      onClick={() => onClick(card)}
    >
      <img src={card.image} alt={card.value} />
    </div>
  );
};

export default Card