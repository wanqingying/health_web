import React, { FC } from "react";
import { Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useBaseCtx } from "../../utils/base";
import { RouteItem } from "../../configs/routes";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import {matchRoutePath} from "../../utils/help";


interface IProps {}
export const BaseSide: FC<IProps> = function () {
  const { state } = useBaseCtx(["routes"]);
  const history=useHistory();
  const path=history.location.pathname;
  const paths=matchRoutePath(state.routes,path)
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={paths.map(p=>p.path)}
      defaultOpenKeys={paths.map(p=>p.path)}
      style={{ height: "100%", borderRight: 0 }}
    >
      {getList(state.routes)}
    </Menu>
  );
};

function getList(routes: RouteItem[]) {
  return routes
    .map((r) => {
      if (r.component) {
        return (
          <Menu.Item key={r.path}>
            <Link to={r.path}>{r.label}</Link>
          </Menu.Item>
        );
      }
      if (Array.isArray(r.routes)) {
        return (
          <Menu.SubMenu
            title={r.label}
            key={r.path}
            icon={r.icon ?? <UserOutlined />}
          >
            {getList(r.routes)}
          </Menu.SubMenu>
        );
      }
      return null;
    })
    .filter(Boolean);
}


