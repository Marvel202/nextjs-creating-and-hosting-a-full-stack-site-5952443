// app/page.tsx
'use client';
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaInstagram, FaFacebook, FaPinterest, FaTwitter } from 'react-icons/fa';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Solid colored balls with vibrant colors
  const floatingBalls = [
    { size: 180, color: 'bg-pink-400', x: 15, y: 20 },
    { size: 220, color: 'bg-blue-400', x: 75, y: 30 },
    { size: 200, color: 'bg-purple-400', x: 25, y: 60 },
    { size: 240, color: 'bg-cyan-400', x: 65, y: 50 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-8 overflow-hidden relative">
      {/* Solid colored floating balls */}
      {isMounted && floatingBalls.map((ball, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full ${ball.color} shadow-lg`}
          style={{
            width: `${ball.size}px`,
            height: `${ball.size}px`,
            left: `${ball.x}%`,
            top: `${ball.y}%`,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 0.8,
            y: [0, -40, 0],
            x: [0, 25, 0],
          }}
          transition={{
            duration: 15 + index * 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      ))}

      <main className="relative z-20 max-w-6xl mx-auto flex flex-col items-center justify-center min-h-[80vh] gap-12">
        {/* Hero section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            Express Yourself
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
            The coolest place for teens to discover, create, and connect
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full bg-black text-white font-bold text-lg shadow-lg hover:bg-gray-800 transition-all"
            >
              Get Started
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full bg-white text-black font-bold text-lg shadow-lg hover:bg-gray-100 transition-all border-2 border-black"
            >
              Explore
            </motion.button>
          </div>
        </motion.div>

        {/* Product cards */}
         {/* Glassmorphism cards */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="w-full mt-12"
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Trending Now</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Graffiti Hoodie", price: "$49", emoji: "🧥", color: "from-purple-500 to-pink-500" },
              { name: "Retro Sneakers", price: "$89", emoji: "👟", color: "from-blue-500 to-cyan-500" },
              { name: "Neon Headphones", price: "$59", emoji: "🎧", color: "from-green-500 to-teal-500" },
              { name: "Skateboard", price: "$75", emoji: "🛹", color: "from-red-500 to-orange-500" },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ 
                  y: -10,
                  scale: 1.03,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                className="relative group backdrop-blur-lg bg-white/40 rounded-2xl p-6 shadow-xl text-center cursor-pointer border border-white/30 overflow-hidden transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10`}></div>
                <div className="text-5xl mb-4">{item.emoji}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{item.name}</h3>
                <p className="text-gray-700 font-medium">{item.price}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      
      </main>

      <footer className="relative z-30 mt-20 py-8 text-center bg-transparent">
        <div className="flex justify-center gap-6 mb-4">
          <motion.a whileHover={{ y: -3, scale: 1.1 }} href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-2xl text-gray-700 hover:text-pink-600 transition-colors" />
          </motion.a>
          <motion.a whileHover={{ y: -3, scale: 1.1 }} href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-2xl text-gray-700 hover:text-blue-600 transition-colors" />
          </motion.a>
          <motion.a whileHover={{ y: -3, scale: 1.1 }} href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
            <FaPinterest className="text-2xl text-gray-700 hover:text-red-600 transition-colors" />
          </motion.a>
          <motion.a whileHover={{ y: -3, scale: 1.1 }} href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-2xl text-gray-700 hover:text-blue-400 transition-colors" />
          </motion.a>
        </div>
        <p className="text-gray-700">
          © {new Date().getFullYear()} TeenStyle. All rights reserved.
        </p>
      </footer>
    </div>
  );
}