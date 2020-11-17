import { lazy } from "react";

export interface RouteItem {
  path: string;
  label: string;
  component?: any;
  routes?: RouteItem[];
  icon?:string
  layout?:string
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
];
