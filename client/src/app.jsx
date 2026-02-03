import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import InventoryList from './pages/inventoryList'
import Register from './pages/register';
import Login from'./pages/login'


function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={ <Login />} />
            <Route path="/login" element={ <Login />} />
            <Route path="/register" element={ <Register />} />
            <Route path = "/inventoryList" element={ <InventoryList />}/>
        </Routes>

    </Router>
  );
}

export default App;
