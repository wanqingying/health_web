import React, { CSSProperties, FC, useEffect, useState } from "react";
import { ColumnProps } from "antd/lib/table";
import { useCrudCtx } from "@/hooks/page";

import { getGroupsByMealId } from "../services";
import { getAllCheckGroups } from '@/pages/subscribe/groups/services';

import { Table, Form } from "antd";
import { userFormCtx } from "./context";
import { CheckGroup } from "@/pages/subscribe/groups/constants";


interface IProps {
  style?: CSSProperties;
  className?: string;
}
export const FormTable: FC<IProps> = function (props) {
  const [groups, setGroups] = useState<CheckGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [checkList, setCheckList] = useState<CheckGroup[]>([]);
  const { state } = userFormCtx();
  const {
    state: { editData },
  } = useCrudCtx(["editData"]);

  // 获取此套餐包含的检查组
  useEffect(() => {
    if (editData?.id && groups.length > 0) {
      getGroupsByMealId(editData?.id).then((res) => {
        const ids = res.data||[];
        const checks = groups.filter((x) => ids.includes(x.id as number));
        setCheckList(checks);
      });
    }
  }, [editData?.id, groups]);

  // 显示所有检查组
  useEffect(() => {
    setLoading(true);
    getAllCheckGroups()
      .then((res) => {
        if (res.flag) {
          setGroups(res.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const form = state.form;
    form.setFields([{ name: "groups", value: checkList }]);
  }, [checkList]);

  const columns: ColumnProps<CheckGroup>[] = [
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
      title: "项目说明",
      render: (_, item) => {
        return item.remark;
      },
    },
  ];
  return (
    <Form form={state.form}>
      <Form.Item name={"groups"}>
        <Table
          className={"lay-table"}
          columns={columns}
          dataSource={groups}
          loading={loading}
          rowKey={"id"}
          rowSelection={{
            type: "checkbox",
            selectedRowKeys: checkList.map((c) => c.id) as any,
            onChange: (keys, items) => {
              setCheckList(items);
            },
          }}
        />
      </Form.Item>
    </Form>
  );
};
