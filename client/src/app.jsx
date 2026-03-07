import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InventoryList from "./pages/inventoryList";
import Register from "./pages/register";
import Login from "./pages/login";
import Layout from "./components/layout";
import Dashboard from "./pages/dashboard";
import Order from "./pages/order";
import ProtectedRoute from "./components/protectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout />}>            
          <Route
            path="/inventoryList"
            element={
              <ProtectedRoute>   
                {" "}
                <InventoryList />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                {" "}
                <Dashboard />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/order"
            element={
              <ProtectedRoute>
                {" "}
                <Order />{" "}
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
