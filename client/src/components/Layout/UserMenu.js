import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
    return (
        <>
            <div className="list-group text-center">
              <h4>DASHBOARD</h4>
                <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action">Profile</NavLink>
                <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action">Orders</NavLink>
            </div>
        </>
    )
}

export default UserMenu
