//alap api link
const BASE_URL = "https://deckofcardsapi.com/api/deck";

//Pakli létrehozása
export async function createDeck(){
    const response = await fetch(`${BASE_URL}/new/shuffle/?deck_count=1`);
    return response.json();
}

//Lapok húzása a pakliból
export async function drawCards(deckId: string, count: number){
    const response = await fetch(`${BASE_URL}/${deckId}/draw/?count=${count}`);
    return response.json();
}