import Env from "@/constants/env";

export function isDevelopment() {
  return Env.NodeEnv === 'development';
}

export function secondToTime(seconds: number) {
  const minute = Math.floor(seconds / 60);
  const second = seconds % 60;
  return `${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
}

export function commaSeparator(amount: number) {
  return amount.toLocaleString('en-US');
}
