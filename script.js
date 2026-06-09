/* CURSOR GLOW */
const glow=document.getElementById('cursor-glow');
document.addEventListener('mousemove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'});

/* TYPED TEXT */
const phrases=['Full Stack Developer','Python Developer','Java Developer','UI/UX Enthusiast','Problem Solver'];
let pi=0,ci=0,del=false;
const tel=document.getElementById('typed');
function tick(){
  const cur=phrases[pi];
  tel.textContent=del?cur.slice(0,ci--):cur.slice(0,ci++);
  if(!del&&ci>cur.length){del=true;setTimeout(tick,1400);return}
  if(del&&ci<0){del=false;pi=(pi+1)%phrases.length}
  setTimeout(tick,del?52:88);
}
setTimeout(tick,800);

/* SCROLL REVEAL */
const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('on');
      /* trigger skill bars */
      e.target.querySelectorAll('.sb-fill').forEach(b=>{b.classList.add('ani');b.style.transform='scaleX('+b.style.getPropertyValue('--w')+')'});
    }
  });
},{threshold:0.1});
document.querySelectorAll('.reveal,.stag').forEach(el=>io.observe(el));

/* also trigger bars if about section visible early */
const barWrap=document.getElementById('skill-bars');
const bIo=new IntersectionObserver(entries=>{
  if(entries[0].isIntersecting){
    barWrap.querySelectorAll('.sb-fill').forEach(b=>{
      b.classList.add('ani');
      b.style.transform='scaleX('+b.style.getPropertyValue('--w')+')';
    });
    bIo.disconnect();
  }
},{threshold:0.2});
bIo.observe(barWrap);

/* MOBILE MENU TOGGLE */
const menuBtn=document.getElementById('menu-btn');
const drawer=document.getElementById('mobile-drawer');
const mbLabel=menuBtn.querySelector('.mb-label');
menuBtn.addEventListener('click',()=>{
  const open=drawer.classList.toggle('open');
  menuBtn.classList.toggle('open',open);
  menuBtn.setAttribute('aria-expanded',open);
  mbLabel.textContent=open?'Close':'Menu';
});
/* close drawer on link click */
drawer.querySelectorAll('a').forEach(a=>{
  a.addEventListener('click',()=>{
    drawer.classList.remove('open');
    menuBtn.classList.remove('open');
    menuBtn.setAttribute('aria-expanded',false);
    mbLabel.textContent='Menu';
  });
});

/* NAV ACTIVE */
const secs=document.querySelectorAll('section[id]');
const links=document.querySelectorAll('.nav-links a');
window.addEventListener('scroll',()=>{
  let cur='';
  secs.forEach(s=>{if(window.scrollY>=s.offsetTop-90)cur=s.id});
  links.forEach(a=>{a.style.color=a.getAttribute('href')==='#'+cur?'var(--violet)':''});
});