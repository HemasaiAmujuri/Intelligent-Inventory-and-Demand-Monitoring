import { Navigate } from "react-router-dom"


function ProtectedRoute({ children }){
    const token = localStorage.getItem("token");   // get token from localstorage
    if(!token){                                    // check token exist or not
        return <Navigate to="/login" replace/>
    }

    return children
}



export default ProtectedRoute;