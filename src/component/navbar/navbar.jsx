import React from 'react'
import './navbar.css'
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useLogoutMutation } from '../../services/auth/authAPI';

export default function navbar() {
    const [logout] = useLogoutMutation()
    const navigate = useNavigate()
    const { user } = useSelector(state => state.auth);
    console.log(user?.isAuthenticated);
    return (
        <>
            <header>
                <div className="container">
                    <div className="logo">
                        {/* <img src="images/logo.png" alt="Archidni"> */}
                        <span>myLogo</span>
                    </div>
                    <ul className="nav-bar">
                        <li><Link href="">Home</Link></li>
                        <li><Link href="">Services</Link></li>
                        <li><Link href="">News</Link></li>
                        <li><Link href="">Contact Us</Link></li>
                        <li><Link href="">About Us</Link></li>
                        {!user?.isAuthenticated && <li><Link to="/login" className="login">Log in</Link></li>}
                    </ul>
                    {user?.isAuthenticated && <Link onClick={() => { logout() }} to="/" className="button active">logout</Link>}
                </div>
            </header>
        </>
    )
}
