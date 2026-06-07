//Kártyatype

export interface Card{
    code: string;
    image: string;
    value: string;
    suit: string;
}

//Pakli type
export interface DeckResponse {
    cards: Card[];
    deck_id: string;
    remaining: number;
    success: boolean;
}