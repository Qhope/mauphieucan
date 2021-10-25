import "../css/Layout.css";
import Customer from "./Customer";
import WeightBill from "./Form";
import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  BookOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const LayoutScreen = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [nav, setNav] = useState(1);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const trigger = (e) => {
    if (Number(e.key) === 1) {
      setNav(1);
    } else {
      setNav(2);
    }
  };

  return (
    <div className="App">
      <Layout>
        <Sider trigger={trigger} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<UserOutlined />} onClick={trigger}>
              Customer
            </Menu.Item>
            <Menu.Item key="2" icon={<BookOutlined />} onClick={trigger}>
              Bill
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: toggleCollapsed,
              }
            )}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 1000,
            }}
          >
            {nav === 1 ? <Customer /> : <WeightBill />}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default LayoutScreen;
