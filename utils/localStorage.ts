import { Label } from "@/constants/configs";

export function getLastCardCode() {
  return localStorage.getItem(Label.LastCardCode);
}
export function setLastCardCode(code: string) {
  localStorage.setItem(Label.LastCardCode, code);
}
export function removeLastCardCode() {
  localStorage.removeItem(Label.LastCardCode);
}
