
import React, { CSSProperties, FC } from "react";
import {useCrudTableAction, useCrudTableState} from "@/hooks/page";
import {ColumnProps} from "antd/lib/table";
import {CheckGroup} from "@/pages/subscribe/groups/constants";
import {ECheckTypeLabel, ESexTypeLabel} from "@/utils/constants";
import {Button, Popconfirm, Table} from "antd";

interface IProps {
  style?: CSSProperties;
  className?: string;
}
export const TableList: FC<IProps> = function (props) {
    const { data, pagination, loading } = useCrudTableState();
    const { editItem, deleteItem } = useCrudTableAction();
    const columns: ColumnProps<CheckGroup>[] = [
        {
            title: "编码",
            render: (_, item) => {
                return item.code;
            },
        },
        {
            title: "名称",
            render: (_, item) => {
                return item.name;
            },
        }, {
            title: "助记码",
            render: (_, item) => {
                return item.helpcode;
            },
        },
        {
            title: "适用性别",
            render: (_, item) => {
                return ESexTypeLabel[item.sex];
            },
        },
        {
            title: "注意事项",
            render: (_, item) => {
                return item.attention;
            },
        },
        {
            title: "项目说明",
            render: (_, item) => {
                return item.remark;
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