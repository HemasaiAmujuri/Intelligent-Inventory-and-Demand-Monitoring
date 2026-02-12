import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import Capitalise from "../utils/utils";
import Loader from "../components/loader";

const baseUrl = import.meta.env.VITE_BASE_URL;

function Order() {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    quantity: "",
  });
  const [message, setMessage] = useState("");
  const [productNames, setProductNames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/api/inventory/inventoryList`);

      if (!response.ok) {
        throw new Error("Failed to fetch inventory list");
      }

      const result = await response.json(); // parse the response
      setData(result?.data || []);
    } catch (error) {
      console.error("Error fetching inventory:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

useEffect(() => {
  const fetchProductNames = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/inventory/getAllProductNames`);
      if (!response.ok) throw new Error("Failed to fetch product names");
      const data = await response.json();
      setProductNames(data.data || []);
    } catch (err) {
      console.error(err);
      setProductNames([]);
    }
  };
  fetchProductNames();
}, []);


useEffect(() => {
  setCurrentPage(1);
}, [search]);



   let filteredItems = data.filter((item) => item.currentStock > 0);

    if (search.length >= 3) {
    filteredItems = filteredItems.filter((user) => {
      return user.name.toLowerCase().includes(search.toLowerCase());
    });
  }

 

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/api/order/createOrder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // show message
      setMessage(data?.message ?? "Data saved successfully");

      // hide form if success
      setShowForm(!data?.success ? true : false);

      if (data?.success) {
        fetchData(); // refresh data
      }

      // clear message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.log(err);
      setMessage(err.message ?? "Server failed");
      setShowForm(true);
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
  return <Loader loading={loading} />;
}


  return (
    <div>
      <h1 className="font-bold text-5xl flex justify-center items center mt-5">
        {" "}
        Place Order For Customers{" "}
      </h1>
      <div className="relative">
        <input
          type="text"
          placeholder="search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="outline-none border  rounded-2xl mt-3 p-2 ml-5"
        />
        <BsSearch className="absolute left-47 top-6" />
      </div>
      <div className="flex justify-center items-center flex-wrap m-5 gap-12 border rounded-lg px-5 py-5 pt-15 max-h-[500px] overflow-y-auto">
        {currentItems
          .map((item) => (
            <div
              key={item._id || item.id}
              className="flex flex-col p-4 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg duration-400 gap-2 w-60 bg-gray-500"
            >
              <div className="flex gap-2">
                <span className="font-bold">Name:</span>
                <span>{Capitalise(item?.name)}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold">Category:</span>
                <span>{Capitalise(item?.category)}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold">Current Stock:</span>
                <span>{item?.currentStock}</span>
              </div>
              <div className="flex justify-end">
                <button
                  className="flex justify-center items center p-2 bg-blue-500 border rounded-lg w-30"
                  onClick={() => {
                    setShowForm(true);
                    setFormData({
                      productName: item?.name,
                      category: item?.category.toLowerCase(),
                      quantity: item?.currentStock,
                    });
                  }}
                >
                  Create Order
                </button>
              </div>
            </div>
          ))}
        {showForm && (
          <form
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                 bg-white border border-gray-300 rounded-xl shadow-lg p-6 w-full max-w-md z-10"
            onSubmit={handleSubmit}
          >
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold text-xl"
            >
              ×
            </button>

            <h1 className="text-2xl font-bold text-center mb-4">
              Create Order
            </h1>

            <div className="flex flex-col mb-2">
              <label className="font-semibold mb-1">Product Name</label>
              <select
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 "
              >
                <option> Select Category </option>
                {productNames.map((cat, index) => (
                  <option key={index} value={cat}>
                    {" "}
                    {Capitalise(cat)}{" "}
                  </option>
                ))}
              </select>
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

            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors mt-2 w-full"
            >
              Submit
            </button>
            {message && (
              <p className="text-sm text-center bg-blue-200 border rounded-lg p-2">
                {message}
              </p>
            )}
          </form>
        )}
      </div>
      <div className="flex justify-center items-center z-20 mt-10 ml-[35px]">
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 border rounded ${
                page === currentPage ? "bg-blue-600 text-white" : ""
              }`}
            >
              {page}
            </button>
          ))}

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
  );
}

export default Order;
