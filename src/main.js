import './style.css'
import { gsap } from 'gsap'

const quoteText = document.getElementById('quote-text')
const bagsText = document.getElementById('bags-text')
const bookText = document.getElementById('book-text')
const bookText2 = document.getElementById('book-text2')
const kismiText = document.getElementById('kismi-text')
const moreImg = document.getElementById('more-img')
const vb = document.getElementById('vb')
const bagsImg = document.getElementById('bags-img')
const bookImg = document.getElementById('book-img')
const kismiImg = document.getElementById('kismi-img')
const skipBtn = document.getElementById('skip-btn')
const continueBtn = document.getElementById('continue-btn')
const stepIndicator = document.getElementById('step-indicator')
const enBtn = document.getElementById('en-btn')
const mrBtn = document.getElementById('mr-btn')

let currentStep = 1
const totalSteps = 4
let currentLang = 'en'

const contentTexts = {
  en: {
    quote: ["", "When life was simple…", "", "", ""],
    bags: ["", "", "and happiness fit in a school bag.", "", ""],
    book: ["", "", "", "We made it work", ""],
    book2: ["", "", "", "with whatever we had", ""],
    kismi: ["", "", "", "", "Do You Remember?"]
  },
  mr: {
    quote: ["", "जेव्हा जीवन सोपे होते…", "", "", ""],
    bags: ["", "", "आणि आनंद शालेय पिशवीत बसला.", "", ""],
    book: ["", "", "", "आम्ही ते काम केले", ""],
    book2: ["", "", "", "जे काही आमच्याकडे होते त्याने", ""],
    kismi: ["", "", "", "", "तुम्हाला आठवते का?"]
  }
}

const buttonTexts = {
  en: { skip: "Skip", continue: "Continue", finish: "Finish" },
  mr: { skip: "वगळा", continue: "सुरू ठेवा", finish: "समाप्त" }
}

const indicatorTexts = {
  en: "Step",
  mr: "पायरी"
}

// Define animations for transitions between steps
const stepAnimations = [
  // From step 1 to 2: fade out #more-img, fade in #quote-text
  gsap.timeline({ paused: true }).to('#more-img', { opacity: 0, duration: .5 }).to('#quote-text', { opacity: 1, duration: 1.5 }, 0).to('#vb', { opacity: 1, x: 0, duration: 1 }, 1),
  // From step 2 to 3: fade out #quote-text, fade in #vb
  gsap.timeline({ paused: true }).to('#quote-text', { opacity: 0, duration: .5 }).to('#vb', { opacity: 0, x: 0, duration: 0.5 }, 0).to('#bags-text', { opacity: 1, duration: 1.5 }, 1).to('#bags-img', { opacity: 1, duration: 1.5 }, 1),
  // From step 3 to 4: fade out #vb, fade in #bags-img
  gsap.timeline({ paused: true }).to('#bags-text', { opacity: 0, x: 0, duration: 1 }).to('#bags-img', { opacity: 0, duration: 1.5 }, 0).to('#book-text', { opacity: 1, duration: 1.5 }, 0).to('#book-img', { opacity: 1, duration: 1.5 }, 1).to('#book-text2', { opacity: 1, duration: 1.5 }, 1.5),
  gsap.timeline({ paused: true }).to('#book-text', { opacity: 0, x: 0, duration: 1 }).to('#book-img', { opacity: 0, duration: 1.5 }, 0).to('#book-text2', { opacity: 0, duration: 1.5 }, 0).to('#kismi-text', { opacity: 1, duration: 1.5 }, 1).to('#kismi-img', { opacity: 1, duration: 1.5 }, 1)
]

// Set initial states for step 1
gsap.set('#more-img', { opacity: 1 })
gsap.set('#quote-text', { opacity: 0 })
gsap.set('#vb', { opacity: 0 })
gsap.set('#bags-img', { opacity: 0 })
gsap.set('#bags-text', { opacity: 0 })
gsap.set('#book-text', { opacity: 0 })
gsap.set('#book-text2', { opacity: 0 })
gsap.set('#book-img', { opacity: 0 })
gsap.set('#kismi-text', { opacity: 0 })
gsap.set('#kismi-img', { opacity: 0 })

function updateControls() {
  console.log(`Current Step: ${currentStep} / ${totalSteps}`)
  const isLast = currentStep === totalSteps
  const texts = buttonTexts[currentLang]
  skipBtn.textContent = texts.skip
  continueBtn.textContent = isLast ? texts.finish : texts.continue
  stepIndicator.textContent = `${indicatorTexts[currentLang]} ${currentStep} / ${totalSteps}`
  // Update all text content
  const langTexts = contentTexts[currentLang]
  quoteText.textContent = langTexts.quote[currentStep - 1]
  bagsText.textContent = langTexts.bags[currentStep - 1]
  bookText.textContent = langTexts.book[currentStep - 1]
  bookText2.textContent = langTexts.book2[currentStep - 1]
  kismiText.textContent = langTexts.kismi[currentStep - 1]
  // Update lang button active state
  enBtn.classList.toggle('active', currentLang === 'en')
  mrBtn.classList.toggle('active', currentLang === 'mr')
}

function goToStep(targetStep) {
  if (targetStep > currentStep) {
    // Play the transition animation
    stepAnimations[currentStep - 1].restart()
  }
  currentStep = targetStep
  updateControls()
}

function setFinalState() {
  gsap.set('#more-img', { opacity: 0 })
  gsap.set('#quote-text', { opacity: 1 })
  gsap.set('#vb', { opacity: 0 })
  gsap.set('#bags-img', { opacity: 1 })
  gsap.set('#bags-text', { opacity: 1 })
  gsap.set('#book-text', { opacity: 1 })
  gsap.set('#book-text2', { opacity: 1 })
  gsap.set('#book-img', { opacity: 1 })
  gsap.set('#kismi-text', { opacity: 1 })
  gsap.set('#kismi-img', { opacity: 1 })
  // Set final texts for step 4
  const langTexts = contentTexts[currentLang]
  quoteText.textContent = langTexts.quote[3]
  bagsText.textContent = langTexts.bags[3]
  bookText.textContent = langTexts.book[3]
  bookText2.textContent = langTexts.book2[3]
  kismiText.textContent = langTexts.kismi[3]
}

function completeFlow() {
  stepIndicator.textContent = 'Completed'
  skipBtn.style.display = 'none'
  continueBtn.style.display = 'none'
  // Optional: some completion animation
}

// Event listeners
enBtn.addEventListener('click', () => {
  currentLang = 'en'
  updateControls()
})
mrBtn.addEventListener('click', () => {
  currentLang = 'mr'
  updateControls()
})
skipBtn.addEventListener('click', () => {
  setFinalState()
  currentStep = totalSteps
  updateControls()
})
continueBtn.addEventListener('click', () => {
  if (currentStep < totalSteps) {
    goToStep(currentStep + 1)
  } else {
    completeFlow()
  }
})

// Start at step 1
updateControls()