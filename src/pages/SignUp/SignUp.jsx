import { Link, useNavigate } from 'react-router'
import { FcGoogle } from 'react-icons/fc'
import { MdOutlineAddPhotoAlternate } from 'react-icons/md'
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-hot-toast'
import { TbFidgetSpinner } from 'react-icons/tb'
import { saveUserInDb, uploadImage } from '../../api/utils'
import signUpImg from '../../assets/images/signup.png'
import { motion } from 'framer-motion'
import { useState, useRef } from 'react'

const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } = useAuth()
  const navigate = useNavigate()
  const [previewImage, setPreviewImage] = useState(null)
  const fileInputRef = useRef(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const form = event.target
    const name = form.name.value
    const email = form.email.value
    const password = form.password.value
    const image = form.image.files[0]

    try {
      let imageUrl = ''
      if (image) {
        imageUrl = await uploadImage(image)
      }
      
      const result = await createUser(email, password)
      await updateUserProfile(name, imageUrl)

      const userData = {
        name,
        email,
        image: imageUrl,
      }
      // Save user data in db
      await saveUserInDb(userData)

      navigate('/')
      toast.success('Welcome to CodeCanvas!', {
        style: {
          background: '#4BB543',
          color: '#fff',
        },
      })
    } catch (err) {
      console.error(err)
      toast.error(err?.message || 'Signup failed', {
        style: {
          background: '#FF3333',
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
      navigate('/')
     toast.success('Google signup successful!', {
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
      console.error(err)
      toast.error(err?.message || 'Google signup failed', {
        style: {
          background: '#FF3333',
          color: '#fff',
        },
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center p-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl bg-[#1a1a2e] rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 border border-[#ffffff10]"
      >
        {/* Left: Illustration with floating animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:flex items-center justify-center bg-gradient-to-br from-[#8e2de2] to-[#4a00e0] relative overflow-hidden"
        >
          <motion.img
            src={signUpImg}
            alt="Sign Up Illustration"
            className="w-4/5 relative z-10"
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {/* Floating decorative elements */}
          <div className="absolute top-20 left-20 w-8 h-8 rounded-full bg-[#ffffff30] blur-sm"></div>
          <div className="absolute bottom-20 right-20 w-12 h-12 rounded-full bg-[#ffffff20] blur-sm"></div>
          <div className="absolute top-1/3 right-1/4 w-6 h-6 rounded-full bg-[#ffffff40] blur-sm"></div>
        </motion.div>

        {/* Right: Form with glassmorphism effect */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="p-6 sm:p-8 lg:p-10 backdrop-blur-sm bg-[#ffffff05]"
        >
          <div className="text-center lg:text-left mb-8">
            <motion.h2 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00d2ff] to-[#3a7bd5]"
            >
              Join CodeCanvas
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-[#b8b8b8] mt-2"
            >
              Create your account and start your creative coding journey
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label htmlFor="name" className="block text-sm font-medium text-[#ffffff] mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Your name"
                required
                className="w-full px-4 py-2.5 rounded-lg bg-[#0a0a12] text-white border border-[#ffffff15] focus:border-[#00d2ff] focus:ring-1 focus:ring-[#00d2ff50] outline-none transition duration-200"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label htmlFor="image" className="block text-sm font-medium text-[#ffffff] mb-1">Profile Photo</label>
              <div className="flex items-center space-x-4">
                <div 
                  className="w-16 h-16 rounded-full bg-[#0a0a12] border-2 border-dashed border-[#ffffff30] flex items-center justify-center cursor-pointer overflow-hidden"
                  onClick={() => fileInputRef.current.click()}
                >
                  {previewImage ? (
                    <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <MdOutlineAddPhotoAlternate className="text-2xl text-[#b8b8b8]" />
                  )}
                </div>
                <input
                  type="file"
                  name="image"
                  id="image"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                />
                <span className="text-sm text-[#b8b8b8]">
                  {previewImage ? 'Change photo' : 'Upload photo'}
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label htmlFor="email" className="block text-sm font-medium text-[#ffffff] mb-1">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="your@email.com"
                required
                className="w-full px-4 py-2.5 rounded-lg bg-[#0a0a12] text-white border border-[#ffffff15] focus:border-[#00d2ff] focus:ring-1 focus:ring-[#00d2ff50] outline-none transition duration-200"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <label htmlFor="password" className="block text-sm font-medium text-[#ffffff] mb-1">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                required
                className="w-full px-4 py-2.5 rounded-lg bg-[#0a0a12] text-white border border-[#ffffff15] focus:border-[#3a7bd5] focus:ring-1 focus:ring-[#3a7bd550] outline-none transition duration-200"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="pt-2"
            >
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-[#00d2ff] to-[#3a7bd5] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <TbFidgetSpinner className="animate-spin h-5 w-5 mr-2" />
                    Creating Account...
                  </>
                ) : (
                  'Sign Up'
                )}
              </button>
            </motion.div>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="relative my-6"
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#ffffff15]" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-[#1a1a2e] text-[#b8b8b8]">or continue with</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center space-x-3 border border-[#ffffff15] rounded-lg py-2.5 px-4 cursor-pointer hover:bg-[#ffffff05] transition duration-200"
          >
            <FcGoogle size={20} />
            <span className="text-white font-medium">Google</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="mt-6 text-center text-sm text-[#b8b8b8]"
          >
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="text-[#00d2ff] hover:underline font-medium"
            >
              Sign in
            </Link>
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default SignUp