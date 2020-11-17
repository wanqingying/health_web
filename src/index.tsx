import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Switch, Redirect } from "react-router-dom";
import { BaseLayoutRoute } from "./layouts/BaseLayoutRoute";
import { ConfigProvider } from "antd";
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from "antd/lib/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
import "antd/dist/antd.css";
import "./index.css";
import { ProviderBase, useBaseCtx } from "./utils/base";

import { routeConfig, RouteItem } from "./configs/routes";
import { LayoutList } from "./utils/constants";

moment.locale("zh-cn");

const App = function () {
  const { state } = useBaseCtx(["routes"]);
  const routes = parse(state.routes);
  return (
    <Switch>
      <Redirect exact={true} from={"/"} to={"/subscribe"} />
      <RouteSwitch routes={routes} />
    </Switch>
  );
};

ReactDOM.render(
  // <React.StrictMode>
  <ConfigProvider locale={zhCN}>
    <Suspense fallback={<span>loading</span>}>
      <BrowserRouter>
        <ProviderBase
          value={{
            routes: routeConfig,
            HeightHeader: 64,
            HeightBreadCrumb: 32,
          }}
        >
          <App />
        </ProviderBase>
      </BrowserRouter>
    </Suspense>
  </ConfigProvider>,
  // </React.StrictMode>,
  document.getElementById("root")
);

function RouteSwitch(props: { routes: RouteItem[]; parentPath?: string }) {
  const rx = props.routes[0];
  console.log("rx", rx.path);
  console.log("p", props.parentPath);
  return (
    <Switch>
      {props.routes
        .map((r) => {
          if (r.redirect) {
            return <Redirect to={r.redirect} from={r.path} />;
          }

          if (r.routes && r.routes.length > 0) {
            return (
              <RouteSwitch key={r.path} routes={r.routes} parentPath={r.path} />
            );
          }
          if (r.component) {
            if (!r.layout || r.layout === LayoutList.base)
              return (
                <BaseLayoutRoute
                  key={r.path}
                  path={r.path}
                  component={r.component}
                />
              );
          }
          return null;
        })
        .filter(Boolean)}
      {/*默认重定向*/}
      <Redirect to={rx.path} from={props.parentPath || "/"} />
    </Switch>
  );
}

function parse(routes: RouteItem[]): RouteItem[] {
  let res: RouteItem[] = [];
  let xo: RouteItem;
  routes.forEach((r) => {
    if (r.component) {
      res.push(r);
      if (!xo) {
        xo = r;
      }
    }
    if (r.routes && r.routes.length > 0) {
      res = res.concat(parse(r.routes));
      const xo = r.routes[0];
      res.push({ path: r.path, redirect: xo.path, label: "" });
    }
  });
  return res;
}
