// import React from 'react'
// import { useSelector } from 'react-redux';
// import { useLocation, Navigate, Outlet } from 'react-router-dom';
// import { selectCurrentUser } from '../features/authSlice';

// export default function requireAuth() {
//     const auth = useSelector(state => state.auth)
//     const location = useLocation();
//     console.log(auth);
//     return (
//         auth ?
//             < Outlet />
//             : <Navigate to="/login" state={{ from: location }} replace />
//     );
// }
