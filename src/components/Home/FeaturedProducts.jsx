import { useQuery } from '@tanstack/react-query';
import Card from './Card';
import Container from '../Shared/Container';
import EmptyState from '../Shared/EmptyState';
import { motion } from 'framer-motion';
import axios from 'axios';
import LoadingSpinner from '../Shared/LoadingSpinner';
import Button from '../Shared/Button/Button';

const FeaturedProducts = () => {
  // Fetch products using TanStack Query
  const { data: products, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/featured-products`);
      return response.data;
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
          message="Failed to load products" 
          actionText="Try Again"
          actionLink="/dashboard/products"
        />
      </Container>
    );
  }

  return (
    <div className="bg-gradient-to-b from-[#0a0a12] to-[#1a1a2e] min-h-screen">
      <Container>
        <div className="py-12">
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
              className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00f5ff] to-[#9d00ff]"
            >
              Discover Featured Products
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg text-[#b8b8b8] max-w-2xl mx-auto"
            >
              Explore the latest and most popular creations from our community. 
              Vote for your favorites and help them rise to the top!
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
              message="No products available yet" 
              actionText="Be the first to add a product"
              actionLink="/dashboard/add-product"
            />
          )}
        </div>
      </Container>
    </div>
  );
};

export default FeaturedProducts;