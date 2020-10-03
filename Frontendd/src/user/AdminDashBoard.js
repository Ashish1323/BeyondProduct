import React from 'react'
import Base from "../core/Base"
import {isAuthenticated} from "../auth/helper"
import {Link} from "react-router-dom"

// const {user: {name,email,role}} = isAuthenticated()


const adminLeftSide = () =>{
    return(
        <div className="card">
            <h4 className="card-header bg-dark text-white"> Admin Navigation</h4>
            <ul className="list-group">
                <li className="list-group-item">
                    <Link to="/admin/create/category" className=" text-danger nav-link ">Create Categories</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/admin/create/product" className=" text-danger nav-link ">Create Products</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/admin/products" className=" text-danger nav-link ">Manage Products</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/admin/orders" className=" text-danger nav-link ">Manage Orders</Link>
                </li>
            </ul>
        </div>
    )
}

const adminRightSide = () =>{
    return(
        <div className="card mb-4">
           <h4 className="text-dark card-header"> Admin Information</h4>
            <ul className="list-group">
                    <li className="list-group-item text-dark">
                        <span className="badge badge-success mr-2"> Name:</span> {isAuthenticated().user.name}
                    </li>
                    <li className="list-group-item text-dark">
                        <span className="badge badge-success mr-2"> Email:</span> {isAuthenticated().user.email}
                    </li>
                    <li className="list-group-item text-dark">
                        <span className="badge badge-danger">Admin Info</span> 
                    </li>
            </ul>    
        </div> 
    )
}

const AdminDashBoard=()=> {
    return (
        <Base title="Welcome To Admin Section" description="Please make your changes for product here!!">
           <div className="container bg-success p-4">
            <div className="row">
                <div className="col-lg-3">
                        {adminLeftSide()}
                </div>
                <div className="col-lg-9">
                        {adminRightSide()}
                </div>
            </div> 
           </div>
        </Base>
    )
}
export default AdminDashBoard;