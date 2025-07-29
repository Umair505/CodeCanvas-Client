import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import img1 from '../../assets/carousel/4.jpeg';
import img2 from '../../assets/carousel/7.jpeg';
import img3 from '../../assets/carousel/5.jpeg';
import img4 from '../../assets/carousel/8.jpeg';
import img5 from '../../assets/carousel/2.jpeg';
import img6 from '../../assets/carousel/1.jpeg';
import img7 from '../../assets/carousel/6.jpeg';
import img8 from '../../assets/carousel/3.jpeg';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Carousel = () => {
    const images = [img1, img2, img3, img4, img5, img6, img7, img8];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState('right');

    const nextSlide = () => {
        setDirection('right');
        setCurrentIndex((prevIndex) => 
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setDirection('left');
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    // Auto-rotate every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const variants = {
        enter: (direction) => ({
            x: direction === 'right' ? 300 : -300,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            x: direction === 'right' ? -300 : 300,
            opacity: 0
        })
    };

    return (
        <div className="relative w-full  mx-auto overflow-hidden rounded-xl shadow-2xl">
            {/* Main Carousel */}

            <div className="relative h-64 sm:h-80 md:h-96 lg:h-[550px] w-full">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <img 
                            src={images[currentIndex]} 
                            alt={`Carousel ${currentIndex + 1}`}
                            className="w-full h-full object-cover object-center"
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                <button 
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-sm p-2 rounded-full shadow-lg z-10 transition-all duration-300"
                    aria-label="Previous slide"
                >
                    <FiChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button 
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-sm p-2 rounded-full shadow-lg z-10 transition-all duration-300"
                    aria-label="Next slide"
                >
                    <FiChevronRight className="w-6 h-6 text-white" />
                </button>
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex justify-center gap-2 mt-4 px-4 overflow-x-auto py-2">
                {images.map((img, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setDirection(index > currentIndex ? 'right' : 'left');
                            setCurrentIndex(index);
                        }}
                        className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-md overflow-hidden transition-all duration-300 ${currentIndex === index ? 'ring-4 ring-[#9d00ff] scale-110' : 'opacity-70 hover:opacity-100'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    >
                        <img 
                            src={img} 
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </button>
                ))}
            </div>

            {/* Dots Indicator (for mobile) */}
            <div className="flex justify-center gap-2 mt-2 sm:hidden">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setDirection(index > currentIndex ? 'right' : 'left');
                            setCurrentIndex(index);
                        }}
                        className={`w-2 h-2 rounded-full transition-all ${currentIndex === index ? 'bg-[#9d00ff] w-4' : 'bg-white/50'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;