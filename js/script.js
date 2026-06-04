/* Lightweight particles background, typing effect, terminal demo, GitHub repos fetch */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let w=canvas.width=innerWidth, h=canvas.height=innerHeight;
window.addEventListener('resize',()=>{w=canvas.width=innerWidth;h=canvas.height=innerHeight});

// Particles
const particles = [];
for(let i=0;i<80;i++){particles.push({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.6+0.4,vx:(Math.random()-0.5)*0.2,vy:(Math.random()-0.5)*0.2})}
function draw(){ctx.clearRect(0,0,w,h);for(let p of particles){p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=w;if(p.x>w)p.x=0;if(p.y<0)p.y=h;if(p.y>h)p.y=0;ctx.beginPath();ctx.fillStyle='rgba(0,230,214,0.06)';ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill()}requestAnimationFrame(draw)}
draw();

// Typing effect
const phrases = [
  'sudo apt install curiosity',
  'console.log("Olá, mundo!")',
  'Construindo soluções open source',
  'Explorando Linux, JavaScript e C#'
];
const typedEl = document.getElementById('typed');
let pi=0, ci=0;
function type(){const str=phrases[pi];typedEl.textContent=str.slice(0,ci);ci++;if(ci>str.length){setTimeout(()=>{ci=0;pi=(pi+1)%phrases.length;type()},1400)}else{setTimeout(type,60+Math.random()*80)}}
type();

// Fetch GitHub repos
const projectsList = document.getElementById('projects-list');
async function loadRepos(){try{const resp=await fetch('https://api.github.com/users/cristianovx54-HUE/repos?per_page=8&sort=updated');if(!resp.ok) throw new Error('GitHub API');const repos=await resp.json();if(repos && repos.length){repos.slice(0,8).forEach(addRepoCard);}else fallback()}catch(e){console.warn('GitHub fetch failed',e);fallback()}}
function addRepoCard(r){const card=document.createElement('article');card.className='project-card';
  card.innerHTML=`<div class="project-title">${escapeHtml(r.name)}</div><div class="project-desc">${escapeHtml(r.description||'Sem descrição')}</div><div class="project-links">`+
    `<a class="chip" href="${r.html_url}" target="_blank" rel="noopener">Ver no GitHub</a>`+
    (r.homepage?`<a class="chip" href="${r.homepage}" target="_blank" rel="noopener">Demo</a>`:'')+`</div>`;
  projectsList.appendChild(card);
}
function fallback(){const samples=[{name:'Exemplo-CLI',description:'Ferramenta de linha de comando para automatizar tarefas',html_url:'#'},{name:'Site-Pessoal',description:'Layout e estilo com tema cyberpunk',html_url:'#'}];samples.forEach(addRepoCard)}
function escapeHtml(s){return s.replace(/[&<>\"]/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]))}
loadRepos();

// Smooth scrolling for anchor buttons
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const t=document.querySelector(a.getAttribute('href'));if(t) t.scrollIntoView({behavior:'smooth',block:'start'})}));

// small accessibility: focus outlines on keyboard nav
window.addEventListener('keydown',e=>{if(e.key==='Tab') document.documentElement.classList.add('show-focus')});

