import React, { CSSProperties, FC } from "react";
import { Form, Input } from "antd";
import { CheckGroup, ECheckGroupFields, ECheckGroupLabels } from "../constants";
import { ESexTypes } from "@/utils/constants";
import { FormInstance } from "antd/lib/form";
import { SelectX } from "@/components/AntdLib/Select";

interface IProps {
    style?: CSSProperties;
    className?: string;
    form: FormInstance;
    iniValues: CheckGroup;
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
            <Form.Item label={ECheckGroupLabels.code} name={ECheckGroupFields.code}>
                <Input />
            </Form.Item>
            <Form.Item label={ECheckGroupLabels.name} name={ECheckGroupFields.name}>
                <Input />
            </Form.Item>
            <Form.Item label={"助记名"} name={ECheckGroupFields.helpCode}>
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
