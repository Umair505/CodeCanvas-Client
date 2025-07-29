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
import { FaCrown, FaCheckCircle } from 'react-icons/fa';

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
    enabled: !!user?.email, // Only run query if email exists
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Cover Photo */}
          <div className="h-48 bg-gradient-to-r from-purple-500 to-pink-500 relative">
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                <img
                  alt="profile"
                  src={user?.photoURL || 'https://via.placeholder.com/150'}
                  className="h-32 w-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
                {subscription?.status === 'active' && (
                  <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1">
                    <FaCrown className="text-white text-lg" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-20 pb-8 px-6 sm:px-10 text-center">
            <div className="flex justify-center mb-2">
              <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                role === 'admin' 
                  ? 'bg-red-100 text-red-800' 
                  : subscription?.status === 'active'
                  ? 'bg-purple-100 text-purple-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {role === 'admin' ? 'Admin' : subscription?.status === 'active' ? 'Premium Member' : 'Free Member'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
              {user?.displayName}
            </h1>
            <p className="text-gray-600 mb-6">{user?.email}</p>

            {/* Subscription Status */}
            {subscription?.status === 'active' ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center gap-2 text-green-700">
                  <FaCheckCircle className="text-xl" />
                  <span className="font-medium">Premium Membership Active</span>
                </div>
                <p className="text-sm text-green-600 mt-1">
                  Member since {new Date(subscription.createdAt).toLocaleDateString()}
                </p>
              </div>
            ) : (
              <div className="mb-6">
                <Button
                  onClick={() => setIsModalOpen(true)}
                  label={`Upgrade to Premium - $${subscriptionAmount}`}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Unlock premium features with our membership
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Upgrade to Premium</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              You're about to upgrade to premium membership for ${subscriptionAmount}/month.
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
          </div>
        </div>
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
      // 1. Create payment intent
      const { data: paymentIntent } = await axiosSecure.post('/create-payment-intent', {
        amount: Math.round(amount * 100),
        email,
      });

      // 2. Confirm payment
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
        // 3. Create subscription record
        const { data: subscription } = await axiosSecure.post('/create-subscription', {
          email,
          paymentId: confirmedIntent.id,
          amount,
        });

        if (!subscription?.success) {
          throw new Error(subscription?.error || 'Subscription creation failed');
        }

        // 4. Handle success
        
        toast.success('Payment and subscription successful!');
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
      <div className="mb-4 p-3 border rounded-lg">
        <CardElement 
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      <div className="flex gap-2">
        <Button
          type="button"
          onClick={onClose}
          label="Cancel"
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800"
        />
        <Button
          type="submit"
          label={loading ? 'Processing...' : `Pay $${amount}`}
          disabled={!stripe || loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
        />
      </div>
    </form>
  );
};

export default Profile;