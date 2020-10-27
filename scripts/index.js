let carouselInnerContainer = document.getElementsByClassName("carouselContainer__space")[0];

let widthState = 100;

const log = console.log;

window.onload = () => {
    resizeWidth();
    duplicateExtremeSlides();
    addListenerToButtons();
}

window.onresize = () => {
    resizeWidth();
}

function resizeWidth() {
    let width = window.innerWidth;
    let finalWidth = 100; 
    if(width > 1200) {
        finalWidth = 65;
    } else if(width > 800 && width < 1200) {
        finalWidth = -0.0875 * width + 170;
    }
    document.documentElement.style.setProperty('--carousel-width', finalWidth + 'vw');
    widthState = finalWidth;
}

function duplicateExtremeSlides() {
    let firstSlide = carouselInnerContainer.children[0];
    let lastSlide = carouselInnerContainer.children[carouselInnerContainer.children.length - 1];
    carouselInnerContainer.insertBefore(lastSlide.cloneNode(true), firstSlide);
    carouselInnerContainer.insertBefore(firstSlide.cloneNode(true), lastSlide.nextSibling);
}

function addListenerToButtons() {
    log("addListenerToButtons")
    let buttons = document.getElementsByClassName("boton_siguiente");
    Array.prototype.map.call(buttons, (button) => {
        button.addEventListener('click', moveToNext);
    })
}

function moveToNext() {
    log("movetonext")
    let slides = document.getElementsByClassName("carousel");
    Array.prototype.map.call(slides, (slide, index) => {
        slide.classList.add('container-toLeft');
        slide.addEventListener('transitionend', () => {
            slide.classList.remove('container-toLeft');
            if(index === 0) {
                updateExtremes();
            }
        });
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