'use client';
import { useMainContext } from "@/context/mainContext";
import Blocker from "../Blocker";

export default function AppBlocker() {
  const context = useMainContext();
  return (
    context.showAppBlocker && <Blocker />
  );
}
