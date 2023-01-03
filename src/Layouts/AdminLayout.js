import React from "react";
import { Link, Outlet } from "react-router-dom";
import Footer from "../admin/partials/Footer";
import Header from "../admin/partials/Header";
const AdminLayout = () => {
  return (
    <>
      <div className="wrapper">
        <Header />

        <aside className="main-sidebar sidebar-dark-primary elevation-4">
          <div className="sidebar">
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
              <div className="info">
                <Link to="#" className="d-block">
                  Alexander Pierce
                </Link>
              </div>
            </div>

            <nav className="mt-2">
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                <li className="nav-item active">
                  <Link to="#" className="nav-link">
                    <i className="nav-icon fas fa-th"></i>
                    <p>Home</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="posts" className="nav-link">
                    <i className="nav-icon fas fa-table"></i>
                    <p>Posts</p>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </aside>

        <div className="content-wrapper">
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="m-0">Starter Page</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <Link to="#">Home</Link>
                    </li>
                    <li className="breadcrumb-item active">Starter Page</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="content">
            <div className="container-fluid">
              <Outlet/>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default AdminLayout;
