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

      <BannerSlider></BannerSlider>
      <PopularBooks></PopularBooks>
      <FeaturedBooks></FeaturedBooks>
      <Content></Content>
      <Statistic></Statistic>
    </motion.div>
  );
};

export default Home;
