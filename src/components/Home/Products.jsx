import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Card from './Card';
import Container from '../Shared/Container';
import EmptyState from '../Shared/EmptyState';
import { motion } from 'framer-motion';
import axios from 'axios';
import LoadingSpinner from '../Shared/LoadingSpinner';
import { FiSearch, FiX } from 'react-icons/fi';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  // Fetch products using TanStack Query
  const { data: products, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  // Filter products based on search term
  useEffect(() => {
    if (products) {
      const filtered = products.filter(product => {
        const matchesTitle = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTag = product.tags?.some(tag => 
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return matchesTitle || matchesTag;
      });
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

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
              Explore All Products
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg text-[#b8b8b8] max-w-2xl mx-auto mb-8"
            >
              Browse our complete collection of innovative products. 
              Find exactly what you're looking for or discover something new!
            </motion.p>

            {/* Search Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="relative max-w-xl mx-auto"
            >
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#9d00ff]" />
                <input
                  type="text"
                  placeholder="Search by title or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-10 py-3 bg-[#1a1a2e] border border-[#9d00ff]/30 rounded-full focus:outline-none focus:ring-2 focus:ring-[#9d00ff]/50 text-white placeholder-[#b8b8b8]/70"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#b8b8b8] hover:text-[#00f5ff] transition-colors"
                  >
                    <FiX />
                  </button>
                )}
              </div>
              {searchTerm && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 text-sm text-[#b8b8b8]"
                >
                  Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'}
                </motion.p>
              )}
            </motion.div>
          </motion.div>

          {(searchTerm ? filteredProducts : products)?.length > 0 ? (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
              >
                {(searchTerm ? filteredProducts : products).map((product) => (
                  <Card key={product._id} product={product} />
                ))}
              </motion.div>
            </>
          ) : searchTerm ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <EmptyState 
                message="No products match your search" 
                actionText="Clear search"
                onAction={() => setSearchTerm('')}
              />
            </motion.div>
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

export default Products;