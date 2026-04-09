import { Label } from "@/constants/configs";

export function getCardId() {
  return localStorage.getItem(Label.CardId);
}

export function setCardId(code: string) {
  localStorage.setItem(Label.CardId, code);
}

export function removeCardId() {
  localStorage.removeItem(Label.CardId);
}
