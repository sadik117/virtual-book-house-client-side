import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
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

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

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

      <div className="min-h-screen w-full bg-white relative">
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

        <div className="relative z-10 space-y-10">
          <div data-aos="zoom-in-up">
            <BannerSlider />
          </div>

          <div data-aos="zoom-in-up" data-aos-delay="100">
            <PopularBooks />
          </div>

          <div data-aos="zoom-in-up" data-aos-delay="200">
            <FeaturedBooks />
          </div>

          <div data-aos="zoom-in-up" data-aos-delay="300">
            <Content />
          </div>

          <div data-aos="zoom-in-up" data-aos-delay="400">
            <Statistic />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
