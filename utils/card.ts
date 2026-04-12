import { ProviderCode } from "@/constants";
import { GetCardData } from "@/dto/getCard";

export function fullCardCode(card: GetCardData) {
  return `${ProviderCode[card.provider]}${card.code}#`;
}
