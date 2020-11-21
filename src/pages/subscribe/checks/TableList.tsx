
import React, { CSSProperties, FC } from "react";
import {useCrudTableAction, useCrudTableState} from "@/hooks/page";
import {ColumnProps} from "antd/lib/table";
import {ECheckTypeLabel, ESexTypeLabel} from "@/utils/constants";
import {Button, Popconfirm, Table} from "antd";
import {CheckItem} from "@/pages/subscribe/checks/constants";


interface IProps {
  style?: CSSProperties;
  className?: string;
}
export const TableList: FC<IProps> = function (props) {
    const { data, pagination, loading } = useCrudTableState();
    const { editItem, deleteItem } = useCrudTableAction();
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
            title: "项目类型",
            render: (_, item) => {
                return ECheckTypeLabel[item.type];
            },
        },
        {
            title: "价格",
            render: (_, item) => {
                return item.price;
            },
        },
        {
            title: "适用性别",
            render: (_, item) => {
                return ESexTypeLabel[item.sex];
            },
        },
        {
            title: "适用年龄",
            render: (_, item) => {
                return item.age;
            },
        },
        {
            title: "项目说明",
            render: (_, item) => {
                return item.remark;
            },
        },
        {
            title: "注意事项",
            render: (_, item) => {
                return item.attention;
            },
        },
        {
            title: "操作",
            render(_, item) {
                return (
                    <span className={"btn-act"}>
            <Button
                size={"small"}
                onClick={() => {
                    editItem(item);
                }}
            >
              编辑
            </Button>
            <Popconfirm
                title={"确认删除?"}
                onConfirm={() => {
                    deleteItem(item.id);
                }}
            >
              <Button size={"small"} style={{ color: "red" }}>
                删除
              </Button>
            </Popconfirm>
          </span>
                );
            },
        },
    ];
    return (
        <Table
            className={"lay-table"}
            columns={columns}
            dataSource={data}
            pagination={pagination}
            loading={loading}
        />
    );
};