import React from "react";
import { Link } from "react-router-dom";

const Highlights = ({ blog }) => {
  // const {} = blog
  return (
    <>
      <div className="col col-lg-6 col-md-6 col-12">
        <div className="wpo-blog-item" >
          <div className="wpo-blog-img">
            <img
              src={blog.imgUrl}
              style={{ height: "250px" }}
              alt={blog.title}
            />
            <div className="thumb">{blog?.category}</div>
          </div>
          <div className="wpo-blog-content">
            <h2>
              <Link to={`/posts/${blog.slugUrl}`}>{blog?.title}</Link>
            </h2>
            <ul>
              <li>
                <img
                  src="https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png"
                  alt={blog?.author}
                  style={{
                    height: "30px",
                    width: "30px",
                    borderRadius: "50%",
                    border: "1px solid rgb(161, 159, 159)",
                  }}
                />
              </li>
              <li>
                By <a href="blog-single.html">{blog?.author}</a>
              </li>
              <li>{blog.timestamp.toDate().toDateString()}</li>
            </ul>
            <p>
            {`${blog.description.substring(0, 100)}`}<Link  to={`${blog.slugUrl}`}> More...</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Highlights;
