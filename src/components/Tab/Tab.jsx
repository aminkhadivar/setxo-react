import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Nav from "../Nav/Nav"
import './Tab.css'

const Tab = ({ className = '', tabs, as = 'nav', rounded , color = 'primary' }) => {
  const [items, setItems] = useState(tabs)

  const handleClick = (id) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, show: !item.show }
          : { ...item, show: false }
      )
    )
  }

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  }

  return (
    <div className="tab">
      <div className="tab-title">
        <Nav as={as} color={color} className={(className && ` ${className}`)} rounded={rounded} role="tablist">
          {items.map(({ title, show, id, disabled }) => (
            <Nav.Tab
              onClick={disabled || show ? null : (() => handleClick(id))}
              active={show ? 'true' : 'false'}
              aria-selected={show ? 'true' : 'false'}
              disabled={disabled ? 'true' : ''}
              id={id}
              key={id}
            >
              {title}
            </Nav.Tab>
          ))}
        </Nav>
      </div>

      <div className="tab-content">
        <AnimatePresence mode="wait">
          {items.map(({ content, show, id }) =>
            show && (
              <motion.div
                key={id}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              >
                <p className="overflow-hidden">
                  {content}
                </p>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Tab