import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import InventoryList from './pages/inventoryList'


function App() {
  return (
    <Router>
        <Routes>
            <Route path = "/" element={ <InventoryList />}/>
            <Route path = "/inventoryList" element={ <InventoryList />}/>

        </Routes>

    </Router>
  );
}

export default App;
