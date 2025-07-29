import { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/userRole';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { loadStripe } from '@stripe/stripe-js';
import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Button from '../../../components/Shared/Button/Button';
import { FaCrown, FaCheckCircle, FaStar, FaChartLine, FaLockOpen } from 'react-icons/fa';
import { motion } from 'framer-motion';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_KEY);

const Profile = () => {
  const { user } = useAuth();
  const [role] = useRole();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const subscriptionAmount = 9.99;

  // Fetch user's subscription status
  const { data: subscription, isLoading, refetch } = useQuery({
    queryKey: ['subscription', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/subscription?email=${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a12] to-[#1a1a2e] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#1a1a2e] rounded-3xl shadow-2xl overflow-hidden border border-[#9d00ff]/30"
        >
          {/* Cover Photo */}
          <div className="h-48 bg-gradient-to-r from-[#9d00ff] to-[#00f5ff] relative">
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                <motion.img
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  alt="profile"
                  src={user?.photoURL || 'https://via.placeholder.com/150'}
                  className="h-32 w-32 rounded-full border-4 border-[#1a1a2e] shadow-lg object-cover"
                />
                {subscription?.status === 'active' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full p-2 shadow-md"
                  >
                    <FaCrown className="text-white text-lg" />
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-20 pb-8 px-6 sm:px-10 text-center">
            <div className="flex justify-center mb-2">
              <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                role === 'admin' 
                  ? 'bg-red-500/20 text-red-400' 
                  : subscription?.status === 'active'
                  ? 'bg-[#9d00ff]/20 text-[#9d00ff]'
                  : 'bg-gray-500/20 text-gray-400'
              }`}>
                {role === 'admin' ? 'Admin' : subscription?.status === 'active' ? 'Premium Member' : 'Free Member'}
              </span>
            </div>

            <motion.h1 
              className="text-2xl sm:text-3xl font-bold text-white mb-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {user?.displayName}
            </motion.h1>
            <motion.p 
              className="text-[#b8b8b8] mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {user?.email}
            </motion.p>

            {/* Subscription Status */}
            {subscription?.status === 'active' ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-[#9d00ff]/10 border border-[#9d00ff]/30 rounded-lg p-4 mb-6"
              >
                <div className="flex items-center justify-center gap-2 text-[#00f5ff]">
                  <FaCheckCircle className="text-xl" />
                  <span className="font-medium">Premium Membership Active</span>
                </div>
                <p className="text-sm text-[#b8b8b8] mt-1">
                  Member since {new Date(subscription.createdAt).toLocaleDateString()}
                </p>
              </motion.div>
            ) : (
              role !== "admin" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mb-6"
                >
                  <div className="bg-gradient-to-r from-[#1a1a2e] to-[#0a0a12] border border-[#9d00ff]/30 rounded-xl p-6 mb-4">
                    <h3 className="text-xl font-bold text-white mb-3">Premium Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                      <div className="flex items-start gap-2">
                        <FaStar className="text-[#9d00ff] mt-1" />
                        <div>
                          <h4 className="font-medium text-white">Exclusive Badge</h4>
                          <p className="text-sm text-[#b8b8b8]">Show off your premium status</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <FaChartLine className="text-[#9d00ff] mt-1" />
                        <div>
                          <h4 className="font-medium text-white">Advanced Analytics</h4>
                          <p className="text-sm text-[#b8b8b8]">Track your product performance</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <FaLockOpen className="text-[#9d00ff] mt-1" />
                        <div>
                          <h4 className="font-medium text-white">Early Access</h4>
                          <p className="text-sm text-[#b8b8b8]">Get new features first</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    label={`Upgrade to Premium - $${subscriptionAmount}/mo`}
                    className="bg-gradient-to-r from-[#9d00ff] to-[#00f5ff] hover:from-[#00f5ff] hover:to-[#9d00ff] text-white shadow-lg hover:shadow-[#9d00ff]/50"
                  />
                </motion.div>
              )
            )}
          </div>
        </motion.div>
      </div>

      {/* Payment Modal */}
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#1a1a2e] rounded-xl max-w-md w-full p-6 border border-[#9d00ff]/30 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Upgrade to Premium</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-[#b8b8b8] hover:text-white"
              >
                ✕
              </button>
            </div>
            <p className="text-[#b8b8b8] mb-6">
              Unlock premium features for just <span className="text-white font-medium">${subscriptionAmount}/month</span>
            </p>
            
            <Elements stripe={stripePromise}>
              <CheckoutForm 
                amount={subscriptionAmount} 
                email={user?.email}
                onSuccess={() => {
                  setIsModalOpen(false);
                  refetch();
                }}
                onClose={() => setIsModalOpen(false)}
              />
            </Elements>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

const CheckoutForm = ({ amount, email, onSuccess, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    
    setLoading(true);

    try {
      const { data: paymentIntent } = await axiosSecure.post('/create-payment-intent', {
        amount: Math.round(amount * 100),
        email,
      });

      const { error, paymentIntent: confirmedIntent } = await stripe.confirmCardPayment(
        paymentIntent.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (error) {
        throw new Error(error.message || 'Payment failed');
      }

      if (confirmedIntent.status === 'succeeded') {
        const { data: subscription } = await axiosSecure.post('/create-subscription', {
          email,
          paymentId: confirmedIntent.id,
          amount,
        });

        if (!subscription?.success) {
          throw new Error(subscription?.error || 'Subscription creation failed');
        }

        toast.success('Congratulations Payment and subscription successful!', {
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
        onSuccess();
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      toast.error(error.message || 'Payment processing failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 p-3 border border-[#9d00ff]/30 rounded-lg bg-[#0a0a12]">
        <CardElement 
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#ffffff',
                '::placeholder': {
                  color: '#b8b8b8',
                },
                iconColor: '#9d00ff',
              },
              invalid: {
                color: '#ff3860',
              },
            },
          }}
        />
      </div>
      <div className="flex gap-3">
        <Button
          type="button"
          onClick={onClose}
          label="Cancel"
          className="flex-1 bg-[#0a0a12] hover:bg-[#1a1a2e] text-white border border-[#9d00ff]/30"
        />
        <Button
          type="submit"
          label={loading ? 'Processing...' : `Pay $${amount}`}
          disabled={!stripe || loading}
          className="flex-1 bg-gradient-to-r from-[#9d00ff] to-[#00f5ff] hover:from-[#00f5ff] hover:to-[#9d00ff] text-white"
        />
      </div>
    </form>
  );
};

export default Profile;