import { lazy } from "react";

export interface RouteItem {
  path: string;
  label: string;
  component?: any;
  routes?: RouteItem[];
  icon?: string;
  layout?: string;
  redirect?:string
}

export const routeConfig: RouteItem[] = [
  {
    path: "/test",
    label: "测试",
    routes: [
      {
        path: "/test/java",
        label: "java测试",
        component: lazy(() => import("../pages/test/JavaWeb")),
      },
      {
        path: "/test/test_x",
        label: "测试x",
        component: lazy(() => import("../pages/test/TestX")),
      },
    ],
  },
  {
    path: "/dashboard",
    label: "工作台",
    routes: [],
  },
  {
    path: "/vip",
    label: "会员管理",
    routes: [],
  },
  {
    path: "/subscribe",
    label: "预约管理",
    routes: [
      {
        path: "/subscribe/checks",
        label: "检查项管理",
        component: lazy(() => import("../pages/subscribe/checks")),
      },
      {
        path: "/subscribe/test",
        label: "测试",
        component: lazy(() => import("../pages/subscribe/test")),
      },
    ],
  },
];
