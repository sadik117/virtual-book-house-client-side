import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Firebase/AuthProvider";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Helmet } from "react-helmet-async";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00c49f", "#a29bfe"];

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`https://virtual-book-house.vercel.app/books?email=${user.email}`)
      .then(res => res.json())
      .then(data => {
        setBooks(data);
        const grouped = data.reduce((acc, book) => {
          acc[book.book_category] = (acc[book.book_category] || 0) + 1;
          return acc;
        }, {});
        const chartData = Object.entries(grouped).map(([category, count]) => ({
          name: category,
          value: count,
        }));
        setCategoryData(chartData);
      });
  }, [user?.email]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 mt-10 text-gray-800 dark:text-gray-100">
      
      <Helmet>
        <title>My Profile</title>
      </Helmet>

      <h2 className="text-3xl font-bold text-center mb-6">👤 My Dashboard</h2>

      {/* User Info */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow flex items-center gap-6">
        <img
          src={user?.photoURL}
          alt={user?.displayName}
          className="w-20 h-20 rounded-full border-4 border-indigo-500"
        />
        <div>
          <h3 className="text-xl font-bold">{user?.displayName}</h3>
          <p>{user?.email}</p>
        </div>
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 text-center">
        <div className="bg-blue-100 dark:bg-blue-800 rounded-xl p-4">
          <p className="text-2xl font-bold">{books.length}</p>
          <p>Total Books</p>
        </div>
        {categoryData.map((item, idx) => (
          <div key={idx} className="bg-green-100 dark:bg-green-800 rounded-xl p-4">
            <p className="text-xl font-bold">{item.value}</p>
            <p>{item.name}</p>
          </div>
        ))}
      </div>

      {/* Pie Chart */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4 text-center">📊 Books by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserProfile;
