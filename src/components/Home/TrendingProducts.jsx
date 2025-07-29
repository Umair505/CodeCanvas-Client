import { useQuery } from '@tanstack/react-query';
import Card from './Card';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router';
import LoadingSpinner from '../Shared/LoadingSpinner';
import EmptyState from '../Shared/EmptyState';
import Container from '../Shared/Container';
import Button from '../Shared/Button/Button';

const TrendingProducts = () => {
  const navigate = useNavigate();
  
  // Fetch trending products sorted by votes
  const { data: products, isLoading, isError } = useQuery({
    queryKey: ['trending-products'],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/trending`);
      // Sort by votes in descending order
      return response.data.sort((a, b) => b.votes - a.votes).slice(0, 6);
    },
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <Container>
        <EmptyState
          message="Failed to load trending products" 
          actionText="Try Again"
          actionLink="/products"
        />
      </Container>
    );
  }

  return (
    <div className="bg-gradient-to-b from-[#0a0a12] to-[#1a1a2e] py-12">
      <Container>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="py-5 text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00f5ff] to-[#9d00ff]"
          >
            Trending Now
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg text-[#b8b8b8] max-w-2xl mx-auto"
          >
            Discover what's hot in the community. These products are currently getting the most love!
          </motion.p>
        </motion.div>

        {products && products.length > 0 ? (
          <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
              >
                {products.slice(0, 4).map((product) => (
                  <Card key={product._id} product={product} />
                ))}
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="mt-12 text-center"
              >
                <p className="text-[#b8b8b8] mb-4">
                  Want to see more amazing products?
                </p>
                <a href="/products" className="inline-block w-auto">
                  <Button
                    label="Browse All Products"
                    fullWidth={false}
                    outline={false}
                  />
                </a>

              </motion.div>
            </>
        ) : (
          <EmptyState 
            message="No trending products yet" 
            actionText="Add your product"
            actionLink="/dashboard/add-product"
          />
        )}
      </Container>
    </div>
  );
};

export default TrendingProducts;


