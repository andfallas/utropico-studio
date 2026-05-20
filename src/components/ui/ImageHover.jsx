import { motion } from 'framer-motion'

const containerVariants = {
  rest: {},
  hover: {},
}

const imgVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
}

const overlayVariants = {
  rest: { opacity: 0, y: 12 },
  hover: { opacity: 1, y: 0 },
}

export default function ImageHover({ src, alt, nombre, categoria, onClick, className = '' }) {
  return (
    <motion.div
      className={`relative overflow-hidden cursor-pointer ${className}`}
      variants={containerVariants}
      initial="rest"
      whileHover="hover"
      onClick={onClick}
      data-cursor="VER"
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-full object-cover"
        variants={imgVariants}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
      <motion.div
        className="absolute inset-0 flex flex-col justify-end p-6"
        style={{ background: 'linear-gradient(to top, rgba(14,12,10,0.85) 0%, transparent 60%)' }}
        variants={overlayVariants}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <p className="text-cream text-xl font-display">{nombre}</p>
        <div className="flex items-center justify-between mt-1">
          <p className="text-sand text-xs uppercase tracking-[0.2em]">{categoria}</p>
          <span className="text-sand text-lg leading-none">→</span>
        </div>
      </motion.div>
    </motion.div>
  )
}
