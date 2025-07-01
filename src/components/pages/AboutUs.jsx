import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen mt-10">
      <Helmet>
        <title>About Us | Virtual Book House</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          {/* Left: Image */}
          <img
            src="https://i.ibb.co/vxjLWpks/Online-books-isometric-composition.jpg"
            alt="About Virtual Book House"
            className="rounded-2xl shadow-lg w-full h-full object-cover"
          />

          {/* Right: Text */}
          <div>
            <h1 className="text-4xl font-bold mb-4">Welcome to Virtual Book House</h1>
            <p className="mb-4 text-lg leading-relaxed">
              At <span className="font-semibold text-indigo-600">Virtual Book House</span>, we believe that books are gateways to new worlds, ideas, and inspiration.
              Our platform is built for book lovers to track, discover, and review their favorite reads all in one place.
            </p>
            <p className="mb-4">
              Whether you’re an avid reader or just starting out, Virtual Book House helps you:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-1">
              <li>📚 Add and manage your own book collection</li>
              <li>📖 Track your reading progress (Want-to-Read → Reading → Read)</li>
              <li>🌟 Write and view book reviews</li>
              <li>👍 Upvote books you love</li>
              <li>🔍 Explore books by category and popularity</li>
            </ul>
            <p>
              We’re passionate about creating a space where readers can connect, grow, and get inspired.
              Thank you for being part of our book-loving community!
            </p>
          </div>
        </motion.div>

        {/* Footer or Creator Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-2">Crafted with 📘 by Sadik</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Full-Stack Developer | Book Enthusiast | Lifelong Learner
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
