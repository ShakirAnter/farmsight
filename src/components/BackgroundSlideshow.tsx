import { useState, useEffect } from 'react'
import { ImageWithFallback } from './figma/ImageWithFallback'

interface BackgroundSlideshowProps {
  children: React.ReactNode
}

const SLIDESHOW_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1761454060506-306f61195866?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0cmFjdG9yJTIwZmFybWluZyUyMGZpZWxkfGVufDF8fHx8MTc3MDYzMDEyOXww&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Modern tractor farming in field'
  },
  {
    url: 'https://images.unsplash.com/photo-1625586891428-65bb5d6f743c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21iaW5lJTIwaGFydmVzdGVyJTIwd2hlYXR8ZW58MXx8fHwxNzcwNjMwMTI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Combine harvester in wheat field'
  },
  {
    url: 'https://images.unsplash.com/photo-1743742566156-f1745850281a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpcnJpZ2F0aW9uJTIwc3lzdGVtJTIwYWdyaWN1bHR1cmV8ZW58MXx8fHwxNzcwNjMwMTMwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Advanced irrigation system in agriculture'
  },
  {
    url: 'https://images.unsplash.com/photo-1720071702672-d18c69cb475c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcm9uZSUyMGZhcm1pbmclMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MDYxOTU2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Drone farming technology'
  },
  {
    url: 'https://images.unsplash.com/photo-1758524057756-7dc8ce53d88c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbmhvdXNlJTIwYXV0b21hdGVkJTIwZmFybWluZ3xlbnwxfHx8fDE3NzA2MzAxMzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Automated greenhouse farming'
  },
  {
    url: 'https://images.unsplash.com/photo-1567497063796-7952e455a2a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwZmFybWVyJTIwcGxhbnRpbmclMjBjcm9wc3xlbnwxfHx8fDE3NzA2MzAxMzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'African farmer planting crops'
  },
  {
    url: 'https://images.unsplash.com/photo-1608661918456-203a20def9ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGZhcm1pbmclMjBzZW5zb3JzfGVufDF8fHx8MTc3MDYzMDEzMXww&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Smart farming sensors and technology'
  },
  {
    url: 'https://images.unsplash.com/photo-1594771804886-a933bb2d609b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyYWwlMjBtYWNoaW5lcnl8ZW58MXx8fHwxNzcwNjMwMTMxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Agricultural machinery equipment'
  },
  {
    url: 'https://images.unsplash.com/photo-1768602182173-154eeedeed05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVjaXNpb24lMjBhZ3JpY3VsdHVyZSUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NzA2MzAxMzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Precision agriculture equipment'
  },
  {
    url: 'https://images.unsplash.com/photo-1585094659595-04a44bcba305?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwd29tZW4lMjBmYXJtaW5nfGVufDF8fHx8MTc3MDYzMDEzMnww&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'African women farmers working'
  },
  {
    url: 'https://images.unsplash.com/photo-1761549849686-d1fd83a094aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaWNlJTIwcGFkZHklMjBoYXJ2ZXN0aW5nfGVufDF8fHx8MTc3MDYzMDEzMnww&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Rice paddy harvesting operations'
  },
  {
    url: 'https://images.unsplash.com/photo-1698158448221-0f78ce0e8272?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JuJTIwZmllbGQlMjBtYWNoaW5lcnl8ZW58MXx8fHwxNzcwNjMwMTMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Corn field harvesting machinery'
  },
  {
    url: 'https://images.unsplash.com/photo-1708794666324-85ad91989d20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdldGFibGUlMjBmYXJtJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzA2MzAxMzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Vegetable farm with technology'
  },
  {
    url: 'https://images.unsplash.com/photo-1616672500662-86c0867923bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBwbGFudGF0aW9uJTIwZmFybWVyc3xlbnwxfHx8fDE3NzA2MzAxMzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Coffee plantation with farmers'
  },
  {
    url: 'https://images.unsplash.com/photo-1647632250951-931b4c6f3b0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5hbmElMjBwbGFudGF0aW9uJTIwYWZyaWNhfGVufDF8fHx8MTc3MDYzMDEzM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Banana plantation in Africa'
  },
  {
    url: 'https://images.unsplash.com/photo-1557487970-5d5211b65a82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtaW5nJTIwZXF1aXBtZW50JTIwd2FyZWhvdXNlfGVufDF8fHx8MTc3MDYzMDEzM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Farming equipment warehouse'
  },
  {
    url: 'https://images.unsplash.com/photo-1710090720809-527cefdac598?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2lsJTIwdGVzdGluZyUyMGFncmljdWx0dXJlfGVufDF8fHx8MTc3MDYzMDEzNHww&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Soil testing in agriculture'
  },
  {
    url: 'https://images.unsplash.com/photo-1652040004005-249f3db952ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWVkbGluZyUyMHBsYW50aW5nJTIwbWFjaGluZXxlbnwxfHx8fDE3NzA2MzAxMzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Seedling planting machine'
  },
  {
    url: 'https://images.unsplash.com/photo-1764323064965-9182443d27a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwd29ya2VycyUyMGhhcnZlc3R8ZW58MXx8fHwxNzcwNjMwMTM0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Farm workers during harvest'
  },
  {
    url: 'https://images.unsplash.com/photo-1759253711054-9951ac8b61fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZlc3RvY2slMjBmYXJtaW5nJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzA2MzAxMzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Livestock farming with technology'
  },
  {
    url: 'https://images.unsplash.com/photo-1737957473943-64fcd43f1a9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwZmFybWluZyUyMHN1c3RhaW5hYmxlfGVufDF8fHx8MTc3MDYzMDEzNXww&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Sustainable organic farming'
  },
  {
    url: 'https://images.unsplash.com/photo-1640620882713-1e3cbf1e9807?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyYWwlMjBkcm9uZXMlMjBhZXJpYWx8ZW58MXx8fHwxNzcwNjMwMTM1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Agricultural drones aerial view'
  },
  {
    url: 'https://images.unsplash.com/photo-1716281013162-443df71be45f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFjdG9yJTIwcGxvd2luZyUyMGZpZWxkfGVufDF8fHx8MTc3MDYzMDEzNXww&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Tractor plowing field'
  },
  {
    url: 'https://images.unsplash.com/photo-1676409085213-7ca1e07e6ab3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbmhvdXNlJTIwdmVnZXRhYmxlcyUyMGh5ZHJvcG9uaWN8ZW58MXx8fHwxNzcwNjMwMTM2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Hydroponic greenhouse vegetables'
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
      {/* Background slideshow images with 20% opacity */}
      <div className="absolute inset-0 z-0">
        {SLIDESHOW_IMAGES.map((image, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{
              opacity: currentIndex === index ? 0.20 : 0,
            }}
          >
            <ImageWithFallback
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        
        {/* Subtle gradient overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/10" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}