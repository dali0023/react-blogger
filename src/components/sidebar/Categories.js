import React from "react";
import { Link } from "react-router-dom";
import slugify from "react-slugify";

const Categories = ({ category }) => {
  return (
    <li>
      <Link to={`/categories/${slugify(category)}`}>
        {category}
        <span>(05)</span>
      </Link>
    </li>
  );
};

export default Categories;
