import React from 'react';
import { motion } from 'framer-motion';
import { FiEye, FiTrash2, FiAlertCircle } from 'react-icons/fi';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import Button from '../../../components/Shared/Button/Button';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ReportedContents = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: reports = [], isLoading, isError } = useQuery({
    queryKey: ['reportedProducts'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/reports');
      const reportsWithProducts = await Promise.all(
        data.map(async report => {
          try {
            const productRes = await axiosSecure.get(`/products/${report.productId}`);
            return {
              ...report,
              product: productRes.data,
            };
          } catch (error) {
            console.error(`Error fetching product ${report.productId}:`, error);
            return {
              ...report,
              product: null,
            };
          }
        })
      );
      return reportsWithProducts.filter(report => report.product !== null);
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (productId) => {
      await axiosSecure.delete(`/products/${productId}`);
      await axiosSecure.delete(`/reports/by-product/${productId}`);
      return productId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['reportedProducts']);
      toast.success('Product and associated reports deleted successfully', {
        style: {
          background: '#1a1a2e',
          color: '#00f5ff',
          border: '1px solid #00f5ff',
        },
        iconTheme: {
          primary: '#00f5ff',
          secondary: '#1a1a2e',
        },
      });
    },
    onError: () => {
      toast.error('Failed to delete product', {
        style: {
          background: '#1a1a2e',
          color: '#ff3864',
          border: '1px solid #ff3864',
        },
        iconTheme: {
          primary: '#ff3864',
          secondary: '#FFF',
        },
      });
    },
  });

  const dismissReportMutation = useMutation({
    mutationFn: (reportId) => axiosSecure.delete(`/reports/${reportId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['reportedProducts']);
      toast.success('Report dismissed successfully', {
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
      toast.error('Failed to dismiss report', {
        style: {
          background: '#1a1a2e',
          color: '#ff3864',
          border: '1px solid #ff3864',
        },
        iconTheme: {
          primary: '#ff3864',
          secondary: '#FFF',
        },
      });
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div className="text-red-500 text-center mt-10">Error loading reported products</div>;

  return (
    <div className="bg-gradient-to-b from-[#0a0a12] to-[#1a1a2e] rounded-3xl min-h-screen py-8 px-2 sm:px-4 lg:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 sm:mb-8 px-2"
        >
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00f5ff] to-[#9d00ff] mb-1 sm:mb-2">
            Reported Products
          </h1>
          <p className="text-[#b8b8b8] text-sm sm:text-base">Review and manage reported product submissions</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#1a1a2e] rounded-lg sm:rounded-xl border border-[#9d00ff]/30 overflow-hidden mx-2 sm:mx-0"
        >
          {/* Tablet and Desktop Table */}
          <div className="hidden sm:block overflow-x-auto">
            <div className="min-w-[600px] lg:min-w-full">
              <div className="grid grid-cols-12 bg-[#9d00ff]/20 text-[#00f5ff] p-3 sm:p-4 font-semibold text-xs sm:text-sm">
                <div className="col-span-4 md:col-span-3">Product</div>
                <div className="col-span-2">Reported By</div>
                <div className="col-span-3 md:col-span-3">Reason</div>
                <div className="col-span-2">Date</div>
                <div className="col-span-3 md:col-span-2">Actions</div>
              </div>

              {reports.length > 0 ? (
                reports.map((report, index) => (
                  <motion.div
                    key={report._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="grid grid-cols-12 items-center p-3 sm:p-4 border-b border-[#9d00ff]/10 hover:bg-[#0a0a12]/50 transition-colors min-w-[600px] lg:min-w-full"
                  >
                    <div className="col-span-4 md:col-span-3 flex items-center space-x-2 sm:space-x-3">
                      {report.product?.image && (
                        <img 
                          src={report.product.image} 
                          alt={report.product.name}
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-md object-cover"
                        />
                      )}
                      <span className="text-white text-sm sm:text-base truncate max-w-[120px] sm:max-w-[150px]">
                        {report.product?.name}
                      </span>
                    </div>
                    <div className="col-span-2 text-[#b8b8b8] text-xs sm:text-sm truncate">
                      {report.reporterName || 'Anonymous'}
                    </div>
                    <div className="col-span-3 text-[#b8b8b8] text-xs sm:text-sm truncate">
                      {report.reason}
                    </div>
                    <div className="col-span-2 text-[#b8b8b8] text-xs sm:text-sm">
                      {new Date(report.reportedAt).toLocaleDateString()}
                    </div>
                    <div className="col-span-3 md:col-span-2 flex justify-end gap-1 sm:gap-2 flex-wrap">
                      <Button
                        onClick={() => navigate(`/product/${report.productId}`)}
                        label="View"
                        icon={FiEye}
                        small
                        outline
                        className="text-xs sm:text-sm"
                      />
                      <Button
                        onClick={() => deleteProductMutation.mutate(report.productId)}
                        label="Delete"
                        icon={FiTrash2}
                        small
                        className="bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs sm:text-sm"
                      />
                      <Button
                        onClick={() => dismissReportMutation.mutate(report._id)}
                        label="Dismiss"
                        icon={FiAlertCircle}
                        small
                        className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 text-xs sm:text-sm"
                      />
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="p-6 sm:p-8 text-center text-[#b8b8b8] text-sm sm:text-base">
                  No reported products to review
                </div>
              )}
            </div>
          </div>

          {/* Mobile List */}
<div className="sm:hidden">
  {reports.length > 0 ? (
    reports.map((report, index) => (
      <motion.div
        key={report._id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className="p-3 border-b border-[#9d00ff]/20 hover:bg-[#0a0a12]/70 transition-colors"
      >
        <div className="flex items-center space-x-2 mb-2">
          {report.product?.image && (
            <img 
              src={report.product.image} 
              alt={report.product.name}
              className="w-8 h-8 rounded-md object-cover border border-[#9d00ff]/30"
            />
          )}
          <h3 className="text-white font-medium text-sm">{report.product?.name}</h3>
        </div>
        <div className="grid grid-cols-2 gap-1 text-xs mb-2">
          <div>
            <p className="text-[#9d00ff]/80">Reported By</p>
            <p className="text-[#e2e2e2]">{report.reporterName || 'Anonymous'}</p>
          </div>
          <div>
            <p className="text-[#9d00ff]/80">Date</p>
            <p className="text-[#e2e2e2]">{new Date(report.reportedAt).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="mb-2">
          <p className="text-[#9d00ff]/80 text-xs">Reason</p>
          <p className="text-[#f8f8f8] text-sm">{report.reason}</p>
        </div>
        <div className="flex flex-wrap gap-1">
          <Button
            onClick={() => navigate(`/product/${report.productId}`)}
            label="View"
            icon={FiEye}
            extraSmall
            outline
            className="border-[#00f5ff]/50 text-[#00f5ff] hover:bg-[#00f5ff]/10"
          />
          <Button
            onClick={() => deleteProductMutation.mutate(report.productId)}
            label="Delete"
            icon={FiTrash2}
            extraSmall
            className="bg-[#ff3864]/20 hover:bg-[#ff3864]/30 text-[#ff3864] border-[#ff3864]/30"
          />
          <Button
            onClick={() => dismissReportMutation.mutate(report._id)}
            label="Dismiss"
            icon={FiAlertCircle}
            extraSmall
            className="bg-[#9d00ff]/20 hover:bg-[#9d00ff]/30 text-[#9d00ff] border-[#9d00ff]/30"
          />
        </div>
      </motion.div>
    ))
  ) : (
    <div className="p-6 text-center text-[#9d00ff]/70 text-sm">
      No reported products to review
    </div>
  )}
</div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReportedContents;