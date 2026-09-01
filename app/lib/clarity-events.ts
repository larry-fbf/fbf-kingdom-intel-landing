export type ClarityTags = Record<string, string | string[] | undefined>;

type ClarityFn = {
  (command: "event", eventName: string): void;
  (command: "set", key: string, value: string | string[]): void;
};

const DEFAULT_TAGS: ClarityTags = {
  funnel: "kim_sept_2026",
};

export function trackClarityEvent(eventName: string, tags: ClarityTags = {}) {
  if (typeof window === "undefined") return;

  const clarity = (window as Window & { clarity?: ClarityFn }).clarity;
  if (typeof clarity !== "function") return;

  Object.entries({ ...DEFAULT_TAGS, ...tags }).forEach(([key, value]) => {
    if (value) clarity("set", key, value);
  });

  clarity("event", eventName);
}
