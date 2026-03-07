import { createRoot } from 'react-dom/client'
import App from './app.jsx'
import { AuthProvider } from './context/useContext.jsx'


createRoot(document.getElementById('root')).render(
    <AuthProvider>
      <App />
    </AuthProvider>
    
)
