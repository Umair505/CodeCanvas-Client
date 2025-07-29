import React from 'react';
import { motion } from 'framer-motion';
import { FiBox, FiUsers, FiAlertTriangle, FiCheckCircle, FiStar, FiTrendingUp, FiClock, FiBarChart2, FiTool, FiShield, FiPackage } from 'react-icons/fi';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/userRole';

const DashboardHome = () => {
  const { user } = useAuth();
  const [role] = useRole();

  // Role-based content configuration
  const roleConfig = {
    admin: {
      title: "Administrator Dashboard",
      subtitle: "Manage the entire platform with powerful admin tools",
      icon: <FiShield className="text-4xl text-purple-500" />,
      features: [
        { icon: <FiUsers />, text: "User Management" },
        { icon: <FiTool />, text: "System Configuration" },
        { icon: <FiBarChart2 />, text: "Advanced Analytics" }
      ],
      description: "As an administrator, you have full access to all system features. Manage users, configure settings, and monitor platform health."
    },
    moderator: {
      title: "Moderator Dashboard",
      subtitle: "Review and manage content submissions",
      icon: <FiCheckCircle className="text-4xl text-blue-500" />,
      features: [
        { icon: <FiPackage />, text: "Content Moderation" },
        { icon: <FiAlertTriangle />, text: "Report Management" },
        { icon: <FiStar />, text: "Featured Content" }
      ],
      description: "As a moderator, you can review pending submissions, manage reported content, and feature quality products."
    },
    user: {
      title: `Welcome back, ${user?.displayName || 'User'}!`,
      subtitle: "Manage your products and track your performance",
      icon: <FiBox className="text-4xl text-green-500" />,
      features: [
        { icon: <FiTrendingUp />, text: "Product Analytics" },
        { icon: <FiClock />, text: "Recent Activity" },
        { icon: <FiStar />, text: "Featured Opportunities" }
      ],
      description: "View your product statistics, manage your submissions, and discover ways to improve your visibility."
    }
  };

  const config = roleConfig[role] || roleConfig.user;

  return (
    <div className="bg-gradient-to-br from-[#0a0a12] to-[#1a1a2e] min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12"
        >
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00f5ff] to-[#9d00ff] mb-2">
              {config.title}
            </h1>
            <p className="text-lg text-[#b8b8b8] max-w-2xl">
              {config.subtitle}
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-4 bg-[#1a1a2e] rounded-xl border border-[#9d00ff]/30"
          >
            {config.icon}
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Welcome Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 bg-[#1a1a2e] rounded-xl border border-[#9d00ff]/30 p-6"
          >
            <h2 className="text-xl font-semibold text-[#00f5ff] mb-4">
              Getting Started
            </h2>
            <p className="text-[#b8b8b8] mb-6">
              {config.description}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {config.features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-[#0a0a12] p-4 rounded-lg border border-[#9d00ff]/20 hover:border-[#00f5ff]/50 transition-colors"
                >
                  <div className="flex items-center gap-3 text-[#00f5ff]">
                    <span className="p-2 bg-[#9d00ff]/20 rounded-full">
                      {feature.icon}
                    </span>
                    <span className="font-medium">{feature.text}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-[#1a1a2e] rounded-xl border border-[#9d00ff]/30 p-6"
          >
            <h2 className="text-xl font-semibold text-[#00f5ff] mb-4">
              Quick Stats
            </h2>
            
            <div className="space-y-4">
              <StatItem 
                label="Account Type" 
                value={role}
                icon={<FiUsers className="text-[#9d00ff]" />}
              />
              <StatItem 
                label="Member Since" 
                value={new Date(user?.metadata?.creationTime).toLocaleDateString() || "N/A"}
                icon={<FiClock className="text-[#00f5ff]" />}
              />
              <StatItem 
                label="Email Verified" 
                value={user?.emailVerified ? "Yes" : "No"}
                icon={<FiCheckCircle className={user?.emailVerified ? "text-green-500" : "text-yellow-500"} />}
              />
            </div>

            {role !== 'user' && (
              <div className="mt-6 pt-6 border-t border-[#9d00ff]/20">
                <h3 className="text-sm font-medium text-[#b8b8b8] mb-3">
                  Moderator Tools
                </h3>
                <p className="text-sm text-[#b8b8b8]">
                  Access your specialized tools from the sidebar to manage {role === 'admin' ? 'the entire platform' : 'content submissions'}.
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Role-Specific Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 bg-[#1a1a2e] rounded-xl border border-[#9d00ff]/30 p-6"
        >
          <h2 className="text-xl font-semibold text-[#00f5ff] mb-4">
            {role === 'admin' ? 'Admin Pro Tips' : role === 'moderator' ? 'Moderation Best Practices' : 'Product Tips'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getRoleTips(role).map((tip, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-full bg-[#9d00ff]/20 flex items-center justify-center text-[#9d00ff]">
                    {index + 1}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-[#b8b8b8] mb-1">{tip.title}</h3>
                  <p className="text-sm text-[#b8b8b8]/80">{tip.content}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Helper component for stat items
const StatItem = ({ label, value, icon }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-[#b8b8b8]">{label}</span>
    </div>
    <span className="font-medium text-white">{value}</span>
  </div>
);

// Helper function for role-specific tips
const getRoleTips = (role) => {
  const tips = {
    admin: [
      {
        title: "Regular Audits",
        content: "Conduct weekly security audits to ensure platform integrity."
      },
      {
        title: "User Management",
        content: "Review new moderator applications every 48 hours."
      },
      {
        title: "System Health",
        content: "Monitor server performance metrics daily."
      }
    ],
    moderator: [
      {
        title: "Consistent Review",
        content: "Check the pending queue at least twice daily."
      },
      {
        title: "Fair Judgement",
        content: "Always review reported content objectively."
      },
      {
        title: "Communication",
        content: "Provide clear reasons when rejecting submissions."
      }
    ],
    user: [
      {
        title: "Quality Images",
        content: "Use high-quality images to increase engagement."
      },
      {
        title: "Detailed Descriptions",
        content: "Write thorough descriptions for better visibility."
      },
      {
        title: "Tag Wisely",
        content: "Use relevant tags to help users find your products."
      }
    ]
  };

  return tips[role] || tips.user;
};

export default DashboardHome;