import { collection, deleteDoc, doc, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../../utils/firebase";

const Posts = () => {
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  // get all posts
  useEffect(() => {
    const getData = async () => {
      const data = await query(collection(db, "blogs"));

      onSnapshot(data, (querySnapshot) => {
        const databaseInfo = [];
        const tags = [];
        querySnapshot.forEach((doc) => {
          tags.push(...doc.get("tags"));
          databaseInfo.push({ postId: doc.id, ...doc.data() });
        });
        // remove duplicate tags from lists if have
        const uniqueTags = [...new Set(tags)];
        setTags(uniqueTags);
        //
        setBlogs(databaseInfo);
      });
    };
    getData();
  }, []);

  // delete post
  const handleDelete = async (id) => {
    console.log("delete?");
    if (window.confirm("Are you sure wanted to delete that post?")) {
      try {
        await deleteDoc(doc(db, "blogs", id));
        toast.success("Blog deleted successfully");
      } catch (err) {
        console.log(err);
      }
    }
  };
  console.log(blogs);
  return (
    <>
      <div className="row">
        <div style={{ textAlign: "right" }}>
          <Link to="add-post" className="btn btn-primary">
            Add New Post
          </Link>
        </div>
        <div className="col-md-12">
          <div className="card card-primary card-outline">
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Author</th>
                    <th scope="col">Category</th>
                    <th scope="col">Tags</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog, i) => {
                    return (
                      <tr key={i}>
                        <th scope="row">{i+1}</th>
                        <td>{blog?.title}</td>
                        <td>
                          {`${blog?.description.substring(0, 100)}`}
                          {blog?.description.length < 100 ? "..." : ""}
                        </td>
                        <td>{blog?.author}</td>
                        <td>
                          <span className="badge badge-primary">
                            {blog?.category}
                          </span>
                        </td>

                        <td>
                          {blog.tags.map((tag, j) => {
                            return (
                              <span key={j}
                                className="badge badge-warning"
                                style={{ marginRight: "5px" }}
                              >
                                {tag}
                              </span>
                            );
                          })}
                        </td>
                        <td style={{ display: "flex" }}>
                          <Link className="btn btn-primary btn-sm mr-1">
                            <i className="fa fa-eye" aria-hidden="true"></i>
                          </Link>
                          <Link to={`edit-post/${blog.slugUrl}`} className="btn btn-primary btn-sm mr-1">
                            <i className="fa fa-pencil-square" aria-hidden="true">
                              Edit
                            </i>
                          </Link>
                          <button onClick={() => handleDelete(blog.postId)} className="btn btn-primary btn-sm">
                            <i className="fa fa-trash" aria-hidden="true"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Posts;
