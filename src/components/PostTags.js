import React from "react";

const PostTags = ({ tags2 }) => {
  tags2.map((tag, i) => {
    return <span key={i}>{tag}</span>;
  });
};

export default PostTags;
