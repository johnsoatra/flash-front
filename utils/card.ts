import { ProviderCode } from "@/constants";
import { Card } from "@/dto/getCard";

export function fullCardCode(card: Card) {
  return `${ProviderCode[card.provider]}${card.code}#`;
}
