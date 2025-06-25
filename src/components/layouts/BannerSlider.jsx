import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    title: "Track Your Reading",
    description: "Organize your books, track your reading journey, and never lose progress again.",
    image: "https://i.postimg.cc/XYh9srKx/lz233-RWblwm0-Rjfo-unsplash.jpg",
  },
  {
    id: 2,
    title: "Discover New Reads",
    description: "Explore top-rated books, curated for you by our passionate community.",
    image: "https://i.postimg.cc/hvyXhYpM/muhammad-salim-No-Th-WQm-Y8y-M-unsplash.jpg",
  },
  {
    id: 3,
    title: "Review & Reflect",
    description: "Write reviews, share your thoughts, and connect with fellow book lovers.",
    image: "https://i.postimg.cc/02Qw7K7W/karen-zhao-Ttt8-M1k0-KOo-unsplash.jpg",
  },
];

export default function BannerSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[700px] overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={slides[current].id}
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: `url(${slides[current].image})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="p-5 text-zinc-100 max-w-xl text-center mb-28">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {slides[current].title}
            </h2>
            <p className="mb-4">{slides[current].description}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
