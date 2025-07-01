import React from "react";
import { BookOpen } from "lucide-react";

export const Content = () => {
  return (
    <div className="px-4 py-6 mx-auto ml-2 md:ml-7 w-[95%] max-w-7xl md:px-24 lg:px-8 lg:py-8 border-b-3 border-purple-300 rounded-b-xl">
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Text Content */}
        <div className="flex flex-col justify-center md:pr-8 xl:pr-0 lg:max-w-lg">
          <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-yellow-200">
            <BookOpen className="w-8 h-8 text-yellow-800" />
          </div>
          <div className="max-w-xl mb-6">
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
              Dive into Your{" "}
              <span className="inline-block text-purple-600">Virtual Library</span>
              <br className="hidden md:block" />
              and Discover Great Reads
            </h2>
            <p className="text-base text-gray-700 md:text-lg">
              Manage your personal bookshelf, track reading progress, leave reviews,
              and upvote your favorite books – all in one place.
            </p>
          </div>
          <div>
            <a
              href="/bookshelf"
              className="inline-flex items-center font-semibold transition-colors duration-200 text-purple-600 hover:text-purple-800"
            >
              Browse Books
              <svg
                className="inline-block w-3 ml-2"
                fill="currentColor"
                viewBox="0 0 12 12"
              >
                <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Images */}
        <div className="flex items-center justify-center -mx-4 lg:pl-8">
          <div className="flex flex-col items-end px-3">
            <img
              className="object-cover mb-6 rounded shadow-lg h-28 sm:h-48 xl:h-56 w-28 sm:w-48 xl:w-56"
              src="https://images.unsplash.com/photo-1524985069026-dd778a71c7b4"
              alt="Bookshelf 1"
            />
            <img
              className="object-cover w-20 h-20 rounded shadow-lg sm:h-32 xl:h-40 sm:w-32 xl:w-40"
              src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da"
              alt="Bookshelf 2"
            />
          </div>
          <div className="px-3">
            <img
              className="object-cover w-40 h-40 rounded shadow-lg sm:h-64 xl:h-80 sm:w-64 xl:w-80"
              src="https://images.unsplash.com/photo-1553729459-efe14ef6055d"
              alt="Bookshelf 3"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
