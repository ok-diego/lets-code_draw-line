import "./css/style.css";

import { gsap } from "gsap-trial";
import { SplitText } from "gsap-trial/SplitText";
gsap.registerPlugin(SplitText);

const DOM = {
  $body: document.querySelector("body"),
  $ecosite: document.querySelector(".ecosite"),
  $contenedor: document.querySelector(".contenedor"),
};

new SplitText(".ecosite", { type: "words,chars", charsClass: "js-char" });
new SplitText(".global", { type: "words", wordsClass: "js-word" });
new SplitText(".air", { type: "words", wordsClass: "js-word" });

let init_timeline; // Declare the timeline variable outside to ensure it's accessible in the class

// toggle right column function
const toggleCol = () => {
  DOM.$contenedor.classList.toggle("animateIn");
};

// DOM.$body.addEventListener("click", toggleCol);

// GSAP class
class App {
  constructor() {
    this.init();
  }

  init() {
    this.body = document.querySelector("body");
    this.btn = document.querySelector(".image");

    // Initialize the timeline inside the init method to ensure it's set up when the class is instantiated
    init_timeline = gsap
      .timeline({
        defaults: {
          duration: 1,
          stagger: 0.04,
          ease: "power3.out",
        },
      })
      // This line animates elements with the class .js-word inside .global from a yPercent of 160 to 0.
      .fromTo(".global .js-word", { yPercent: 160 }, { yPercent: 0 }, "<")
      // using the "<" symbol to indicate that the animation should start at the same time as the previous animation.
      // This line fades in the elements with the class .js-word inside .global after a delay of 0.5 seconds,
      // This line starts the animation for elements with the class .js-word inside .global, setting their initial opacity to 0 and then fading them in after a delay of 0.2 seconds.
      // The "<10%" indicates that this animation should start slightly after the start of the previous animation, specifically 10% into the duration of the previous animation.
      .from(".global .js-word", { delay: 0.2, opacity: 0 }, "<10%")
      .fromTo(".air .js-word", { yPercent: 160 }, { yPercent: 0 }, "<") //tween
      .from(".air .js-word", { delay: 0.2, opacity: 0 }, "<10%")
      .fromTo(".ecosite .js-char", { yPercent: -100 }, { yPercent: 0 }) //tween

      .from(".circle", { duration: 1.4, scale: 0, ease: "power3.inOut" }, "<")
      .to(
        ".air .js-word",
        { duration: 1, xPercent: 10, ease: "power3.inOut" },
        "<"
      )
      .from(".ecosite .js-char", { delay: 0.2, opacity: 0 }, "<")
      .pause(); // Ensure the timeline is paused after being set up

    this.bindEvents();
  }

  bindEvents() {
    setTimeout(() => {
      init_timeline.play(); // Directly reference the timeline variable to play it
      toggleCol();
      console.log("Animation played!");
    }, 3000);
  }

  // bindEvents() {
  //   let isPlaying = false;
  //   this.body.addEventListener("click", () => {
  //     if (!isPlaying) {
  //       init_timeline.play(); // Directly reference the timeline variable to play it
  //       toggleCol();
  //       console.log("Animation played!");
  //       isPlaying = true;
  //     } else {
  //       init_timeline.reverse(); // Reverse the timeline if already playing
  //       toggleCol();
  //       console.log("Animation reversed!");
  //       isPlaying = false;
  //     }
  //   });
  // }
}
export const app = new App();
