import { forwardRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Collapse({ children, title, className = '', show }) {
    const [open, setOpen] = useState(false)

    const isControlled = typeof show === 'boolean'
    const isOpen = isControlled ? show : open

    const toggle = () => {
        if (!isControlled) setOpen((prev) => !prev)
    }

    const CustomButton = forwardRef(function (props, ref) {
        return <button className={className} ref={ref} {...props} />
    })

    return (
        <div>
            {title && (
                <CustomButton onClick={toggle}>
                    {title}
                </CustomButton>
            )}
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div>
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}