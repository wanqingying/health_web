import React, { CSSProperties, FC, useEffect } from "react";
import { Form, Modal } from "antd";
import { NewForm } from "./NewForm";
import { CheckGroup, IniCheckItem } from "../constants";
import { add, updateItem } from "../services";
import "./index.scss";
import { useCrudModalState } from "@/hooks/page";
import { ProviderForm } from "./context";

interface IProps {
  style?: CSSProperties;
  className?: string;
}
export const NewGroup: FC<IProps> = function () {
  const { editItem, visible, close } = useCrudModalState(IniCheckItem);
  const [form] = Form.useForm<CheckGroup>();

  useEffect(() => {
    form.setFieldsValue(editItem);
  }, [editItem, form]);

  return (
    <Modal
      visible={visible}
      title={editItem ? "编辑检查项" : "新增检查项"}
      mask={true}
      destroyOnClose={true}
      style={{ top: 40 }}
      onOk={() => {
        const vs = form.getFieldsValue();
        if (editItem?.id) {
          vs.id = editItem.id;
          updateItem(vs).then((res) => {
            close();
          });
        } else {
          add(vs).then((r) => {
            close();
          });
        }
      }}
      width={600}
      onCancel={() => {
        close();
      }}
    >
      <ProviderForm value={{ form: form, iniValues: editItem }}>
        <NewForm />
      </ProviderForm>
    </Modal>
  );
};
