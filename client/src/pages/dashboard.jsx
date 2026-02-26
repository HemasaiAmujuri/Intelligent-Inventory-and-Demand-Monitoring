import { useState, useEffect } from "react";
import Loader from "../components/loader";
import useAuth from "../context/useContext"

const baseURL = import.meta.env.VITE_BASE_URL;

function Dashboard() {
  const { accessToken, setAccessToken } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   // api integration
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await fetch(
  //         `${baseURL}/api/inventory/getCriticalInventoryAlerts`,
  //         {
  //           headers : {
  //             "Content-Type" : "application/json",
  //             "Authorization": `Bearer ${accessToken}`
  //           }
  //         }
  //       );
  //       const data = await response.json(); //parse the response
  //       setData(data.data || []);
  //     } catch (err) {
  //        if (err?.status === 401){
  //         try{
  //         const response = await fetch(`${baseURL}/api/user/refreshToken`)

  //         const data = await response.json();

  //         setAccessToken(data?.accessToken);
  //        }
  //       catch(err){
  //           console.log(err)
  //       }}
  //       console.log(err);
  //       setData([]);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []); // load api eveny mounting

   useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const callApi = async (token) => {
        return fetch(`${baseURL}/api/inventory/getCriticalInventoryAlerts`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          credentials: "include", // needed for refresh token cookie
        });
      };

      try {
        let response = await callApi(accessToken);

        if (response.status === 401) {
          // Access token expired, call refresh token API
          const refreshResponse = await fetch(`${baseURL}/api/user/refreshToken`, {
            method: "POST",
            credentials: "include", // send refresh token cookie
          });

          if (!refreshResponse.ok) throw new Error("Refresh token failed");

          const refreshData = await refreshResponse.json();
          const newAccessToken = refreshData.accessToken;

          // Update access token in context
          setAccessToken(newAccessToken);

          // Retry original API with new access token
          response = await callApi(newAccessToken);
        }

        const result = await response.json();
        setData(result.data || []);
      } catch (err) {
        console.error(err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) fetchData();
  }, [accessToken, baseURL, setAccessToken]);

  if (loading) {
    return <Loader loading={loading} />;
  }

  return (
    <div className="bg-gray-50 mb-10">
      <h1 className="text-center font-bold text-3xl mb-6 mt-6 text-gray-800">
        Notifications
      </h1>

      <div className="max-w-2xl mx-auto bg-white border rounded-xl shadow-md p-4">
        {data.length === 0 ? (
          <div className="flex justify-center items-center text-gray-500 py-10">
            🎉 No critical products
          </div>
        ) : (
          <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto">
            {data.map((item) => {
              // check isOutOfStock or not
              const isOutOfStock = item.currentStock === 0;

              return (
                <div
                  key={item._id || item.id}
                  className={`flex items-start gap-4 p-4 rounded-lg border ${
                    isOutOfStock
                      ? "bg-red-100 border-red-500"
                      : "bg-yellow-100 border-yellow-500"
                  }`}
                >
                  <span className="text-2xl">{isOutOfStock ? "🚨" : "⚠️"}</span>

                  <div>
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {isOutOfStock
                        ? "Out of stock. Please reorder immediately."
                        : `Running low. Current stock: ${item.currentStock}. Please plan a reorder soon to avoid stockout`}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
