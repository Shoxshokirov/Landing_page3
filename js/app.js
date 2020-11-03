
const sections = document.querySelectorAll("section");
const nav_ul = document.getElementById('navbar__list');
const nav_bar = document.querySelector('.page__header');
function create_nav_elements(){
    let newfragment = document.createDocumentFragment();
    for (section of sections){
        let new_li = document.createElement("li");
        let new_a = document.createElement("a");
        new_a.innerText = section.getAttribute('data-nav');
        new_a.setAttribute('data-nav',section.id);
        new_li.id = section.getAttribute('data-nav');
        new_li.classList.add('menu__link');
        new_li.appendChild(new_a);
        newfragment.appendChild(new_li);
    }
    return newfragment;
}

let observer = new IntersectionObserver((entries,observer)=>{
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("your-active-class");
            nlist = document.querySelectorAll("li");
            let current_li = document.getElementById(entry.target.getAttribute('data-nav'));
            current_li.classList.add('menu_link_active');
            current_li.classList.remove('menu__link');
        }
        else
        {
            entry.target.classList.remove("your-active-class");
            nlist = document.querySelectorAll("li");
            let current_li = document.getElementById(entry.target.getAttribute('data-nav'));
            current_li.classList.remove('menu_link_active');
            current_li.classList.add('menu__link');
        }
    })
}, {threshold:0.3});

function build_nav (){
    let newfragment = create_nav_elements();
    nav_ul.appendChild(newfragment);
}
function activate_section(){
sections.forEach(section => {
    observer.observe(section);
});
}
function scroll_to_section(){
    let anchors = document.getElementsByTagName('a');
    for(anchor of anchors){
        anchor.addEventListener('click',
        (event)=>{
            let target_section = document.getElementById(event.target.getAttribute('data-nav'));
            target_section.scrollIntoView( {behavior:"smooth",block:"center"} );
        });
    }
}

build_nav();

scroll_to_section();

activate_section();

let mouse = false;
window.addEventListener('mousemove',(event)=>{ if (event.clientY<50){
    nav_bar.style.display = 'block';
    mouse = true;
}else {mouse =false;}}  );

window.addEventListener("scroll",()=>{ nav_bar.style.display = 'block';
setTimeout(()=>{
    if(!mouse){nav_bar.style.display = 'none'; }},2000 )});
