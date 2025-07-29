import { Link, Navigate, useLocation, useNavigate } from 'react-router'
import { FcGoogle } from 'react-icons/fc'
import useAuth from '../../hooks/useAuth'
import toast from 'react-hot-toast'
import { TbFidgetSpinner } from 'react-icons/tb'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import { motion } from 'framer-motion'
import loginImg from '../../assets/images/login.png'
import { useEffect, useState } from 'react'
import { saveUserInDb } from '../../api/utils'

const Login = () => {
  const { signIn, signInWithGoogle, loading, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location?.state?.from?.pathname || '/'
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (user) return <Navigate to={from} replace={true} />
  if (loading) return <LoadingSpinner />

  const handleSubmit = async event => {
    event.preventDefault()
    const form = event.target
    const email = form.email.value
    const password = form.password.value

    try {
      await signIn(email, password)
      navigate(from, { replace: true })
      toast.success(`Welcome Back ${user?.displayName}!`, {
        style: {
          background: '#1a1a2e',
          color: '#00f5ff',
          border: '1px solid #00f5ff',
        },
        iconTheme: {
          primary: '#00f5ff',
          secondary: '#1a1a2e',
        },
        duration: 3000
      });
    } catch (err) {
      toast.error(err?.message || 'Login failed', {
        icon: '⚠️',
        style: {
          borderRadius: '10px',
          background: '#f87171',
          color: '#fff',
        },
      })
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle()
            const userData = {
              name: result?.user?.displayName,
              email: result?.user?.email,
              image: result?.user?.photoURL,
            }
            await saveUserInDb(userData)
      navigate(from, { replace: true })
      toast.success('Google login successfully!', {
        style: {
          background: '#1a1a2e',
          color: '#00f5ff',
          border: '1px solid #00f5ff',
        },
        iconTheme: {
          primary: '#00f5ff',
          secondary: '#1a1a2e',
        },
        duration: 3000
      });
      
    } catch (err) {
      toast.error(err?.message || 'Google login failed', {
        icon: '❌',
        style: {
          borderRadius: '10px',
          background: '#f87171',
          color: '#fff',
        },
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a12] to-[#1a1a2e] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl bg-[#1a1a2e] rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2"
      >
        {/* Image Section - Shows on mobile but smaller */}
        {isMobile ? (
          <div className="relative h-40 md:hidden overflow-hidden bg-gradient-to-br from-[#9d00ff] via-[#00f5ff] to-[#ff00ff]">
            <motion.img
              src={loginImg}
              alt="Login Illustration"
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-full object-contain"
              animate={{
                y: [0, -5, 0, 5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden md:flex items-center justify-center bg-gradient-to-br from-[#9d00ff] via-[#00f5ff] to-[#ff00ff]"
          >
            <motion.img
              src={loginImg}
              alt="Login Illustration"
              className="w-3/4"
              animate={{
                y: [0, -10, 0, 10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        )}

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, x: isMobile ? 0 : 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="p-6 sm:p-8 md:p-10 text-white"
        >
          <div className="flex flex-col items-center md:items-start mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center md:text-left text-transparent bg-clip-text bg-gradient-to-r from-[#00f5ff] to-[#ff00ff]">
              Sign in to CodeCanvas
            </h2>
            <p className="text-[#b8b8b8] text-sm sm:text-base mt-2 text-center md:text-left">
              Let the creativity flow with your code ✨
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-[#ffffff]">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="w-full px-4 py-2.5 rounded-lg bg-[#0a0a12] text-white border border-[#9d00ff] focus:ring-2 focus:ring-[#00f5ff] outline-none transition duration-200"
                placeholder="your@email.com"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-[#ffffff]">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                required
                className="w-full px-4 py-2.5 rounded-lg bg-[#0a0a12] text-white border border-[#9d00ff] focus:ring-2 focus:ring-[#ff00ff] outline-none transition duration-200"
                placeholder="••••••••"
              />
            </div>

            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-[#00f5ff] to-[#ff00ff] text-black font-semibold rounded-lg shadow-md transition duration-300 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <TbFidgetSpinner className="animate-spin h-5 w-5 mr-2" />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </motion.button>
            </div>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-[#1a1a2e] text-[#b8b8b8]">or continue with</span>
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center space-x-3 border border-[#3a3a4e] rounded-lg py-2.5 px-4 cursor-pointer hover:bg-[#0a0a12] transition duration-200"
          >
            <FcGoogle size={20} />
            <span className="text-white font-medium text-sm sm:text-base">Continue with Google</span>
          </motion.div>

          <p className="mt-6 text-center text-sm text-[#b8b8b8]">
            Don't have an account?{' '}
            <Link 
              to="/signup" 
              className="text-[#00f5ff] hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Login