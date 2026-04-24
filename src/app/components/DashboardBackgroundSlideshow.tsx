import { useState, useEffect } from 'react'
import { ImageWithFallback } from './figma/ImageWithFallback'

interface DashboardBackgroundSlideshowProps {
  children: React.ReactNode
}

const SLIDESHOW_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1740741703636-1680d0c0f0a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVZ2FuZGElMjBmYXJtZXJzJTIwZmFybWluZ3xlbnwxfHx8fDE3NjE2NjkwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Ugandan farmers working in the field'
  },
  {
    url: 'https://images.unsplash.com/photo-1720516676434-d5548d2e3fb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwY29mZmVlJTIwcGxhbnRhdGlvbnxlbnwxfHx8fDE3NjE2NjkwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Coffee plantation in Africa'
  },
  {
    url: 'https://images.unsplash.com/photo-1649616551392-14131bd9ceac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5hbmElMjBwbGFudGF0aW9uJTIwZmFybXxlbnwxfHx8fDE3NjE1OTIzMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Banana plantation farm'
  },
  {
    url: 'https://images.unsplash.com/photo-1649251037566-6881b4956615?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWl6ZSUyMGNvcm4lMjBmaWVsZHxlbnwxfHx8fDE3NjE2NjkwMDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Maize corn field'
  },
  {
    url: 'https://images.unsplash.com/photo-1666987570506-f8c3e05b6c58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwZmFybWVyJTIwY3JvcHN8ZW58MXx8fHwxNzYxNjY5MDAxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'African farmer with crops'
  },
  {
    url: 'https://images.unsplash.com/photo-1677768792186-47e266f26848?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWElMjBwbGFudGF0aW9uJTIwYWdyaWN1bHR1cmV8ZW58MXx8fHwxNzYxNjM1Njg1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Tea plantation agriculture'
  },
  {
    url: 'https://images.unsplash.com/photo-1759344114577-b6c32e4d68c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwdmVnZXRhYmxlJTIwZmFybWluZ3xlbnwxfHx8fDE3NjIxODQ1MTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'African vegetable farming'
  },
  {
    url: 'https://images.unsplash.com/photo-1758614312118-4f7cd900ab26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXNzYXZhJTIwY3JvcHMlMjBmaWVsZHxlbnwxfHx8fDE3NjIxODQ1MTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Cassava crops field'
  },
  {
    url: 'https://images.unsplash.com/photo-1710149484964-d966b771c204?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwcmljZSUyMGZhcm1pbmd8ZW58MXx8fHwxNzYyMTg0NTEwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'African rice farming'
  },
  {
    url: 'https://images.unsplash.com/photo-1761530570984-e00984a6abb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWdhcmNhbmUlMjBwbGFudGF0aW9uJTIwZmFybXxlbnwxfHx8fDE3NjIxODQ1MTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Sugarcane plantation farm'
  }
]

export function DashboardBackgroundSlideshow({ children }: DashboardBackgroundSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % SLIDESHOW_IMAGES.length)
    }, 6000) // Change image every 6 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background slideshow images */}
      <div className="fixed inset-0 z-0">
        {SLIDESHOW_IMAGES.map((image, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-opacity duration-1500 ease-in-out"
            style={{
              opacity: currentIndex === index ? 1 : 0,
            }}
          >
            <ImageWithFallback
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        
        {/* Lighter gradient overlay for dashboard - more subtle */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/85 via-green-50/90 to-emerald-50/85 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
