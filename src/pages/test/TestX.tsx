import React, { FC } from "react";

interface IProps {}
export const TestX: FC<IProps> = function () {
  console.log("render");
  return <div>test x</div>;
};


export default TestX
