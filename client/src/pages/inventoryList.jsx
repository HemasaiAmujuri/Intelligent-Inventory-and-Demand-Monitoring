import { useState, useEffect } from "react";

const baseURL = import.meta.env.VITE_BASE_URL;

function InventoryList() {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    currentStock: "",
    reOrderPoint: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${baseURL}/api/inventory/inventoryList`
        );
        const result = await response.json();
        setData(result.data || []);
      } catch (error) {
        console.error(error);
        setData([]);
      }
    };

    fetchData();
  }, []);


  const handleChange = ((e) => {
    setFormData({ ...formData, [e.target.name] : e.target.value});
  });


  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response = await fetch(`${baseURL}/api/inventory/addInventory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    }catch(err){
      console.log(err);
    }

  };

  return (
   <div className="flex-col justify-between items-center mb-8">

    <div className="flex items-center justify-between mt-10 mb-5 ml-150">
  <h1 className="text-5xl font-bold">
    Inventory List
  </h1>

  <button
    onClick={() => setShowForm(true)}
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-50"
  >
    + Add Inventory
  </button>
</div>


      <div className="flex justify-center items-center">
      <table className="border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Current Stock</th>
            <th className="border px-4 py-2">Reorder Point</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="text-center">
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.category}</td>
              <td className="border px-4 py-2">{item.currentStock}</td>
              <td className="border px-4 py-2">{item.reOrderPoint}</td>
              <td className="border px-4 py-2 font semi-bold">
                 {item.currentStock === 0 ? (<span className="text-red-500">Out of Stock</span>) : item.currentStock < item.reOrderPoint ? (<span className="text-yellow-500">Low</span>) : (<span className="text-green-500">Healthy</span>)}</td>
              </tr>
            ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default InventoryList;
