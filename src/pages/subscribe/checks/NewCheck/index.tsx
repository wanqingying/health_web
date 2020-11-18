import React, { CSSProperties, FC } from "react";
import { Form, Modal } from "antd";
import { useBaseCtx } from "@/utils/base";
import { usePageCtx } from "@/pages/subscribe/checks/context";
import { NewForm } from "./NewForm";
import { CheckItem } from "@/pages/subscribe/checks/constants";
import { test } from "../services";

interface IProps {
  style?: CSSProperties;
  className?: string;
}
export const NewCheck: FC<IProps> = function (props) {
  const { state, update } = usePageCtx(["visible"]);
  const [form] = Form.useForm<CheckItem>();

  return (
    <Modal
      visible={state.visible}
      title={state.data ? "编辑检查项" : "新增检查项"}
      onOk={() => {
        const vs = form.getFieldsValue();
        test(vs);
        console.log("ok", vs);
      }}
      width={600}
      onCancel={() => {
        update((s) => {
          s.visible = false;
        });
      }}
    >
      <NewForm iniValues={{ name: "ss" } as any} form={form} />
    </Modal>
  );
};
