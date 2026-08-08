from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas


ROOT = Path('/tmp/nandini-id')
OUT = ROOT / 'assets' / 'nandini-khandelwal-portfolio.pdf'
W, H = landscape(A4)
M = 42

PAPER = HexColor('#f6f2eb')
INK = HexColor('#1f292b')
MUTED = HexColor('#657071')
ACCENT = HexColor('#b88b5c')
PANEL = HexColor('#e7dfd2')
LINE = HexColor('#d7cec1')
DARK = HexColor('#203033')


def fit_image(pdf, path, x, y, w, h, inset=0):
    image = ImageReader(str(path))
    iw, ih = image.getSize()
    box_w, box_h = w - inset * 2, h - inset * 2
    scale = min(box_w / iw, box_h / ih)
    dw, dh = iw * scale, ih * scale
    pdf.drawImage(image, x + inset + (box_w - dw) / 2, y + inset + (box_h - dh) / 2,
                  width=dw, height=dh, preserveAspectRatio=True, mask='auto')


def rule(pdf, x1, y, x2, color=LINE, width=0.7):
    pdf.setStrokeColor(color)
    pdf.setLineWidth(width)
    pdf.line(x1, y, x2, y)


def small(pdf, value, x, y, color=MUTED, size=7.5):
    pdf.setFillColor(color)
    pdf.setFont('Helvetica', size)
    pdf.drawString(x, y, value.upper())


def heading(pdf, value, x, y, size=34, color=INK):
    pdf.setFillColor(color)
    pdf.setFont('Times-Roman', size)
    pdf.drawString(x, y, value)


def body(pdf, value, x, y, width, size=11, leading=16, color=MUTED):
    words = value.split()
    lines, line = [], ''
    for word in words:
        candidate = f'{line} {word}'.strip()
        if stringWidth(candidate, 'Helvetica', size) <= width:
            line = candidate
        else:
            lines.append(line)
            line = word
    if line:
        lines.append(line)
    pdf.setFillColor(color)
    pdf.setFont('Helvetica', size)
    for index, line in enumerate(lines):
        pdf.drawString(x, y - index * leading, line)


def placeholder(pdf, x, y, w, h, label='RENDERED IMAGE', detail='COMING SOON'):
    pdf.setFillColor(PANEL)
    pdf.rect(x, y, w, h, fill=1, stroke=0)
    pdf.setStrokeColor(ACCENT)
    pdf.setDash(3, 3)
    pdf.rect(x + 1, y + 1, w - 2, h - 2, fill=0, stroke=1)
    pdf.setDash()
    cx, cy = x + w / 2, y + h / 2
    pdf.setStrokeColor(ACCENT)
    pdf.setLineWidth(1.2)
    pdf.circle(cx, cy + 12, 18, fill=0, stroke=1)
    pdf.line(cx - 7, cy + 12, cx + 7, cy + 12)
    pdf.line(cx, cy + 5, cx, cy + 19)
    pdf.setFillColor(MUTED)
    pdf.setFont('Helvetica', 8)
    pdf.drawCentredString(cx, cy - 20, label)
    pdf.drawCentredString(cx, cy - 34, detail)


def footer(pdf, page_number):
    rule(pdf, M, 30, W - M)
    small(pdf, 'NANDINI KHANDELWAL', M, 17, size=6.5)
    small(pdf, f'{page_number:02d}  /  PORTFOLIO', W - M - 82, 17, size=6.5)


def page(pdf, page_number):
    pdf.setFillColor(PAPER)
    pdf.rect(0, 0, W, H, fill=1, stroke=0)
    footer(pdf, page_number)


