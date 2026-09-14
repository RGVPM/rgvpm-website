#!/usr/bin/env python3
"""Generate unique 1200x630 branded OG/blog thumbnails for RGVPM posts.

Run from repo root: python3 scripts/generate-blog-thumbs.py
Outputs WebP to public/blog/<slug>.webp
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "blog"
LOGO = ROOT / "public" / "logo.png"
BEBAS = Path("/tmp/rgvpm-fonts/BebasNeue-Regular.ttf")
SANS = Path("/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf")
SANS_REG = Path("/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf")
MONO = Path("/usr/share/fonts/truetype/jetbrains-mono/JetBrainsMono-Medium.ttf")

W, H = 1200, 630
NAVY = (17, 28, 48, 255)  # #111C30
NAVY_SOFT = (26, 40, 66, 255)
ORANGE = (237, 114, 46, 255)  # #ED722E
CREAM = (247, 244, 239, 255)
WHITE = (255, 255, 255, 255)
MUTED = (168, 182, 204, 255)
LINE = (255, 255, 255, 28)


def font(path: Path, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(path), size)


def wrap(draw: ImageDraw.ImageDraw, text: str, fnt: ImageFont.FreeTypeFont, max_w: int) -> list[str]:
    words = text.split()
    lines: list[str] = []
    cur = ""
    for word in words:
        trial = f"{cur} {word}".strip()
        if draw.textlength(trial, font=fnt) <= max_w:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = word
    if cur:
        lines.append(cur)
    return lines


def rounded_mask(size: tuple[int, int], radius: int) -> Image.Image:
    m = Image.new("L", size, 0)
    d = ImageDraw.Draw(m)
    d.rounded_rectangle((0, 0, size[0] - 1, size[1] - 1), radius=radius, fill=255)
    return m


def paste_round(base: Image.Image, layer: Image.Image, xy: tuple[int, int], radius: int) -> None:
    mask = rounded_mask(layer.size, radius)
    base.paste(layer, xy, mask)


def logo_badge() -> Image.Image:
    src = Image.open(LOGO).convert("RGBA")
    # Drop near-black fringe so the wordmark sits cleanly on cream.
    px = src.load()
    w, h = src.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a < 12 or (r < 18 and g < 18 and b < 18):
                px[x, y] = (0, 0, 0, 0)
    target_h = 36
    ratio = target_h / src.height
    src = src.resize((max(1, int(src.width * ratio)), target_h), Image.Resampling.LANCZOS)
    pad_x, pad_y = 16, 10
    badge = Image.new("RGBA", (src.width + pad_x * 2, src.height + pad_y * 2), (0, 0, 0, 0))
    d = ImageDraw.Draw(badge)
    d.rounded_rectangle((0, 0, badge.width - 1, badge.height - 1), radius=8, fill=CREAM)
    badge.paste(src, (pad_x, pad_y), src)
    return badge


def canvas() -> Image.Image:
    img = Image.new("RGBA", (W, H), NAVY)
    d = ImageDraw.Draw(img)
    # Hairline grid — Linear/Stripe quiet structure, not a rainbow.
    for x in range(0, W, 56):
        d.line([(x, 0), (x, H)], fill=LINE, width=1)
    for y in range(0, H, 56):
        d.line([(0, y), (W, y)], fill=LINE, width=1)
    # Orange spine
    d.rectangle((0, 0, 10, H), fill=ORANGE)
    # Soft orange wash, upper-right
    wash = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    wd = ImageDraw.Draw(wash)
    wd.ellipse((720, -220, 1420, 480), fill=(237, 114, 46, 38))
    img = Image.alpha_composite(img, wash)
    return img


def panel(size: tuple[int, int], fill=NAVY_SOFT) -> Image.Image:
    p = Image.new("RGBA", size, (0, 0, 0, 0))
    d = ImageDraw.Draw(p)
    d.rounded_rectangle((0, 0, size[0] - 1, size[1] - 1), radius=22, fill=fill, outline=(255, 255, 255, 22), width=1)
    return p


# --- unique motifs ---------------------------------------------------------

def motif_bars(size: tuple[int, int]) -> Image.Image:
    """Digital marketing — rising performance bars."""
    p = panel(size)
    d = ImageDraw.Draw(p)
    heights = [70, 110, 90, 150, 200]
    n = len(heights)
    gap = 18
    bar_w = 42
    total = n * bar_w + (n - 1) * gap
    x0 = (size[0] - total) // 2
    base = size[1] - 72
    d.line([(48, base), (size[0] - 48, base)], fill=(255, 255, 255, 40), width=2)
    for i, h in enumerate(heights):
        x = x0 + i * (bar_w + gap)
        color = ORANGE if i == n - 1 else (255, 255, 255, 36 if i < n - 2 else 70)
        d.rounded_rectangle((x, base - h, x + bar_w, base), radius=8, fill=color)
    return p


def motif_tiers(size: tuple[int, int]) -> Image.Image:
    """Website cost — three nested price-tier frames."""
    p = panel(size)
    d = ImageDraw.Draw(p)
    frames = [
        (36, 48, size[0] - 36, size[1] - 48, (255, 255, 255, 18)),
        (68, 88, size[0] - 68, size[1] - 88, (255, 255, 255, 28)),
        (108, 138, size[0] - 108, size[1] - 138, ORANGE),
    ]
    for x0, y0, x1, y1, fill in frames:
        d.rounded_rectangle((x0, y0, x1, y1), radius=14, outline=fill, width=3)
    d.rectangle((108, 138, 118, size[1] - 138), fill=ORANGE)
    return p


def motif_maps(size: tuple[int, int]) -> Image.Image:
    """Google Maps — concentric rings + pin."""
    p = panel(size)
    d = ImageDraw.Draw(p)
    cx, cy = size[0] // 2, size[1] // 2 + 8
    for r, w, col in ((168, 2, (255, 255, 255, 28)), (118, 2, (255, 255, 255, 40)), (68, 3, ORANGE)):
        d.ellipse((cx - r, cy - r, cx + r, cy + r), outline=col, width=w)
    # Pin
    pin = [(cx, cy - 22), (cx + 22, cy + 10), (cx, cy + 58), (cx - 22, cy + 10)]
    d.polygon(pin, fill=ORANGE)
    d.ellipse((cx - 9, cy - 6, cx + 9, cy + 12), fill=NAVY)
    return p


def motif_split(size: tuple[int, int]) -> Image.Image:
    """Local vs regular — two columns."""
    p = panel(size)
    d = ImageDraw.Draw(p)
    left = (36, 48, size[0] // 2 - 18, size[1] - 48)
    right = (size[0] // 2 + 18, 48, size[0] - 36, size[1] - 48)
    d.rounded_rectangle(left, radius=16, fill=(237, 114, 46, 42), outline=ORANGE, width=2)
    d.rounded_rectangle(right, radius=16, outline=(255, 255, 255, 50), width=2)
    d.rectangle((size[0] // 2 - 2, 72, size[0] // 2 + 2, size[1] - 72), fill=ORANGE)
    mf = font(MONO, 18)
    d.text((left[0] + 22, left[1] + 24), "LOCAL", font=mf, fill=ORANGE)
    d.text((right[0] + 22, right[1] + 24), "REGULAR", font=mf, fill=MUTED)
    for i, y in enumerate((120, 150, 180)):
        d.rounded_rectangle((left[0] + 22, y, left[2] - 22, y + 10), radius=4, fill=ORANGE if i == 0 else (255, 255, 255, 50))
        d.rounded_rectangle((right[0] + 22, y, right[2] - 22, y + 10), radius=4, fill=(255, 255, 255, 28))
    return p


def motif_grid(size: tuple[int, int], highlight: tuple[int, int]) -> Image.Image:
    """City SEO — map grid with one highlighted cell + pin."""
    p = panel(size)
    d = ImageDraw.Draw(p)
    cols, rows = 3, 3
    pad, gap = 48, 14
    cell_w = (size[0] - pad * 2 - gap * (cols - 1)) // cols
    cell_h = (size[1] - pad * 2 - gap * (rows - 1)) // rows
    hx, hy = highlight
    for r in range(rows):
        for c in range(cols):
            x = pad + c * (cell_w + gap)
            y = pad + r * (cell_h + gap)
            on = (c, r) == (hx, hy)
            d.rounded_rectangle(
                (x, y, x + cell_w, y + cell_h),
                radius=10,
                fill=ORANGE if on else (255, 255, 255, 16),
                outline=ORANGE if on else (255, 255, 255, 28),
                width=2,
            )
            if on:
                cx, cy = x + cell_w // 2, y + cell_h // 2 - 4
                d.polygon([(cx, cy - 10), (cx + 11, cy + 6), (cx, cy + 28), (cx - 11, cy + 6)], fill=NAVY)
    return p


def motif_builder(size: tuple[int, int]) -> Image.Image:
    """Builder vs custom — template grid vs irregular frames."""
    p = panel(size)
    d = ImageDraw.Draw(p)
    mid = size[0] // 2
    d.line([(mid, 40), (mid, size[1] - 40)], fill=ORANGE, width=3)
    # Left: equal 2x2 (builder)
    box, gap, origin = 70, 14, (42, 90)
    for r in range(2):
        for c in range(2):
            x = origin[0] + c * (box + gap)
            y = origin[1] + r * (box + gap)
            d.rounded_rectangle((x, y, x + box, y + box), radius=8, outline=(255, 255, 255, 55), width=2)
    mf = font(MONO, 16)
    d.text((42, 52), "BUILDER", font=mf, fill=MUTED)
    d.text((mid + 28, 52), "CUSTOM", font=mf, fill=ORANGE)
    # Right: overlapping custom frames
    frames = [
        (mid + 28, 92, mid + 150, 210),
        (mid + 70, 150, size[0] - 40, size[1] - 70),
        (mid + 36, 230, mid + 128, size[1] - 56),
    ]
    for i, f in enumerate(frames):
        d.rounded_rectangle(f, radius=12, outline=ORANGE if i == 1 else (255, 255, 255, 55), width=2 if i else 2)
    return p


POSTS = [
    {
        "slug": "digital-marketing-harlingen-tx-guide",
        "category": "Digital Marketing",
        "title": "Digital Marketing\nin Harlingen",
        "kicker": "2026 local guide",
        "motif": motif_bars,
    },
    {
        "slug": "how-much-does-a-website-cost-rio-grande-valley",
        "category": "Website Design",
        "title": "What a Website\nCosts in the RGV",
        "kicker": "Honest 2026 ranges",
        "motif": motif_tiers,
    },
    {
        "slug": "how-to-rank-higher-google-maps-rio-grande-valley",
        "category": "Local SEO",
        "title": "Rank Higher on\nGoogle Maps",
        "kicker": "Rio Grande Valley",
        "motif": motif_maps,
    },
    {
        "slug": "local-seo-vs-regular-seo",
        "category": "Local SEO",
        "title": "Local SEO vs.\nRegular SEO",
        "kicker": "What actually gets calls",
        "motif": motif_split,
    },
    {
        "slug": "brownsville-seo-how-to-rank-local-business",
        "category": "Local SEO",
        "title": "Brownsville SEO\nfor Local Business",
        "kicker": "Map pack, not vanity traffic",
        "motif": lambda s: motif_grid(s, (1, 2)),
    },
    {
        "slug": "harlingen-seo-how-to-rank-local-business",
        "category": "Local SEO",
        "title": "Harlingen SEO\nfor Local Business",
        "kicker": "Map pack, not vanity traffic",
        "motif": lambda s: motif_grid(s, (1, 1)),
    },
    {
        "slug": "rgv-website-design-builder-vs-custom",
        "category": "Website Design",
        "title": "Builder vs Custom\nWebsite Design",
        "kicker": "For RGV local businesses",
        "motif": motif_builder,
    },
]


def render(post: dict) -> None:
    img = canvas()
    d = ImageDraw.Draw(img)
    title_f = font(BEBAS, 76)
    cat_f = font(MONO, 20)
    kicker_f = font(SANS_REG, 22)
    foot_f = font(MONO, 18)

    # Logo badge
    badge = logo_badge()
    img.paste(badge, (W - badge.width - 56, 40), badge)

    # Category chip
    cat = post["category"].upper()
    cat_w = int(d.textlength(cat, font=cat_f))
    chip = (56, 48, 56 + cat_w + 36, 90)
    d.rounded_rectangle(chip, radius=4, fill=(237, 114, 46, 28), outline=ORANGE, width=1)
    d.rectangle((chip[0], chip[1], chip[0] + 4, chip[3]), fill=ORANGE)
    d.text((chip[0] + 18, 56), cat, font=cat_f, fill=ORANGE)

    # Title
    y = 130
    for line in post["title"].split("\n"):
        d.text((56, y), line.upper(), font=title_f, fill=WHITE)
        y += 82
    d.text((56, y + 8), post["kicker"], font=kicker_f, fill=MUTED)

    # Motif panel
    motif = post["motif"]((420, 420))
    img.paste(motif, (740, 118), motif)

    # Footer rule
    d.line([(56, 560), (680, 560)], fill=(255, 255, 255, 28), width=1)
    d.text((56, 576), "RGV PERFORMANCE MARKETING  ·  RIO GRANDE VALLEY, TX", font=foot_f, fill=MUTED)

    OUT.mkdir(parents=True, exist_ok=True)
    dest = OUT / f"{post['slug']}.webp"
    rgb = Image.new("RGB", (W, H), NAVY[:3])
    rgb.paste(img, mask=img.split()[-1])
    # Slight sharpen so type stays crisp after WebP
    rgb = rgb.filter(ImageFilter.UnsharpMask(radius=1.2, percent=110, threshold=2))
    rgb.save(dest, "WEBP", quality=88, method=6)
    print(f"wrote {dest.relative_to(ROOT)} ({dest.stat().st_size // 1024}kb)")


def main() -> None:
    for post in POSTS:
        render(post)


if __name__ == "__main__":
    main()
