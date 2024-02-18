import React from "react";
import { useSelector } from "react-redux";

function ComilerSpace() {
  const compile = useSelector((state) => state.compile);
  const loading = useSelector((state) => state.loading);

  return (
    <div id="ComilerSpace">
      <div className="rounded codie-space">
        <textarea
          className="form-control floatingTextarea"
          value={compile}
          placeholder={
            loading
              ? "your code is comiling. please wait... "
              : "your code compile here..."
          }
          disabled
          style={{ cursor: loading ? "progress" : "pointer" }}
        ></textarea>
      </div>
    </div>
  );
}

export default ComilerSpace;
