import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const ContactUs = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen">
      <Helmet>
        <title>Contact Us | Virtual Book House</title>
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-6 text-center mt-10">Get in Touch</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-10">
            Have questions, feedback, or suggestions? We'd love to hear from you!
          </p>

          {/* Contact Form */}
          <form
            action="https://api.web3forms.com/submit"
            method="POST"
            className="bg-gray-100 dark:bg-gray-800 p-8 rounded-xl shadow-md space-y-6"
          >
            <input type="hidden" name="access_key" value={import.meta.env.VITE_Web3FormKey} />

            <div>
              <label className="block mb-1 font-medium">Your Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full input input-bordered dark:bg-gray-700"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Email Address</label>
              <input
                type="email"
                name="email"
                required
                className="w-full input input-bordered dark:bg-gray-700"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Message</label>
              <textarea
                name="message"
                rows="5"
                required
                className="w-full textarea textarea-bordered dark:bg-gray-700"
              />
            </div>

            <button
              type="submit"
              className="btn bg-sky-600 text-white hover:bg-sky-700 transition w-full"
            >
              Send Message
            </button>
          </form>

          {/* Optional Contact Info */}
          <div className="mt-12 text-center text-gray-600 dark:text-gray-400">
            <p>📧 Email: sadiksourov11@gmail.com</p>
            <p>🌐 Website: https://sadik-the-developer.netlify.app/</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUs;
