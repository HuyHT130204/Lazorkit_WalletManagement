import { useState, useEffect } from 'react';

interface MigrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  removedTokensCount?: number;
}

export default function MigrationModal({ isOpen, onClose, removedTokensCount = 0 }: MigrationModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 max-w-md mx-4">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Token Management Update
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              We have updated the system to only display and support <strong>USDC</strong> and <strong>SOL</strong>.
              {removedTokensCount > 0 && (
                <span className="block mt-2 text-yellow-400">
                  Removed {removedTokensCount} unsupported tokens from cache.
                </span>
              )}
            </p>
          </div>

          <button
            onClick={() => {
              setIsVisible(false);
              onClose();
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
} 