import React, { CSSProperties, FC } from "react";
import { Input, Button } from "antd";
import { usePageCtx, useSearch } from "@/pages/subscribe/checks/context";

const { Search } = Input;

interface IProps {
  style?: CSSProperties;
  className?: string;
}
export const TableHeader: FC<IProps> = function (props) {
  const { value, onChange, onSearch, loading } = useSearch();
  const { update } = usePageCtx([]);
  return (
    <div style={props.style} className={props.className}>
      <Search
        className={"f-item f-input"}
        placeholder="请输入"
        allowClear
        enterButton="查询"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        onSearch={onSearch}
        loading={loading}
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
