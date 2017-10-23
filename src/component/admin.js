/*
 * @page:   首页
 * @Author: Han 
 * @Date: 2017-10-23 11:30:16 
 * @Last Modified by: Han
 * @Last Modified time: 2017-10-23 22:44:54
 */
import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon, Switch, Tag } from 'antd';
import { Link, Route, Redirect } from 'react-router-dom';
import { inject } from 'mobx-react';
import App from './app';
import './admin.css';

import logo from '../assets/logo.png';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const { CheckableTag } = Tag;

@inject("store")
class Admin extends React.Component {

  state = {
    collapsed: false,
    theme: true,
    name: ""
  };


  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }

  render() {
    // 随主题颜色变化
    const color = this.state.theme ? "rgba(255, 255, 255, 0.67)" : "rgba(0,0,0,0.67)";
    // 管理子页面的打开记录和状态
    const MenuTitle = this.props.store.menuName.routeKey.map((x, i) => {
      return (
        <Link to={x.key} key={i} onClick={() => {
          this.props.store.menuName.addKey(x, { ...this.props });
        }}>
          <div className={x.key == window.location.pathname ? "menuSelect" : "menuNo"} key={i} >
            <div className="MenuBorder" style={{ backgroundColor: x.key == window.location.pathname ? "#108EE9" : "#ccc" }}></div>
            <span style={{ marginRight: 15 }}>{x.name}</span>
            <Icon type="close" className="close" onClick={(e) => {
              e.stopPropagation()
              e.preventDefault();
              this.props.store.menuName.deleteKey(x, { ...this.props });
            }} />

          </div >
        </Link>
      )
    })

    const img = !this.state.collapsed ?
      {
        width: "40px",
        marginRight: 8,
      }
      :
      {
        width: " 28px",
        margin: "6px 7px",
      }

    return (
      <Layout className="home" >
        <Sider
          collapsed={this.state.collapsed}
          style={{ backgroundColor: this.state.theme ? "#404040" : "#fff" }}
        >
          {/* logo */}
          <div className="homeLogo">
            <img src={logo} alt="logo" style={img} />
            <span style={{ color: color }}>manage</span>
          </div>
          <Menu theme={this.state.theme ? "dark" : "light"} defaultSelectedKeys={['2']} mode="inline">
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span>销售</span></span>}
            >
              <Menu.Item key="1">
                <div style={{ color: color }} onClick={() => {
                  this.props.store.menuName.addKey({ name: "订单管理", key: "/home/app/sales/order" }, { ...this.props });
                  this.props.store.menuName.addBread("订单管理");
                }}>
                  订单管理
                </div>
              </Menu.Item>
              <Menu.Item key="2">
                <div style={{ color: color }} onClick={() => {
                  this.props.store.menuName.addKey({ name: "客户管理", key: "/home/app/sales/client" }, { ...this.props });
                  this.props.store.menuName.addBread("客户管理");
                }}>
                  客户管理
                </div>
              </Menu.Item>
              <Menu.Item key="3">
                <div style={{ color: color }} onClick={() => {
                  this.props.store.menuName.addKey({ name: "样品申请管理", key: "/home/app/sales/sample" }, { ...this.props });
                  this.props.store.menuName.addBread("样品申请管理");
                }}>
                  样品申请管理
                </div>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span>采购</span></span>}
            >
              <Menu.Item key="4">Team 1</Menu.Item>
              <Menu.Item key="5">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="6">
              <Icon type="file" />
              <span>库存</span>
            </Menu.Item>
          </Menu>
          {/* 底部菜单主题修改 */}
          {/* <div className="SilderEdit" style={{ display: this.state.collapsed ? "none" : "" }}>
            <Icon type="bulb" style={{ color: color }} />
            <span style={{ color: color, marginLeft: 5 }}>选择主题</span>
            <Switch
              style={{ marginLeft: 10 }}
              defaultChecked={true}
              checkedChildren="dark"
              unCheckedChildren="light"
              onChange={(value) => {
                this.setState({
                  theme: value
                });
              }} />
          </div> */}

        </Sider>
        <Layout >
          <div className="homeContentTitle">
            <div
              className="_3sSwc"
              onClick={() => {
                let collapsed = this.state.collapsed;
                this.onCollapse(!collapsed);
              }}
            >
              <Icon type={!this.state.collapsed ? "menu-fold" : "menu-unfold"} />
            </div>
            <Breadcrumb className="menuBread">
              {this.props.store.menuName.parent.map((x, i) => {
                return (
                  <Breadcrumb.Item key={i}>
                    <Link to={x.path}>{x.name}</Link>
                  </Breadcrumb.Item>
                )
              })}
            </Breadcrumb>
          </div>
          <Content style={{ margin: '0 16px', maxHeight: 'calc(100vh - 47px)' }}>
            <div style={{ height: 50, padding: "10px 0", marginLeft: -5 }}>
              {MenuTitle}
            </div>
            <div style={{ background: '#fff', minHeight: 360 }}>
              <Route path="/home/app" component={App} />
            </div>
          </Content>
        </Layout>
      </Layout >
    );
  }
}

export default Admin;