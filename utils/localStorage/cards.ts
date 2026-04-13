import { Label } from "@/constants";

export function getCards(): string[] {
  try {
    const cards = JSON.parse(localStorage.getItem(Label.Cards) ?? '[]');
    if (Array.isArray(cards)) {
      const validatedCards: string[] = [];
      for (let card of cards) {
        if (typeof card === 'string' && !validatedCards.includes(card)) {
          validatedCards.push(card);
        }
      }
      return validatedCards;
    }
  } catch (error) {
    console.log(error);
  };
  return [];
}

export function setCards(cards: string[]) {
  localStorage.setItem(Label.Cards, JSON.stringify(cards));
}
