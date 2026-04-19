import { useState } from 'react'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import SectionHeader from '../components/SectionHeader.jsx'

const galleryModules = import.meta.glob('../assets/gallery/*.{jpg,jpeg,jfif,webp}', { eager: true })
const images = Object.keys(galleryModules)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
  .map((filePath) => galleryModules[filePath].default)
const totalImages = images.length

function GalleryPage() {
  const [currentImage, setCurrentImage] = useState(0)

  const goNext = () => {
    setCurrentImage((prev) => (prev + 1) % totalImages)
  }

  const goPrev = () => {
    setCurrentImage((prev) => (prev - 1 + totalImages) % totalImages)
  }

  return (
    <main className="gallery-page page-content">
      <SectionHeader title="Gallery" subtitle="Memories and visuals from the same era." />
      <div className="gallery-container">
        <img src={images[currentImage]} alt={`Gallery image ${currentImage + 1}`} />
      </div>
      <div className="hero-button-group">
        <button type="button" className="prev-btn" onClick={goPrev}>
          <FiArrowLeft size={16} />
        </button>
        <span id="step-indicator">{currentImage + 1}/{totalImages}</span>
        <button type="button" className="next-btn" onClick={goNext}>
          <FiArrowRight size={16} />
        </button>
      </div>
    </main>
  )
}

export default GalleryPage
