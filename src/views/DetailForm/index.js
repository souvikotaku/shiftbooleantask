import React, { useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";

const DetailForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("item data", location.state);
  }, []);

  return (
    <div class="container" style={{ paddingTop: "5%" }}>
      <div class="card text-center">
        <div class="card-header">
          {/* <Link to="/" class="btn btn-primary">
            Go back
          </Link> */}
          Article Detail
        </div>
        <div class="card-body">
          <h5 class="card-title">{location.state?.title}</h5>
          <p class="card-text">{location.state?.content}</p>
          {/* <a href="#" class="btn btn-primary">
            Go somewhere
          </a> */}
          <p
            //   href="#"
            onClick={() => {
              //   handleDelete(location.state?.id);
              navigate("/", { state: { fromPage: "articledetail" } });
            }}
            className="btn btn-primary"
          >
            Go Back
          </p>
        </div>
        <div class="card-footer text-muted">{location.state?.date}</div>
      </div>
    </div>
  );
};

export default DetailForm;
