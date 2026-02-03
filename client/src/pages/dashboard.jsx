import { useState, useEffect } from "react";

const baseURL = import.meta.env.VITE_BASE_URL;

function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async (req, res) => {
      try {
        const response = await fetch(
          `${baseURL}/api/inventory/getCriticalInventoryAlerts`,
        );
        const data = await response.json();   //parse the response
        setData(data.data)
      } catch (err) {
        console.log(err);
        setData([]);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="flex justify-center items-center font-bold text-3xl m-4">
        Notifications
      </h1>
      <div className="border rounded-lg w-1/2 ml-120 flex flex-col">
        {data.length === 0 ? ( <div className="flex justify-center items-center"> No Critical products </div> ) : (
        data.map((item) =>(
                <div className="text-xl bg-green-200 border rounded-lg gap-2 border-rounded-lg m-2 p-2"> {`${item.name} is running low. Current stock: ${item?.currentStock}. Please consider placing an order soon.`}</div>
        )))}
      </div>
    </div>
  );
}

export default Dashboard;
