import { ProviderCode } from "@/constants";
import { Card } from "@/dto/getCards";

export function fullCardCode(card: Card) {
  return `${ProviderCode[card.provider]}${card.code}#`;
}
