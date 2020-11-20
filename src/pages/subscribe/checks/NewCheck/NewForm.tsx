import React, { CSSProperties, FC } from "react";
import { Form, Input, Select, InputNumber } from "antd";
import { CheckItem, CheckItemFields } from "@/pages/subscribe/checks/constants";
import { ESexTypes, ECheckTypes } from "@/utils/constants";
import { FormInstance } from "antd/lib/form";
import {SelectX} from "@/components/AntdLib/Select";

interface IProps {
  style?: CSSProperties;
  className?: string;
  form: FormInstance;
  iniValues: CheckItem;
}
export const NewForm: FC<IProps> = function (props) {
  const form = props.form;
  return (
    <Form
      initialValues={props.iniValues}
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item label={"编号"} name={CheckItemFields.code}>
        <Input />
      </Form.Item>
      <Form.Item label={"项目名称"} name={CheckItemFields.name}>
        <Input />
      </Form.Item>
      {/*<Form.Item label={"助记名"} name={CheckItemFields.attention}>*/}
      {/*  <Input />*/}
      {/*</Form.Item>*/}
      <Form.Item label={"适用性别"} name={CheckItemFields.sex}>
        <SelectX options={ESexTypes} />
      </Form.Item>
      <Form.Item label={"适用年龄"} name={CheckItemFields.age}>
        <InputNumber min={0} max={100} />
      </Form.Item>
      <Form.Item label={"类型"} name={CheckItemFields.type}>
        <SelectX options={ECheckTypes} />
      </Form.Item>
      <Form.Item label={"价格"} name={CheckItemFields.price}>
        <InputNumber min={0} max={999999} />
      </Form.Item>
      <Form.Item label={"项目说明"} name={CheckItemFields.remark}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item label={"注意事项"} name={CheckItemFields.attention}>
        <Input.TextArea />
      </Form.Item>
    </Form>
  );
};
