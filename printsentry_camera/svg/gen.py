from xml.sax.saxutils import escape

INK = "#16202B"
SOFT = "#5A6B7A"
LINE = "#E2DED7"
BLUE = "#0B4F6C"
ORANGE = "#C4531E"
PAPER = "#FDFCFA"

def save(name, svg):
    with open(name, "w") as f:
        f.write(svg)

def wrap(s, n):
    words = s.split()
    lines, cur = [], ""
    for w in words:
        t = (cur + " " + w).strip()
        if len(t) > n and cur:
            lines.append(cur)
            cur = w
        else:
            cur = t
    if cur:
        lines.append(cur)
    return lines

def multiline(x, y, size, color, text, n, dy=15, family="ui-sans-serif,system-ui", weight="400", anchor="middle"):
    lines = wrap(text, n)
    out = f'<text x="{x}" y="{y}" text-anchor="{anchor}" font-family="{family}" font-size="{size}" font-weight="{weight}" fill="{color}">'
    for i, line in enumerate(lines):
        dx = 0 if i == 0 else 0
        out += f'<tspan x="{x}" dy="{0 if i==0 else dy}">{escape(line)}</tspan>'
    out += '</text>'
    return out, len(lines)

# ---------- 6. Signal path ----------
def box(x, y, w, h, label, sub, rate, color=BLUE):
    r = f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="8" fill="{PAPER}" stroke="{color}" stroke-width="1.6"/>\n'
    r += f'<text x="{x+w/2}" y="{y+24}" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="14" font-weight="700" fill="{INK}">{escape(label)}</text>\n'
    sub_svg, _ = multiline(x+w/2, y+44, 11, SOFT, sub, 26, dy=14)
    r += sub_svg + "\n"
    rate_svg, _ = multiline(x+w/2, y+h-14, 10.5, ORANGE, rate, 28, dy=13, family="ui-monospace,monospace")
    r += rate_svg
    return r

W, H = 1180, 280
svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" font-family="ui-sans-serif,system-ui">\n'
svg += f'<rect width="{W}" height="{H}" fill="{PAPER}"/>\n'
svg += f'<text x="40" y="34" font-size="18" font-weight="700" fill="{INK}">Signal path</text>\n'
svg += f'<text x="40" y="54" font-size="12.5" fill="{SOFT}">One pass every 2 seconds while a print runs</text>\n'

bw, bh = 208, 118
gap = 30
y = 76
xs = [40 + i*(bw+gap) for i in range(5)]

labels = [
    ("SENSE", "Camera Module 3, fixed focus", "1 frame / 2 s, 1024x1024", BLUE),
    ("PROCESS", "Pi Zero 2 W, TFLite MobileNetV2", "about 180 ms / frame", BLUE),
    ("DECIDE", "Debounce filter", "3 of last 5 frames over 0.85", BLUE),
    ("ACT", "ntfy.sh push, OctoPrint pause call", "HTTPS POST, under 1 s", ORANGE),
    ("RECORD", "Snapshot and log to microSD", "JPEG plus one CSV row", BLUE),
]

for i, (lab, sub, rate, color) in enumerate(labels):
    svg += box(xs[i], y, bw, bh, lab, sub, rate, color) + "\n"
    if i < 4:
        ax = xs[i] + bw
        ay = y + bh/2
        svg += f'<line x1="{ax+4}" y1="{ay}" x2="{ax+gap-6}" y2="{ay}" stroke="{INK}" stroke-width="1.6"/>\n'
        svg += f'<polygon points="{ax+gap-6},{ay-5} {ax+gap+4},{ay} {ax+gap-6},{ay+5}" fill="{INK}"/>\n'

svg += f'<line x1="40" y1="{y+bh+34}" x2="{xs[4]+bw}" y2="{y+bh+34}" stroke="{LINE}" stroke-width="1"/>\n'
svg += f'<text x="40" y="{y+bh+56}" font-size="12" fill="{SOFT}">ACT is the only step that leaves the device. Sense, process, decide, and record run on board, offline.</text>\n'
svg += '</svg>'
save("fig1_signal_path.svg", svg)
print("wrote fig1")

