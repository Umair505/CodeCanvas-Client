import React from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import lottie2 from '../../assets/lottie/Technology Network.json';
import Aurora from './Aurora';

const Banner = () => {
    return (
        <div className="relative w-full mt-2 pt-10 overflow-hidden">
            {/* Aurora Background */}
            <div className="absolute inset-0 z-0 h-full">
                <Aurora
                    colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
                    blend={0.5}
                    amplitude={1.0}
                    speed={0.5}
                />
            </div>

            {/* Full-width Lottie background */}
            <div className="absolute inset-0 z-1 opacity-20">
                <Lottie 
                    animationData={lottie2} 
                    loop={true}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 z-2 bg-gradient-to-t from-[#0a0a12] via-[#0a0a12]/80 to-[#0a0a12]/20"></div>

            {/* Content Container */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-10 pb-20">
                {/* Main Title with Animation */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-12"
                >
                    <motion.h1 
                        className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
                        whileHover={{ scale: 1.02 }}
                    >
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f5ff] to-[#9d00ff]">CodeCanvas</span> - 
                        <span className="text-white"> Where Tech </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9d00ff] to-[#FF94B4]">Products Shine</span>
                    </motion.h1>
                    
                    <motion.p 
                        className="text-xl sm:text-2xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        Discover, share, and grow your tech products in our vibrant community of developers and innovators.
                    </motion.p>
                </motion.div>

                {/* Feature Cards */}
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 1 }}
                >
                    <motion.div 
                        className="bg-gradient-to-br from-[#1a1a2e]/80 to-[#9d00ff]/20 backdrop-blur-md p-8 rounded-2xl border border-[#9d00ff]/30 shadow-lg"
                        whileHover={{ y: -10, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 rounded-lg bg-[#00f5ff]/10">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#00f5ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <motion.h3 
                                className="text-2xl font-semibold text-white"
                                whileInView={{ scale: [0.98, 1] }}
                                transition={{ duration: 0.5 }}
                            >
                                Innovative Solutions
                            </motion.h3>
                        </div>
                        <motion.p 
                            className="text-gray-300 text-lg"
                            whileInView={{ scale: [0.98, 1] }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            Showcase your cutting-edge tech products to a community that appreciates innovation. Get feedback, traction, and visibility for your creations.
                        </motion.p>
                    </motion.div>

                    <motion.div 
                        className="bg-gradient-to-br from-[#1a1a2e]/80 to-[#3A29FF]/20 backdrop-blur-md p-8 rounded-2xl border border-[#3A29FF]/30 shadow-lg"
                        whileHover={{ y: -10, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 rounded-lg bg-[#9d00ff]/10">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#9d00ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <motion.h3 
                                className="text-2xl font-semibold text-white"
                                whileInView={{ scale: [0.98, 1] }}
                                transition={{ duration: 0.5 }}
                            >
                                Community Powered
                            </motion.h3>
                        </div>
                        <motion.p 
                            className="text-gray-300 text-lg"
                            whileInView={{ scale: [0.98, 1] }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            Join thousands of developers, makers, and tech enthusiasts. Upvote, review, and discover the next big thing in technology.
                        </motion.p>
                    </motion.div>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                >
                    <motion.h3 
                        className="text-xl sm:text-2xl text-white mb-6"
                        whileInView={{ scale: [0.98, 1] }}
                    >
                        Ready to showcase your tech product to the world?
                    </motion.h3>
                    <div className="flex flex-wrap justify-center gap-4">
                         <a href="/dashboard/add-product" className="inline-block w-auto">
                        <motion.button
                            className="px-8 py-4 bg-gradient-to-r from-[#9d00ff] to-[#00f5ff] text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:shadow-[#9d00ff]/30 transition-all duration-300 text-lg"
                            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(157, 0, 255, 0.3)" }}
                            whileTap={{ scale: 0.95 }}
                            
                        >
                            Submit Your Product →
                        </motion.button>
                        </a>
                         <a href="/products" className="inline-block w-auto">
                        <motion.button
                            className="px-8 py-4 bg-transparent border-2 border-[#00f5ff] text-white font-semibold rounded-full hover:bg-[#00f5ff]/10 transition-all duration-300 text-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Explore Products
                        </motion.button>
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Banner;