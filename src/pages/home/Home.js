import React, { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  query,
  orderBy,
  where,
  startAfter,
} from "firebase/firestore";
import { db } from "../../utils/firebase";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Highlights from "../posts/Highlights";
import SponsoredNews from "../posts/sponsored-news";
import Categories from "../../components/sidebar/Categories";
import PopularPosts from "../../components/sidebar/popular-posts";
import Tags from "../../components/sidebar/Tags";
import { getDatabase, ref, push, set } from "firebase/database";
const Home = ({ user }) => {
  const [blogs, setBlogs] = useState([]);
  const [sponsoredBlogs, setSponsoredBlogs] = useState([]);
  const [mainBlog, setMainBlog] = useState([]);
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
  // get Sponsered posts
  useEffect(() => {
    const sponsoredBlogs = async () => {
      const blogRef = collection(db, "blogs");
      const q = query(
        blogRef,
        where("category", "==", "sponsored"),
        limit(4)
      );
      const docSnapshot = await getDocs(q);
      const databaseInfo = [];
      docSnapshot.forEach((doc) => {
        databaseInfo.push({ postId: doc.id, ...doc.data() });
      });
      setSponsoredBlogs(databaseInfo);
    };

    sponsoredBlogs();
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
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <section className="wpo-hero-slider">
              <div className="swiper-container">
                <div className="swiper-wrapper">
                  {popularBlogs.map((popularPost, j) => {
                    if (j === 1) {
                      return (
                        <div className="swiper-slide" key={j}>
                          <div
                            style={{
                              backgroundImage:`url(${popularPost.imgUrl})`
                            }}
                            className="slide-inner slide-bg-image"
                          >
                            <div className="slide-content">
                              <div
                                data-swiper-parallax="300"
                                className="slide-title"
                              >
                                <h2>{popularPost.title}</h2>
                              </div>
                              <div
                                data-swiper-parallax="400"
                                className="slide-text"
                              >
                                <p>
                                {`${popularPost.description.substring(0, 150)}`}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="thumb">{popularPost.category}</div>
                        </div>
                      );
                    }
                  })}
                </div>
                <div className="swiper-pagination"></div>
              </div>
            </section>
          </div>
        </div>
        
      </div>

      {/* <!-- start wpo-blog-highlights-section --> */}
      <section className="wpo-blog-highlights-section" style={{ marginTop:"60px" }}>
        <div className="container">
          <div className="wpo-section-title">
            <h2>Today's Top Highlights</h2>
          </div>
          <div className="row">
            <div className="col col-lg-8 col-12">
              {/* <!-- start wpo-blog-section --> */}
              <div className="wpo-blog-highlights-wrap">
                <div className="wpo-blog-items">
                  <div className="row">
                    {blogs?.map((blog) => (
                      <Highlights
                        key={blog.id}
                        user={user}
                        // handleDelete={handleDelete}
                        blog={blog}
                      />
                    ))}
                  </div>
                </div>
              </div>
              {/* <!-- end wpo-blog-section --> */}
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
        {/* <!-- end container --> */}
      </section>
      {/* <!-- end wpo-blog-highlights-section --> */}
      {/* <!-- start wpo-blog-sponsored-section --> */}
      <section className="wpo-blog-sponsored-section section-padding">
        <div className="container">
          <div className="wpo-section-title">
            <h2>sponsored news</h2>
          </div>
          <div className="row">
            <div className="wpo-blog-sponsored-wrap">
              <div className="wpo-blog-items">
                <div className="row">
                  {sponsoredBlogs?.map((sponsoredBlog) => (
                    <SponsoredNews
                      key={sponsoredBlog.postId}
                      user={user}
                      // handleDelete={handleDelete}
                      sponsoredBlog={sponsoredBlog}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
