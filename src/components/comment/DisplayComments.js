import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import slugify from "react-slugify";
import { toast } from "react-toastify";
import { db } from "../../utils/firebase";

const defaultFormFields = {
  name: "",
  email: "",
  reply: "",
};
const DisplayComments = ({ comment, postId, slugUrl, user }) => {
  // console.log(comment);
  const [replyToggle, setReplyToggle] = useState(false);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, email, reply } = formFields;
  const [replies, setReplies] = useState([]);
  const navigate = useNavigate();
  const ref = useRef(null);
  //   create a reset fields
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(ref.current.value);
    if (name && email && reply) {
      try {
        await addDoc(collection(db, "replies"), {
          ...formFields,
          postId: postId.toString(),
          commentId: ref.current.value,
          timestamp: serverTimestamp(),
        });
        resetFormFields();
        toast.success("reply added successfully");
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

  // get replies
  useEffect(() => {
    const getReplies = async () => {
      if (postId) {
        const commentsRef = collection(db, "replies");
        const q = query(commentsRef, where("postId", "==", postId));
        const docSnapshot = await getDocs(q);
        const databaseInfo = [];
        docSnapshot.forEach((doc) => {
          databaseInfo.push({ ...doc.data() });
        });
        setReplies(databaseInfo);
      }
    };

    getReplies();
  }, [postId, slugUrl]);

  return (
    <>
      <li className="comment even thread-even depth-1" id="comment-1">
        <div id="div-comment-1">
          <div className="comment-theme">
            <div className="comment-image">
              <img
                src="https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png"
                alt="a"
                style={{
                  height: "80px",
                  width: "80px",
                  borderRadius: "50%",
                  border: "1px solid rgb(161, 159, 159)",
                }}
              />
            </div>
          </div>
          <div className="comment-main-area">
            <div className="comment-wrapper">
              <div className="comments-meta">
                <h4>
                  {comment.name}
                  <span className="comments-date">
                    says {comment.timestamp.toDate().toDateString()}
                  </span>
                </h4>
              </div>
              <div className="comment-area">
                <p>{comment.comment}</p>
                <div className="comments-reply">
                  <Link onClick={() => setReplyToggle(!replyToggle)}>
                    <span>Reply</span>{" "}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {replyToggle ? (
          <>
            <div className="comment-respond" style={{ marginTop: "0px" }}>
              <form onSubmit={handleSubmit} className="comment-form">
                <input
                  ref={ref}
                  type="hidden"
                  value={comment.commentId}
                  name="commentId"
                />
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
                    value={reply}
                    name="reply"
                    placeholder="Write Your reply..."
                  ></textarea>
                </div>
                <div className="form-submit">
                  <input id="submit" value="Reply Comment" type="submit" />
                </div>
              </form>
            </div>

            <ul className="children">
              {replies.map((reply, j) => {
                if (reply.commentId === comment.commentId) {
                  return (
                    <li className="comment" key={j}>
                      <div>
                        <div className="comment-theme">
                          <div className="comment-image">
                            <img
                              src="https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png"
                              alt="avator"
                              style={{
                                height: "80px",
                                width: "80px",
                                borderRadius: "50%",
                                border: "1px solid rgb(161, 159, 159)",
                              }}
                            />
                          </div>
                        </div>
                        <div className="comment-main-area">
                          <div className="comment-wrapper">
                            <div className="comments-meta">
                              <h4>
                                {reply.name}
                                <span className="comments-date">
                                  <span style={{ color: "red" }}>
                                    replied{" "}
                                    {reply.timestamp.toDate().toDateString()}
                                  </span>
                                </span>
                              </h4>
                            </div>
                            <div className="comment-area">
                              <p>{reply.reply}</p>
                              <div className="comments-reply">
                                <a className="comment-reply-link" href="#">
                                  <span>Reply</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                }
              })}
            </ul>
          </>
        ) : (
          ""
        )}
      </li>
    </>
  );
};

export default DisplayComments;
