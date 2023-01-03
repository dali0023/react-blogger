import { useEffect, useState } from "react";
import {
  Route,
  Routes,
  Link,
  redirect,
  Navigate,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/home/Home";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Header from "./components/partials/header/Header";
import Footer from "./components/partials/Footer";
import NotFound from "./components/partials/NotFound";
import Posts from "./pages/posts/Posts";

// Admin Part
import MakeAdmin from "./pages/admin/make-admin";
import Admin from "./admin/pages/Home";
import Users from "./admin/pages/users/Users";
import AdminPosts from "./admin/pages/posts/Posts";
import AdminNewPost from "./admin/pages/posts/add-new-post";
import AdminEditPost from "./admin/pages/posts/edit-post";

// Admin Part Ends

import AddPost from "./pages/posts/add-post";
import DisplayPost from "./pages/posts/display-post";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./utils/firebase";

import AdminLayout from "./Layouts/AdminLayout";
import PublicLayout from "./Layouts/PublicLayout";

// For toastify alert
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify"; // for alert
import Category from "./pages/category/Category";
import Tags from "./pages/tag/Tags";
function App() {
  const [user, setUser] = useState("");
  // const [admin, setAdmin] = useState(false);

  const handleSignout = () => {
    signOut(auth).then(() => {
      setUser("");
      // setActive("auth");
      // navigate("/login");
      return redirect("/login");
    });
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // check and set admin
        user.getIdTokenResult().then((idTokenResult) => {
          user.admin = idTokenResult.claims.admin;
        });
        setUser(user);
      } else {
        setUser("");
      }
    });
  }, []);

  // const role = "admin";
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route
          path="/"
          element={<PublicLayout user={user} handleSignout={handleSignout} />}
        >
          <Route index element={<Home user={user} />} />
          <Route path="/posts">
            <Route index element={<Posts />} />
            <Route path=":id" element={<DisplayPost />} />
            <Route
              path="add-post"
              element={
                user?.uid ? <AddPost user={user} /> : <Navigate to="/" />
              }
            />
          </Route>
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
          <Route path="/categories/:id" element={<Category />} />
          <Route path="/tags/:id" element={<Tags />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin Part */}
        <Route
          path="admin"
          element={user?.admin ? <AdminLayout /> : <Navigate to="/" />}
        >
          <Route index element={<Admin />} />
          <Route path="users" element={<Users />} />

          <Route path="posts">
            <Route index element={<AdminPosts user={user} />} />
            {/* <Route path=":id" element={<DisplayPost />} /> */}
            <Route path="add-post" element={<AdminNewPost user={user} />} />
            <Route
              path="edit-post/:id"
              element={<AdminEditPost user={user} />}
            />
          </Route>
        </Route>
      </Route>
    )
  );

  return (
    <>
      <ToastContainer position="top-center" />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
