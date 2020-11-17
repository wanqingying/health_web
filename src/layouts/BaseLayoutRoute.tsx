import React, { FC } from "react";
import { RouteProps, Route } from "react-router";
import { BaseLayout } from "./BaseLayout";

interface IProps {}
export const BaseLayoutRoute: FC<IProps & RouteProps> = function (props) {
  return (
    <Route
      {...props}
      component={() => <Layout Page={props.component} />}
    />
  );
};

function Layout({ Page }: { Page: any }) {
  return (
    <BaseLayout>
      <Page />
    </BaseLayout>
  );
}
