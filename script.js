const imageFiles=['living-room.svg','master-bedroom.svg','material-palette.svg','furniture-layout.svg','site-execution.svg','detail-study.svg'];
const $=(s)=>document.querySelector(s); const $$=(s)=>document.querySelectorAll(s);
async function json(p){const r=await fetch(p);return r.json()}
function text(sel,key,obj){$$(sel).forEach(e=>{if(obj[key]!=null)e.textContent=obj[key]})}
(async()=>{let site=await json('content/site.json'),project=await json('content/project.json');try{site={...site,...JSON.parse(localStorage.getItem('nk-site')||'{}')};project={...project,...JSON.parse(localStorage.getItem('nk-project')||'{}')}}catch{};
$$('[data-site]').forEach(e=>e.textContent=site[e.dataset.site]||'');$$('[data-project]').forEach(e=>e.textContent=project[e.dataset.project]||'');
const em=$('[data-email]');em.textContent=site.email;em.href='mailto:'+site.email;const ph=$('[data-phone]');ph.textContent=site.phone;ph.href='tel:'+site.phone.replace(/\s/g,'');$('[data-linkedin]').href=site.linkedin;
$('#scope').innerHTML=(project.scope||[]).map(x=>`<li>${x}</li>`).join('');$('#materials').innerHTML=(project.materials||[]).map(x=>`<li>${x}</li>`).join('');
$('#gallery').innerHTML=(project.gallery||[]).map((g,i)=>`<figure><img src="assets/${imageFiles[i]||imageFiles[0]}" alt="${g.label} placeholder"><figcaption>${g.label}</figcaption></figure>`).join('');$('#year').textContent=new Date().getFullYear();
$('.menu').onclick=()=>{const n=$('nav');n.style.display=n.style.display==='flex'?'none':'flex'};})();