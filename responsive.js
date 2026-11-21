
const menuButton=document.querySelector('.menu');
const mainNav=document.querySelector('.topbar .nav');
if(menuButton&&mainNav){
 mainNav.id='main-navigation';
 menuButton.setAttribute('aria-controls',mainNav.id);
 const sync=()=>{const open=mainNav.classList.contains('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');};
 const close=()=>{mainNav.classList.remove('open');sync();};
 menuButton.addEventListener('click',()=>{mainNav.classList.toggle('open');sync();});
 mainNav.addEventListener('click',event=>{if(event.target.closest('a,button')){close();if(document.querySelector('#app'))window.scrollTo(0,0);}});
 document.addEventListener('click',event=>{if(!event.target.closest('.topbar'))close();});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'){close();}});
 new MutationObserver(sync).observe(mainNav,{attributes:true,attributeFilter:['class']});
 sync();
}
