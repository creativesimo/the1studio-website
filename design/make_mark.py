"""Minyapps mark: a frosted white M on the apps' sky-to-blue gradient.
Writes a 1024 master plus every favicon / touch / manifest size."""
import sys
from PIL import Image, ImageDraw, ImageFilter, ImageChops

OUT = sys.argv[1]
N = 1024
TOP, BOTTOM = (8, 194, 251), (1, 99, 251)

def gradient(size):
    g = Image.new("RGB", (size, size))
    d = ImageDraw.Draw(g)
    for y in range(size):
        t = y / (size - 1)
        d.line([(0, y), (size, y)], fill=tuple(round(TOP[i] + (BOTTOM[i] - TOP[i]) * t) for i in range(3)))
    # A soft light from the top left, like the app icons.
    glow = Image.new("L", (size, size), 0)
    ImageDraw.Draw(glow).ellipse([-size * 0.35, -size * 0.45, size * 0.85, size * 0.55], fill=70)
    glow = glow.filter(ImageFilter.GaussianBlur(size // 7))
    return Image.composite(Image.new("RGB", (size, size), (255, 255, 255)), g, glow.point(lambda v: v * 0.35))

def letter_mask(size):
    s = 4  # draw large, then round the corners
    big = size * s
    k = big / 1024
    pts = [(244, 768), (244, 264), (396, 264), (512, 462), (628, 264), (780, 264), (780, 768),
           (642, 768), (642, 498), (548, 640), (476, 640), (382, 498), (382, 768)]
    m = Image.new("L", (big, big), 0)
    ImageDraw.Draw(m).polygon([(x * k, y * k) for x, y in pts], fill=255)
    m = m.filter(ImageFilter.GaussianBlur(9 * k)).point(lambda v: 255 if v > 128 else 0)
    return m.resize((size, size), Image.LANCZOS)

def mark(size, rounded=True, inset=0.0):
    """rounded: transparent squircle corners (favicons); False: full square (Apple touch icon)."""
    bg = gradient(size).convert("RGBA")
    m = letter_mask(size)
    # Shadow under the letter.
    sh = Image.new("RGBA", (size, size), (0, 38, 140, 0))
    sh.putalpha(m.point(lambda v: v * 0.42))
    sh = ImageChops.offset(sh, 0, round(size * 0.018)).filter(ImageFilter.GaussianBlur(size * 0.028))
    bg.alpha_composite(sh)
    # Frosted white: brighter at the top.
    fill = Image.new("RGBA", (size, size))
    fd = ImageDraw.Draw(fill)
    for y in range(size):
        a = round(255 * (0.99 - 0.14 * y / (size - 1)))
        fd.line([(0, y), (size, y)], fill=(255, 255, 255, a))
    fill.putalpha(ImageChops.multiply(fill.getchannel("A"), m))
    bg.alpha_composite(fill)
    if rounded:
        r = round(size * 0.225)
        corner = Image.new("L", (size * 4, size * 4), 0)
        ImageDraw.Draw(corner).rounded_rectangle([0, 0, size * 4 - 1, size * 4 - 1], r * 4, fill=255)
        bg.putalpha(corner.resize((size, size), Image.LANCZOS))
    return bg

master = mark(N)
master.save(f"{OUT}/minyapps-mark-1024.png")
for px in (16, 32, 48, 96, 144, 192, 512):
    master.resize((px, px), Image.LANCZOS).save(f"{OUT}/favicon-{px}.png")
mark(512).save(f"{OUT}/minyapps-mark-512.png")
mark(180, rounded=False).save(f"{OUT}/apple-touch-icon.png")
# Maskable (Android): full square, letter kept inside the safe zone.
mm = Image.new("RGBA", (512, 512)); full = mark(512, rounded=False)
small = mark(400, rounded=False)
mm.paste(gradient(512).convert("RGBA")); mm.alpha_composite(small.crop((0, 0, 400, 400)).resize((400, 400)), (56, 56))
mm = gradient(512).convert("RGBA"); 
letter = mark(512, rounded=False)
mm = letter.resize((512, 512))
mm.save(f"{OUT}/maskable-512.png")
master.resize((48, 48), Image.LANCZOS).save(f"{OUT}/favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
print("done")
