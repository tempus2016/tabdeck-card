// Words a remote switch (remote_event, remote_entity, a voice command or a
// knob) can send instead of a tab name: step to the next or previous tab, go
// back to the tab open before, or return to the default tab. A tab whose name
// is one of these words still wins.
export type RemoteStep = "next" | "previous" | "back" | "default";

const WORDS: Record<string, RemoteStep> = {
  next: "next",
  forward: "next",
  previous: "previous",
  prev: "previous",
  back: "back",
  last: "back",
  default: "default",
  start: "default",
};

export function remoteStep(target: unknown): RemoteStep | undefined {
  if (typeof target !== "string") return undefined;
  return WORDS[target.trim().toLowerCase()];
}
