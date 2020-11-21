import React, { CSSProperties, FC } from "react";
import { Form, Input } from "antd";
import { ECheckGroupFields, ECheckGroupLabels } from "../constants";
import { ESexTypes } from "@/utils/constants";
import { SelectX } from "@/components/AntdLib/Select";
import { userFormCtx } from "./context";

interface IProps {
  style?: CSSProperties;
  className?: string;
}
export const FormBase: FC<IProps> = function (props) {
  const { state } = userFormCtx(["form", "iniValues"]);
  const { form, iniValues } = state;
  return (
    <Form
      initialValues={iniValues}
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item label={ECheckGroupLabels.code} name={ECheckGroupFields.code}>
        <Input />
      </Form.Item>
      <Form.Item label={ECheckGroupLabels.name} name={ECheckGroupFields.name}>
        <Input />
      </Form.Item>
      <Form.Item label={"助记名"} name={ECheckGroupFields.helpcode}>
        <Input />
      </Form.Item>
      <Form.Item label={"适用性别"} name={ECheckGroupFields.sex}>
        <SelectX options={ESexTypes} />
      </Form.Item>
      <Form.Item label={"项目说明"} name={ECheckGroupFields.remark}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item label={"注意事项"} name={ECheckGroupFields.attention}>
        <Input.TextArea />
      </Form.Item>
    </Form>
  );
};
