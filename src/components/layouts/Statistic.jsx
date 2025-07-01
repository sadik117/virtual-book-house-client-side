import { motion } from "framer-motion";
import { Book, Users, ThumbsUp } from "lucide-react";
import { FcStatistics } from "react-icons/fc";

export const Statistic = () => {
  return (
    <div className="px-4 py-8 mx-auto ml-2 md:ml-7 w-[95%] max-w-7xl md:px-24 lg:px-8 lg:py-12">
      <div className="text-center justify-center mb-6">
      <h2 className="font-bold text-3xl inline-flex gap-1"> <FcStatistics className="mt-1.5"></FcStatistics> App Statistic</h2>
      </div>
      <div className="grid gap-10 row-gap-8 lg:grid-cols-3 text-gray-800">
       
        {/* Total Books */}

        <motion.div whileHover={{ scale: 1.03 }} className="bg-white/80 p-6 rounded-xl shadow-lg">
          <div className="flex items-center mb-3">
            <Book className="w-8 h-8 text-indigo-500 mr-2" />
            <h6 className="text-4xl font-bold text-indigo-700">1.2K</h6>
          </div>
          <p className="mb-1 font-semibold text-lg">Books Added</p>
          <p className="text-sm text-gray-600">
            Our readers have added over 1,200 books to their virtual shelves.
          </p>
        </motion.div>

        {/* Total Users */}
        <motion.div whileHover={{ scale: 1.03 }} className="bg-white/80 p-6 rounded-xl shadow-lg">
          <div className="flex items-center mb-3">
            <Users className="w-8 h-8 text-teal-500 mr-2" />
            <h6 className="text-4xl font-bold text-teal-700">800+</h6>
          </div>
          <p className="mb-1 font-semibold text-lg">Active Readers</p>
          <p className="text-sm text-gray-600">
            Join our growing community of book lovers and reviewers.
          </p>
        </motion.div>

        {/* Total Upvotes */}
        <motion.div whileHover={{ scale: 1.03 }} className="bg-white/80 p-6 rounded-xl shadow-lg">
          <div className="flex items-center mb-3">
            <ThumbsUp className="w-8 h-8 text-pink-500 mr-2" />
            <h6 className="text-4xl font-bold text-pink-700">34K</h6>
          </div>
          <p className="mb-1 font-semibold text-lg">Upvotes Given</p>
          <p className="text-sm text-gray-600">
            See which books are trending based on user upvotes.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