def make_pdf():
    pdf = canvas.Canvas(str(OUT), pagesize=(W, H))

    # 01 — Website-like hero
    page(pdf, 1)
    small(pdf, 'INTERIOR DESIGN  ·  SPATIAL STORYTELLING  ·  2026', M, H - 52, color=INK)
    small(pdf, 'PORTFOLIO  /  INTERIOR DESIGN', W - M - 150, H - 52, color=MUTED)
    heading(pdf, 'Designing', M, H - 170, 70)
    heading(pdf, 'the feeling', M, H - 245, 70)
    heading(pdf, 'of home.', M, H - 320, 70)
    body(pdf, 'Warm, considered interiors shaped by light, material and the rituals of everyday life.',
         M, H - 390, 270, size=12, leading=17, color=MUTED)
    portrait = ROOT / 'assets' / 'nandini-profile.jpg'
    if portrait.exists():
        fit_image(pdf, portrait, W - M - 230, 92, 230, 310)
    else:
        placeholder(pdf, W - M - 230, 92, 230, 310, 'PROFILE IMAGE', 'NANDINI KHANDELWAL')
    small(pdf, 'INTERIOR DESIGNER  /  NOIDA, INDIA', W - M - 220, 75, color=INK)
    pdf.showPage()

    # 02 — Profile
    page(pdf, 2)
    small(pdf, '02  /  PROFILE', M, H - 58, color=INK)
    heading(pdf, 'A wider lens on living well.', M, H - 135, 43)
    rule(pdf, M, H - 160, W - M)
    body(pdf, 'Nandini Khandelwal is an interior design professional based in Noida, India, developing thoughtful residential spaces through planning, technical drafting and 3D visualisation.',
         M, H - 205, 330, size=12, leading=18, color=INK)
    small(pdf, 'EDUCATION', 470, H - 205, color=ACCENT)
    heading(pdf, 'Post Graduate Diploma', 470, H - 240, 22)
    heading(pdf, 'in Interior Design', 470, H - 267, 22)
    body(pdf, 'AAFT, Noida  ·  2025–2026', 470, H - 300, 250, size=10.5, color=MUTED)
    small(pdf, 'TOOLKIT', W - M - 205, H - 205, color=ACCENT)
    body(pdf, 'AutoCAD  ·  3ds Max  ·  SketchUp  ·  Technical drafting  ·  3D visualisation',
         W - M - 205, H - 240, 205, size=10.5, leading=17, color=INK)
    pdf.showPage()

    # 03 — Project introduction with rendered placeholder
    page(pdf, 3)
    small(pdf, '03  /  SELECTED PROJECT', M, H - 58, color=INK)
    heading(pdf, '2 BHK', M, H - 150, 68)
    heading(pdf, 'Residential Home', M, H - 225, 68)
    small(pdf, 'ACADEMIC PROJECT  —  NOT A BUILT CELEBRITY RESIDENCE', M, H - 270, color=MUTED)
    body(pdf, 'A college-assigned residential concept exploring proportion, material direction, lighting and detailed 3D modelling.',
         W - M - 265, H - 145, 265, size=12, leading=18, color=INK)
    placeholder(pdf, W - M - 265, 82, 265, 145, 'RENDERED PROJECT VIEW', 'IMAGES TO BE ADDED')
    pdf.showPage()

    # 04 — Atmosphere placeholder
    page(pdf, 4)
    small(pdf, '04  /  MATERIAL & ATMOSPHERE', M, H - 58, color=INK)
    heading(pdf, 'From plan', M, H - 155, 62)
    heading(pdf, 'to presence.', M, H - 222, 62)
    body(pdf, 'The project brings together planning, elevations and rendered studies to imagine a refined two-bedroom home with a calm, contemporary character.',
         W - M - 280, H - 155, 280, size=12, leading=18, color=INK)
    placeholder(pdf, M, 70, W - 2 * M, 145, 'RENDERED IMAGE', 'ROOM VISUALS TO BE ADDED')
    pdf.showPage()

    drawings = [
        ('01', 'Flooring layout', 'PLAN STUDY', 'Final layout Flooring..-Model-1.jpg', 'Final layout Flooring..-Model.pdf'),
        ('02', 'Living elevation I', 'LIVING ROOM STUDY', 'LIVING 1 FINAL-1.jpg', 'LIVING 1 FINAL.pdf'),
        ('03', 'Living elevation II', 'LIVING ROOM STUDY', 'LIVING 2 FINAL-1.jpg', 'LIVING 2 FINAL.pdf'),
        ('04', 'Kitchen elevation', 'KITCHEN STUDY', 'KITCHEN ELEVATION FINAL-1.jpg', 'KITCHEN ELEVATION FINAL.pdf'),
        ('05', 'Bedroom elevation', 'GUEST BEDROOM STUDY', 'BEDROOM ELEVATION-1.jpg', 'BEDROOM ELEVATION.pdf'),
    ]

    for number, name, subtitle, image_name, pdf_name in drawings:
        page(pdf, 5)
        small(pdf, f'{number}  /  TECHNICAL LANGUAGE', M, H - 58, color=INK)
        heading(pdf, name, M, H - 120, 38)
        small(pdf, subtitle, W - M - 130, H - 112, color=INK)
        rule(pdf, M, H - 145, W - M)
        gap = 16
        box_y, box_h = 76, H - 245
        box_w = (W - 2 * M - gap) / 2
        x1, x2 = M, M + box_w + gap
        pdf.setFillColor(PANEL)
        pdf.rect(x1, box_y, box_w, box_h, fill=1, stroke=0)
        drawing = ROOT / 'assets' / 'drawings' / image_name
        if drawing.exists():
            fit_image(pdf, drawing, x1 + 14, box_y + 14, box_w - 28, box_h - 28, inset=0)
        small(pdf, 'AUTOCAD DRAWING', x1 + 14, box_y + 16, color=INK, size=7)
        pdf.setFillColor(PAPER)
        pdf.rect(x1 + box_w - 125, box_y + box_h - 34, 111, 22, fill=1, stroke=0)
        small(pdf, 'OPEN PDF  ↗', x1 + box_w - 115, box_y + box_h - 27, color=INK, size=6.5)
        placeholder(pdf, x2, box_y, box_w, box_h, 'RENDERED IMAGE', 'COMING SOON')
        pdf.showPage()

    # 10 — Moodboard
    page(pdf, 10)
    small(pdf, '10  /  MOODBOARD', M, H - 58, color=INK)
    heading(pdf, 'Material, light, mood.', M, H - 125, 42)
    moodboard = ROOT / 'assets' / 'moodboard-project-1.jpg'
    if moodboard.exists():
        fit_image(pdf, moodboard, M, 55, W - 2 * M, H - 215, inset=0)
    else:
        placeholder(pdf, M, 55, W - 2 * M, H - 215, 'MOODBOARD', 'TO BE ADDED')
    pdf.showPage()

    # 11 — Approach
    page(pdf, 11)
    small(pdf, '11  /  APPROACH', M, H - 58, color=INK)
    heading(pdf, 'Spaces, beautifully resolved.', M, H - 140, 48)
    rule(pdf, M, H - 175, W - M)
    columns = [
        ('01', 'Read the space', 'Understand context, movement, light and the people who will inhabit it.'),
        ('02', 'Shape the story', 'Build a material and spatial language with warmth, rhythm and restraint.'),
        ('03', 'Resolve the detail', 'Carry the idea through drawings, elevations, models and final presentation.'),
    ]
    col_w = (W - 2 * M - 40) / 3
    for i, (num, title_value, copy) in enumerate(columns):
        x = M + i * (col_w + 20)
        small(pdf, num, x, H - 225, color=ACCENT)
        heading(pdf, title_value, x, H - 270, 21)
        body(pdf, copy, x, H - 305, col_w - 10, size=11, leading=17, color=INK)
    pdf.showPage()

    # 12 — Contact
    page(pdf, 12)
    small(pdf, '12  /  CONTACT', M, H - 58, color=INK)
    heading(pdf, 'Let’s make', M, H - 150, 62)
    heading(pdf, 'something lasting.', M, H - 220, 62)
    body(pdf, 'Available for interior design opportunities, collaborations and residential projects.',
         W - M - 280, H - 150, 280, size=13, leading=19, color=INK)
    rule(pdf, W - M - 280, H - 255, W - M)
    pdf.setFillColor(INK)
    pdf.setFont('Helvetica', 13)
    pdf.drawString(W - M - 280, H - 290, 'nknandinik10@gmail.com')
    pdf.drawString(W - M - 280, H - 330, '+91 8979933462')
    small(pdf, 'NOIDA  /  INDIA', W - M - 70, 48, color=INK)
    pdf.save()


if __name__ == '__main__':
    make_pdf()
    print(OUT)
