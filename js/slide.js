const sliderArr = document.querySelectorAll('.slide'),
    dotsBox = document.querySelector('.dotsbox'),
    sliderContainer = document.querySelector(".slider__container");

let currentSlide;
let running;
let timer = setInterval(autoslide, 7000);
let imgSize = document.querySelectorAll('.slide img')[0].clientWidth;
init();

function init() {
    running = localStorage.getItem("running");
    currentSlide = localStorage.getItem("slide");
    if (running == null) {
        console.log("running is null");
        running = true;
    } else {
        console.log("running " + running);
        running = false;
    }
    if (currentSlide == null) {
        console.log("slide is null");
        currentSlide = 1;
    } else {
        console.log("loaded slide = " + currentSlide);
    }

    window.onbeforeunload = function (ev) {
        console.log("closing");
        // Store state before closing
        localStorage.clear();
        localStorage.setItem("running", running);
        localStorage.setItem("slide", currentSlide);
    };
    createDots();
    goToSlide(currentSlide);
}

function createDots() {
    for (let i = 0; i < sliderArr.length - 2; i++) {
        //create single dot
        const dot = document.createElement("span");
        dot.classList.add("dot");
        //event listener
        dot.addEventListener("click", () => {
            goToSlide(i + 1);
        });
        //add it to box
        dotsBox.appendChild(dot);
    }
    //set active dot depended on current slide
    dotsBox.children[currentSlide - 1].classList.add("active");
}

function autoslide() {
    if (running) {
        slide(1);
    }
}

function resetTimer() {
    clearInterval(timer);
    timer = setInterval(autoslide, 7000);
}

function slide(n) {
    resetTimer();

    if (currentSlide >= sliderArr.length - 1) return;
    if (currentSlide < 0) return;

    currentSlide = Number(currentSlide) + Number(n);
    goToSlide(currentSlide);
}

function goToSlide(slideNumber) {
    currentSlide = Number(slideNumber);
    console.log("current slide " + currentSlide);

    //slide img
    sliderContainer.style.transition = "transform 0.5s ease-in-out";
    sliderContainer.style.transform = "translateX(-" + imgSize * currentSlide + "px)";

    //deactivate dot
    let activeDot = document.querySelector(".dot.active");
    activeDot.classList.remove("active");
    //calculate active dot position
    var dotIndex = currentSlide >= sliderArr.length - 1 ? 0
        : currentSlide <= 0 ? sliderArr.length - 3 : currentSlide - 1;
    console.log("index = " + dotIndex);
    dotsBox.children[dotIndex].classList.add("active");
}


sliderContainer.addEventListener('transitionend', () => {
    if (currentSlide >= sliderArr.length - 1) {
        sliderContainer.style.transition = "none";
        currentSlide = 1;
        sliderContainer.style.transform = "translateX(-" + imgSize * currentSlide + "px)";
    } else if (currentSlide <= 0) {
        sliderContainer.style.transition = "none";
        currentSlide = sliderArr.length - 2;
        sliderContainer.style.transform = "translateX(-" + imgSize * currentSlide + "px)";
    }
})