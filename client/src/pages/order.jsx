import { useState, useEffect } from "react";

const baseUrl = import.meta.env.VITE_BASE_URL;

function Order() {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
      name : "",
      category : "",
      quantity : ""
  });


   const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };    

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${baseUrl}/api/inventory/inventoryList`);
      const data = await response.json(); // parse the response
      setData(data.data);
    };

    fetchData();
  }, []);

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


  function Capitalise(word){
    if(!word){
        return ""
    }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  return (
  <div className="flex justify-center items-center flex-wrap m-8 mt-15 gap-12 border rounded-lg px-5 py-5 pt-15 max-h-[500px] overflow-y-auto">
    {data
      .filter(item => item.currentStock > 0)
      .map((item, index) => (
        <div
          key={index}
          className="flex flex-col p-4 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow duration-400 gap-2 w-55 bg-gray-500"
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
             <button className="flex justify-center items center p-2 bg-blue-500 border rounded-lg w-30" 
              onClick={() => setShowForm(true)}>
                Create Order
          </button>
            </div>
        </div>
      ))}
       {showForm && (
          <form
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                 bg-white border border-gray-300 rounded-xl shadow-lg p-6 w-full max-w-md z-10"
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
              <input
                type="text"
                name="name"
                value={formData.name}
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

            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors mt-2 w-full"
            >
              Submit
            </button>
          </form>
        )}
  </div>
);
}

export default Order;