# ---------- 7. Exploded stack ----------
W2, H2 = 780, 640
svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W2} {H2}" font-family="ui-sans-serif,system-ui">\n'
svg += f'<rect width="{W2}" height="{H2}" fill="{PAPER}"/>\n'
svg += f'<text x="30" y="34" font-size="18" font-weight="700" fill="{INK}">Build, exploded</text>\n'

layers = [
    ("LED ring, 8x 5mm, 5V, PWM dimmable", "2 mm PCB", BLUE),
    ("Camera Module 3, wide, fixed focus", "9 mm module", BLUE),
    ("Printed bracket, ball joint", "PETG, 4 mm wall", ORANGE),
    ("Ribbon cable, 300 mm, to Pi", "flat FPC", BLUE),
    ("Pi Zero 2 W board", "1.4 mm PCB", BLUE),
    ("Printed enclosure base and lid", "PETG, 2.4 mm wall", ORANGE),
]

cx = W2/2
plate_w, plate_h = 460, 34
top = 70
step = 88
for i, (label, mat, color) in enumerate(layers):
    y = top + i*step
    svg += f'<rect x="{cx-plate_w/2}" y="{y}" width="{plate_w}" height="{plate_h}" rx="6" fill="{PAPER}" stroke="{color}" stroke-width="1.6"/>\n'
    svg += f'<text x="{cx-plate_w/2+16}" y="{y+21}" font-size="13" font-weight="600" fill="{INK}">{escape(label)}</text>\n'
    svg += f'<text x="{cx+plate_w/2-16}" y="{y+21}" text-anchor="end" font-size="11.5" fill="{SOFT}">{escape(mat)}</text>\n'
    if i < len(layers)-1:
        svg += f'<line x1="{cx}" y1="{y+plate_h}" x2="{cx}" y2="{y+step}" stroke="{LINE}" stroke-width="1.4" stroke-dasharray="3,3"/>\n'

svg += f'<text x="30" y="{top+len(layers)*step+18}" font-size="12" fill="{SOFT}">Stack order top to bottom. Enclosure carries the Pi and shields it from filament dust.</text>\n'
svg += '</svg>'
save("fig2_exploded_stack.svg", svg)
print("wrote fig2")

# ---------- 8. Validation rig ----------
W3, H3 = 1000, 620
svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W3} {H3}" font-family="ui-sans-serif,system-ui">\n'
svg += f'<rect width="{W3}" height="{H3}" fill="{PAPER}"/>\n'
svg += f'<text x="30" y="34" font-size="18" font-weight="700" fill="{INK}">Validation rig</text>\n'
svg += f'<text x="30" y="54" font-size="12.5" fill="{SOFT}">Fixed offset bracket holds both cameras on the same printer, same print, same time base</text>\n'

# camera labels + boxes (well above the fixture bar)
cam_y = 100
svg += f'<text x="260" y="{cam_y-10}" text-anchor="middle" font-size="11" font-weight="700" fill="{BLUE}">PrintSentry</text>\n'
svg += f'<rect x="215" y="{cam_y}" width="90" height="30" rx="6" fill="{PAPER}" stroke="{BLUE}" stroke-width="1.8"/>\n'
svg += f'<text x="380" y="{cam_y-10}" text-anchor="middle" font-size="11" font-weight="700" fill="{ORANGE}">Reference cam</text>\n'
svg += f'<rect x="335" y="{cam_y}" width="90" height="30" rx="6" fill="{PAPER}" stroke="{ORANGE}" stroke-width="1.8"/>\n'

# fixture bar, well below cameras
fbar_y = cam_y + 30 + 26
svg += f'<rect x="200" y="{fbar_y}" width="240" height="22" rx="4" fill="{PAPER}" stroke="{INK}" stroke-width="1.6"/>\n'
svg += f'<text x="320" y="{fbar_y+15}" text-anchor="middle" font-size="10.5" fill="{SOFT}">Rigid offset bracket, 60 mm baseline</text>\n'

