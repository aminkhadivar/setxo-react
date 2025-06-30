import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import './Tooltip.css'

export default function Tooltip({
  content,
  trigger = 'hover',
  className = '',
  children,
  placement = 'top',
  rounded = 'rounded',
  color = 'gray',
  ...props
}) {
  const [show, setShow] = useState(false)

  const showTooltip = () => setShow(true)
  const hideTooltip = () => setShow(false)

  const placementClass = {
    top: 'tooltip-top',
    'top-start': 'tooltip-top-start',
    'top-end': 'tooltip-top-end',
    right: 'tooltip-right',
    'right-start': 'tooltip-right-start',
    'right-end': 'tooltip-right-end',
    bottom: 'tooltip-bottom',
    'bottom-start': 'tooltip-bottom-start',
    'bottom-end': 'tooltip-bottom-end',
    left: 'tooltip-left',
    'left-start': 'tooltip-left-start',
    'left-end': 'tooltip-left-end'
  }[placement]

  const colorClass = {
    white: 'tooltip-white',
    light: 'tooltip-light',
    gray: 'tooltip-gray',
    dark: 'tooltip-dark',
    primary: 'tooltip-primary',
    success: 'tooltip-success',
    danger: 'tooltip-danger',
    warning: 'tooltip-warning',
    info: 'tooltip-info',
    purple: 'tooltip-purple',
    custom: '',
  }[color]

  const roundedClass = {
    none: ' rounded-none',
    sm: ' rounded-sm',
    rounded: ' rounded',
    md: ' rounded-md',
    lg: ' rounded-lg',
    full: ' rounded-full',
  }[rounded]

  const translateVariantsMap = {
    top: { initial: { opacity: 0, y: 8, scale: 0.95 , x:'-50%' }, animate: { opacity: 1, y: 0, scale: 1 , x:'-50%' }, exit: { opacity: 0, y: 8, scale: 0.95 , x:'-50%' } },
    'top-start': { initial: { opacity: 0, y: 8, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 8, scale: 0.95 } },
    'top-end': { initial: { opacity: 0, y: 8, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 8, scale: 0.95 } },
    bottom: { initial: { opacity: 0, y: -8, scale: 0.95 , x:'-50%' }, animate: { opacity: 1, y: 0, scale: 1 , x:'-50%' }, exit: { opacity: 0, y: -8, scale: 0.95 , x:'-50%' } },
    'bottom-start': { initial: { opacity: 0, y: -8, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -8, scale: 0.95 } },
    'bottom-end': { initial: { opacity: 0, y: -8, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -8, scale: 0.95 } },
    left: { initial: { opacity: 0, x: 8, scale: 0.95 , y:'-50%' }, animate: { opacity: 1, x: 0, scale: 1 , y:'-50%' }, exit: { opacity: 0, x: 8, scale: 0.95 , y:'-50%' } },
    'left-start': { initial: { opacity: 0, x: 8, scale: 0.95 }, animate: { opacity: 1, x: 0, scale: 1 }, exit: { opacity: 0, x: 8, scale: 0.95 } },
    'left-end': { initial: { opacity: 0, x: 8, scale: 0.95 }, animate: { opacity: 1, x: 0, scale: 1 }, exit: { opacity: 0, x: 8, scale: 0.95 } },
    right: { initial: { opacity: 0, x: -8, scale: 0.95 , y:'-50%' }, animate: { opacity: 1, x: 0, scale: 1 , y:'-50%' }, exit: { opacity: 0, x: -8, scale: 0.95 , y:'-50%' } },
    'right-start': { initial: { opacity: 0, x: -8, scale: 0.95 }, animate: { opacity: 1, x: 0, scale: 1 }, exit: { opacity: 0, x: -8, scale: 0.95 } },
    'right-end': { initial: { opacity: 0, x: -8, scale: 0.95 }, animate: { opacity: 1, x: 0, scale: 1 }, exit: { opacity: 0, x: -8, scale: 0.95 } },
  }

  const translateVariants = translateVariantsMap[placement] || translateVariantsMap['top']

  return (
    <div
      className="tooltip"
      onMouseEnter={trigger === 'hover' ? showTooltip : null}
      onMouseLeave={trigger === 'hover' ? hideTooltip : null}
      onFocus={trigger === 'click' ? showTooltip : null}
      onBlur={trigger === 'click' ? hideTooltip : null}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            {...props}
            className={`tooltip-content ${placementClass}${roundedClass} ${colorClass} ${className}`}
            initial={translateVariants.initial}
            animate={translateVariants.animate}
            exit={translateVariants.exit}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}