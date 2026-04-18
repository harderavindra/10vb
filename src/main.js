import './style.css'
import { gsap } from 'gsap'

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Welcome to the Single Page Website!</h1>
    <p>This page features GSAP animations.</p>
    <div id="box" style="width: 100px; height: 100px; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); border-radius: 10px; margin: 20px auto;"></div>
    <button id="animateBtn">Animate!</button>
  </div>
`

// Initial animation
gsap.from("#box", {duration: 1, y: -100, opacity: 0, ease: "bounce"});

// Button click animation
document.getElementById('animateBtn').addEventListener('click', () => {
  gsap.to("#box", {duration: 2, rotation: 360, scale: 1.5, ease: "power2.out", yoyo: true, repeat: 1});
});