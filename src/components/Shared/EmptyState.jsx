import { Link } from 'react-router';

const EmptyState = ({ message, actionText, actionLink }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-32 h-32 mb-6 rounded-full bg-[#1a1a2e] flex items-center justify-center border border-dashed border-[#9d00ff]/50">
        <svg className="w-16 h-16 text-[#9d00ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
      <h3 className="text-xl font-medium text-[#00f5ff] mb-2">{message}</h3>
      {actionText && actionLink && (
        <Link
          to={actionLink}
          className="mt-4 px-6 py-2 bg-gradient-to-r from-[#9d00ff] to-[#00f5ff] text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          {actionText}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;