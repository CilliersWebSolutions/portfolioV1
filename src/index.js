
import Experience from "./Experience/Experience.js"
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import Swiper from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css'


window.Webflow ||= []
window.Webflow.push(() => {

  //console.log('Webflow has finished loading');
})
gsap.registerPlugin(ScrollTrigger)
//register();
document.addEventListener('DOMContentLoaded', () => {
  //console.log('DOM fully loaded and parsed');

  fadeHero()
  fadeScroll() // Fade in elements on scroll

  function initializeExperience(containers) {
    containers.forEach(container => {
      const canvas = document.createElement('canvas')
      canvas.classList.add('webgl')
      container.appendChild(canvas)
      try {
        new Experience(canvas, container);
      } catch (error) {
        console.error('Error initializing Experience:', error)
      }
    })
  }

  //init Experiences

  // init hero section container
  initializeExperience(document.querySelectorAll('[data-3d="c"]'))

  // init rover containers
  initializeExperience(document.querySelectorAll('[data-3d="cr"], [data-3d="sp"], [data-3d="gn"], [data-3d="ma"]'))

  // init rubix container
  initializeExperience(document.querySelectorAll('[data-3d="an"]'))

  // init 3d store containers
  initializeExperience(document.querySelectorAll('[data-3d="sh"], [data-3d="cp"], [data-3d="mg"]'))

  // init 3D Map container
  initializeExperience(document.querySelectorAll('[data-3d="map"]'))


  //GSAP

  function fadeHero() {
    const heroElements = document.querySelectorAll('[hero]');
    heroElements.forEach(element => {
      gsap.set(element, { opacity: 1 })


      gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "bottom 40%",
          end: "bottom 20%",
          scrub: true
        }
      }).to(element, { opacity: 0, duration: 2 });
    });
  }

  function fadeScroll() {
    const fadeElements = document.querySelectorAll('[fadeScroll]');
    fadeElements.forEach(element => {
      gsap.set(element, { opacity: 0 })

      gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "top 45%",
          scrub: true
        }
      }).to(element, { opacity: 1, duration: 2 })

      gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "bottom 20%",
          end: "bottom 0%",
          scrub: true
        }
      }).to(element, { opacity: 0, duration: 2 })
    });
  }
  function fadeLast() {
    const lastElements = document.querySelectorAll('[fadeLast]');
    lastElements.forEach(element => {
      gsap.set(element, { opacity: 0 });

      gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top 90%",
          end: "bottom 100%",
          scrub: true
        }
      }).to(element, { opacity: 1, duration: 2 });

    });
  }

  var swiper = new Swiper(".swiper", {
    modules: [Navigation],
    watchSlidesProgress: true,
    slidesPerView: 2,
    loop: true,
    createElements: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    allowTouchMove: false, // Disable swiping
    speed: 1000,
    //cssMode: true,
  });

  // Function to update slide classes based on active slide
  function updateSlideOpacity() {
    // Check if there are slides available
    if (swiper.slides.length === 0) return

    swiper.slides.forEach((slide) => {
      slide.classList.remove('swiper-slide-active')
      slide.style.opacity = '0.2'; // Set default opacity for non-active slides
      slide.style.transform = 'scale(0.75)';

    });

    // Get the active slide index
    const activeIndex = swiper.activeIndex;

    // Ensure activeIndex is valid
    if (activeIndex >= 0 && activeIndex < swiper.slides.length) {
      const activeSlide = swiper.slides[activeIndex]
      activeSlide.classList.add('swiper-slide-active')

      activeSlide.style.opacity = '1'; // Set full opacity for active slide
      activeSlide.style.transform = 'scale(1)'
    }
  }

  // Initial call to set the correct opacity
  updateSlideOpacity();

  // Update opacity on slide change
  swiper.on('slideChange', updateSlideOpacity)


  swiper.slides.forEach((slide) => {
    // Add click event listener to the slide
    slide.addEventListener('click', (event) => {
      // Check if the active slide is clicked
      if (slide.classList.contains('swiper-slide-active')) {
        return; // Do nothing if the active slide is clicked
      }

      // If the active slide is not clicked, trigger the next slide
      swiper.slideNext();

    });
  });

})
