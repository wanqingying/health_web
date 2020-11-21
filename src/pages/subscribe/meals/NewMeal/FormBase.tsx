import React, { CSSProperties, FC } from "react";
import { Form, Input, InputNumber } from "antd";
import { EMealFields, EMealLabels } from "../constants";
import { ESexTypes } from "@/utils/constants";
import { SelectX } from "@/components/AntdLib/Select";
import { userFormCtx } from "./context";
import { Avatar } from "@/components/AntdLib/Upload";

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
      <Form.Item label={EMealLabels.code} name={EMealFields.code}>
        <Input />
      </Form.Item>
      <Form.Item label={EMealLabels.name} name={EMealFields.name}>
        <Input />
      </Form.Item>
      <Form.Item label={"助记名"} name={EMealFields.helpcode}>
        <Input />
      </Form.Item>
      <Form.Item label={EMealLabels.price} name={EMealFields.price}>
        <InputNumber />
      </Form.Item>
      <Form.Item label={EMealLabels.sex} name={EMealFields.sex}>
        <SelectX options={ESexTypes} />
      </Form.Item>
      <Form.Item label={EMealLabels.age} name={EMealFields.age}>
        <InputNumber />
      </Form.Item>

      <Form.Item label={"项目说明"} name={EMealFields.remark}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item label={EMealLabels.img} name={EMealFields.img}>
        <Avatar />
      </Form.Item>
      <Form.Item label={"注意事项"} name={EMealFields.attention}>
        <Input.TextArea />
      </Form.Item>
    </Form>
  );
};
