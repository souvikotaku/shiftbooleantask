import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./styles.css";

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
    const updatedItems = items.filter((elem, ind) => {
      return ind !== id;
    });
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([
      ...items,
      {
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
  }, [items]);
  return (
    <div>
      {" "}
      {/* <div style={{ paddingTop: "5%" }}>
        <button className="btn btn-primary">Create New Article</button>
      </div> */}
      <div style={{ paddingTop: "5%" }}>
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
            border: "1px solid lightgrey",
            borderRadius: "10px",
            padding: "1%",
          }}
        >
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Article Title</label>
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
            />

            <label htmlFor="exampleInputEmail1" style={{ paddingTop: "3%" }}>
              Article Content
            </label>
            <input
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
            />
            <button
              disabled={
                articleTitle == "" || articleContent == "" ? true : false
              }
              style={{ marginTop: "3%", width: "40%" }}
              className="btn btn-primary"
              onClick={(event) => {
                event.preventDefault();

                addItem();
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
        }}
      >
        <div className="row">
          {console.log("the array", items)}

          {items &&
            items.map((item, index) => (
              <div
                key={index}
                className="col-sm-12 col-md-3"
                style={{ marginTop: "10px" }}
              >
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{item?.title}</h5>

                    <p
                      //   href="#"
                      onClick={
                        () =>
                          navigate("/detail", {
                            state: item,
                          })
                        // handleDelete(index)
                      }
                      className="btn btn-primary"
                    >
                      {/* Delete */}
                      View Details
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MainForm;
