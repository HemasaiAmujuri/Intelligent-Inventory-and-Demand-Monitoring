import { useState, useEffect } from "react";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";

const baseURL = import.meta.env.VITE_BASE_URL;

function InventoryList() {
  const [data, setData] = useState([]);

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "currentStock",
      header: "Current Stock",
    },
    {
      accessorKey: "reOrderPoint",
      header: "Re-Order Point",
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${baseURL}/api/inventory/inventoryList`
        );
        const result = await response.json();
        setData(result.data);
        console.log(result.data);
      } catch (error) {
        console.error(error);
        setData([]);
      }
    };

    fetchData();
  }, []);



return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-20">
    <h1> Inventory Products </h1>
    <table className="table-auto border-collapse border border-gray-300 shadow-md bg-white rounded-lg overflow-hidden">
      <thead className="bg-gray-200">
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th
                key={header.id}
                className="px-4 py-2 text-left text-gray-700 font-semibold uppercase text-sm border-b border-gray-300"
              >
                {header.isPlaceholder
                  ? null
                  : header.column.columnDef.header}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr
            key={row.id}
            className="hover:bg-gray-100 transition-colors duration-200"
          >
            {row.getVisibleCells().map(cell => (
              <td
                key={cell.id}
                className="px-4 py-2 text-gray-800 border-b border-gray-200"
              >
                {cell.getValue()}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);}

export default InventoryList;
