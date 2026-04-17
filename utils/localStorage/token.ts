import { Label } from "@/constants";
import { isClient } from "../window";

export function getToken() {
  if (isClient()) {
    return localStorage.getItem(Label.Token);
  }
  return null;
}

export function setToken(token: string | null) {
  if (isClient()) {
    if (token) {
      return localStorage.setItem(Label.Token, token);
    }
    localStorage.removeItem(Label.Token);
  }
}
