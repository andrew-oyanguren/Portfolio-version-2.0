// ===== Selectors and Variables ===== \\

// burger:
const hamburger = document.querySelector('.burger');
const navbarNav = document.querySelector('.navbar-nav');

//hero: 
const heroBtn = document.querySelector('.hero-btn');
const heroCircles = document.querySelectorAll('#hero-circle');

// about:
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const carouselNav = document.querySelector('.carousel-nav');
const indicators = Array.from(carouselNav.children);
const aboutText = document.getElementById('about-text');

// get width of img size
const slideWidth = slides[0].getBoundingClientRect().width;

// Arranges slides next to each other at correct widths using Loop
const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px';
};

slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')'
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
}

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove('current-slide');
  targetDot.classList.add('current-slide');
}

const hideShowSlideArrows = (slides, prevBtn, nextBtn, targetIndex) => {
  if (targetIndex === 0) {
    prevBtn.classList.add('btn-hidden');
    nextBtn.classList.remove('btn-hidden');
  } else if (targetIndex === slides.length - 1) {
    prevBtn.classList.remove('btn-hidden');
    nextBtn.classList.add('btn-hidden');
  } else {
    prevBtn.classList.remove('btn-hidden');
    nextBtn.classList.remove('btn-hidden');
  }
}

// Working on both next and prev buttons, figure out why.
const aboutTextChange = (nextIndex) => {
  if (nextIndex === 1) {
    aboutText.innerText = "I left my previous profession, after ten years, to persue my dream of becoming a Web Developer. When you love what you do, you offer the best version of yourself.";
  } else if (nextIndex === 2) {
    aboutText.innerText = "You can say I am the quintessential family man. When I'm not coding I am with my son and beautiful wife having fun, playing games, and being goofy.";
  } else {
    aboutText.innerText = "Last name? It's Basque. I'm a Front-End Web Developer from Southern California with a passion for creating cool stuff on the internet.";
  }
}


// Skills: 
const panels = document.querySelectorAll('.panel');

// contact:
const contactBtn = document.getElementById('contact-btn');


// ===== Event Listeners ===== \\

// burger:
hamburger.addEventListener('click', showNav);

// hero:
heroBtn.addEventListener('click', fireAnimation);
heroBtn.addEventListener('mouseenter', flicker);

// about:
nextBtn.addEventListener('click', slideLeft);
prevBtn.addEventListener('click', slideRight);

carouselNav.addEventListener('click', e => {
  const targetDot = e.target.closest('button');

  if (!targetDot) return;

  const currentSlide = track.querySelector('.current-slide');
  const currentDot = carouselNav.querySelector('.current-slide');
  const targetIndex = indicators.findIndex(indicator => indicator === targetDot);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  hideShowSlideArrows(slides, prevBtn, nextBtn, targetIndex);

})

// skills:
panels.forEach(panel => {
  panel.addEventListener('click', () => {
    removeActiveClasses();
    panel.classList.add('active');
  })
})

// contact:
contactBtn.addEventListener('click', scrollToTop, false);

// ===== functions ===== \\

// burger:
function showNav() {
  if (navbarNav.classList[1] === 'show') {
    navbarNav.classList.remove('show');
    hamburger.classList.remove('active');
  } else {
    navbarNav.classList.add('show');
    hamburger.classList.add('active');
  }
}

// hero:
function fireAnimation() {
  heroCircles.forEach((circle) => {
    if (!circle.hasAttribute('animation')) {
      circle.style.animation = 'stretch 500ms ease-in-out 3';
      circle.addEventListener('animationend', () => {
        circle.style.setProperty('animation', null);
      })
    }
  })
}

function flicker() {
  heroCircles.forEach((circle) => {
    circle.style.animation = 'flicker 300ms ease-out';
    circle.style.opacity = 1;
    circle.addEventListener('animationend', () => {
      circle.style.setProperty('animation', null);
    })
  })
}

// about:
function slideLeft() {
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = carouselNav.querySelector('.current-slide');
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex(slide => slide === nextSlide);

  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  aboutTextChange(nextIndex);
  hideShowSlideArrows(slides, prevBtn, nextBtn, nextIndex);
}

function slideRight() {
  const currentSlide = track.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = carouselNav.querySelector('.current-slide');
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = slides.findIndex(slide => slide === prevSlide);

  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
  aboutTextChange(prevIndex);
  hideShowSlideArrows(slides, prevBtn, nextBtn, prevIndex);
}

// skills:
function removeActiveClasses() {
  panels.forEach(panel => {
    panel.classList.remove('active');
  })
}

// contact:
function scrollToTop() {
  document.body.scrollIntoView({ behavior: 'smooth' });
}
