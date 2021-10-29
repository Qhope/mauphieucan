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
import { BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const LayoutScreen = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [nav, setNav] = useState(1);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <BrowserRouter>
      <div className="App">
        <Layout>
          <Sider collapsible collapsed={collapsed}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1" icon={<UserOutlined />}>
                <NavLink
                  to="/Customer"
                  activeClassName="is-active"
                  exact="true"
                >
                  Customer
                </NavLink>
              </Menu.Item>

              <Menu.Item key="2" icon={<BookOutlined />}>
                <NavLink to="/Bill" activeClassName="is-active" exact="true">
                  Bill
                </NavLink>
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
              <div>
                <Switch>
                  <Route path="/Bill" component={WeightBill} exact="true" />
                  <Route path="/Customer" component={Customer} exact="true" />
                </Switch>
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    </BrowserRouter>
  );
};

export default LayoutScreen;
