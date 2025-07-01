import { motion } from "framer-motion";

const categories = [
  {
    name: "Fiction",
    icon: "📖",
    description: "Explore imaginary stories",
  },
  {
    name: "Non-Fiction",
    icon: "📘",
    description: "Real stories, biographies & more",
  },
  {
    name: "Fantasy",
    icon: "🧙",
    description: "Magical worlds and epic adventures",
  },
  {
    name: "Self-Help",
    icon: "💡",
    description: "Improve yourself with inspiring reads",
  },
  {
    name: "Poetry",
    icon: "📝",
    description: "Dive into the rhythm of words and emotions",
  },
];


const FeaturedCategories = () => {
  return (
    <div className="py-12 px-6 bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-inner mx-auto ml-2 md:ml-7 w-[95%] max-w-7xl mt-3">
      <h2 className="text-3xl font-bold text-center text-black mb-10">
        🌟 Featured Categories
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {categories.map((cat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl shadow-md border border-blue-200 p-6 flex flex-col items-center text-center transition-all"
          >
            <div className="text-5xl mb-3">{cat.icon}</div>
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              {cat.name}
            </h3>
            <p className="text-gray-600 text-sm">{cat.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;
