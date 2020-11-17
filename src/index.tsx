import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import { BaseLayoutRoute } from "./layouts/BaseLayoutRoute";
// import React, { useState } from 'react';
// import { render } from "react-dom";
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
      <RouteSwitch routes={routes} />
      <Redirect from={"/"} to={"/java"} />
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

function RouteSwitch(props: { routes: RouteItem[] }) {
  const rx = props.routes[0];
  return (
    <Switch>
      {props.routes
        .map((r) => {
          if (r.routes && r.routes.length > 0) {
            return <RouteSwitch routes={r.routes} />;
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
      <Redirect to={rx.path} from={"/"} />
    </Switch>
  );
}

function parse(routes: RouteItem[]): RouteItem[] {
  let res: RouteItem[] = [];
  routes.forEach((r) => {
    if (r.component) {
      res.push(r);
    }
    if (r.routes) {
      res = res.concat(parse(r.routes));
    }
  });
  return res;
}
