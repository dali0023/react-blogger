import React from "react";
import { Link } from "react-router-dom";

const SponsoredNews = ({sponsoredBlog}) => {
  return (
    <>
      <div className="col col-xl-3 col-lg-6 col-md-6 col-12">
        <div className="wpo-blog-item">
          <div className="wpo-blog-img">
            <img  src={sponsoredBlog?.imgUrl}
              style={{ height: "200px" }}
              alt={sponsoredBlog?.title}/>
            <div className="thumb">{sponsoredBlog?.category}</div>
          </div>
          <div className="wpo-blog-content">
            <h2>
              <Link to="#">
              {`${sponsoredBlog?.title.substring(0, 50)}`}
                {sponsoredBlog?.title.length < 100 ? "..." : ""}
              </Link>
            </h2>
            <ul>
              <li>
                <img src="https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png"
                  alt={sponsoredBlog?.author}
                  style={{
                    height: "30px",
                    width: "30px",
                    borderRadius: "50%",
                    border: "1px solid rgb(161, 159, 159)",
                  }} />
              </li>
              <li>
                By <Link to="#">{sponsoredBlog?.author}</Link>
              </li>
              <li>{sponsoredBlog?.timestamp.toDate().toDateString()}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SponsoredNews;
