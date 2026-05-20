import { useRef } from 'react'
import { motion } from 'framer-motion'
import useScrollReveal from '../../hooks/useScrollReveal'

export default function RevealText({
  children,
  delay = 0,
  stagger = 0.12,
  className = '',
  style = {},
  as: Tag = 'div',
}) {
  const ref = useRef(null)
  const isVisible = useScrollReveal(ref)

  const lines = typeof children === 'string'
    ? children.split('\n').filter(Boolean)
    : [children]

  return (
    <Tag ref={ref} className={className} style={style}>
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden">
          <motion.div
            initial={{ y: '105%' }}
            animate={isVisible ? { y: 0 } : { y: '105%' }}
            transition={{
              duration: 0.75,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </Tag>
  )
}
