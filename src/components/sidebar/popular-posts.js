import React from "react";
import { Link } from "react-router-dom";

const PopularPosts = ({ popularBlogs }) => {
  return (
    <>
      <div className="widget recent-post-widget">
        <h3>Popular Post</h3>
        <div className="posts">
          {popularBlogs.map((popularBlog, i) => {
            return (
              <div className="post" key={popularBlog.slugUrl}>
                <div className="img-holder">
                  <img
                    src={popularBlog?.imgUrl}
                    alt={popularBlog?.title}
                    style={{ height: "80px", width: "80px" }}
                  />
                </div>
                <div className="details">
                  <span className="date">{popularBlog?.timestamp.toDate().toDateString()} </span>
                  <h4 style={{ fontSize:"17px" }}>
                    <Link to={`/posts/${popularBlog?.slugUrl}`}>
                     {popularBlog?.title.substring(0, 40)}...
                    </Link>
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PopularPosts;
