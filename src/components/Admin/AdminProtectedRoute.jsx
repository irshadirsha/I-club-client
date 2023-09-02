import React from 'react'
import { Navigate } from 'react-router-dom'
function AdminProtectedRoute({children}) {
  
    const admin = JSON.parse(localStorage.getItem("admin"))?.admin || false;
    console.log("in private route admin ",admin);
    return   admin ? children : Navigate({to:'/adminlogin'});
    
}

export default AdminProtectedRoute






