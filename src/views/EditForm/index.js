import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./styles.css";
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

const EditForm = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const [articleTitle, setArticleTitle] = useState(location.state.item?.title);
  const [articleContent, setArticleContent] = useState(
    location.state.item?.content
  );
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
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
    console.log("edit item data", location.state.item);
    // setArticleTitle(location.state.item?.title);
    // setArticleContent(location.state.item?.content);
  }, [items]);

  const removeAll = () => {
    setItems([]);
  };

  const editItem = () => {
    setItems(
      items.map((item) => {
        if (item.id === location.state.item?.id) {
          return { ...item, title: articleTitle, content: articleContent };
        }
        return item;
      })
    );
    swal("Article Updated!", "", "success");
  };

  return (
    <div>
      {" "}
      {/* <div style={{ paddingTop: "5%" }}>
        <button className="btn btn-primary">Create New Article</button>
      </div> */}
      {/* <div style={{ paddingTop: "5%" }}>
        <button
          onClick={() => {
            showform();
          }}
          className="btn btn-primary"
        >
          {showFormnow === false ? "Create New Article" : "Close Form"}
        </button>
      </div> */}
      <div
        className="row"
        style={{
          paddingTop: "1%",
          display: "flex",
          justifyContent: "center",
          //   display: showFormnow === false ? "none" : "flex",
        }}
      >
        <h4 style={{ color: "white" }}>Update Article</h4>
        <form
          style={{
            width: "30%",
            // border: "1px solid lightgrey",
            borderRadius: "10px",
            padding: "1%",
          }}
          className="backgroundcard"
        >
          <div className="form-group">
            <label
              htmlFor="exampleInputEmail1"
              style={{
                fontWeight: "bold",
                fontFamily: "helvetica",
              }}
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
            <div className="row">
              <div className="col-12">
                <p
                  //   disabled={
                  //     articleTitle == "" || articleContent == "" ? true : false
                  //   }
                  style={{ marginTop: "3%", width: "40%" }}
                  className="btn btn-success"
                  onClick={(event) => {
                    event.preventDefault();

                    editItem();
                  }}
                >
                  Update Form
                </p>
              </div>
              <div className="col-12">
                <p
                  //   href="#"
                  onClick={() => {
                    // handleDelete(location.state?.index);
                    navigate("/", { state: { fromPage: "articledetail" } });
                  }}
                  className="btn btn-primary"
                >
                  Go Back
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
