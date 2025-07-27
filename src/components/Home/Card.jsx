import { Link } from 'react-router';
import { FaArrowUp, FaUser } from 'react-icons/fa'; // Removed FaRegArrowUp
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Card = ({ product }) => {
  const { user } = useAuth();
  const [votes, setVotes] = useState(product.votes || 0);
  const [isVoting, setIsVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(
    product.votedBy?.includes(user?.uid) || false
  );

  const handleUpvote = async () => {
    if (!user) {
      window.location.href = '/login';
      return;
    }

    if (product.owner?.email === user.email) {
      toast.error("You can't vote for your own product");
      return;
    }

    if (hasVoted) {
      toast.error('You have already voted for this product');
      return;
    }

    try {
      setIsVoting(true);
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/products/${product._id}/upvote`,
        { userId: user.uid }
      );
      setVotes(votes + 1);
      setHasVoted(true);
      toast.success('Vote submitted!');
    } catch (error) {
      console.error('Error upvoting:', error);
      toast.error(error.response?.data?.error || 'Failed to upvote');
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-3 w-full h-full bg-[#1a1a2e] rounded-xl border border-[#9d00ff]/30 overflow-hidden hover:shadow-lg hover:shadow-[#9d00ff]/20 transition-all duration-300">
        {/* Product Image */}
        <Link to={`/product/${product._id}`} className="aspect-square w-full relative overflow-hidden">
          <img
            className="object-cover h-full w-full group-hover:scale-105 transition duration-300"
            src={product.image}
            alt={product.name}
          />
        </Link>

        {/* Product Info */}
        <div className="p-4 flex flex-col flex-grow">
          <Link to={`/product/${product._id}`} className="flex-grow">
            <h3 className="text-lg font-semibold text-[#00f5ff] mb-1">{product.name}</h3>
            {product.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {product.tags.slice(0, 3).map((tag, index) => (
                  <span 
                    key={index} 
                    className="text-xs px-2 py-1 bg-[#9d00ff]/20 text-[#b8b8b8] rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </Link>

          {/* Owner Info */}
          <div className="flex items-center gap-2 mb-3 text-sm text-[#b8b8b8]">
            <div className="flex items-center gap-1">
              <FaUser className="text-[#9d00ff]" />
              <span>{product.owner?.name || 'Anonymous'}</span>
            </div>
          </div>

          {/* Upvote Button */}
          <button
            onClick={handleUpvote}
            disabled={isVoting || hasVoted || product.owner?.email === user?.email}
            className={`flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg mt-auto transition-colors ${
              hasVoted
                ? 'bg-[#4BB543]/20 text-[#4BB543] cursor-default'
                : product.owner?.email === user?.email
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-[#9d00ff]/20 hover:bg-[#9d00ff]/30 text-[#00f5ff]'
            }`}
          >
            <FaArrowUp className={`text-lg ${hasVoted ? '' : 'opacity-70'}`} />
            <span>{votes} {votes === 1 ? 'Vote' : 'Votes'}</span>
            {isVoting && (
              <svg className="animate-spin h-4 w-4 ml-2" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;