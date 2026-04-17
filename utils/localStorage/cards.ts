import { Label } from "@/constants";
import { isClient } from "../window";

export function getCards(): string[] {
  if (isClient()) {
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
  }
  return [];
}

export function setCards(cards: string[]) {
  if (isClient()) {
    localStorage.setItem(Label.Cards, JSON.stringify(cards));
  }
}
