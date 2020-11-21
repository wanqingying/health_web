import React, { CSSProperties, FC } from "react";
import { Tabs } from "antd";
import { FormBase } from "./FormBase";
import { FormTable } from "./FormTable";

interface IProps {
  style?: CSSProperties;
  className?: string;
}
export const NewForm: FC<IProps> = function (props) {
  return (
    <Tabs>
      <Tabs.TabPane id={'form'} key={"form"} tab={"基本信息"}>
        <FormBase />
      </Tabs.TabPane>
      <Tabs.TabPane id={'table'} key={"table"} tab={"检查项配置"}>
        <FormTable />
      </Tabs.TabPane>
    </Tabs>
  );
};
