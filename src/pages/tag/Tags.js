import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  collection,
  query,
  onSnapshot,
  where,
  limit,
  getDocs,
} from "firebase/firestore";
import { db } from "../../utils/firebase";
const Tags = () => {
  const [blogs, setBlogs] = useState([]);
  const { id } = useParams();
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);

  // get all posts
  useEffect(() => {
    const sponsoredBlogs = async () => {
      const blogRef = collection(db, "blogs");
      const q = query(blogRef, where('tags', 'array-contains', id[0].toUpperCase() + id.substr(1).toLowerCase()));
      const docSnapshot = await getDocs(q);
      const databaseInfo = [];
      docSnapshot.forEach((doc) => {
        databaseInfo.push({ postId: doc.id, ...doc.data() });
      });
      setBlogs(databaseInfo);
    };

    sponsoredBlogs();
  }, []);

  return (
    <>
      <div className="wpo-breadcumb-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="wpo-breadcumb-wrap">
                <h2>{id}</h2>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <span>Blog</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="wpo-blog-pg-section section-padding">
        <div className="container">
          <div className="row">
            <div className="col col-lg-10 offset-lg-1">
              <div className="wpo-blog-content">
                {blogs.length === 0 ? (
                  <>
                    <h1 className="text-danger text-center">No Data Found</h1>
                  </>
                ) : (
                  <>
                    {blogs.map((blog, i) => {
                      return (
                        <div className="post format-standard-image" key={i}>
                          <div className="entry-media">
                            <img src={blog.imgUrl} alt="" />
                          </div>
                          <div className="entry-meta">
                            <ul>
                              <li>
                                <i className="fi flaticon-user"></i> By{" "}
                                <a href="#">{blog.author}</a>{" "}
                              </li>
                              <li>
                                <i className="fi flaticon-comment-white-oval-bubble"></i>{" "}
                                {blog.category}
                              </li>
                              <li>
                                <i className="fi flaticon-calendar"></i>{" "}
                                {blog.timestamp.toDate().toDateString()}
                              </li>
                            </ul>
                          </div>
                          <div className="entry-details">
                            <h3>
                              <Link to={`/posts/${blog.slugUrl}`}>
                                {blog.title}
                              </Link>
                            </h3>
                            <p className="text-justify">{`${blog.description.substring(
                              0,
                              300
                            )}`}</p>
                            <Link className="read-more" to={`${blog.slugUrl}`}>
                              {" "}
                              READ MORE...
                            </Link>
                          </div>
                        </div>
                      );
                    })}

                    {/* <div className="pagination-wrapper pagination-wrapper-left">
                      <ul className="pg-pagination">
                        <li>
                          <a href="#" aria-label="Previous">
                            <i className="fi ti-angle-left"></i>
                          </a>
                        </li>
                        <li className="active">
                          <a href="#">1</a>
                        </li>
                        <li>
                          <a href="#">2</a>
                        </li>
                        <li>
                          <a href="#">3</a>
                        </li>
                        <li>
                          <a href="#" aria-label="Next">
                            <i className="fi ti-angle-right"></i>
                          </a>
                        </li>
                      </ul>
                    </div> */}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Tags;
