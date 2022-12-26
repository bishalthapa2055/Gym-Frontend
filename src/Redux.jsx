import React from "react";
import { incNumber, decNumber } from "./Action";
import { useSelector, useDispatch } from "react-redux";
const Redux = () => {
  const state = useSelector((state) => state.changeNumber);
  const dispatch = useDispatch();
  return (
    <>
      <h1>Hello from redux</h1>
      <div className="quatity">
        <button
          className="plus"
          title="Decrement"
          onClick={() => dispatch(decNumber(2))}
        >
          -
        </button>
        <input name="quantity" value={state} />
        <button
          className="plus"
          title="Increment"
          onClick={() => dispatch(incNumber(5))}
        >
          +
        </button>
      </div>
    </>
  );
};

export default Redux;
