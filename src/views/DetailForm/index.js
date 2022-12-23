import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const DetailForm = () => {
  const location = useLocation();
  useEffect(() => {
    console.log("item data", location.state);
  }, []);

  return (
    <div class="container" style={{ paddingTop: "5%" }}>
      <div class="card text-center">
        <div class="card-header">
          <Link to="/" class="btn btn-primary">
            Go back
          </Link>
          Featured
        </div>
        <div class="card-body">
          <h5 class="card-title">{location.state?.title}</h5>
          <p class="card-text">{location.state?.content}</p>
          <a href="#" class="btn btn-primary">
            Go somewhere
          </a>
        </div>
        <div class="card-footer text-muted">2 days ago</div>
      </div>
    </div>
  );
};

export default DetailForm;
