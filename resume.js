const processSection = document.querySelector('.process');
const aboutLead = document.querySelector('.statement .lead');
const aboutCopy = document.querySelector('.statement-grid div p:not(.lead)');
if (aboutLead) aboutLead.textContent = 'Nandini Khandelwal is a detail-oriented interior designer with a background in Urban Planning.';
if (aboutCopy) aboutCopy.textContent = 'Currently completing a Post Graduate Diploma in Interior Design at AAFT, Noida, Nandini brings spatial thinking, technical drafting and a hands-on understanding of how design moves from concept to reality.';
if (processSection) {
  processSection.insertAdjacentHTML('beforebegin', `<section class="background" id="background"><div class="section-index">05 / Background</div><div class="background-grid"><div><p class="eyebrow">Experience</p><h3>Junior Interior Design Intern</h3><p>Opulent Homes · Noida<br>Semester 1, 2025</p><p>Supported residential design projects through AutoCAD floor plans, sections, furniture layouts, 3ds Max visualisations, mood boards and material coordination.</p></div><div><p class="eyebrow">Education</p><h3>Post Graduate Diploma<br>in Interior Design</h3><p>AAFT, Noida · 2025–2026</p><h3 class="small-heading">Bachelor’s Degree<br>in Urban Planning</h3><p>University of Petroleum and Energy Studies, Dehradun · 2016–2020</p></div><div><p class="eyebrow">Toolkit</p><div class="skill-list"><span>AutoCAD</span><span>3ds Max</span><span>Design Development</span><span>Site Execution</span><span>Material &amp; Site Coordination</span><span>Sketching</span><span>Technical drafting</span><span>3D visualisation</span></div><p class="certs">INTERIOR DESIGNING . SPACE PLANNING . DESIGN DEVELOPMENT . SITE EXECUTION . MATERIAL &amp; SITE COORDINATION</p></div></div></section>`);
  processSection.querySelector('.section-index').textContent = '06 / Approach';
  document.querySelector('.contact .section-index').textContent = '07 / Contact';
}
