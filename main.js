const letters = "abcdefghijklmnopqrstuvwxyz";
const  dataText = "aymn.me"
var LoaderText = document.querySelector("#loader-text");

history.scrollRestoration = 'manual';

const intervalPrev = setInterval(()=>{

        LoaderText.innerText = LoaderText.innerText.split("").map(letter => letters[Math.floor(Math.random()*26)]).join("");

    },70);

    var pageTitle = document.title;
    var attentionMessage = ':(';
    var blinkEvent = null;
  
    document.addEventListener('visibilitychange', function(e) {
      var isPageActive = !document.hidden;
  
      if(!isPageActive){
        blink();
      }else {
        document.title = pageTitle;
        clearInterval(blinkEvent);
      }
    });
  
    function blink(){
      blinkEvent = setInterval(function() {
        if(document.title === attentionMessage){
          document.title = pageTitle;
        }else {
          document.title = attentionMessage;
        }
      }, 100);
    }

    
window.addEventListener("load", function(){
    let iteration = 0;
    clearInterval(intervalPrev);
    const intervalNew = setInterval(()=>{

        LoaderText.innerText = LoaderText.innerText.split("").map((letter,index) => {
            if(index < iteration){
                return dataText[index];
            }
            return letters[Math.floor(Math.random()*26)];
        }).join("");
        if(iteration >= 7) clearInterval(intervalNew);
        iteration += 1/3;
        
    },70);
    document.querySelector(".loader").setAttribute('transition-style',"out:wipe:cinematic");
    setTimeout(() => {
        document.querySelector(".loader").style.display = 'none';
        
    }, 2500); 
});

document.querySelector("#kashmir").addEventListener("mouseenter",()=>{
    document.querySelector(".hero-image").classList.toggle("kashmir");
});
document.querySelector("#kashmir").addEventListener("mouseleave",()=>{
    document.querySelector(".hero-image").classList.toggle("kashmir");
});

const cursor = document.getElementById("cursor");

window.onpointermove = event => { 
  const { clientX, clientY } = event;

  cursor.animate({
    left: `${clientX}px`,
    top: `${clientY + window.scrollY}px`
  }, { duration: 50, fill: "forwards" });

}

document.getElementById("tech").addEventListener("click", ()=>{
  document.querySelector('#skills').scrollIntoView({ 
    behavior: 'smooth' 
  })
});

document.getElementById("ideas").addEventListener("click", ()=>{
  document.querySelector('#projects').scrollIntoView({ 
    behavior: 'smooth' 
  })
});

document.getElementById("know-more").addEventListener("click", ()=>{
  document.querySelector('#about').scrollIntoView({ 
    behavior: 'smooth' 
  })
});


const trailer = document.getElementById("trailer");

const animateTrailer = (e, interacting) => {
  const { clientX, clientY } = e;
   const keyframes = {
    left: `${clientX}px`,
    top: `${clientY + window.scrollY}px`,
    transform: `scale(${interacting ? 3 : 1})`
  }
  
  trailer.animate(keyframes, { 
    duration: 800, 
    fill: "forwards" 
  });
}

const getTrailerClass = type => {
  switch(type) {
    case "scroll":
      return "fa-solid fa-sort";
    case "link":
      return "fa-solid fa-external-link";
    case "projects":
      return "fa-sharp fa-solid fa-magnifying-glass";
    case "email":
      return "fa-sharp fa-solid fa-paper-plane";
    case "phone":
      return "fa-sharp fa-solid fa-phone";
  }
}

window.onmousemove = e => {
  const interactable = e.target.closest(".interactable"),
        interacting = interactable !== null;
  
  const icon = document.getElementById("trailer-icon");
  
  animateTrailer(e, interacting);
  
  trailer.dataset.type = interacting ? interactable.getAttribute("data-type") : "";
  
  if(interacting) {
    icon.className = getTrailerClass(interactable.getAttribute("data-type"));
    cursor.style.opacity = 0;
  }else{
    cursor.style.opacity = 1;
  }
}