import { useState, useEffect } from 'react'
import { ImageWithFallback } from './figma/ImageWithFallback'

interface BackgroundSlideshowProps {
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
    url: 'https://images.unsplash.com/photo-1609148934713-e61b6dd14929?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFjdG9yJTIwZmFybWluZyUyMGZpZWxkfGVufDF8fHx8MTc2NjIwMDc3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    alt: 'Tractor farming in field'
  },
  {
    url: 'https://images.unsplash.com/photo-1649616551392-14131bd9ceac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5hbmElMjBwbGFudGF0aW9uJTIwZmFybXxlbnwxfHx8fDE3NjE1OTIzMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Banana plantation farm'
  },
  {
    url: 'https://images.unsplash.com/photo-1625586891428-65bb5d6f743c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21iaW5lJTIwaGFydmVzdGVyJTIwYWdyaWN1bHR1cmV8ZW58MXx8fHwxNzY2MjM4OTgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    alt: 'Combine harvester in agriculture'
  },
  {
    url: 'https://images.unsplash.com/photo-1649251037566-6881b4956615?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWl6ZSUyMGNvcm4lMjBmaWVsZHxlbnwxfHx8fDE3NjE2NjkwMDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Maize corn field'
  },
  {
    url: 'https://images.unsplash.com/photo-1669822818164-cf66cd0dac4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtaW5nJTIwbWFjaGluZXJ5JTIwZXF1aXBtZW50fGVufDF8fHx8MTc2NjIzODk4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    alt: 'Farming machinery and equipment'
  },
  {
    url: 'https://images.unsplash.com/photo-1666987570506-f8c3e05b6c58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwZmFybWVyJTIwY3JvcHN8ZW58MXx8fHwxNzYxNjY5MDAxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'African farmer with crops'
  },
  {
    url: 'https://images.unsplash.com/photo-1708794666324-85ad91989d20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyYWwlMjB0ZWNobm9sb2d5JTIwc21hcnR8ZW58MXx8fHwxNzY2MjM4OTg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    alt: 'Smart agricultural technology'
  },
  {
    url: 'https://images.unsplash.com/photo-1677768792186-47e266f26848?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWElMjBwbGFudGF0aW9uJTIwYWdyaWN1bHR1cmV8ZW58MXx8fHwxNzYxNjM1Njg1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Tea plantation agriculture'
  },
  {
    url: 'https://images.unsplash.com/photo-1743742566156-f1745850281a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpcnJpZ2F0aW9uJTIwc3lzdGVtJTIwZmFybWluZ3xlbnwxfHx8fDE3NjYyMzg5ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    alt: 'Irrigation system in farming'
  },
  {
    url: 'https://images.unsplash.com/photo-1759344114577-b6c32e4d68c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwdmVnZXRhYmxlJTIwZmFybWluZ3xlbnwxfHx8fDE3NjIxODQ1MTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'African vegetable farming'
  },
  {
    url: 'https://images.unsplash.com/photo-1634584604333-75c849472112?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwZXF1aXBtZW50JTIwdG9vbHN8ZW58MXx8fHwxNzY2MjM4OTg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    alt: 'Farm equipment and tools'
  },
  {
    url: 'https://images.unsplash.com/photo-1758614312118-4f7cd900ab26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXNzYXZhJTIwY3JvcHMlMjBmaWVsZHxlbnwxfHx8fDE3NjIxODQ1MTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Cassava crops field'
  },
  {
    url: 'https://images.unsplash.com/photo-1720071702672-d18c69cb475c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyYWwlMjBkcm9uZSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzY2MjM4OTg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    alt: 'Agricultural drone technology'
  },
  {
    url: 'https://images.unsplash.com/photo-1710149484964-d966b771c204?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwcmljZSUyMGZhcm1pbmd8ZW58MXx8fHwxNzYyMTg0NTEwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'African rice farming'
  },
  {
    url: 'https://images.unsplash.com/photo-1761839257946-4616bcfafec7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmYXJtaW5nJTIwZ3JlZW5ob3VzZXxlbnwxfHx8fDE3NjYyMzg5ODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    alt: 'Modern farming greenhouse'
  },
  {
    url: 'https://images.unsplash.com/photo-1761530570984-e00984a6abb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWdhcmNhbmUlMjBwbGFudGF0aW9uJTIwZmFybXxlbnwxfHx8fDE3NjIxODQ1MTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Sugarcane plantation farm'
  },
  {
    url: 'https://images.unsplash.com/photo-1612504258838-fbf14fe4437d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwYmVhbnMlMjBmYXJtaW5nfGVufDF8fHx8MTc2MjI2ODA5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    alt: 'African beans farming'
  },
  {
    url: 'https://images.unsplash.com/photo-1607002988056-b63875d813d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwY2Fzc2F2YSUyMGhhcnZlc3R8ZW58MXx8fHwxNzYyMjY4MDkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    alt: 'African cassava harvest'
  },
  {
    url: 'https://images.unsplash.com/photo-1728723313544-f0bd66d6e07e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwc3dlZXQlMjBwb3RhdG8lMjBmYXJtaW5nfGVufDF8fHx8MTc2MjI2ODA5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    alt: 'African sweet potato farming'
  },
  {
    url: 'https://images.unsplash.com/photo-1594900689460-fdad3599342c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwZ3JvdW5kbnV0cyUyMHBlYW51dHN8ZW58MXx8fHwxNzYyMjY4MDkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    alt: 'African groundnuts peanuts'
  },
  {
    url: 'https://images.unsplash.com/photo-1642073537056-20608544f111?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwbWlsbGV0JTIwc29yZ2h1bXxlbnwxfHx8fDE3NjIyNjgwOTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    alt: 'African millet sorghum'
  }
]

export function BackgroundSlideshow({ children }: BackgroundSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % SLIDESHOW_IMAGES.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background slideshow images */}
      <div className="absolute inset-0 z-0">
        {SLIDESHOW_IMAGES.map((image, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
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
        
        {/* Gradient overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}