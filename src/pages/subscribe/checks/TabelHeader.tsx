import React, { CSSProperties, FC } from "react";
import { Input, Button } from "antd";
import { useCrudParam, useCrudModalState } from "@/hooks/page";

const { Search } = Input;

interface IProps {
  style?: CSSProperties;
  className?: string;
}
export const TableHeader: FC<IProps> = function (props) {
  const { param, onChange } = useCrudParam({ search: "" });
  const { open } = useCrudModalState();
  return (
    <div style={props.style} className={props.className}>
      <Search
        className={"f-item f-input"}
        placeholder="请输入"
        allowClear
        enterButton="查询"
        value={param.search}
        // disabled={disabled}
        onChange={(e) => onChange("search", e.target.value)}
      />
      <Button
        type={"primary"}
        className={"f-item btn-add"}
        onClick={() => {
          open();
        }}
      >
        新增
      </Button>
    </div>
  );
};
