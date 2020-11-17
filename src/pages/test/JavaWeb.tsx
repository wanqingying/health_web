import React, { FC } from "react";
import { Button, Input } from "antd";
import { axo } from "../../utils/help";

interface IProps {}

export const JavaWeb: FC<IProps> = function () {
  const [userName, setUserName] = React.useState("");
  const [psd, setPsd] = React.useState("");
  return (
    <div>
      <p>
        user:{" "}
        <Input
          style={{ width: 200 }}
          value={userName}
          onChange={(event) => {
            setUserName(event.target.value);
          }}
        />
      </p>
      <p>
        password:{" "}
        <Input
          style={{ width: 200 }}
          value={psd}
          onChange={(event) => {
            setPsd(event.target.value);
          }}
        />
      </p>
      <p>
        <Button
          onClick={() => {
            axo
              .post("/user/list", { users: [{ name: "xxx", age: 45 }] })
              .then((res) => {
                console.log("res");
              });
          }}
        >
          提交
        </Button>
      </p>
    </div>
  );
};

export default JavaWeb;
