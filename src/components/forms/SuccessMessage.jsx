// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

// A reusable animated checkmark icon
function CheckIcon(props) {
  return (
    <svg
      {...props}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          delay: 0.2,
          type: 'tween',
          ease: 'easeOut',
          duration: 0.4,
        }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

export default function SuccessMessage({ message, show, onHide }) {
  // Automatically trigger the onHide function after a delay
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onHide();
      }, 2000); // The message will be visible for 2 seconds
      return () => clearTimeout(timer);
    }
  }, [show, onHide]);

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop: Covers the screen and applies the blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
          />

          {/* Content: The actual message, centered on the screen */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-white p-8 shadow-2xl w-64">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center">
                <CheckIcon className="w-8 h-8 text-white" />
              </div>
              <p className="font-bold text-lg text-gray-900">{message}</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}