import React, { CSSProperties, FC } from "react";
import { Select } from "antd";
import { SelectProps } from "antd/lib/select";

interface IProps {
  style?: CSSProperties;
  className?: string;
}
export const SelectX: FC<IProps & SelectProps<any>> = function (props) {
  const { options, value, ...rest } = props;
  return (
    <Select
      {...rest}
      value={typeof value === "number" ? String(value) : value}
      options={options?.map((o) => {
        return {
          ...o,
          value: typeof o.value === "number" ? String(o.value) : o.value,
        };
      })}
    />
  );
};
