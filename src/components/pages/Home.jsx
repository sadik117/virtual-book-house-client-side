import React from "react";
import BannerSlider from "../layouts/BannerSlider";
import PopularBooks from "../layouts/PopularBooks";
import { motion } from "framer-motion";
import FeaturedBooks from "../layouts/FeaturedBooks";
import { Statistic } from "../layouts/Statistic";
import { Content } from "../layouts/Content";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const pageVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      y: -30,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <Helmet>
        <title>Home</title>
      </Helmet>

      {/*  Added Gradient Background Wrapper */}
      <div className="min-h-screen w-full bg-white relative">
        {/*  Dual Gradient Overlay Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(229,231,235,0.8) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(229,231,235,0.8) 1px, transparent 1px),
              radial-gradient(circle 500px at 0% 20%, rgba(139,92,246,0.3), transparent),
              radial-gradient(circle 500px at 100% 0%, rgba(59,130,246,0.3), transparent)
            `,
            backgroundSize: "48px 48px, 48px 48px, 100% 100%, 100% 100%",
          }}
        />

        {/*  Home Page Content */}
        <div className="relative z-10 space-y-10">
          <BannerSlider />
          <PopularBooks />
          <FeaturedBooks />
          <Content />
          <Statistic />
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
