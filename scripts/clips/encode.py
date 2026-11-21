#!/usr/bin/env python3
"""Turn recorded frames into an animated WebP and GIF (needs Pillow).

    python3 encode.py <frames.json> <out-base> [--fps 12] [--width 560] [--gif]

frames.json: {"frames": [{"file": "f0001.png", "t": 0.0}, ...], "crop": [x, y, w, h]}
(t in seconds). Frames are resampled to a fixed rate (the last frame at or
before each tick), cropped, scaled to --width and written to <out-base>.webp
(and <out-base>.gif with --gif). Prints the sizes.
"""
import argparse
import json
import os
import sys

from PIL import Image


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("frames")
    ap.add_argument("out")
    ap.add_argument("--fps", type=float, default=12)
    ap.add_argument("--width", type=int, default=560)
    ap.add_argument("--gif", action="store_true")
    a = ap.parse_args()
    meta = json.load(open(a.frames))
    base = os.path.dirname(os.path.abspath(a.frames))
    frames = sorted(meta["frames"], key=lambda f: f["t"])
    if not frames:
        print("no frames", file=sys.stderr)
        return 1
    x, y, w, h = (round(v) for v in meta["crop"])
    t0, t1 = frames[0]["t"], frames[-1]["t"]
    step = 1.0 / a.fps
    picked, i, t = [], 0, t0
    while t <= t1 + 1e-6:
        while i + 1 < len(frames) and frames[i + 1]["t"] <= t:
            i += 1
        picked.append(frames[i]["file"])
        t += step
    cache, images = {}, []
    for f in picked:
        if f not in cache:
            im = Image.open(os.path.join(base, f)).convert("RGB")
            # The screencast may be scaled: crop is in CSS pixels of the viewport.
            dev = next((fr.get("w") for fr in frames if fr["file"] == f), None) or im.width
            k = im.width / dev
            im = im.crop((round(x * k), round(y * k), round((x + w) * k), round((y + h) * k)))
            if im.width > a.width:
                im = im.resize((a.width, round(im.height * a.width / im.width)), Image.LANCZOS)
            cache[f] = im
        images.append(cache[f])
    ms = round(1000 / a.fps)
    images[0].save(a.out + ".webp", save_all=True, append_images=images[1:], duration=ms, loop=0, quality=70, method=6)
    exts = ["webp"]
    if a.gif:
        exts.append("gif")
        pal = [im.quantize(colors=128, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE) for im in images]
        pal[0].save(a.out + ".gif", save_all=True, append_images=pal[1:], duration=ms, loop=0, optimize=True, disposal=1)
    for ext in exts:
        print(f"{a.out}.{ext} {os.path.getsize(a.out + '.' + ext) / 1000:.0f} kB, {len(images)} frames")
    return 0


if __name__ == "__main__":
    sys.exit(main())
