import React from 'react'
import { useState, useEffect } from 'react'
import type { Card } from '../../types/Card'
import CardComponent, { getCardCategory, type CardType } from '../Card/Card'
import { createDeck, drawCards } from '../../services/deckApi'
import style from './CardContainer.module.css'

type CardContainerProps = {
  playerHP: number
  setPlayerHP: React.Dispatch<React.SetStateAction<number>>

  weapon: Card | null
  setWeapon: React.Dispatch<React.SetStateAction<Card | null>>

    monsterSlain: number;
  setMonsterSlain: React.Dispatch<React.SetStateAction<number>>;
}

const CardContainer = ({
  playerHP,
  setPlayerHP,
  weapon,
  setWeapon,
    monsterSlain,
  setMonsterSlain,
}: CardContainerProps) => {

  const [deckId, setDeckId] = useState<string>("");

  const [cards, setCards] = useState<Card[]>([])

  //Szoba kártyái
  const [roomCards, setRoomCards] = useState<Card[]>([])
  const [roomNuber, setRoomNumber] = useState(1);
  //Kártxyák pakliból

  useEffect(() => {
    async function startGame() {
      const deck = await createDeck()

      //Húzunk 4 lapot a pakliból mert ig annyi van egy dungeonben
      const drawnCards = await drawCards(deck.deck_id, 4)

      setCards(drawnCards.cards)
    }

    startGame()
  }, [])

  useEffect(() => {
    async function startGame() {
      const deck = await createDeck();

      setDeckId(deck.deck_id);

      const drawnCards = await drawCards(deck.deck_id, 4);

      setCards(drawnCards.cards);
    }

    startGame();
  }, []);

  useEffect(() => {
  async function nextRoom() {
    if (cards.length === 0 && deckId) {
      const drawnCards = await drawCards(deckId, 4);

      if (drawnCards.cards.length > 0) {
        setCards(drawnCards.cards);
        setRoomNumber(prev => prev + 1);
      }
    }
  }

  nextRoom();
}, [cards, deckId]);

useEffect(() => {
  if (cards.length === 0 && deckId) {
    generateNewRoom();
  }
}, [cards]);
const generateNewRoom = async () => {
  const drawnCards = await drawCards(deckId, 4);

  if (drawnCards.cards.length > 0) {
    setCards(drawnCards.cards);

  }
};

  //Idc a szabályok, nem tudok egy kártyajátékot sem az UNO-n kívül és túl stresszes megtanulni

const getCardValue = (value: string): number => {
  switch (value) {
    case "ACE":
      return 14

    case "KING":
      return 13

    case "QUEEN":
      return 12

    case "JACK":
      return 11

    default:
      return Number(value)
  }
}

const removeCard = (cardCode: string) => { setCards(prev => prev.filter(card => card.code !== cardCode)) }

  const handleCardClick = (card: CardType) => {
    const type = getCardCategory(card.suit)
    const value = getCardValue(card.value)

    console.log(type)

    if (type === 'weapon') {
      setWeapon(card)
      removeCard(card.code)
      return
    }

  if (type === "potion") {
    console.log("Potion:", card.value, value);

    setPlayerHP(prev => {
      const next = Math.min(20, prev + value);
      console.log("HP:", prev, "->", next);
      return next;
    });

    removeCard(card.code);
    return;
  }

    if (type === 'monster') {
      const weaponValue = weapon ? getCardValue(weapon.value) : 0

      let damage = value - weaponValue

      if (damage < 0) {
        damage = 0
      }

      setPlayerHP(prev => prev - damage)

      if (weapon) {
        const newWeaponValue = weaponValue - value

        if (newWeaponValue <= 0) {
          setWeapon(null)
        } else {
          setWeapon({
            ...weapon,
            value: String(newWeaponValue),
          })
        }
      }

      //LALALA kitöröljük a kártyát
      removeCard(card.code)
      setMonsterSlain(prev => prev + 1);

      return
    }
  }

  return (
    <div>
      <h1 className={style.roomTitle}>{roomNuber}. room</h1>

      <div className={style.cardContainer}>
        {cards.map(card => (
          <CardComponent
            key={card.code}
            card={card}
            onClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  )
}

export default CardContainer