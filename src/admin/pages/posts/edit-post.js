import React, { useState, useEffect } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { db, storage } from "../../../utils/firebase";
import { useNavigate, useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import slugify from "react-slugify"; // npm i react-slugify
import { toast } from "react-toastify";
import { addDoc, collection, doc, onSnapshot, query, serverTimestamp, updateDoc, where } from "firebase/firestore";

const defaultFormFields = {
    title: "",
    tags: [],
    trending: "no",
    category: "",
    description: "",
    comments: [],
    likes: [],
  };
  
  const categoryOption = [
    "Fashion",
    "Technology",
    "Food",
    "Politics",
    "Sports",
    "Business",
  ];
const EditPost = ({user}) => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(null);
    const [blog, setBlog] = useState(null);
    const [blogId, setBlogId] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const { title, tags, category, trending, description } = formFields;
  
    //   create a reset fields
    const resetFormFields = () => {
      setFormFields(defaultFormFields);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (category && tags && title && description && trending) {
        try {
          const taskDocRef = doc(db, "blogs", blogId);
          await updateDoc(taskDocRef, {
            ...formFields,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
            slugUrl: slugify(title),
          });
          toast.success("Blog updated successfully");
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
  
    // Upload image to firebase storate, we need to goto firebase then storage and change rule true
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
  
    useEffect(() => {
      const docRef = collection(db, "blogs");
      const q = query(docRef, where("slugUrl", "==", id));
      if (q) {
        onSnapshot(q, (snapshot) => {
        snapshot.forEach((doc) => {
          setFormFields({ ...doc.data() });
          setBlogId(doc.id); // store blog id for future work
        });
      });
      }
      
    }, [id]);
  return (
    <>
     <div className="container-fluid">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h2>Update Post</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  required
                  onChange={handleChange}
                  name="title"
                  value={title}
                  placeholder="Title"
                ></input>
              </div>
              <div className="mb-3">
                <ReactTagInput
                  tags={tags}
                  placeholder="Tags"
                  onChange={handleTags}
                />
              </div>
              <div className="mb-3">
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
              <div className="mb-3">
                <div className="col-12 py-3">
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
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control description-box"
                  placeholder="Description"
                  value={description}
                  name="description"
                  onChange={handleChange}
                  style={{ height: "150px" }}
                />
              </div>
              <div className="mb-3">
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <button
                type="submit"
                disabled={progress !== null && progress < 100}
                className="btn btn-primary"
              >
                Update Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditPost