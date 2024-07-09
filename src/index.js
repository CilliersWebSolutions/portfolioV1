
import Experience from "./Experience/Experience.js";
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'

window.Webflow ||= [];
window.Webflow.push(() => {

  //console.log('Webflow has finished loading');
})
gsap.registerPlugin(ScrollTrigger)

document.addEventListener('DOMContentLoaded', () => {
  //console.log('DOM fully loaded and parsed');

  fadeHero()
  fadeScroll() // Fade in elements on scroll


  const baseContainers = document.querySelectorAll('[data-3d="c"]')
  baseContainers.forEach(container => {
    const canvas = document.createElement('canvas')
    canvas.classList.add('webgl')
    container.appendChild(canvas)
    //console.log("Initializing Experience for base container", container);
    //console.log(container)
    //console.log(canvas)

    new Experience(canvas, container)
  })

  const partContainers = document.querySelectorAll('[data-3d="cr"], [data-3d="sp"], [data-3d="gn"], [data-3d="ma"]')
  partContainers.forEach(container => {
    const canvas = document.createElement('canvas')
    canvas.classList.add('webgl')
    container.appendChild(canvas)
    //console.log("Initializing Experience for part container", container);
    new Experience(canvas, container)
  })

  const animationContainers = document.querySelectorAll('[data-3d="an"]')

  animationContainers.forEach(container => {
    const canvas = document.createElement('canvas')
    canvas.classList.add('webgl')
    container.appendChild(canvas)
    //console.log("Initializing Experience for base container", container);
    //console.log(container)
    //console.log(canvas)

    new Experience(canvas, container)
  })

  const shirtContainers = document.querySelectorAll('[data-3d="sh"], [data-3d="cp"], [data-3d="mg"]')

  shirtContainers.forEach(container => {
    const canvas = document.createElement('canvas')
    canvas.classList.add('webgl')
    container.appendChild(canvas)
    //console.log("Initializing Experience for base container", container);
    //console.log(container)
    //console.log(canvas)

    new Experience(canvas, container)
  })
  function fadeHero() {
    const heroElements = document.querySelectorAll('[hero]');
    heroElements.forEach(element => {
      gsap.set(element, { opacity: 1 });


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
      gsap.set(element, { opacity: 0 });

      gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "top 45%",
          scrub: true
        }
      }).to(element, { opacity: 1, duration: 2 });

      gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "bottom 20%",
          end: "bottom 0%",
          scrub: true
        }
      }).to(element, { opacity: 0, duration: 2 });
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

})
