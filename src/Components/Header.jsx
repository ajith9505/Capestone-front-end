import React from 'react'
import { useUserContext } from './UserContext/UserContext'
import { useNavigate } from 'react-router-dom'

function Header() {
    const { logout, decodedToken } = useUserContext();
    const navigateTo = useNavigate();
    

    const handleLogout = () => {
        logout();
        navigateTo('/login');
    }

    const name = decodedToken.user.name;

    return (
        <header className='bg-success-subtle d-flex'>
            <div className='text-center p-4 h1 flex-grow-1 ps-6'>Pettycash manager</div>
            <div className='p-4'>
            <div className='text-center h4'>Hi! {name}</div>
            <button className='h-5 float-sm-end' onClick={handleLogout}>Logout</button>
            </div>
        </header>
    )
}

export default Header