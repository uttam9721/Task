import React, { useState, useEffect } from "react";

const Product = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const pageCount = 6;

  // Fetch API
  const fetchData = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products");
      const json = await res.json();
      setData(json.products);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Delete Item
  const deleteItem = (id) => {
    const filtered = data.filter((item) => item.id !== id);
    setData(filtered);
  };

  // Pagination Logic
  const lastIndex = currentPage * pageCount;
  const firstIndex = lastIndex - pageCount;
  const products = data.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(data.length / pageCount);

  if (loading) return <h1 className="text-center mt-10">Loading...</h1>;

  return (
    <>
      {/* PRODUCTS */}
      <div className="w-full grid grid-cols-3 gap-5 p-5">
        {products.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded-xl shadow hover:scale-105 transition"
          >
            <img
              className="w-full h-40 object-cover rounded"
              src={item.thumbnail}
              alt={item.title}
            />

            <h2 className="font-bold mt-2">{item.title}</h2>

            <p className="text-sm text-gray-500">
              {item.description.slice(0, 50)}...
            </p>

            <p className="mt-2 font-semibold">${item.price}</p>

            <button
              onClick={() => deleteItem(item.id)}
              className="bg-red-500 text-white px-3 py-1 mt-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
        
        {/* Prev */}
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>

        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}

        {/* Next */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Product;