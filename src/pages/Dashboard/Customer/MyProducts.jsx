import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiEdit, FiTrash2, FiEye, FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import Button from '../../../components/Shared/Button/Button';
import EmptyState from '../../../components/Shared/EmptyState';
import ConfirmationModal from '../../../components/Modal/ConfirmationModal';
import EditProduct from '../../../components/Modal/EditProduct';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyProducts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [productToDelete, setProductToDelete] = useState(null);
const [productToEdit, setProductToEdit] = useState(null);
  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['myProducts', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-products?ownerEmail=${user?.email}`);
      return data;
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: (productId) => axiosSecure.delete(`/products/${productId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['myProducts', user?.email]);
      toast.success('Product deleted successfully!', {
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
    onError: (error) => {
      toast.error('Failed to delete product');
      console.error('Delete error:', error);
    },
  });

  const handleDelete = (productId) => {
    setProductToDelete(productId);
  };

  const confirmDelete = () => {
    deleteProductMutation.mutate(productToDelete);
    setProductToDelete(null);
  };

  const cancelDelete = () => {
    setProductToDelete(null);
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>Error loading products</div>;

  return (
    <div className="min-h-screen py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 sm:mb-8"
        >
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00f5ff] to-[#9d00ff] mb-1 pb-2 sm:mb-2">
            My Products
          </h1>
          <p className="text-[#b8b8b8] text-xs sm:text-sm md:text-base">
            Manage all the products you've posted on CodeCanvas
          </p>
        </motion.div>

        {products.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#1a1a2e] rounded-lg sm:rounded-xl border border-[#9d00ff]/30 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <div className="min-w-full">
                {/* Desktop Table Header */}
                <div className="hidden md:grid grid-cols-12 bg-[#9d00ff]/20 text-[#00f5ff] p-3 sm:p-4 font-semibold text-sm lg:text-base">
                  <div className="col-span-5">Product</div>
                  <div className="col-span-2 text-center">Votes</div>
                  <div className="col-span-2 text-center">Created</div>
                  <div className="col-span-1 text-center">Status</div>
                  <div className="col-span-2 text-center">Actions</div>
                </div>

                {products.map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="grid grid-cols-1 md:grid-cols-12 items-center gap-3 sm:gap-4 p-3 sm:p-4 border-b border-[#9d00ff]/10 hover:bg-[#0a0a12]/50 transition-colors"
                  >
                    {/* Product Info */}
                    <div className="md:col-span-5 flex items-center gap-2 sm:gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover border border-[#9d00ff]/30"
                      />
                      <div className="overflow-hidden">
                        <h3 className="font-medium text-white text-sm sm:text-base truncate">
                          {product.name}
                        </h3>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {product.tags?.slice(0, 2).map((tag, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-0.5 bg-[#9d00ff]/20 text-[#b8b8b8] rounded-full truncate"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Votes - Mobile */}
                    <div className="md:hidden flex items-center justify-between text-xs sm:text-sm mt-2">
                      <span className="text-[#b8b8b8]">Votes:</span>
                      <span className="text-[#00f5ff] font-medium">{product.votes || 0}</span>
                    </div>

                    {/* Votes - Desktop */}
                    <div className="hidden md:flex md:col-span-2 items-center justify-center gap-1 text-sm">
                      <span className="text-[#00f5ff] font-medium">{product.votes || 0}</span>
                      <span className="text-[#b8b8b8] hidden lg:inline">votes</span>
                    </div>

                    {/* Created - Mobile */}
                    <div className="md:hidden flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-[#b8b8b8]">Created:</span>
                      <span className="text-[#b8b8b8]">
                        {new Date(product.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Created - Desktop */}
                    <div className="hidden md:block md:col-span-2 text-[#b8b8b8] text-xs sm:text-sm text-center">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </div>

                    {/* Status - Mobile */}
                    <div className="md:hidden flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-[#b8b8b8]">Status:</span>
                      <span
                        className={`px-2 py-0.5 sm:py-1 rounded-full text-xs ${
                          (product.votes || 0) >= 10
                            ? 'bg-green-500/20 text-green-400'
                            : (product.votes || 0) >= 5
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-gray-500/20 text-gray-400'
                        }`}
                      >
                        {product.status}
                      </span>
                    </div>

                    {/* Status - Desktop */}
                    <div className="hidden md:flex md:col-span-1 justify-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs sm:text-sm ${
                          product.status === 'approved'
                            ? 'bg-green-500/20 text-green-400'
                            : product.status === 'pending'
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-gray-500/20 text-gray-400'
                        }`}
                      >
                        {product.status}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="md:col-span-2 flex justify-end gap-1 sm:gap-2 mt-3 sm:mt-0">
                      <button
                        onClick={() => navigate(`/product/${product._id}`)}
                        className="p-1.5 sm:p-2 rounded-lg border border-[#00f5ff]/50 text-[#00f5ff] hover:bg-[#00f5ff]/10 transition-colors"
                        aria-label="View product"
                      >
                        <FiEye size={14} className="sm:w-4" />
                      </button>
                      <button
          onClick={() => setProductToEdit(product)}
          className="p-1.5 sm:p-2 rounded-lg border border-[#9d00ff]/50 text-[#9d00ff] hover:bg-[#9d00ff]/10 transition-colors"
          aria-label="Edit product"
        >
          <FiEdit size={14} className="sm:w-4" />
        </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="p-1.5 sm:p-2 rounded-lg border border-red-400/50 text-red-400 hover:bg-red-500/10 transition-colors"
                        aria-label="Delete product"
                      >
                        <FiTrash2 size={14} className="sm:w-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <EmptyState
            message="You haven't posted any products yet"
            address="/dashboard/add-product"
            label="Add Your First Product"
          />
        )}

        {products.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 sm:mt-8 flex justify-center md:justify-end"
          >
            <Button
              label="Add New Product"
              onClick={() => navigate('/dashboard/add-product')}
              icon={FiPlus}
              className="bg-gradient-to-r from-[#00f5ff] to-[#9d00ff] hover:from-[#9d00ff] hover:to-[#00f5ff] text-sm sm:text-base"
              size="sm"
            />
          </motion.div>
        )}
      </div>
        {/* Add the EditProduct modal */}
      {productToEdit && (
        <EditProduct
          product={productToEdit}
          onClose={() => setProductToEdit(null)}
          onUpdate={() => refetch()}
        />
      )}

      <ConfirmationModal
        isOpen={!!productToDelete}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={deleteProductMutation.isLoading}
      />
    </div>
  );
};

export default MyProducts;