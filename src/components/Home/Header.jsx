import React from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import lottie2 from '../../assets/lottie/Technology Network.json';
import Aurora from './Aurora';
import img1 from '../../assets/images/codeCanvas1.jpeg'
const Header = () => {
    return (
        <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">
            {/* Aurora Background */}
            <div className="absolute inset-0 z-0 h-full">
                <Aurora
                    colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
                    blend={0.5}
                    amplitude={1.0}
                    speed={0.5}
                />
            </div>

            {/* Lottie Background */}
            <div className="absolute inset-0 z-1 opacity-15">
                <Lottie
                    animationData={lottie2}
                    loop
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 z-2 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-gradient-to-r from-[#00f5ff] to-[#9d00ff]"
                        initial={{
                            x: Math.random() * 100,
                            y: Math.random() * 100,
                            opacity: 0,
                            width: Math.random() * 10 + 2,
                            height: Math.random() * 10 + 2
                        }}
                        animate={{
                            y: [Math.random() * 100, Math.random() * window.innerHeight],
                            x: [Math.random() * 100, Math.random() * window.innerWidth],
                            opacity: [0, 0.6, 0],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "linear"
                        }}
                    />
                ))}
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 z-3 bg-gradient-to-b from-[#0a0a12]/90 via-[#0a0a12]/70 to-[#0a0a12]/90"></div>

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-7xl px-6 mx-auto lg:px-8 py-20">
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-16">
                    {/* Text Content */}
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8 text-center lg:text-left"
                        >
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="inline-block px-4 py-2 rounded-full bg-[#3A29FF]/20 border border-[#3A29FF]/50 text-[#00f5ff] text-sm font-medium"
                            >
                                Welcome to the Future
                            </motion.div>

                            <motion.h1
                                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f5ff] via-[#9d00ff] to-[#FF94B4]">
                                    CodeCanvas
                                </span>
                                <span className="block text-white mt-4">Where Innovation</span>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF94B4] to-[#3A29FF]">
                                    Meets Community
                                </span>
                            </motion.h1>

                            <motion.p
                                className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed mx-auto lg:mx-0"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                The premier platform for developers to showcase, discover, and grow cutting-edge tech products in a vibrant ecosystem.
                            </motion.p>

                            <motion.div
                                className="flex flex-wrap justify-center lg:justify-start gap-4 mt-8"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                            >
                                <motion.a
                                    href="/dashboard/add-product"
                                    className="px-6 py-3 bg-gradient-to-r from-[#9d00ff] to-[#3A29FF] text-white font-semibold rounded-full shadow-md hover:shadow-xl text-base lg:text-lg transition-all duration-300 relative overflow-hidden group"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span className="relative z-10">Launch Your Product</span>
                                    <span className="absolute inset-0 bg-gradient-to-r from-[#3A29FF] to-[#9d00ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                </motion.a>

                                <motion.a
                                    href="/products"
                                    className="px-6 py-3 border-2 border-[#00f5ff] text-white font-semibold rounded-full hover:bg-[#00f5ff]/10 text-base lg:text-lg transition-all duration-300"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Explore Innovations
                                </motion.a>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Floating Card Stack */}
                    <div className="w-full lg:w-1/2 flex justify-center items-center">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="relative w-full max-w-md"
                        >
                            <div className="relative h-[400px] sm:h-[450px] md:h-[500px]">
                                {/* Main Card */}
                                <motion.div
                                    className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#1a1a2e] to-[#1a1a2e]/80 backdrop-blur-lg rounded-3xl border border-[#3A29FF]/30 shadow-2xl p-6 z-10"
                                    whileHover={{ y: -10 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className="flex flex-col h-full">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-3 h-3 rounded-full bg-[#FF3232]"></div>
                                            <div className="w-3 h-3 rounded-full bg-[#FF94B4]"></div>
                                            <div className="w-3 h-3 rounded-full bg-[#00f5ff]"></div>
                                        </div>
                                        <div className="flex-1 bg-gradient-to-br from-[#0a0a12] to-[#1a1a2e] rounded-xl border border-[#3A29FF]/20 p-3 overflow-hidden">
                                        <div
                                            className="h-full w-full bg-cover bg-center rounded-lg"
                                            style={{ backgroundImage: `url(${img1})` }}
                                        ></div>
                                        </div>

                                        <div className="mt-4">
                                            <h3 className="text-lg md:text-xl font-bold text-white">CodeCanvas Platform</h3>
                                            <p className="text-[#b8b8b8] text-sm mt-1">Where developers showcase and discover innovative tech products</p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Back Cards */}
                                <motion.div
                                    className="absolute top-4 left-4 w-full h-full bg-gradient-to-br from-[#1a1a2e]/50 to-[#1a1a2e]/30 backdrop-blur-md rounded-3xl border border-[#FF94B4]/20 z-0"
                                    initial={{ y: 40, opacity: 0.5 }}
                                    animate={{ y: 20, opacity: 0.7 }}
                                    transition={{
                                        y: { duration: 3, repeat: Infinity, repeatType: "reverse" },
                                        opacity: { duration: 3, repeat: Infinity, repeatType: "reverse" }
                                    }}
                                />
                                <motion.div
                                    className="absolute top-8 left-8 w-full h-full bg-gradient-to-br from-[#1a1a2e]/30 to-[#1a1a2e]/10 backdrop-blur-sm rounded-3xl border border-[#00f5ff]/20 z-0"
                                    initial={{ y: 60, opacity: 0.3 }}
                                    animate={{ y: 40, opacity: 0.5 }}
                                    transition={{
                                        y: { duration: 4, repeat: Infinity, repeatType: "reverse", delay: 0.5 },
                                        opacity: { duration: 4, repeat: Infinity, repeatType: "reverse", delay: 0.5 }
                                    }}
                                />
                            </div>

                            {/* Floating Tech Elements */}
                            <motion.div
                                className="absolute -bottom-10 -left-10 w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#9d00ff]/10 backdrop-blur-sm border border-[#9d00ff]/20"
                                animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.8, 0.6] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.div
                                className="absolute -top-10 -right-10 w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#00f5ff]/10 backdrop-blur-sm border border-[#00f5ff]/20"
                                animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            />
                        </motion.div>
                    </div>
                </div>

                {/* Stats Section */}
                <motion.div
                    className="mt-24 bg-gradient-to-r from-[#1a1a2e]/50 to-[#1a1a2e]/30 backdrop-blur-lg rounded-2xl border border-[#3A29FF]/20 p-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    {[
                        { value: "1,200+", label: "Tech Products" },
                        { value: "8,500+", label: "Developers" },
                        { value: "240K+", label: "Monthly Visits" },
                        { value: "95%", label: "Satisfaction Rate" },
                    ].map((stat, idx) => (
                        <div key={idx}>
                            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00f5ff] to-[#9d00ff]">
                                {stat.value}
                            </div>
                            <div className="text-gray-300 mt-1 text-sm md:text-base">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Header;
