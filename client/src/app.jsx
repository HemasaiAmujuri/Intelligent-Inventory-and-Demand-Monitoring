import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InventoryList from "./pages/inventoryList";
import Register from "./pages/register";
import Login from "./pages/login";
import Header from "./components/header";
import Layout from "./components/layout";
import Dashboard from "./pages/dashboard"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout />}>
          <Route path="/inventoryList" element={<InventoryList />} />
          <Route path="/dashboard" element={ <Dashboard />}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
