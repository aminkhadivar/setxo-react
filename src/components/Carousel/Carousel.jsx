import { ArrowLeft2, ArrowRight2 } from 'iconsax-reactjs'
import { useState, useEffect } from 'react'
import Image from "../../contents/Image/Image"
import './Carousel.css'

export default function Carousel({ slides, color = '', height = '384', rounded = '', autoSlide = false, indicators = false, caption = '', controls = true, autoSlideInterval = 5000, className = '', ...props }) {

    const [current, setCurrent] = useState(0)

    const prev = () => setCurrent((current) => (current === 0 ? slides.length - 1 : current - 1))

    const next = () => setCurrent((current) => (current === slides.length - 1 ? 0 : current + 1))

    useEffect(() => {
        if (!autoSlide) return
        const slideInterval = setInterval(next, autoSlideInterval)
        return () => clearInterval(slideInterval)
    }, [])

    const colorClass = {
        light: 'carousel-light',
        gray: 'carousel-gray',
        dark: 'carousel-dark',
        primary: 'carousel-primary',
        success: 'carousel-success',
        danger: 'carousel-danger',
        warning: 'carousel-warning',
        info: 'carousel-info',
        purple: 'carousel-purple',
    }[color]

    const roundedClass = {
        none: 'rounded-none',
        sm: 'rounded-sm',
        rounded: 'rounded',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        '2xl': 'rounded-2xl',
    }[rounded]

    return (
        <div className={`carousel` + `${className && ` ` + className}` + `${color && ` ` + colorClass}` + `${rounded && ` ` + roundedClass}`} {...props}>
            <div className='carousel-inner' style={{ transform: `translateX(-${current * 100}%)`, height: `${height}px` }}>
                {slides.map((slide, i) => {
                    return <div className={`carousel-item`} key={"slide" + i}>
                        <Image className="carousel-image" url={slide.image} as="responsive" />
                        {caption &&
                            <div className="carousel-caption">
                                <div className={`carousel-caption-container` + `${rounded && ` ` + roundedClass}`}>
                                    <h5 className="carousel-caption-title">{slide.title}</h5>
                                    <p className="carousel-caption-description">
                                        {slide.description}
                                    </p>
                                </div>
                            </div>
                        }
                    </div>
                })}
            </div>
            {controls &&
                <>
                    <button onClick={prev} className='carousel-control-prev'>
                        <ArrowLeft2 size={36} />
                    </button>

                    <button onClick={next} className='carousel-control-next'>
                        <ArrowRight2 size={36} />
                    </button>
                </>
            }
            {indicators &&
                <div className='carousel-indicators'>
                    <div className='carousel-indicators-container'>
                        <div className='carousel-indicators-inner'>
                            {slides.map((slide, i) => (
                                <button key={"circle" + i} onClick={() => {
                                    setCurrent(i);
                                }} className={`carousel-indicator-item` + `${current === i ? " active" : ""}`} />
                            ))}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}