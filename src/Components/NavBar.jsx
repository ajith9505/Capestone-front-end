import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <div>
         <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-white shadow-sm ">
                <div className="container px-4 px-lg-5">
                    <h4 className=" navbar-toggler">
                        Blog Category
                    </h4>
                    <button
                        className="navbar-toggler "
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContents"
                        aria-controls="navbarSupportedContents"
                        aria-expanded="false"
                        aria-label="Toggle nav-igation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse justify-content-center " id="navbarSupportedContents">
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item px-3 fw-bold">
                                <Link className="nav-link " aria-current="page" to="/login">
                                    Login
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link px-3 fw-bold" to="/register">
                                    Register
                                </Link>
                            </li>
                            <li className="nav-item ">
                                <Link className="nav-link px-3 fw-bold" to="/home">
                                    Home
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <hr />
    </div>
  )
}

export default NavBar