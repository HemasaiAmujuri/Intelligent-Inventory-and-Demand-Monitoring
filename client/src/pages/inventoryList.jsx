import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import Capitalise from "../utils/utils";

const baseURL = import.meta.env.VITE_BASE_URL;

function InventoryList() {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: 0,
    reOrderPoint: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const itemsPerPage = 12;


    const fetchData = async () => {
      try {
        const response = await fetch(`${baseURL}/api/inventory/inventoryList`);
        const result = await response.json();
        setData(result.data || []);
      } catch (error) {
        console.error(error);
        setData([]);
      }
    };

  useEffect(() => {
  

    fetchData();
  },[]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    const { name, ...payLoad } = formData;
    const capitalisedName = Capitalise(name.trim());

    e.preventDefault();
    try {
      const response = await fetch(`${baseURL}/api/inventory/addInventory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: capitalisedName, ...payLoad }),
      });
      if (response.ok) {
        setFormData({
          name: "",
          category: "",
          quantity: "",
          reOrderPoint: "",
        });
        setShowForm(false);
        fetchData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const categories = [
    "electronics",
    "stationery",
    "groceries",
    "furniture",
    "clothing",
    "tools",
    "toys",
    "cosmetics",
    "sports",
    "books",
    "other",
  ];

  if (search.length >= 3) {
    currentItems = currentItems.filter((user) => {
      return user.name.toLowerCase().includes(search.toLowerCase());
    });
  }

  return (
    <div className="relative">
      <div className="flex-col justify-between items-center">
        <div className="flex items-center justify-between mt-10 mb-5 ml-150">
          <h1 className="text-5xl font-bold">Inventory List</h1>

          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-50"
          >
            + Add Inventory
          </button>
        </div>

        <div className="relative fixed">
          <input
            type="text"
            placeholder="search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="outline-none border rounded-lg bg-gray-200 ml-105 mt-3 mb-2 p-1"
          />
          <BsSearch className="absolute left-145 top-5" />
        </div>

        <div className="flex flex-col justify-center items-center">
          <table className="border border-gray-300 w-[750px]">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">S.NO</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Category</th>
                <th className="border px-4 py-2">Current Stock</th>
                <th className="border px-4 py-2">Reorder Point</th>
                <th className="border px-4 py-2">Status</th>
              </tr>
            </thead>

            <tbody>
              {currentItems.map((item, index) => (
                <tr key={item.id} className="text-center">
                  <td className="border px-4 py-2">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="border px-4 py-2">{item.name}</td>
                  <td className="border px-4 py-2">
                    {Capitalise(item.category)}
                  </td>
                  <td className="border px-4 py-2">{item.currentStock}</td>
                  <td className="border px-4 py-2">{item.reOrderPoint}</td>
                  <td className="border px-4 py-2 font semi-bold">
                    {item.currentStock === 0 ? (
                      <span className="text-red-500">Out of Stock</span>
                    ) : item.currentStock < item.reOrderPoint ? (
                      <span className="text-yellow-500">Low</span>
                    ) : (
                      <span className="text-green-500">Healthy</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center items-center z-20 mt-10 ml-35">
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 border rounded ${
                      page === currentPage ? "bg-blue-600 text-white" : ""
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
        {showForm && (
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                 bg-white border border-gray-300 rounded-xl shadow-lg p-6 w-full max-w-md z-10"
          >
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setFormData({
                  name: "",
                  category: "",
                  quantity: 0,
                  reOrderPoint: 0,
                });
              }}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold text-xl"
            >
              ×
            </button>

            <h1 className="text-2xl font-bold text-center mb-4">
              Add Inventory
            </h1>

            <div className="flex flex-col mb-2">
              <label className="font-semibold mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData?.name}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex flex-col mb-2">
              <label className="font-semibold mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option> Select Category </option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat.toLowerCase()}>
                    {" "}
                    {Capitalise(cat)}{" "}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col mb-2">
              <label className="font-semibold mb-1">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex flex-col mb-2">
              <label className="font-semibold mb-1">Re-Order Point</label>
              <input
                type="number"
                name="reOrderPoint"
                value={formData.reOrderPoint}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors mt-2 w-full"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default InventoryList;
