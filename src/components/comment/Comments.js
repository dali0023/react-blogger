import React, { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  getDocs,
  limit,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useNavigate, useParams } from "react-router-dom";
import slugify from "react-slugify";
import { toast } from "react-toastify";
import DisplayComments from "./DisplayComments";

const defaultFormFields = {
  name: "",
  email: "",
  comment: "",
};

const Comments = ({ postId, slugUrl, setCommentCounter, user }) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, email, comment } = formFields;
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  //   create a reset fields
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formFields);
    if (name && email && comment) {
      // console.log(formFields);
      try {
        await addDoc(collection(db, "comments"), {
          ...formFields,
          postId: postId.toString(),
          timestamp: serverTimestamp(),
        });

        resetFormFields();
        toast.success("Comment added successfully");
      } catch (err) {
        console.log(err);
      }
    }

    navigate(`/posts/${slugUrl}`);
  };

  // Create a function for working with fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (user) {
      setFormFields({
        ...formFields,
        name: user.displayName,
        email: user.email,
        [name]: value,
      });
    } else {
      setFormFields({ ...formFields, [name]: value });
    }
  };

  // get comments
  useEffect(() => {
    const getComments = async () => {
      if (postId) {
        const commentsRef = collection(db, "comments");
        const q = query(commentsRef, where("postId", "==", postId));
        const docSnapshot = await getDocs(q);
        const databaseInfo = [];
        docSnapshot.forEach((doc, i) => {
          databaseInfo.push({ commentId: doc.id, ...doc.data() });
        });
        setComments(databaseInfo);
        setCommentCounter(databaseInfo.length);
      }
    };

    getComments();
  }, [postId, slugUrl]);

  return (
    <div className="comments-area">
      <div className="comments-section">
        <h3 className="comments-title">{comments.length} Comments</h3>
        <ol className="comments">
          {comments.map((comment, i) => (
            <DisplayComments
              comment={comment}
              key={i}
              postId={postId}
              slugUrl={slugUrl}
              user={user}
            />
          ))}
        </ol>
      </div>

      <div className="comment-respond">
        <h3 className="comment-reply-title">Leave a reply</h3>
        <form onSubmit={handleSubmit} className="comment-form">
          {user.id ? (
            <>
              <div className="form-inputs">
                <input
                  required
                  onChange={handleChange}
                  name="name"
                  value={name}
                  placeholder="Name"
                  type="text"
                />
                <input
                  required
                  onChange={handleChange}
                  name="email"
                  value={email}
                  placeholder="Email"
                  type="email"
                />
              </div>
            </>
          ) : (
            ""
          )}

          <div className="form-textarea">
            <textarea
              required
              onChange={handleChange}
              value={comment}
              id="comment"
              name="comment"
              placeholder="Write Your Comments..."
            ></textarea>
          </div>
          <div className="form-submit">
            <input id="submit" value="Post Comment" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Comments;
