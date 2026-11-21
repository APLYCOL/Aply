const screens=[...document.querySelectorAll('[data-screen]')];
const nav=[...document.querySelectorAll('[data-go]')];
function setActiveNavigation(name,projectType){document.querySelectorAll('.nav button').forEach(b=>b.classList.remove('active'));const direct=document.querySelector(`.nav [data-go="${name}"]`);if(direct)direct.classList.add('active');if(['nosotros','que-hacemos','clientes'].includes(name))document.querySelector('.nav-about>.nav-dropdown-trigger')?.classList.add('active');if(name==='acabados')document.querySelector('.nav-dropdown:not(.nav-about)>.nav-dropdown-trigger')?.classList.add('active');if(name==='proyectos'&&projectType)document.querySelector(`.nav [data-project-open="${projectType}"]`)?.classList.add('active')}
function go(name){if(name==='que-hacemos')name='servicios';if(!['acabados','clientes',...screens.map(s=>s.dataset.screen)].includes(name))name='inicio';if(name==='acabados'){location.href='acabados-arquitectonicos.html';return;}if(name==='clientes')name='inicio';screens.forEach(s=>s.classList.toggle('active',s.dataset.screen===name));setActiveNavigation(name);document.querySelector('.nav').classList.remove('open');history.replaceState(null,'','#'+name);window.scrollTo(0,0)}
nav.forEach(b=>b.addEventListener('click',()=>go(b.dataset.go)));

const modal=document.querySelector('#modal');
function openModal(title,desc,isProject=false){modal.classList.toggle("project-detail",isProject);document.querySelector('#modal-title').textContent=title;document.querySelector('#modal-description').textContent=desc;document.querySelectorAll('[data-modal-photo]').forEach((photo,index)=>photo.dataset.photoTitle=`${title} · Foto ${index+1}`);modal.classList.add('open');modal.setAttribute('aria-hidden','false')}
document.querySelectorAll('[data-modal]').forEach(b=>b.addEventListener('click',()=>openModal(b.dataset.modal,b.dataset.desc)));
document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true')}));
const finishLightbox=document.querySelector('#finish-lightbox');
const finishGalleryPhotos=[...document.querySelectorAll('.finish-gallery-photo')];
const modalGalleryPhotos=[...document.querySelectorAll('[data-modal-photo]')];
let activeLightboxPhotos=[];
let finishLightboxIndex=0;
function photoTitle(photo,index){return photo.dataset.photoTitle||photo.querySelector('span')?.textContent||`Foto ${index+1}`}
function showFinishLightbox(index,photos=activeLightboxPhotos){activeLightboxPhotos=photos;finishLightboxIndex=(index+activeLightboxPhotos.length)%activeLightboxPhotos.length;document.querySelector('#lightbox-title').textContent=photoTitle(activeLightboxPhotos[finishLightboxIndex],finishLightboxIndex);document.querySelector('#lightbox-current').textContent=finishLightboxIndex+1;document.querySelector('.lightbox-photo span').lastChild.textContent=` / ${activeLightboxPhotos.length}`;document.querySelectorAll('.lightbox-arrow').forEach(arrow=>arrow.hidden=activeLightboxPhotos.length<2);finishLightbox.classList.add('open');finishLightbox.setAttribute('aria-hidden','false')}
function closeFinishLightbox(){finishLightbox.classList.remove('open');finishLightbox.setAttribute('aria-hidden','true')}
finishGalleryPhotos.forEach(photo=>photo.addEventListener('click',()=>showFinishLightbox(Number(photo.dataset.galleryIndex),finishGalleryPhotos)));
document.querySelectorAll('[data-expand-photo]').forEach(photo=>{const open=()=>showFinishLightbox(0,[photo]);photo.addEventListener('click',open);photo.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();open()}})});
modalGalleryPhotos.forEach((photo,index)=>{const open=()=>showFinishLightbox(index,modal.classList.contains("project-detail")?modalGalleryPhotos:modalGalleryPhotos.slice(0,3));photo.addEventListener('click',open);photo.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();open()}})});
document.querySelector('[data-lightbox-previous]').addEventListener('click',()=>showFinishLightbox(finishLightboxIndex-1));
document.querySelector('[data-lightbox-next]').addEventListener('click',()=>showFinishLightbox(finishLightboxIndex+1));
document.querySelectorAll('[data-lightbox-close]').forEach(button=>button.addEventListener('click',closeFinishLightbox));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){modal.classList.remove('open');closeFinishLightbox()}if(finishLightbox.classList.contains('open')&&e.key==='ArrowLeft')showFinishLightbox(finishLightboxIndex-1);if(finishLightbox.classList.contains('open')&&e.key==='ArrowRight')showFinishLightbox(finishLightboxIndex+1)});
const carouselSlides=[...document.querySelectorAll('.hero-slide')];
const carouselCurrent=document.querySelector('#carousel-current');
const carouselPause=document.querySelector('.carousel-pause');
let carouselIndex=0;
let carouselPaused=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let carouselTimer;
function showCarouselSlide(index){carouselIndex=(index+carouselSlides.length)%carouselSlides.length;carouselSlides.forEach((slide,i)=>slide.classList.toggle('active',i===carouselIndex));carouselCurrent.textContent=carouselIndex+1}
function startCarousel(){clearInterval(carouselTimer);carouselTimer=setInterval(()=>{if(!carouselPaused&&!document.hidden&&document.querySelector('[data-screen=inicio]').classList.contains('active'))showCarouselSlide(carouselIndex+1)},3500)}
document.querySelector('.carousel-arrow.next').addEventListener('click',()=>{showCarouselSlide(carouselIndex+1);startCarousel()});
document.querySelector('.carousel-arrow.previous').addEventListener('click',()=>{showCarouselSlide(carouselIndex-1);startCarousel()});
carouselPause.addEventListener('click',()=>{carouselPaused=!carouselPaused;carouselPause.textContent=carouselPaused?'▶':'Ⅱ';carouselPause.setAttribute('aria-label',carouselPaused?'Reproducir carrusel':'Pausar carrusel')});
startCarousel();
go(location.hash.slice(1)||'inicio');

const clientsPause=document.querySelector('.clients-pause');
clientsPause.addEventListener('click',()=>{const paused=document.querySelector('.home-clients').classList.toggle('is-paused');clientsPause.textContent=paused?'Reanudar':'Pausar';clientsPause.setAttribute('aria-pressed',String(paused));clientsPause.setAttribute('aria-label',paused?'Reanudar movimiento de clientes':'Pausar movimiento de clientes')});

window.addEventListener('hashchange',()=>go(location.hash.slice(1)||'inicio'));

if(carouselPaused){carouselPause.textContent='▶';carouselPause.setAttribute('aria-label','Reproducir carrusel')}
