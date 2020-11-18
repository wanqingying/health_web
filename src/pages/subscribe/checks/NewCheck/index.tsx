import React, { CSSProperties, FC } from "react";
import { Form, Modal, message } from "antd";
import { usePageCtx } from "@/pages/subscribe/checks/context";
import { NewForm } from "./NewForm";
import { CheckItem, IniCheckItem } from "@/pages/subscribe/checks/constants";
import { addCheckItem } from "../services";

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
        addCheckItem(vs).then((r) => {
          if (!r.flag) {
            return message.error(r.message);
          }
          message.success(r.message);
          update((s) => {
            s.visible = false;
            s.data = null;
            s.updateList += 1;
          });
        });
      }}
      width={600}
      onCancel={() => {
        update((s) => {
          s.visible = false;
        });
      }}
    >
      <NewForm iniValues={IniCheckItem} form={form} />
    </Modal>
  );
};
