import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./styles.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";

const getArticles = () => {
  let article = localStorage.getItem("lists");
  console.log("article", article);

  if (article) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

const MainForm = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const [articleTitle, setArticleTitle] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [items, setItems] = useState(getArticles());
  const [newdate, setnewdate] = useState(new Date());
  const [toggleSubmit, setToggleSubmit] = useState(true);

  const [showFormnow, setshowForm] = useState(
    location.state?.fromPage ? true : false
  );

  const showform = () => {
    if (showFormnow === false) {
      setshowForm(true);
    } else {
      setshowForm(false);
    }
  };

  const handleDelete = (id) => {
    const updatedItems = items.filter((item) => {
      return item.id !== id;
    });
    setItems(updatedItems);
    swal("Article Deleted!", "", "error");
  };

  const handleEdit = (id) => {
    const newEditItem = items.find((item) => {
      return item.id === id;
    });
    console.log("newEditItem", newEditItem);
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        id: new Date().getTime().toString(),
        date: newdate.toString(),
        title: articleTitle,
        content: articleContent,
      },
    ]);
    setArticleTitle("");
    setArticleContent("");
    toast.success("Article Added!");
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

  const removeAll = () => {
    setItems([]);
    swal("All Articles Removed!", "", "error");
  };
  return (
    <div>
      {" "}
      {/* <div style={{ paddingTop: "5%" }}>
        <button className="btn btn-primary">Create New Article</button>
      </div> */}
      <div style={{ paddingTop: "3%" }}>
        <button
          onClick={() => {
            showform();
          }}
          className="btn btn-primary"
        >
          {showFormnow === false ? "Create New Article" : "Close Form"}
        </button>
      </div>
      <div
        style={{
          paddingTop: "1%",
          display: "flex",
          justifyContent: "center",
          display: showFormnow === false ? "none" : "flex",
        }}
      >
        <form
          style={{
            width: "30%",
            // border: "1px solid lightgrey",
            borderRadius: "10px",
            padding: "1%",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
          className="backgroundcard"
        >
          <div className="form-group">
            <label
              htmlFor="exampleInputEmail1"
              style={{ fontWeight: "bold", fontFamily: "helvetica" }}
            >
              Article Title
            </label>
            <input
              placeholder="Enter Title"
              type="text"
              value={articleTitle}
              className="form-control"
              onChange={(event) => {
                console.log(event.target.value);
                setArticleTitle(event.target.value);
                // sessionStorage.setItem("articleTitle", event.target.value);
                // console.log(localStorage.getItem("articleTitle"));
              }}
              style={{
                backgroundColor: "bisque",
              }}
            />

            <label
              htmlFor="exampleInputEmail1"
              style={{
                paddingTop: "3%",
                fontWeight: "bold",
                fontFamily: "helvetica",
              }}
            >
              Article Content
            </label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea3"
              rows="5"
              placeholder="Enter Content"
              type="text"
              value={articleContent}
              // className="form-control"
              onChange={(event) => {
                console.log(event.target.value);
                setArticleContent(event.target.value);
                // sessionStorage.setItem("articleContent", event.target.value);
                // console.log(localStorage.getItem("articleContent"));
              }}
              style={{
                backgroundColor: "bisque",
              }}
            />
            {/* <input
              placeholder="Enter Content"
              type="text"
              value={articleContent}
              className="form-control"
              onChange={(event) => {
                console.log(event.target.value);
                setArticleContent(event.target.value);
                // sessionStorage.setItem("articleContent", event.target.value);
                // console.log(localStorage.getItem("articleContent"));
              }}
              style={{
                backgroundColor: "bisque",
              }}
            /> */}
            <button
              data-toggle="tooltip"
              data-placement="bottom"
              title={
                articleTitle == "" || articleContent == ""
                  ? "Enter both fields"
                  : "Click to add article"
              }
              // disabled={
              //   articleTitle == "" || articleContent == "" ? true : false
              // }
              style={{
                marginTop: "3%",
                width: "40%",
                background:
                  articleTitle == "" || articleContent == ""
                    ? "lightgrey"
                    : "#198754",
                cursor:
                  articleTitle == "" || articleContent == ""
                    ? "auto"
                    : "pointer",
                color:
                  articleTitle == "" || articleContent == "" ? "grey" : "white",
              }}
              className={
                articleTitle == "" || articleContent == ""
                  ? "btn"
                  : "btn btn-success"
              }
              onClick={(event) => {
                event.preventDefault();
                if (articleTitle == "" || articleContent == "") {
                  console.log("either one of the fields empty");
                  toast.error("Please enter both fields!");
                } else {
                  addItem();
                }
              }}
            >
              Post
            </button>
          </div>
        </form>
      </div>
      <div
        className="container viewarticlediv"
        style={{
          display: items.length != 0 ? "block" : "none",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4>Article List</h4>
          <p
            //   href="#"
            onClick={() => removeAll()}
            className="btn btn-danger"
          >
            {/* Delete */}
            Remove All
          </p>
        </div>
        <div className="row">
          {console.log("the array", items)}

          {items &&
            items.map((item, index) => (
              <div
                key={item?.id}
                className="col-sm-12 col-md-3"
                style={{ marginTop: "10px" }}
              >
                <div
                  className="card backgroundcard"
                  style={{
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  }}
                >
                  <div className="card-body">
                    <h5 className="card-title">{`${index + 1}.${" "}${
                      item?.title
                    }`}</h5>
                    <div className="row">
                      <div className="col-12">
                        <p
                          onClick={() =>
                            navigate("/detail", {
                              state: {
                                item,
                                index,
                              },
                            })
                          }
                          className="btn btn-primary w-50"
                        >
                          View Details
                        </p>
                      </div>
                      <div className="col-12">
                        <p
                          onClick={() => {
                            handleEdit(item?.id);
                            navigate("/edit", {
                              state: {
                                item,
                              },
                            });
                          }}
                          className="btn btn-warning w-50"
                        >
                          {/* Delete */}
                          Edit
                        </p>
                      </div>
                      <div className="col-12">
                        <p
                          onClick={() => handleDelete(item?.id)}
                          className="btn btn-danger w-50"
                        >
                          {/* Delete */}
                          Delete
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MainForm;
