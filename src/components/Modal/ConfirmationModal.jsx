import { motion } from 'framer-motion';
import { FiAlertTriangle, FiX } from 'react-icons/fi';

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to perform this action?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading = false,
  danger = true
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="relative w-full max-w-md bg-[#1a1a2e] rounded-xl border border-[#9d00ff]/30 overflow-hidden"
      >
        {/* Header */}
        <div className={`p-6 ${danger ? 'bg-[#ff3864]/10' : 'bg-[#00f5ff]/10'} border-b border-[#9d00ff]/30`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FiAlertTriangle className={`text-2xl ${danger ? 'text-[#ff3864]' : 'text-[#00f5ff]'}`} />
              <h3 className="text-xl font-bold text-white">{title}</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-[#b8b8b8] hover:text-white hover:bg-[#0a0a12] transition-colors"
            >
              <FiX className="text-xl" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-[#b8b8b8]">{message}</p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-4 bg-[#0a0a12] border-t border-[#9d00ff]/30">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 rounded-lg border border-[#9d00ff] text-[#00f5ff] hover:bg-[#9d00ff]/10 transition-colors disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-4 py-2 rounded-lg transition-colors disabled:opacity-50 ${
              danger
                ? 'bg-[#ff3864] hover:bg-[#ff3864]/90 text-white'
                : 'bg-[#00f5ff] hover:bg-[#00f5ff]/90 text-[#0a0a12]'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {confirmText}
              </span>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ConfirmationModal;