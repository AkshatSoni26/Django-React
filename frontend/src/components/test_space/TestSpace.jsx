import React from "react";
import { useDispatch } from "react-redux";
import { reducerContants } from "../../redux/constant.js";

function TestSpace() {

  const dispatch = useDispatch()

  function giveInputs(e) {
    dispatch({type:reducerContants.INPUT, payload: e.target.value})
    console.log("giveInputse",e.target.value);
  }

  return (
    <div id="TestSpace">
      <div className="rounded codie-space">
      <textarea className="form-control floatingTextarea" placeholder="write your test cases here..." onBlur={giveInputs}></textarea>
      </div>
    </div>
  );
}

export default TestSpace;
