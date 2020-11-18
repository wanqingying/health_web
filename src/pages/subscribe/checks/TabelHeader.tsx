import React, { CSSProperties, FC } from "react";
import { Input, Button } from "antd";
import { usePageCtx } from "@/pages/subscribe/checks/context";

const { Search } = Input;

interface IProps {
  style?: CSSProperties;
  className?: string;
}
export const TableHeader: FC<IProps> = function (props) {
  const { state, update } = usePageCtx([]);
  return (
    <div style={props.style} className={props.className}>
      <Search
        className={"f-item f-input"}
        placeholder="请输入"
        allowClear
        enterButton="查询"
        // size="large"
        onSearch={() => {
          console.log("ok");
        }}
      />
      <Button
        type={"primary"}
        className={"f-item btn-add"}
        onClick={() => {
          update((s) => {
            s.visible = true;
          });
        }}
      >
        新增
      </Button>
    </div>
  );
};
