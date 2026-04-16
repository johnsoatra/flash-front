import { Label } from "@/constants";

export function getBakongToken() {
  return localStorage.getItem(Label.BakongToken);
}

export function setBakongToken(token: string | null) {
  if (token) {
    localStorage.setItem(Label.BakongToken, token);
    return;
  }
  localStorage.removeItem(Label.BakongToken);
}
