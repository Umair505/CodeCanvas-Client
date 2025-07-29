import React from 'react';
import { motion } from 'framer-motion';
import { FiEye, FiStar, FiCheck, FiX } from 'react-icons/fi';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import Button from '../../../components/Shared/Button/Button';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ProductReviewQueue = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch products pending approval
  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ['pendingProducts'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/products-pending/');
      return data;
    },
  });

  // Approve product mutation
  const approveProductMutation = useMutation({
    mutationFn: (productId) => 
      axiosSecure.patch(`/products/${productId}/status`, { status: 'approved' }),
    onSuccess: () => {
      queryClient.invalidateQueries(['pendingProducts']);
      toast.success('Product approved successfully!', {
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
    },
    onError: () => {
      toast.error('Failed to approve product');
    },
  });

  // Reject product mutation
  const rejectProductMutation = useMutation({
    mutationFn: (productId) => 
      axiosSecure.patch(`/products/${productId}/status`, { status: 'rejected' }),
    onSuccess: () => {
      queryClient.invalidateQueries(['pendingProducts']);
      toast.success('Product Rejected!', {
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
    },
    onError: () => {
      toast.error('Failed to reject product');
    },
  });

  // Feature product mutation
  const featureProductMutation = useMutation({
    mutationFn: (productId) => 
      axiosSecure.patch(`/products/${productId}/feature`, { isFeatured: true }),
    onSuccess: () => {
      queryClient.invalidateQueries(['pendingProducts']);
      toast.success('Product marked as featured!', {
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
    },
    onError: () => {
      toast.error('Failed to feature product');
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>Error loading products</div>;

  return (
    <div className="bg-gradient-to-b from-[#0a0a12] to-[#1a1a2e] min-h-screen py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00f5ff] to-[#9d00ff] mb-2">
            Product Review Queue
          </h1>
          <p className="text-[#b8b8b8]">
            Review and approve pending product submissions
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#1a1a2e] rounded-xl border border-[#9d00ff]/30 overflow-hidden"
        >
          {/* Desktop Table */}
          <div className="hidden md:block">
            <div className="grid grid-cols-12 bg-[#9d00ff]/20 text-[#00f5ff] p-4 font-semibold">
              <div className="col-span-4">Product Name</div>
              <div className="col-span-2">Owner</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-4">Actions</div>
            </div>

            {products.length > 0 ? (
              products.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="grid grid-cols-12 items-center p-4 border-b border-[#9d00ff]/10 hover:bg-[#0a0a12]/50 transition-colors"
                >
                  <div className="col-span-4 text-white">{product.name}</div>
                  <div className="col-span-2 text-[#b8b8b8] truncate">
                    {product.owner?.name || 'Unknown'}
                  </div>
                  <div className="col-span-2">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      product.status === 'approved' 
                        ? 'bg-green-500/20 text-green-400' 
                        : product.status === 'rejected' 
                        ? 'bg-red-500/20 text-red-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {product.status}
                    </span>
                  </div>
                  <div className="col-span-4 flex justify-end gap-2">
                    <Button
                      onClick={() => navigate(`/product/${product._id}`)}
                      label="View"
                      icon={FiEye}
                      small
                      outline
                    />
                    <Button
                      onClick={() => featureProductMutation.mutate(product._id)}
                      label="Feature"
                      icon={FiStar}
                      small
                      disabled={product.isFeatured === true }
                      className={product.isFeatured ? 'bg-purple-500/20 text-purple-400' : ''}
                    />
                    <Button
                      onClick={() => approveProductMutation.mutate(product._id)}
                      label="Approve"
                      icon={FiCheck}
                      small
                      disabled={product.status === 'approved'}
                      className="bg-green-500/20 hover:bg-green-500/30 text-green-400"
                    />
                    <Button
                      onClick={() => rejectProductMutation.mutate(product._id)}
                      label="Reject"
                      icon={FiX}
                      small
                      disabled={product.status === 'rejected'}
                      className="bg-red-500/20 hover:bg-red-500/30 text-red-400"
                    />
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="p-8 text-center text-[#b8b8b8]">
                No products pending review
              </div>
            )}
          </div>

          {/* Mobile List */}
          <div className="md:hidden">
            {products.length > 0 ? (
              products.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="p-4 border-b border-[#9d00ff]/10 hover:bg-[#0a0a12]/50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-white font-medium">{product.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      product.status === 'approved' 
                        ? 'bg-green-500/20 text-green-400' 
                        : product.status === 'rejected' 
                        ? 'bg-red-500/20 text-red-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {product.status}
                    </span>
                  </div>
                  <p className="text-sm text-[#b8b8b8] mb-3">
                    Owner: {product.owner?.name || 'Unknown'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={() => navigate(`/product/${product._id}`)}
                      label="View"
                      icon={FiEye}
                      small
                      outline
                    />
                    <Button
                      onClick={() => featureProductMutation.mutate(product._id)}
                      label="Feature"
                      icon={FiStar}
                      small
                      disabled={product.isFeatured || product.status !== 'approved'}
                      className={product.isFeatured ? 'bg-purple-500/20 text-purple-400' : ''}
                    />
                    <Button
                      onClick={() => approveProductMutation.mutate(product._id)}
                      label="Approve"
                      icon={FiCheck}
                      small
                      disabled={product.status === 'approved'}
                      className="bg-green-500/20 hover:bg-green-500/30 text-green-400"
                    />
                    <Button
                      onClick={() => rejectProductMutation.mutate(product._id)}
                      label="Reject"
                      icon={FiX}
                      small
                      disabled={product.status === 'rejected'}
                      className="bg-red-500/20 hover:bg-red-500/30 text-red-400"
                    />
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="p-8 text-center text-[#b8b8b8]">
                No products pending review
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductReviewQueue;