import { motion } from "framer-motion";

export const FinalCTA = () => {
  return (
    <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
      {/* Animated house illustration in background */}
      <motion.div 
        animate={{
          y: [0, -15, 0],
          rotate: [0, 2, -2, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-0 left-1/4 opacity-10"
      >
        <svg className="w-64 h-64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M3 21L21 21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 11L21 11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 21V11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 11L12 2L21 11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
      
      <motion.div 
        animate={{
          y: [0, 15, 0],
          rotate: [0, -3, 3, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute top-10 right-1/4 opacity-10"
      >
        <svg className="w-48 h-48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M3 21L21 21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 11L21 11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 21V11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 11L12 2L21 11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Begin Your <span className="text-blue-400">Journey</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Whether buying, selling, or just exploring, were here to guide you every step of the way.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300"
            >
              Get Started Today
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300"
            >
              Contact Our Team
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}