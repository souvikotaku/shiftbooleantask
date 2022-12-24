import React, { useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";

const getArticles = () => {
  let article = localStorage.getItem("lists");
  console.log("article", article);

  if (article) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

const DetailForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("item data", location.state);
  }, []);

  const handleDelete = (id) => {
    const updatedItems = getArticles().filter((elem, ind) => {
      return ind !== id;
    });
    // setItems(updatedItems);
    localStorage.setItem("lists", JSON.stringify(updatedItems));
  };

  return (
    <div class="container" style={{ paddingTop: "5%" }}>
      <div class="card text-center">
        <div class="card-header">
          {/* <Link to="/" class="btn btn-primary">
            Go back
          </Link> */}
          <h4>Article Detail</h4>
        </div>
        <div class="card-body">
          <h5 class="card-title">{location.state?.item?.title}</h5>
          <p class="card-text">{location.state?.item?.content}</p>
          {/* <a href="#" class="btn btn-primary">
            Go somewhere
          </a> */}
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
        <div class="card-footer text-muted">{location.state?.item?.date}</div>
      </div>
    </div>
  );
};

export default DetailForm;
