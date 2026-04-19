import { useEffect, useMemo, useState } from 'react'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import LanguageToggle from './LanguageToggle.jsx'
import { useNavigate } from 'react-router-dom'
import moreImgSrc from '../assets/more.png'
import vbSrc from '../assets/10vb.png'
import bagsSrc from '../assets/bags.png'
import bookSrc from '../assets/notebook.png'
import kismiSrc from '../assets/kismi.png'
import poppinsSrc from '../assets/poppins.png'
import bhingriSrc from '../assets/bhingri.png'
import penSrc from '../assets/pen.png'
import boomerSrc from '../assets/boomer.png'
import ticklySrc from '../assets/tickly.png'
import gameSrc from '../assets/game.png'
import jahajSrc from '../assets/jahaj.png'
import cassetteSrc from '../assets/cassette.png'

const totalSteps = 7

const contentTexts = {
  en: {
    quote: 'When life was simple…',
    bags: 'and happiness fit in a school bag.',
    book: 'We made it work…',
    book2: 'with whatever we had',
    kismi: 'Do You Remember?',
    perfectText: 'Not everything was perfect… but everything felt right.',
    meetText: 'Let’s meet again… and feel it all once more.',
  },
  mr: {
    quote: 'जेव्हा जीवन सोपे होते…',
    bags: 'आणि आनंद शाळेच्या पिशवीत मावत होता.',   
    book: 'आम्ही सर्व काही केलं...',
    book2: 'आमच्याकडे असलेल्या काही गोष्टी मधून',
    kismi: 'तुम्हाला आठवते का?',
    perfectText: 'सगळं परफेक्ट नव्हतं... पण सगळं बरोबर वाटायचं.',
    meetText: 'पुन्हा भेटूया... आणि पुन्हा एकदा ते सगळं अनुभवूया.',
  },
}

const buttonLabels = {
  en: { prev: 'Prev', next: 'Next', finish: 'Finish' },
  mr: { prev: 'मागे', next: 'पुढे', finish: 'समाप्त' },
}

function StepFlow() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [language, setLanguage] = useState('en')
  const texts = useMemo(() => contentTexts[language], [language])
  const labels = useMemo(() => buttonLabels[language], [language])
  const isLastStep = currentStep === totalSteps

  useEffect(() => {
    if (currentStep > totalSteps) {
      setCurrentStep(totalSteps)
    }
  }, [currentStep])

  function goNext() {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
  }

  function goPrev() {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  return (
    <div id="hero-container">
      <LanguageToggle currentLanguage={language} onChange={setLanguage} />

      <div className="hero-button-group">
        <button type="button" className="prev-btn" onClick={goPrev} disabled={currentStep === 1}>
          <FiArrowLeft size={16} /> 
          {/* {labels.prev} */}
        </button>
        <span id="step-indicator">{currentStep}/{totalSteps}</span>
        <button type="button" className="next-btn" onClick={goNext}>
          {isLastStep ? labels.finish : (
            <>
              {/* {labels.next}  */}
              <FiArrowRight size={16} />
            </>
          )}
        </button>
      </div>

      <img
        id="more-img"
        className={currentStep === 1 ? 'active' : ''}
        src={moreImgSrc}
        alt="more"
      />

      <div className={`quote-content step-1${currentStep === 2 ? ' active' : ''}`}>
        <p id="quote-text">{texts.quote} </p>
        <img id="vb" src={vbSrc} alt="vb" />
      </div>

      <div className={`quote-content step-2${currentStep === 3 ? ' active' : ''}`}>
        <p id="bags-text">{texts.bags} </p>
        <img id="bags-img" src={bagsSrc} alt="bags" />
      </div>

      <div className={`quote-content step-3${currentStep === 4 ? ' active' : ''}`}>
        <p id="book-text">{texts.book}</p>
        <img id="book-img" src={bookSrc} alt="book" />
        <p id="book-text2">{texts.book2}</p>
      </div>

      <div className={`quote-content step-4${currentStep === 5 ? ' active' : ''}`} style={{ alignItems: 'start', justifyContent: 'flex-start', paddingTop: 80 }}>
        <p id="kismi-text" style={{ paddingLeft: 10 }}>{texts.kismi}</p>
        <div id="remember-images">
          <img src={kismiSrc} alt="kismi"  style={{width: 160, position: 'absolute',top: 120,right: -20}}  />
          <img src={poppinsSrc} alt="poppins" style={{width: 300, position: 'absolute',top: 70,left: -100}} />
          <img src={bhingriSrc} alt="bhingri" style={{width: 180, position: 'absolute',top: 280,right: -60}}/>
          <img src={penSrc} alt="pen" style={{width: 268, position: 'absolute',top: 220,left: 84}} />
          <img src={boomerSrc} alt="boomer" style={{width: 148, position: 'absolute',top: 230,right: -10}} />
          <img src={ticklySrc} alt="tickly" style={{width: 130, position: 'absolute',bottom: 180,left: 160}} />
          <img src={gameSrc} alt="game" style={{width: 240, position: 'absolute',bottom: 160,left:  -59}} />
          <img src={jahajSrc} alt="jahaj"  style={{width: 296, position: 'absolute',bottom: 44,right: -133}}/>
          <img src={cassetteSrc} alt="cassette" style={{width: 360, position: 'absolute',bottom: -120,left: -24}} />
        </div>
      </div>

      <div className={`quote-content step-5${currentStep === 6 ? ' active' : ''}`} style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 40 }}>
        <p id="perfect-text">{texts.perfectText}</p>
      </div>

      <div className={`quote-content step-6${currentStep === 7 ? ' active' : ''}`} style={{ alignItems: 'end' }}>
        <p id="meet-text2">{texts.meetText}</p>
        <button id="game-btn" type="button" onClick={() => navigate('/game')}>
          Play 90's Game
        </button>
        <div id="coming-soon">
          <p>Coming Soon...</p>
          <p>Attendance</p>
          <p>More Games</p>
          <p>Gallery</p>
          <p>..and more</p>
        </div>
      </div>
    </div>
  )
}

export default StepFlow
