import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { useNavigate } from 'react-router';
import page404 from '../assets/lottie/Page Not Found 404.json';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0a12] flex flex-col items-center justify-center p-4 text-center overflow-hidden">
      {/* Cyberpunk-style grid background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTAgMEg0MFY0MEgweiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4xIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')] opacity-10"></div>
        {/* Glowing effects */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-[#9d00ff]/5 blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-[#00f5ff]/5 blur-[100px] animate-pulse"></div>
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center w-full max-w-6xl px-4"
      >
        {/* Enlarged Lottie animation with glitch effect */}
        <motion.div
          className="w-full max-w-2xl md:max-w-3xl lg:max-w-4xl mb-4"
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.3 }
          }}
        >
          <Lottie
            animationData={page404}
            loop={true}
            className="w-full h-auto"
          />
        </motion.div>

        {/* Error text with glitch effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 glitch" data-text="404 ERROR">
            404 ERROR
          </h1>
          <p className="text-[#b8b8b8] text-xl md:text-2xl max-w-3xl mx-auto neon-text">
            SYSTEM FAILURE: TARGET PAGE NOT FOUND IN DATABASE
          </p>
        </motion.div>

        {/* Cyberpunk action buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-md">
          {/* Go Back Button - Enhanced Cyberpunk Style */}
          <motion.button
            onClick={() => navigate(-1)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative bg-black text-white px-8 py-4 rounded-lg border-2 border-[#00f5ff] overflow-hidden group"
          >
            <span className="absolute inset-0 bg-[#00f5ff] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
            <span className="relative flex items-center justify-center gap-2 z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 h-6 fill-current"
              >
                <path d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z" />
              </svg>
              <span className="font-mono font-medium tracking-wider">GO BACK</span>
            </span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00f5ff] group-hover:h-1 transition-all duration-300"></span>
          </motion.button>

          {/* Return Home Button - Enhanced Cyberpunk Style */}
          <motion.button
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative bg-black text-white px-8 py-4 rounded-lg border-2 border-[#9d00ff] overflow-hidden group"
          >
            <span className="absolute inset-0 bg-[#9d00ff] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
            <span className="relative flex items-center justify-center gap-2 z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 h-6 fill-current"
              >
                <path d="M19 21H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1zM6 19h12V9.157l-6-5.454-6 5.454V19z" />
              </svg>
              <span className="font-mono font-medium tracking-wider">RETURN HOME</span>
            </span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#9d00ff] group-hover:h-1 transition-all duration-300"></span>
          </motion.button>
        </div>

        {/* Terminal-style error code */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 p-4 border border-[#00f5ff]/20 bg-black/50 rounded-lg font-mono text-sm md:text-base max-w-xl mx-auto"
        >
          <div className="text-left">
            <div className="flex gap-2 mb-2">
              <span className="text-red-500">$</span>
              <span className="text-[#00f5ff]">access_page</span>
              <span className="text-white">/requested-url</span>
            </div>
            <div className="text-red-400">
               ERROR: 404 - PAGE_NOT_FOUND [STATUS: TERMINATED]
            </div>
            <div className="text-[#9d00ff] mt-2">
               SUGGESTED_ACTIONS: [GO_BACK] OR [RETURN_HOME]
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Custom styles */}
      <style jsx>{`
        .glitch {
          position: relative;
          color: white;
          text-shadow: 0.05em 0 0 #00f5ff, -0.05em -0.025em 0 #9d00ff;
          animation: glitch 2s infinite alternate;
        }
        
        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.8;
        }
        
        .glitch::before {
          color: #00f5ff;
          z-index: -1;
          animation: glitch-effect 3s infinite;
        }
        
        .glitch::after {
          color: #9d00ff;
          z-index: -2;
          animation: glitch-effect 2s infinite reverse;
        }
        
        @keyframes glitch-effect {
          0% { transform: translate(0); }
          20% { transform: translate(-0.025em, 0.025em); }
          40% { transform: translate(-0.025em, -0.025em); }
          60% { transform: translate(0.025em, 0.025em); }
          80% { transform: translate(0.025em, -0.025em); }
          100% { transform: translate(0); }
        }
        
        .neon-text {
          text-shadow: 0 0 5px #00f5ff, 0 0 10px #00f5ff, 0 0 20px #9d00ff;
          animation: flicker 1.5s infinite alternate;
        }
        
        @keyframes flicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
            opacity: 1;
          }
          20%, 22%, 24%, 55% {
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
};

export default ErrorPage;