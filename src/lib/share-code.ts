// Playground share links (demo site only, not in the card bundle): the YAML
// travels in the URL hash, so nothing is uploaded anywhere. `code=` is
// deflate-raw + base64url (CompressionStream); `yaml=` is plain base64url
// for browsers without it. Both are read back.

export function toBase64Url(bytes: Uint8Array): string {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function fromBase64Url(text: string): Uint8Array {
  const b64 = text.replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(b64 + "=".repeat((4 - (b64.length % 4)) % 4));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}

async function pipe(bytes: Uint8Array, stream: { readable: ReadableStream; writable: WritableStream }): Promise<Uint8Array> {
  const source = new ReadableStream<Uint8Array>({
    start(c) {
      c.enqueue(bytes);
      c.close();
    },
  });
  const reader = source.pipeThrough(stream as any).getReader();
  const parts: Uint8Array[] = [];
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    parts.push(value as Uint8Array);
  }
  const out = new Uint8Array(parts.reduce((n, p) => n + p.length, 0));
  let at = 0;
  for (const p of parts) {
    out.set(p, at);
    at += p.length;
  }
  return out;
}

const canCompress = () => typeof CompressionStream !== "undefined" && typeof DecompressionStream !== "undefined";

// The hash (without '#') that carries `text`.
export async function encodeShare(text: string, compress = canCompress()): Promise<string> {
  const bytes = new TextEncoder().encode(text);
  if (compress) return `code=${toBase64Url(await pipe(bytes, new CompressionStream("deflate-raw")))}`;
  return `yaml=${toBase64Url(bytes)}`;
}

// The YAML in a `#code=` / `#yaml=` hash, or undefined for any other hash or
// a code that doesn't decode.
export async function decodeShare(hash: string): Promise<string | undefined> {
  const m = /^#?(code|yaml)=([A-Za-z0-9_-]*)$/.exec(hash);
  if (!m) return undefined;
  try {
    let bytes = fromBase64Url(m[2]);
    if (m[1] === "code") {
      if (!canCompress()) return undefined;
      bytes = await pipe(bytes, new DecompressionStream("deflate-raw"));
    }
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    return undefined;
  }
}
