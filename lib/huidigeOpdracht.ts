import { dagSleutel } from "@/lib/opdrachten";

const KEY = "dawnraid:huidigeopdracht";
export const OPDRACHT_EVENT = "dawnraid:opdracht-updated";

export type HuidigeOpdracht = {
  titel: string;
  duur: 5 | 15 | 30 | 60;
  coins: number;
  chestType: "bronze" | "silver" | "epic";
  datum: string;
};

export function getHuidigeOpdracht(): HuidigeOpdracht | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as HuidigeOpdracht;
    const vandaag = dagSleutel(new Date());
    if (parsed.datum !== vandaag) {
      window.localStorage.removeItem(KEY);
      return null;
    }
    return parsed;
  } catch {
    window.localStorage.removeItem(KEY);
    return null;
  }
}

export function setHuidigeOpdracht(op: HuidigeOpdracht) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(op));
  window.dispatchEvent(new Event(OPDRACHT_EVENT));
}

export function clearHuidigeOpdracht() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
  window.dispatchEvent(new Event(OPDRACHT_EVENT));
}
