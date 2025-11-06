// eslint-disable-next-line no-unused-vars
import {motion} from 'framer-motion';
export default function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <motion.p
      className="text-xs font-semibold text-red-500 bg-red-500/10 rounded-md px-2 py-1 mt-1.5"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      {message}
    </motion.p>
  );
}