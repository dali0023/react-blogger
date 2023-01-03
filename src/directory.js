import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/partials/Footer";
import Header from "./components/partials/header/Header";
import NotFound from "./components/partials/NotFound";
import MakeAdmin from "./pages/admin/make-admin";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Home from "./pages/home/Home";
import AddPost from "./pages/posts/add-post";
import DisplayPost from "./pages/posts/display-post";
import Posts from "./pages/posts/Posts";

const Directory = ({user, handleSignout,setUser}) => {
  return (
    <>
      <div className="page-wrapper">
        <Header user={user} handleSignout={handleSignout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts">
            <Route index element={<Posts />} />
            <Route path=":id" element={<DisplayPost />} />
            <Route
              path=":add-post"
              element={
                user?.uid ? <AddPost user={user} /> : <Navigate to="/" />
              }
            />
            {/* <Route path="edit/:id" element={user?.uid  ? <EditPost user={user} /> : <Navigate to="/" />}/> */}
          </Route>
          <Route path="posts/:id" element={<DisplayPost />} />

          <Route
            path="login"
            element={user?.uid ? <Navigate to="/" /> : <SignIn />}
          />
          <Route
            path="register"
            element={
              user?.uid ? <Navigate to="/" /> : <SignUp setUser={setUser} />
            }
          />
          <Route path="/make-admin" element={<MakeAdmin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default Directory;
