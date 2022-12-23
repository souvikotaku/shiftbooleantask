import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const defaultformdata = {
  title: "",
  content: "",
};

const MainForm = () => {
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState(defaultformdata);
  const [articleTitle, setArticleTitle] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [theArray, setTheArray] = useState([]);
  const [showFormnow, setshowForm] = useState(false);

  const showform = () => {
    if (showFormnow === false) {
      setshowForm(true);
    } else {
      setshowForm(false);
    }
  };
  //   useEffect(() => {
  //     setTheArray(JSON.parse(sessionStorage.getItem("articleArray")));
  //   }, []);
  const articleArray = [];

  const handleDelete = (id) => {
    var index = theArray
      .map(function (e) {
        return e.id;
      })
      .indexOf(id);

    theArray.splice(index, 1);

    navigate("/");
  };

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
              className="form-control"
              onChange={(event) => {
                console.log(event.target.value);
                setArticleTitle(event.target.value);
                sessionStorage.setItem("articleTitle", event.target.value);
                console.log(localStorage.getItem("articleTitle"));
              }}
            />

            <label htmlFor="exampleInputEmail1" style={{ paddingTop: "3%" }}>
              Article Content
            </label>
            <input
              placeholder="Enter Content"
              type="text"
              className="form-control"
              onChange={(event) => {
                console.log(event.target.value);
                setArticleContent(event.target.value);
                sessionStorage.setItem("articleContent", event.target.value);
                console.log(localStorage.getItem("articleContent"));
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
                const formdetails = {
                  title: sessionStorage.getItem("articleTitle"),
                  content: sessionStorage.getItem("articleContent"),
                };
                articleArray.push(formdetails);
                setTheArray([...theArray, formdetails]);
                console.log(articleArray);
                console.log(formdetails);
              }}
              //   onClick={addEntryClick}
            >
              Post
            </button>
          </div>
        </form>
      </div>
      <div
        className="container viewarticlediv"
        style={{
          display: theArray.length != 0 ? "block" : "none",
        }}
      >
        <div className="row">
          {console.log("the array", theArray)}
          {/* {setTheArray([...theArray, formdetails])} */}
          {/* {sessionStorage.setItem("articleArray", JSON.stringify(theArray))} */}
          {theArray &&
            theArray.map((item, index) => (
              <div
                key={index}
                className="col-sm-12 col-md-3"
                style={{ marginTop: "10px" }}
              >
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{item?.title}</h5>
                    {/* <p className="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p> */}
                    {/* <p
                      //   href="#"
                      //   onClick={() =>
                      //     navigate("/detail", {
                      //       state: item,
                      //     })
                      //   }
                      className="btn btn-primary"
                    >
                      Edit
                    </p> */}
                    <p
                      //   href="#"
                      onClick={() =>
                        //   navigate("/detail", {
                        //     state: item,
                        //   })
                        handleDelete(index)
                      }
                      className="btn btn-primary"
                    >
                      Delete
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
