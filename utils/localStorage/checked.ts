import { Label } from "@/constants";
import { isClient } from "../window";

export function getChecked() {
  if (isClient()) {
    return localStorage.getItem(Label.Checked) === 'true';
  }
  return null;
}

export function setChecked(token: boolean | null) {
  if (isClient()) {
    if (token !== null) {
      return localStorage.setItem(Label.Checked, String(token));
    }
    localStorage.removeItem(Label.Checked);
  }
}
