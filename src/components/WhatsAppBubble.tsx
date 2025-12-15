import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function WhatsAppBubble() {
  return (
    <motion.a
      href="https://wa.me/1234567890"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#20BD5A] transition-colors"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        y: [0, -8, 0]
      }}
      transition={{
        scale: { duration: 0.3 },
        opacity: { duration: 0.3 },
        y: {
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
          delay: 1
        }
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Nous contacter sur WhatsApp"
    >
      <MessageCircle className="w-7 h-7" fill="currentColor" />
    </motion.a>
  );
}
