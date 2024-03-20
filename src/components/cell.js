import React from "react";

const Cell = (props) => {
  const { val, index } = props;
  return (
    <div className={"cell " + val} onClick={() => props.nextMove(index, val)}>
      {val}
    </div>
  );
};

export default Cell;
