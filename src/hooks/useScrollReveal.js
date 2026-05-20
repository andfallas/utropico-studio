import { useEffect, useState } from 'react'

export default function useScrollReveal(ref, options = {}) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px', ...options }
    )

    const el = ref.current
    if (el) observer.observe(el)

    return () => observer.disconnect()
  }, [ref])

  return isVisible
}
