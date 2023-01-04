import React, { useState, useEffect } from "react";
import {
  collection,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { db } from "../../utils/firebase";
import Tag from "../../components/sidebar/Tags";
import Categories from "../../components/sidebar/Categories";
import PopularPosts from "../../components/sidebar/popular-posts";
import PostTags from "../../components/PostTags";
import Moment from "moment";
import Tags from "../../components/sidebar/Tags";
import Comments from "../../components/comment/Comments";

const DisplayPost = ({user}) => {
  const { id } = useParams();
  const [blog, setBlog] = useState([]);
  const [popularBlogs, setPopularBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [commentCounter, setCommentCounter] = useState(0);

  // get Single Post
  useEffect(() => {
    const docRef = collection(db, "blogs");
    const q = query(docRef, where("slugUrl", "==", id));
    onSnapshot(q, (snapshot) => {
      snapshot.forEach((doc) => {
        setBlog({ ...doc.data(), postId: doc.id });
      });
    });
  }, [id]);

  // get Tags and Categories posts
  useEffect(() => {
    const getData = async () => {
      const data = await query(collection(db, "blogs"));
      onSnapshot(data, (querySnapshot) => {
        const tags = [];
        const category2 = [];
        querySnapshot.forEach((doc) => {
          tags.push(...doc.get("tags"));
          category2.push(doc.data()["category"]);
        });
        
        // remove duplicate tags from lists if have
        const uniqueTags = [...new Set(tags)];
        const uniqueCategories = [...new Set(category2)];
        setTags(uniqueTags);
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
      docSnapshot.forEach((doc) => {
        databaseInfo.push({ postId: doc.id, ...doc.data() });
      });
      setPopularBlogs(databaseInfo);
    };

    popularBlogs();
  }, []);

  return (
    <>
      <section className="wpo-blog-single-section section-padding">
        <div className="container">
          <div className="row">
            <div className="col col-lg-8 col-12">
              <div className="wpo-blog-content">
                <div className="post format-standard-image">
                  <div className="entry-media">
                    <img src={blog.imgUrl} alt="a" />
                  </div>
                  <div className="entry-meta">
                    <ul>
                      <li>
                        <i className="fi flaticon-user"></i> By {blog?.author}
                      </li>
                      <li>
                        <i className="fi flaticon-comment-white-oval-bubble"></i>{" "}
                        Comments {commentCounter}
                      </li>
                      <li>
                        <i className="fi flaticon-calendar"></i>
                        {/* {blog.timestamp.toDate().toDateString()} */}
                        
                        30 Dec, 2022
                      </li>
                    </ul>
                  </div>
                  
                  <h2>{blog?.title}</h2>
                  <p>{blog?.description}</p>
                </div>

                <div className="tag-share clearfix">
                  <div className="tag">
                    <span>Share: </span>
                    {/* <PostTags tag2={blog.tags}/> */}
                    {blog.category}
                  </div>
                </div>

               <Comments postId={blog.postId} slugUrl={blog.slugUrl} setCommentCounter={setCommentCounter} user={user}/>
              </div>
            </div>
            <div className="col col-lg-4 col-12">
              <div className="blog-sidebar">
                <div className="widget search-widget">
                  <form>
                    <div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search Post.."
                      />
                    </div>
                  </form>
                </div>
                <div className="widget category-widget">
                  <h3>Categories</h3>
                  <ul>
                    {categories.map((category, index) => {
                      return <Categories category={category} key={index} />;
                    })}
                  </ul>
                </div>
                <PopularPosts popularBlogs={popularBlogs} />
                <Tag tags={tags} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DisplayPost;
