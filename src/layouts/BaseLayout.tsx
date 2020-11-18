import { Layout, Breadcrumb } from "antd";
import React, { FC } from "react";
import { BaseSide } from "./Side/BaseSide";
import { BaseHeader } from "./Header/BaseHeader";
import { BaseCrumb } from "./Breadcrumb/BaseCrumb";
import { useBaseCtx } from "../utils/base";

const { Header, Content, Sider } = Layout;

export const BaseLayout: FC<{}> = function (props) {
  const { state } = useBaseCtx([]);
  const h_header = state.HeightHeader;
  const h_bc = state.HeightBreadCrumb;
  return (
    <Layout>
      <Header style={{ height: h_header }} className="header">
        <BaseHeader />
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <BaseSide />
        </Sider>
        <Layout style={{ padding: "0 24px 0 24px" }}>
          <BaseCrumb
            style={{
              height: h_bc,
              padding: 0,
              fontSize: 13,
              lineHeight: h_bc + "px",
            }}
          />
          <Content
            className="site-layout-background"
            style={{
              padding: 0,
              paddingTop: 24,
              margin: 0,
              minHeight: 280,
              height: `calc(100vh - ${h_bc + h_header }px)`,
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default BaseLayout;
