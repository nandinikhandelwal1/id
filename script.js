const imageFiles=['living-room.svg','master-bedroom.svg','detail-study.svg','material-palette.svg','furniture-layout.svg','site-execution.svg'];
const $=(selector)=>document.querySelector(selector);
const $$=(selector)=>document.querySelectorAll(selector);
async function json(path){const response=await fetch(path);if(!response.ok)throw new Error(`Unable to load ${path}`);return response.json()}

(async()=>{
  let site=await json('content/site.json');
  let project=await json('content/project.json');
  try{site={...site,...JSON.parse(localStorage.getItem('nk-site')||'{}')};project={...project,...JSON.parse(localStorage.getItem('nk-project')||'{}')}}catch{}
  $$('[data-site]').forEach(element=>element.textContent=site[element.dataset.site]||'');
  $$('[data-project]').forEach(element=>element.textContent=project[element.dataset.project]||'');
  const email=$('[data-email]');email.textContent=site.email;email.href=`mailto:${site.email}`;
  const phone=$('[data-phone]');phone.textContent=site.phone;phone.href=`tel:${site.phone.replace(/\s/g,'')}`;
  $('[data-linkedin]').href=site.linkedin;
  $('#scope').innerHTML=(project.scope||[]).map(item=>`<li>${item}</li>`).join('');
  $('#materials').innerHTML=(project.materials||[]).map(item=>`<li>${item}</li>`).join('');
  $('#gallery').innerHTML=(project.gallery||[]).map((item,index)=>`<figure class="reveal"><img src="assets/${imageFiles[index]||imageFiles[0]}" alt="${item.label}" width="1200" height="900" loading="lazy" decoding="async"><figcaption>${String(index+1).padStart(2,'0')} · ${item.label}</figcaption></figure>`).join('');
  $('#year').textContent=new Date().getFullYear();

  const menu=$('.menu');const nav=$('#site-nav');
  const setMenu=(open)=>{menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);document.body.classList.toggle('menu-open',open);menu.querySelector('span').textContent=open?'Close':'Menu'};
  menu.addEventListener('click',()=>setMenu(menu.getAttribute('aria-expanded')!=='true'));
  nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setMenu(false)));
  document.addEventListener('keydown',event=>{if(event.key==='Escape')setMenu(false)});
  addEventListener('resize',()=>{if(innerWidth>760)setMenu(false)},{passive:true});
  addEventListener('scroll',()=>$('.site-header').classList.toggle('scrolled',scrollY>20),{passive:true});

  if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.08,rootMargin:'0px 0px -40px'});$$('.reveal').forEach(element=>observer.observe(element))}else{$$('.reveal').forEach(element=>element.classList.add('visible'))}
})().catch(()=>{$$('.reveal').forEach(element=>element.classList.add('visible'))});
