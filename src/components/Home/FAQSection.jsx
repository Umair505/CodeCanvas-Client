import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiChevronDown, FiStar } from "react-icons/fi";
import Lottie from "lottie-react";
import faqLottie from '../../assets/lottie/two-people-thinking.json';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const faqs = [
    {
      question: "How do I submit a new tech product?",
      answer: "Click the 'Submit Product' button in the navigation bar. You'll need to provide basic details about your product, including name, description, category, and website URL. Our moderation team will review it within 24 hours."
    },
    {
      question: "What types of products can I share?",
      answer: "We accept all tech-related products including web apps, AI tools, software, mobile apps, and games. The product must be functional and provide real value to users."
    },
    {
      question: "How does the voting system work?",
      answer: "Registered users can upvote products they like. Each vote helps products climb our daily rankings. Users with premium subscriptions get weighted votes that count more towards rankings."
    },
    {
      question: "What are the benefits of premium membership?",
      answer: "Premium members get early access to new features, enhanced product visibility, analytics for their submissions, and weighted voting power. You can upgrade anytime from your account settings."
    },
    {
      question: "How are products moderated?",
      answer: "All submissions go through our moderation team to ensure quality and relevance. We check for functionality, appropriate categorization, and compliance with our community guidelines."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full bg-gradient-to-b from-[#0a0a12] to-[#1a1a2e] py-16 px-4 sm:px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Tech-themed decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-blue-500 filter blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-purple-500 filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 xl:gap-12 relative z-10">
        {/* Left Section - Lottie Animation */}
        <motion.div
          className="w-full lg:w-1/2 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-full max-w-lg xl:max-w-xl">
            <Lottie 
              animationData={faqLottie} 
              loop={true} 
              className="w-full h-auto"
            />
          </div>
        </motion.div>

        {/* Right Section - FAQs */}
        <motion.div
          className="w-full lg:w-1/2"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
              <FiStar className="text-blue-400" />
            </div>
            <span className="text-blue-400 font-semibold tracking-wider text-sm uppercase">
              Need Help?
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-white">
            Frequently Asked <span className="text-blue-400">Questions</span>
          </h2>

          <div className="space-y-3">
            {faqs.map((item, index) => (
              <motion.div
                key={index}
                className={`overflow-hidden rounded-lg border ${
                  activeIndex === index 
                    ? "border-blue-500/30 bg-gray-800 shadow-lg" 
                    : "border-gray-700 bg-gray-800/50 hover:bg-gray-800/70"
                } transition-all duration-300`}
                whileHover={{ y: -2 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <button
                  className="w-full flex justify-between items-center p-4 md:p-5 text-left"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className={`font-medium text-sm md:text-base ${
                    activeIndex === index ? "text-blue-300" : "text-gray-200"
                  }`}>
                    {item.question}
                  </span>
                  <motion.div
                    animate={{
                      rotate: activeIndex === index ? 180 : 0,
                      color: activeIndex === index || hoveredIndex === index 
                        ? "#60a5fa" 
                        : "#9ca3af"
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 ml-4"
                  >
                    <FiChevronDown className="text-lg md:text-xl" />
                  </motion.div>
                </button>
                
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 md:px-5 pb-4 md:pb-5 text-gray-300 text-sm md:text-base"
                  >
                    {item.answer}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQSection;