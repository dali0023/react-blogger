import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  collection,
  query,
  onSnapshot,
  where,
  limit,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { db } from "../../utils/firebase";
import Categories from "../../components/sidebar/Categories";
import PopularPosts from "../../components/sidebar/popular-posts";
import Tags from "../../components/sidebar/Tags";
const Posts = () => {
  const [blogs, setBlogs] = useState([]);
  const { id } = useParams();
  const [popularBlogs, setPopularBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  // get all posts

  useEffect(() => {
    const getData = async () => {
      const data = await query(collection(db, "blogs"));

      onSnapshot(data, (querySnapshot) => {
        const databaseInfo = [];
        const tags = [];
        const category2 = [];
        querySnapshot.forEach((doc) => {
          tags.push(...doc.get("tags"));
          category2.push(doc.data()["category"]);
          databaseInfo.push({ id: doc.id, ...doc.data() });
        });
        // remove duplicate tags from lists if have
        const uniqueTags = [...new Set(tags)];
        const uniqueCategories = [...new Set(category2)];
        setTags(uniqueTags);
        setBlogs(databaseInfo);
        setCategories(uniqueCategories);
      });
    };
    getData();
  }, []);

  // get Popular Posts
  useEffect(() => {
    const popularBlogs = async () => {
      const blogRef = collection(db, "blogs");
      const q = query(blogRef, orderBy("views", "desc"), limit(4));
      const docSnapshot = await getDocs(q);
      const databaseInfo = [];
      docSnapshot.forEach((doc, i) => {
        databaseInfo.push({ postId: doc.id, ...doc.data() });
      });
      setPopularBlogs(databaseInfo);
    };

    popularBlogs();
  }, []);

  return (
    <>
      <section className="wpo-blog-pg-section section-padding">
        <div className="container">
          <div className="row">
            <div className="col col-lg-8">
              <div className="wpo-blog-content">
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
              </div>
            </div>

            <div className="col col-lg-4 col-12">
              <div className="blog-sidebar">
                <div className="widget category-widget">
                  <h3>Trending Topics</h3>
                  <ul>
                    {categories.map((category, index) => {
                      return <Categories category={category} key={index} />;
                    })}
                  </ul>
                </div>

                <PopularPosts popularBlogs={popularBlogs} />
                <Tags tags={tags} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Posts;
