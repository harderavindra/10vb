import './style.css'
import { gsap } from 'gsap'

// Animation sequence on page load
const timeline = gsap.timeline();

// Fade in the image
timeline.to('#more-img', {
  duration: 1,
  opacity: 1,
  ease: 'power1.inOut'
})
// Hold the image for a moment
.to('#more-img', {
  duration: 1.5,
  opacity: 1
})
// Fade out the image
.to('#more-img', {
  duration: 1,
  opacity: 0,
  ease: 'power1.inOut'
})
// Fade in the text
.to('#quote-text', {
  duration: 1.5,
  opacity: 1,
  ease: 'power1.inOut'
}, '-=0.5')
// Animate #vb from left with slide-in effect
.to('#vb', {
  duration: 1.5,
  opacity: 1,
  x: 0,
  ease: 'power1.inOut'
});