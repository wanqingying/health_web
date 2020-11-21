import React, { CSSProperties, FC, useEffect, useState } from "react";
import { ColumnProps } from "antd/lib/table";
import { useCrudCtx } from "@/hooks/page";

import { CheckItem } from "@/pages/subscribe/checks/constants";
import { getAllCheckItems, getCheckItemsByGroupId } from "../services";
import { Table, Form } from "antd";
import { userFormCtx } from "./context";

interface IProps {
  style?: CSSProperties;
  className?: string;
}
export const FormTable: FC<IProps> = function (props) {
  const [items, setItems] = useState<CheckItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [checkList, setCheckList] = useState<CheckItem[]>([]);
  const { state } = userFormCtx();
  const {
    state: { editData },
  } = useCrudCtx(["editData"]);

  useEffect(() => {
    if (editData?.id && items.length > 0) {
      getCheckItemsByGroupId(editData?.id).then((res) => {
        const ids = res.data;
        const checks = items.filter((x) => ids.includes(x.id as number));
        setCheckList(checks);
      });
    }
  }, [editData?.id, items]);

  useEffect(() => {
    setLoading(true);
    getAllCheckItems()
      .then((res) => {
        if (res.flag) {
          setItems(res.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const form = state.form;
    form.setFields([{ name: "checkitems", value: checkList }]);
  }, [checkList]);

  const columns: ColumnProps<CheckItem>[] = [
    {
      title: "项目编码",
      render: (_, item) => {
        return item.code;
      },
    },
    {
      title: "项目名称",
      render: (_, item) => {
        return item.name;
      },
    },
    {
      title: "价格",
      render: (_, item) => {
        return item.price;
      },
    },
    {
      title: "项目说明",
      render: (_, item) => {
        return item.remark;
      },
    },
  ];
  return (
    <Form form={state.form}>
      <Form.Item name={"checkitems"}>
        <Table
          className={"lay-table"}
          columns={columns}
          dataSource={items}
          loading={loading}
          rowKey={"id"}
          rowSelection={{
            type: "checkbox",
            selectedRowKeys: checkList.map((c) => c.id) as any,
            onChange: (keys, items) => {
              setCheckList(items);
              // const form = state.form;
              // form.setFields([{ name: "checkitems", value: items }]);
            },
          }}
        />
      </Form.Item>
    </Form>
  );
};
