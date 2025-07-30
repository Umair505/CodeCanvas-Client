import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { FiArrowUp, FiFlag, FiStar, FiSend } from 'react-icons/fi';
import { motion } from 'framer-motion';
import useAuth from '../../hooks/useAuth';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import toast from 'react-hot-toast';
import Button from '../../components/Shared/Button/Button';
import ConfirmationModal from '../../components/Modal/ConfirmationModal';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useRole from '../../hooks/userRole';

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [role] = useRole()
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');

  // Fetch product details
  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/products/${id}`);
      return data;
    },
  });

  // Fetch reviews for this product
  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews', id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/reviews?productId=${id}`);
      return data;
    },
    enabled: !!product,
  });

  // Upvote mutation
  const upvoteMutation = useMutation({
    mutationFn: () => axiosSecure.patch(`/products/${id}/upvote`, { userId: user?.uid }),
    onSuccess: () => {
      queryClient.invalidateQueries(['product', id]);
       toast.success('Upvoted successfully', {
        style: {
          background: '#1a1a2e',
          color: '#9d00ff',
          border: '1px solid #9d00ff',
        },
        iconTheme: {
          primary: '#9d00ff',
          secondary: '#1a1a2e',
        },
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to upvote');
    },
  });

  // Report mutation
  const reportMutation = useMutation({
    mutationFn: (reason) => axiosSecure.post(`/products/${id}/report`, { reason, reporterName: user?.displayName }),
    onSuccess: () => {
       toast.success('Product Reported successfully', {
        style: {
          background: '#1a1a2e',
          color: '#9d00ff',
          border: '1px solid #9d00ff',
        },
        iconTheme: {
          primary: '#9d00ff',
          secondary: '#1a1a2e',
        },
      });
      setShowReportModal(false);
      setReportReason('');
    },
    onError: () => {
      toast.error('Failed to report product');
    },
  });

  // Review submission mutation
  const reviewMutation = useMutation({
    mutationFn: (reviewData) => axiosSecure.post('/reviews', reviewData),
    onSuccess: () => {
      queryClient.invalidateQueries(['reviews', id]);
      setReviewText('');
      setRating(0);
       toast.success('Review Submitted', {
        style: {
          background: '#1a1a2e',
          color: '#9d00ff',
          border: '1px solid #9d00ff',
        },
        iconTheme: {
          primary: '#9d00ff',
          secondary: '#1a1a2e',
        },
      });
    },
    onError: () => {
      toast.error('Failed to submit review');
    },
  });

  const handleUpvote = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (product.owner.email === user.email) {
       toast.error('You cannot vote for your own product', {
        style: {
          background: '#1a1a2e',
          color: '#9d00ff',
          border: '1px solid #9d00ff',
        },
        iconTheme: {
          primary: '#9d00ff',
          secondary: '#1a1a2e',
        },
      });
      return;
    }
    if (product.votedBy?.includes(user.uid)) {
        toast.error('You have already voted for this product', {
        style: {
          background: '#1a1a2e',
          color: '#9d00ff',
          border: '1px solid #9d00ff',
        },
        iconTheme: {
          primary: '#9d00ff',
          secondary: '#1a1a2e',
        },
      });
      return;
    }
    upvoteMutation.mutate();
  };

  const handleReport = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    reportMutation.mutate(reportReason);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    if (!reviewText || rating === 0) {
      
      toast.error('Please provide both rating and review text');
      return;
    }

    const reviewData = {
      productId: id,
      productName: product.name,
      reviewerId: user.uid,
      reviewerName: user.displayName,
      reviewerImage: user.photoURL,
      rating,
      text: reviewText,
      createdAt: new Date().toISOString(),
    };

    reviewMutation.mutate(reviewData);
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>Error loading product details</div>;

  return (
    <div className="bg-gradient-to-b from-[#0a0a12] to-[#1a1a2e] min-h-screen py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Product Details Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#1a1a2e] rounded-xl border border-[#9d00ff]/30 p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="relative aspect-square rounded-xl overflow-hidden border border-[#9d00ff]/30">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{product.name}</h1>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`${i < Math.floor(product.averageRating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'} w-5 h-5`}
                    />
                  ))}
                  <span className="ml-2 text-[#b8b8b8]">
                    ({reviews.length} reviews)
                  </span>
                </div>
              </div>

              <p className="text-[#b8b8b8] mb-6">{product.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {product.tags?.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-[#9d00ff]/20 text-[#b8b8b8] rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>

              {/* External Link */}
              {product.externalLink && (
                <div className="mb-6">
                  <a
                    href={product.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#00f5ff] hover:underline"
                  >
                    Visit Product Website
                  </a>
                </div>
              )}

              {/* Owner Info */}
              <div className="flex items-center gap-3 mb-6">
                <img
                  src={product.owner.image}
                  alt={product.owner.name}
                  className="w-10 h-10 rounded-full border-2 border-[#9d00ff]"
                />
                <div>
                  <p className="text-white">Posted by {product.owner.name}</p>
                  <p className="text-sm text-[#b8b8b8]">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={handleUpvote}
                  disabled={!user || product.owner.email === user.email || product.votedBy?.includes(user.uid)}
                  label={`${product.votes || 0} Upvotes`}
                  icon={FiArrowUp}
                  className={`${product.votedBy?.includes(user?.uid) ? 'bg-green-500/20 text-green-400' : 'bg-[#9d00ff]/20 hover:bg-[#9d00ff]/30 text-[#00f5ff]'}`}
                />
                <Button
                  onClick={() => setShowReportModal(true)}
                  label="Report"
                  disabled={!user || product.owner.email === user.email || product.votedBy?.includes(user.uid)}
                  icon={FiFlag}
                  outline
                  className="border-red-400 text-red-400 hover:bg-red-500/10"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#1a1a2e] rounded-xl border border-[#9d00ff]/30 p-6 mb-8"
        >
          <h2 className="text-xl font-bold text-white mb-6">Customer Reviews</h2>

          {reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review._id} className="border-b border-[#9d00ff]/10 pb-6 last:border-0">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={review.reviewerImage}
                      alt={review.reviewerName}
                      className="w-10 h-10 rounded-full border border-[#9d00ff]/30"
                    />
                    <div>
                      <p className="text-white">{review.reviewerName}</p>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={`${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'} w-4 h-4`}
                          />
                        ))}
                        <span className="ml-2 text-xs text-[#b8b8b8]">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-[#b8b8b8]">{review.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[#b8b8b8] text-center py-4">No reviews yet. Be the first to review!</p>
          )}
        </motion.div>

        {/* Post Review Section */}
        {user && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-[#1a1a2e] rounded-xl border border-[#9d00ff]/30 p-6"
          >
            <h2 className="text-xl font-bold text-white mb-6">Write a Review</h2>
            <form onSubmit={handleReviewSubmit}>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-10 h-10 rounded-full border border-[#9d00ff]/30"
                />
                <span className="text-white">{user.displayName}</span>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-[#b8b8b8] mb-2">
                  Your Rating
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="text-2xl focus:outline-none"
                    >
                      <FiStar
                        className={`${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'} w-6 h-6`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-[#b8b8b8] mb-2">
                  Your Review
                </label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0a0a12] text-white border border-[#9d00ff]/50 focus:border-[#00f5ff] focus:ring-1 focus:ring-[#00f5ff]/50 outline-none transition duration-200"
                  placeholder="Share your thoughts about this product..."
                  required
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  label="Submit Review"
                  icon={FiSend}
                  disabled={reviewMutation.isLoading}
                  isLoading={reviewMutation.isLoading}
                  className="bg-gradient-to-r from-[#00f5ff] to-[#9d00ff] hover:from-[#9d00ff] hover:to-[#00f5ff]"
                />
              </div>
            </form>
          </motion.div>
        )}
      </div>

      {/* Report Modal */}
      <ConfirmationModal
        isOpen={showReportModal}
        onClose={() => {
          setShowReportModal(false);
          setReportReason('');
        }}
        onConfirm={handleReport}
        title="Report Product"
        message={
          <div className="space-y-4">
            <p>Please specify the reason for reporting this product:</p>
            <textarea
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 rounded-lg bg-[#0a0a12] text-white border border-[#9d00ff]/50 focus:border-[#00f5ff] outline-none"
              placeholder="Enter reason..."
              required
            />
          </div>
        }
        confirmText="Submit Report"
        cancelText="Cancel"
        isLoading={reportMutation.isLoading}
        danger
      />
    </div>
  );
};

export default ProductDetails;