import { Label } from "@/constants/configs";

export function getToken() {
  return localStorage.getItem(Label.Token);
}

export function setToken(token: string) {
  localStorage.setItem(Label.Token, token);
}
