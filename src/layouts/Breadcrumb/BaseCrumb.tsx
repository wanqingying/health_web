import React, { CSSProperties, FC } from "react";
import { Breadcrumb, Layout } from "antd";
import { useBaseCtx } from "../../utils/base";
import { useHistory } from "react-router-dom";
import { matchRoutePath } from "../../utils/help";
import { Link } from "react-router-dom";

interface IProps {
  style?: CSSProperties;
}
export const BaseCrumb: FC<IProps> = function (props) {
  const { state } = useBaseCtx(["routes"]);
  const history = useHistory();
  const path = history.location.pathname;
  const paths = matchRoutePath(state.routes, path);
  return (
    <Breadcrumb style={props.style}>
      {paths.map((p) => {
        return (
          <Breadcrumb.Item key={p.path}>
            <Link to={p.path}>{p.label}</Link>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};
