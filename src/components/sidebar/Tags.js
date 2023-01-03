import React from "react";
import { Link } from "react-router-dom";
import slugify from "react-slugify";
const Tags = ({ tags }) => {
  return (
    <div className="widget tag-widget">
      <h3>Tags</h3>
      <ul style={{ testAlign:"justify" }}>
        {tags.map((tag, i) => {
          return (
            <div key={i}>
            <li>
              <Link to={`/tags/${slugify(tag)}`}>{slugify(tag)}</Link>
            </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Tags;
