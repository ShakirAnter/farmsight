import { useState, useEffect } from 'react'

interface FooterProps {
  variant?: 'light' | 'dark'
}

const COLORS = [
  'text-green-600',
  'text-emerald-600',
  'text-blue-600',
  'text-purple-600',
  'text-amber-600',
  'text-rose-600',
  'text-teal-600',
  'text-indigo-600'
]

export function Footer({ variant = 'dark' }: FooterProps) {
  const [colorIndex, setColorIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % COLORS.length)
    }, 2000) // Change color every 2 seconds

    return () => clearInterval(interval)
  }, [])

  const textColor = variant === 'light' 
    ? COLORS[colorIndex]
    : `${COLORS[colorIndex]} drop-shadow-lg`

  return (
    <footer className="py-4 text-right pr-8">
      <p 
        className={`text-[15px] transition-colors duration-500 ${textColor}`}
        style={{ fontSize: '15px' }}
      >
        Made By Sujal Kerai Soft Tech
      </p>
    </footer>
  )
}