# printer frame, well below fixture bar
frame_y = fbar_y + 22 + 40
svg += f'<rect x="140" y="{frame_y}" width="360" height="260" rx="4" fill="none" stroke="{LINE}" stroke-width="2"/>\n'
plate_y = frame_y + 220
svg += f'<rect x="220" y="{plate_y}" width="200" height="14" rx="3" fill="{INK}" opacity="0.85"/>\n'
svg += f'<rect x="290" y="{plate_y-30}" width="60" height="30" rx="3" fill="none" stroke="{INK}" stroke-width="1.6"/>\n'
svg += f'<text x="320" y="{frame_y+260+26}" text-anchor="middle" font-size="12" fill="{SOFT}">Build plate under test</text>\n'

# dashed sightlines from cameras to the print target
target_x, target_y = 320, plate_y - 15
svg += f'<line x1="260" y1="{cam_y+30}" x2="{target_x}" y2="{target_y}" stroke="{BLUE}" stroke-width="1.2" stroke-dasharray="4,3"/>\n'
svg += f'<line x1="380" y1="{cam_y+30}" x2="{target_x}" y2="{target_y}" stroke="{ORANGE}" stroke-width="1.2" stroke-dasharray="4,3"/>\n'

# laptop / review panel
lx, ly, lw, lh = 560, 218, 380, 260
svg += f'<rect x="{lx}" y="{ly}" width="{lw}" height="{lh}" rx="8" fill="{PAPER}" stroke="{LINE}" stroke-width="1.6"/>\n'
svg += f'<text x="{lx+16}" y="{ly+28}" font-size="13" font-weight="700" fill="{INK}">Human review log</text>\n'
rows = [
    ("t=00:14:02", "no defect", SOFT),
    ("t=00:14:04", "no defect", SOFT),
    ("t=00:14:06", "stringing starts", ORANGE),
    ("t=00:14:08", "stringing, confirmed", ORANGE),
    ("t=00:14:10", "no defect", SOFT),
]
for i, (t, label, color) in enumerate(rows):
    ry = ly + 56 + i*36
    svg += f'<text x="{lx+16}" y="{ry}" font-family="ui-monospace,monospace" font-size="11.5" fill="{SOFT}">{t}</text>\n'
    svg += f'<text x="{lx+140}" y="{ry}" font-size="12" fill="{color}">{label}</text>\n'
svg += f'<line x1="{lx}" y1="{ly+lh-30}" x2="{lx+lw}" y2="{ly+lh-30}" stroke="{LINE}" stroke-width="1"/>\n'
svg += f'<text x="{lx+16}" y="{ly+lh-10}" font-size="11.5" fill="{SOFT}">Labeled independently, timestamp-matched to both cameras</text>\n'

svg += f'<line x1="500" y1="{ly+lh/2}" x2="{lx-10}" y2="{ly+lh/2}" stroke="{INK}" stroke-width="1.4"/>\n'
svg += f'<polygon points="{lx-10},{ly+lh/2-6} {lx},{ly+lh/2} {lx-10},{ly+lh/2+6}" fill="{INK}"/>\n'

svg += f'<text x="30" y="{H3-24}" font-size="12" fill="{SOFT}">Every labeled frame carries two votes: PrintSentry\'s score and the human reviewer\'s call.</text>\n'
svg += '</svg>'
save("fig3_validation_rig.svg", svg)
print("wrote fig3")

# ---------- 9. Signal trace (illustrative) ----------
import math
W4, H4 = 1000, 420
svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W4} {H4}" font-family="ui-sans-serif,system-ui">\n'
svg += f'<rect width="{W4}" height="{H4}" fill="{PAPER}"/>\n'
svg += f'<text x="30" y="34" font-size="18" font-weight="700" fill="{INK}">Defect-confidence trace, illustrative</text>\n'
svg += f'<text x="30" y="54" font-size="12.5" fill="{SOFT}">One stringing event, sampled every 2 s over 60 s</text>\n'

