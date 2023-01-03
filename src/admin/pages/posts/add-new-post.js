import React, { useState, useEffect } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { db, storage } from "../../../utils/firebase";
import { useNavigate, useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import slugify from "react-slugify"; // npm i react-slugify
import { toast } from "react-toastify";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const defaultFormFields = {
  title: "",
  tags: [],
  trending: "no",
  category: "",
  description: "",
  comments: [],
  likes: [],
  views: 0,
};

const categoryOption = [
  "fashion",
  "technology",
  "food",
  "politics",
  "sports",
  "business",
  "sponsored",
];
const AdminNewPost = ({ user }) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { title, tags, category, trending, description } = formFields;
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  //   create a reset fields
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formFields);
    if (category && tags && title && description && trending) {
      try {
        console.log("before");
        await addDoc(collection(db, "blogs"), {
          ...formFields,
          timestamp: serverTimestamp(),
          author: user.displayName,
          userId: user.uid,
          slugUrl: slugify(title),
        });
        console.log("Done");
        toast.success("Blog created successfully");
      } catch (err) {
        console.log(err);
      }
    }

    navigate("/admin/posts");
  };

  // Create a function for working with fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleTags = (tags) => {
    setFormFields({ ...formFields, tags });
  };

  // Upload image to firebase storage, we need to goto firebase then storage and change rule true
  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            toast.info("Image upload to firebase successfully");
            setFormFields((prev) => ({ ...prev, imgUrl: downloadUrl }));
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  return (
    <>
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Add New Post</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="card-body">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    required
                    onChange={handleChange}
                    name="title"
                    value={title}
                    placeholder="Title"
                  />
                </div>
                <div className="form-group">
                  <div className="mb-3">
                    <ReactTagInput
                      tags={tags}
                      placeholder="Tags"
                      onChange={handleTags}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-check-inline mx-2">
                    <span className="trending">Is it trending blog?</span>{" "}
                    <input
                      type="radio"
                      className="form-check-input"
                      value="yes"
                      name="trending"
                      checked={trending === "yes"}
                      onChange={handleChange}
                    />
                    <label htmlFor="trending" className="form-check-label">
                      &nbsp; Yes &nbsp;
                    </label>
                    <input
                      type="radio"
                      className="form-check-input"
                      value="no"
                      name="trending"
                      checked={trending === "no"}
                      onChange={handleChange}
                    />
                    <label htmlFor="trending" className="form-check-label">
                      &nbsp; No &nbsp;
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <select
                    name="category"
                    value={category}
                    onChange={handleChange}
                    className="catg-dropdown form-control"
                  >
                    <option>Please select category</option>
                    {categoryOption.map((option, index) => (
                      <option value={option || ""} key={index}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control description-box"
                    placeholder="Description"
                    value={description}
                    name="description"
                    onChange={handleChange}
                    style={{ height: "150px" }}
                  />
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>
                </div>
              </div>

              <div className="card-footer">
                <button
                  type="submit"
                  disabled={progress !== null && progress < 100}
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminNewPost;
