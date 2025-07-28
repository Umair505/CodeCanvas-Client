import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiShield, FiEdit2, FiUserCheck } from 'react-icons/fi';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import Button from '../../../components/Shared/Button/Button';
import toast from 'react-hot-toast';
import userDummyLogo from '../../../assets/images/placeholder.jpg'; 
const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all users
  const { data: users = [], isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/users');
      return data;
    },
  });

  // Update user role mutation
  const updateRoleMutation = useMutation({
    mutationFn: ({ userId, newRole }) => 
      axiosSecure.patch(`/users/${userId}/role`, { role: newRole }),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      toast.success('User role updated successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update role');
    },
  });

  const handleRoleChange = (userId, newRole) => {
    updateRoleMutation.mutate({ userId, newRole });
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>Error loading users</div>;

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
            Manage Users
          </h1>
          <p className="text-[#b8b8b8]">
            View and manage all registered users
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 rounded-lg bg-[#0a0a12] text-white border border-[#9d00ff]/50 focus:border-[#00f5ff] focus:ring-1 focus:ring-[#00f5ff]/50 outline-none transition duration-200"
            />
            <FiUser className="absolute left-3 top-3 text-[#b8b8b8]" />
          </div>
        </motion.div>

        {/* Users Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-[#1a1a2e] rounded-xl border border-[#9d00ff]/30 overflow-hidden"
        >
          {/* Desktop Table */}
          <div className="hidden md:block">
            <div className="grid grid-cols-12 bg-[#9d00ff]/20 text-[#00f5ff] p-4 font-semibold">
              <div className="col-span-4 flex items-center gap-2">
                <FiUser /> User
              </div>
              <div className="col-span-4 flex items-center gap-2">
                <FiMail /> Email
              </div>
              <div className="col-span-2 flex items-center gap-2">
                <FiShield /> Current Role
              </div>
              <div className="col-span-2 text-center">Actions</div>
            </div>

            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <motion.div
                  key={user._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="grid grid-cols-12 items-center p-4 border-b border-[#9d00ff]/10 hover:bg-[#0a0a12]/50 transition-colors"
                >
                  <div className="col-span-4 flex items-center gap-3">
                    <img
                      src={user?.image || 'https://via.placeholder.com/40'}
                      alt={user?.name}
                      className="w-10 h-10 rounded-full border-2 border-[#9d00ff]"
                    />
                    <span className="text-white">{user.name}</span>
                  </div>
                  <div className="col-span-4 text-[#b8b8b8] truncate">{user.email}</div>
                  <div className="col-span-2">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      user.role === 'admin' 
                        ? 'bg-purple-500/20 text-purple-400' 
                        : user.role === 'moderator' 
                        ? 'bg-blue-500/20 text-blue-400' 
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {user.role}
                    </span>
                  </div>
                  <div className="col-span-2 flex justify-end gap-2">
                    <select
                      value={user?.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      className="bg-[#0a0a12] text-white border border-[#9d00ff]/50 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#00f5ff]/50"
                      disabled={updateRoleMutation.isLoading}
                    >
                      <option value="user">User</option>
                      <option value="moderator">Moderator</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="p-8 text-center text-[#b8b8b8]">
                No users found matching your search
              </div>
            )}
          </div>

          {/* Mobile List */}
          <div className="md:hidden">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <motion.div
                  key={user._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="p-4 border-b border-[#9d00ff]/10 hover:bg-[#0a0a12]/50 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={user?.image || userDummyLogo }
                      alt={user?.name}
                      className="w-10 h-10 rounded-full border-2 border-[#9d00ff]"
                    />
                    <div>
                      <div className="text-white font-medium">{user?.name}</div>
                      <div className="text-sm text-[#b8b8b8]">{user?.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      user.role === 'admin' 
                        ? 'bg-purple-500/20 text-purple-400' 
                        : user.role === 'moderator' 
                        ? 'bg-blue-500/20 text-blue-400' 
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {user.role}
                    </span>
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      className="bg-[#0a0a12] text-white border border-[#9d00ff]/50 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#00f5ff]/50"
                      disabled={updateRoleMutation.isLoading}
                    >
                      <option value="user">User</option>
                      <option value="moderator">Moderator</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="p-8 text-center text-[#b8b8b8]">
                No users found matching your search
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ManageUsers;