# axes
ax_x0, ax_y0, ax_x1, ax_y1 = 90, 340, 940, 100
svg += f'<line x1="{ax_x0}" y1="{ax_y0}" x2="{ax_x1}" y2="{ax_y0}" stroke="{INK}" stroke-width="1.4"/>\n'
svg += f'<line x1="{ax_x0}" y1="{ax_y0}" x2="{ax_x0}" y2="{ax_y1}" stroke="{INK}" stroke-width="1.4"/>\n'
svg += f'<text x="{ax_x0-14}" y="{ax_y0+4}" text-anchor="end" font-size="11" fill="{SOFT}">0.0</text>\n'
svg += f'<text x="{ax_x0-14}" y="{ax_y1+4}" text-anchor="end" font-size="11" fill="{SOFT}">1.0</text>\n'
svg += f'<text x="{(ax_x0+ax_x1)/2}" y="{ax_y0+34}" text-anchor="middle" font-size="12" fill="{SOFT}">time (s)</text>\n'
for i, t in enumerate(range(0, 61, 10)):
    x = ax_x0 + (ax_x1-ax_x0)*t/60
    svg += f'<line x1="{x}" y1="{ax_y0}" x2="{x}" y2="{ax_y0+6}" stroke="{INK}" stroke-width="1"/>\n'
    svg += f'<text x="{x}" y="{ax_y0+22}" text-anchor="middle" font-size="10.5" fill="{SOFT}">{t}</text>\n'

# threshold line
thr = 0.85
thr_y = ax_y0 - (ax_y0-ax_y1)*thr
svg += f'<line x1="{ax_x0}" y1="{thr_y}" x2="{ax_x1}" y2="{thr_y}" stroke="{ORANGE}" stroke-width="1.3" stroke-dasharray="6,4"/>\n'
svg += f'<text x="{ax_x1+6}" y="{thr_y+4}" font-size="11" fill="{ORANGE}">threshold 0.85</text>\n'

# synthetic trace: noise floor ~0.1-0.2 until t=32, ramps to 0.9 by t=40, stays high, small noise
pts = []
for t in range(0, 61):
    if t < 30:
        v = 0.12 + 0.05*math.sin(t*1.3) + 0.02*math.sin(t*5.1)
    elif t < 40:
        frac = (t-30)/10
        v = 0.12 + frac*0.78 + 0.02*math.sin(t*4.0)
    else:
        v = 0.92 + 0.03*math.sin(t*3.0)
    v = max(0.02, min(0.98, v))
    x = ax_x0 + (ax_x1-ax_x0)*t/60
    y = ax_y0 - (ax_y0-ax_y1)*v
    pts.append((x, y))

path = "M " + " L ".join(f"{x:.1f},{y:.1f}" for x, y in pts)
svg += f'<path d="{path}" fill="none" stroke="{BLUE}" stroke-width="2"/>\n'

# detection window: first crossing above 0.85 for 3 of 5 frames, roughly t=36-40
dw_x0 = ax_x0 + (ax_x1-ax_x0)*34/60
dw_x1 = ax_x0 + (ax_x1-ax_x0)*40/60
svg += f'<rect x="{dw_x0}" y="{ax_y1}" width="{dw_x1-dw_x0}" height="{ax_y0-ax_y1}" fill="{ORANGE}" opacity="0.08"/>\n'
svg += f'<text x="{(dw_x0+dw_x1)/2}" y="{ax_y1-10}" text-anchor="middle" font-size="11" fill="{ORANGE}">detection window</text>\n'

# noise floor label
nf_x = ax_x0 + (ax_x1-ax_x0)*10/60
nf_y = ax_y0 - (ax_y0-ax_y1)*0.15
svg += f'<text x="{nf_x}" y="{nf_y-14}" text-anchor="middle" font-size="11" fill="{SOFT}">noise floor</text>\n'

svg += f'<text x="30" y="{H4-16}" font-size="12" font-weight="700" fill="{INK}">Illustrative</text>\n'
svg += f'<text x="105" y="{H4-16}" font-size="12" fill="{SOFT}">synthetic curve for explanation, not a recorded run</text>\n'
svg += '</svg>'
save("fig4_signal_trace.svg", svg)
print("wrote fig4")

# ---------- 10. Wiring and power chain ----------
W5, H5 = 1040, 560
svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W5} {H5}" font-family="ui-sans-serif,system-ui">\n'
svg += f'<rect width="{W5}" height="{H5}" fill="{PAPER}"/>\n'
svg += f'<text x="30" y="34" font-size="18" font-weight="700" fill="{INK}">Wiring and power chain</text>\n'
svg += f'<text x="30" y="54" font-size="12.5" fill="{SOFT}">Independent 5V USB supply, not tapped from the printer</text>\n'

# supply
sx, sy, sw, sh = 30, 100, 190, 60
svg += f'<rect x="{sx}" y="{sy}" width="{sw}" height="{sh}" rx="8" fill="{PAPER}" stroke="{INK}" stroke-width="1.8"/>\n'
svg += f'<text x="{sx+sw/2}" y="{sy+26}" text-anchor="middle" font-size="13" font-weight="700" fill="{INK}">USB wall adapter</text>\n'
svg += f'<text x="{sx+sw/2}" y="{sy+46}" text-anchor="middle" font-size="11.5" fill="{SOFT}">5V, 2A capacity</text>\n'

# common rail
rail_x0 = sx+sw+40
rail_x1 = 950
rail_y = sy+sh/2
svg += f'<line x1="{sx+sw}" y1="{rail_y}" x2="{rail_x0}" y2="{rail_y}" stroke="{INK}" stroke-width="1.8"/>\n'
svg += f'<line x1="{rail_x0}" y1="{rail_y}" x2="{rail_x1}" y2="{rail_y}" stroke="{INK}" stroke-width="2.4"/>\n'
svg += f'<text x="{(rail_x0+rail_x1)/2}" y="{rail_y-12}" text-anchor="middle" font-size="11.5" fill="{SOFT}">common 5V rail</text>\n'

loads = [
    ("Pi Zero 2 W", "5V rail, draws 350 mA typical", "I2C to camera sensor, SPI unused", BLUE),
    ("Camera Module 3", "3.3V from Pi regulator, draws 250 mA peak", "CSI ribbon to Pi", BLUE),
    ("LED ring", "5V rail via 47 ohm resistor, draws 120 mA", "PWM from Pi GPIO18", ORANGE),
]

n = len(loads)
spacing = (rail_x1-rail_x0)/n
for i, (name, spec, bus, color) in enumerate(loads):
    lx = rail_x0 + spacing*i + spacing/2
    svg += f'<line x1="{lx}" y1="{rail_y}" x2="{lx}" y2="{rail_y+70}" stroke="{INK}" stroke-width="1.6"/>\n'
    bx, by, bw2, bh2 = lx-110, rail_y+70, 220, 118
    svg += f'<rect x="{bx}" y="{by}" width="{bw2}" height="{bh2}" rx="8" fill="{PAPER}" stroke="{color}" stroke-width="1.8"/>\n'
    svg += f'<text x="{lx}" y="{by+24}" text-anchor="middle" font-size="13" font-weight="700" fill="{INK}">{escape(name)}</text>\n'
    spec_svg, _ = multiline(lx, by+44, 11, SOFT, spec, 28, dy=14)
    svg += spec_svg + "\n"
    bus_svg, _ = multiline(lx, by+bh2-24, 10.5, ORANGE, bus, 28, dy=13)
    svg += bus_svg + "\n"

svg += f'<text x="30" y="{H5-40}" font-size="12" fill="{SOFT}">Total draw about 720 mA at 5V, 3.6 W. Against a 2A (10W) adapter, margin is wide.</text>\n'
svg += f'<text x="30" y="{H5-20}" font-size="12" fill="{SOFT}">Pi 3.3V rail (camera) is regulated on-board. No rail is drawn from the printer PSU.</text>\n'
svg += '</svg>'
save("fig5_power_chain.svg", svg)
print("wrote fig5")
