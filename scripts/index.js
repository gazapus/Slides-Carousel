let carouselInnerContainer = document.getElementsByClassName("carouselContainer__space")[0];

let widthState = 100;
let currentPosition = 1;

const log = console.log;

window.onload = () => {
    resizeWidth();
    duplicateSlides();
    hideFirstSlide();
    addListenerToButtons();
}

window.onresize = () => {
    resizeWidth();
}

function resizeWidth() {
    let width = window.innerWidth;
    let finalWidth = 100;
    if (width > 1200) {
        finalWidth = 65;
    } else if (width > 800 && width < 1200) {
        finalWidth = -0.0875 * width + 170;
    }
    document.documentElement.style.setProperty('--carousel-width', finalWidth + 'vw');
    widthState = finalWidth;
}

function duplicateSlides() {
    let slides = carouselInnerContainer.children;
    let totalSlides = slides.length;
    for (let i = 0; i < totalSlides - 1; i++) { 
        carouselInnerContainer.insertBefore(slides[i].cloneNode(true), slides[slides.length - 1].nextSibling);
    }
    carouselInnerContainer.insertBefore(slides[totalSlides - 1].cloneNode(true), slides[0]);
}

function hideFirstSlide() {
    let slides = document.getElementsByClassName("carousel");
    Array.prototype.map.call(slides, (slide) => {
        slide.style.transform = `translate(-${widthState}vw)`;
    })
}

function addListenerToButtons() {
    let buttons = document.getElementsByClassName("boton_siguiente");
    Array.prototype.map.call(buttons, (button) => {
        button.addEventListener('click', moveToNext);
    })
}

function moveToNext() {
    let slides = document.getElementsByClassName("carousel");
    currentPosition++;
    var firstSlideDeleted = false;
    Array.prototype.map.call(slides, (slide) => {
        slide.style.transform = `translate(-${widthState * currentPosition}vw)`;
        slide.addEventListener('transitionend', () => {
            if(!firstSlideDeleted) {
                firstSlideDeleted = true;
                log("ppe");
            }
        })
    })
}

function updateExtremes() {
    let firstSlide = carouselInnerContainer.children[0];
    let lastSlide = carouselInnerContainer.children[carouselInnerContainer.children.length - 1];
    carouselInnerContainer.insertBefore(firstSlide.cloneNode(true), lastSlide.nextSibling);
    carouselInnerContainer.removeChild(firstSlide);
    addListenerToButtons();
}



/*
    contenedor
        +slide3
        slide1  <-- #start
        slide2
        slide3
        +slide1
    /contenedor

*/