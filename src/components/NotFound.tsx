import * as React from "react";
import { Link } from "react-router-dom";
import Routes from "../routes/urls";

export const NotFound = () => {
  return (
    <div>
      <div
        style={{
          height: "200px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "column"
        }}
      >
        <h1 style={{ fontSize: "38px", width: "100%", textAlign: "center" }}>
          Soon
        </h1>
        <Link
          to={Routes.Home}
          className="btn btn-primary"
          style={{ margin: "0 auto" }}
        >
          HomePage
        </Link>
      </div>
    </div>
  );
};
