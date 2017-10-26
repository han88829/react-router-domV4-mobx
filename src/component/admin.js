/*
 * @page:   首页
 * @Author: Han 
 * @Date: 2017-10-23 11:30:16 
 * @Last Modified by: Han
 * @Last Modified time: 2017-10-26 21:00:21
 */
import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon, Switch, Tag, Button } from 'antd';
import { Link, Route, Redirect } from 'react-router-dom';
import { inject } from 'mobx-react';
import { action, toJS } from 'mobx';
import App from './app';
import RouteData from '../store/RouteData';
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


  componentWillMount() {
    let path = window.location.pathname;
    RouteData.forEach(function (x, i) {
      if (x.path == path) {
        this.props.store.menuName.addKey({ name: x.name, key: x.path }, { ...this.props })
      }
    }, this);
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }

  @action
  onChangeSelect = (data) => {
    console.log(data)
    this.props.store.menuName.selectedKeys = data.key;
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
    const classData = !this.state.collapsed ?
      {

        marginRight: 10,
      }
      :
      {
        fontSize: 16,
        marginRight: 10,
      }
    return (
      <Layout className="home" >
        <Sider
          collapsed={this.state.collapsed}
          style={{ backgroundColor: this.state.theme ? "#2B3245" : "#fff" }}
        >
          {/* logo */}
          <div className="homeLogo">
            <i className={this.state.collapsed ? "manage-logomin" : 'manage-logo'} style={{ fontSize: '28px', marginTop: '20px', display: 'block', color: '#fff' }} />
          </div>
          <Menu
            theme={this.state.theme ? "dark" : "light"}
            selectedKeys={[this.props.store.menuName.selectedKeys]}
            defaultSelectedKeys={[this.props.store.menuName.selectedKeys]}
            defaultOpenKeys={toJS(this.props.store.menuName.openKeys)}
            mode="inline"
            onSelect={this.onChangeSelect}
            onOpenChange={this.onOpenChange}
            style={{ backgroundColor: this.state.theme ? "#2B3245" : "#fff" }}>
            <SubMenu
              key="sub1"
              title={<span><i className='manage-xiaoshou' style={classData} /><span>{this.state.collapsed ? "" : '销售'}</span></span>}
            >
              <Menu.Item key="1">
                <div style={{ color: color }} onClick={() => {
                  this.props.store.menuName.addKey({ name: "订单管理", key: "/nest/app/sales/order" }, { ...this.props });
                  this.props.store.menuName.addBread("订单管理");
                }}>
                  订单管理
                  <div
                    className="Admin_add"
                    style={{ display: this.props.store.menuName.selectedKeys == 1 ? "" : "none" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault()
                      this.props.store.menuName.addKey({ name: "新建订单", key: "/nest/app/sales/ordernew" }, { ...this.props });
                      this.props.store.menuName.addBread("新建订单");
                    }}>
                    新增
                  </div>
                </div>
              </Menu.Item>
              <Menu.Item key="2">
                <div style={{ color: color }} onClick={() => {
                  this.props.store.menuName.addKey({ name: "客户管理", key: "/nest/app/sales/client" }, { ...this.props });
                  this.props.store.menuName.addBread("客户管理");
                }}>
                  客户管理
                </div>
              </Menu.Item>
              <Menu.Item key="3">
                <div style={{ color: color }} onClick={() => {
                  this.props.store.menuName.addKey({ name: "样品申请管理", key: "/nest/app/sales/sample" }, { ...this.props });
                  this.props.store.menuName.addBread("样品申请管理");
                }}>
                  样品申请管理
                </div>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><i className='manage-caigou' style={classData} /><span>{this.state.collapsed ? "" : '采购'}</span></span>}
            >
              <Menu.Item key="4">
                <div style={{ color: color }} onClick={() => {
                  this.props.store.menuName.addKey({ name: "供应商管理", key: "/nest/app/purchase/supplier" }, { ...this.props });
                  this.props.store.menuName.addBread("供应商管理");
                }}>
                  供应商管理
                </div>
              </Menu.Item>
              <Menu.Item key="5">
                供应商
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              title={<span><i className='manage-kucun' style={classData} /><span>{this.state.collapsed ? "" : '库存管理'}</span></span>}
            >
              <Menu.Item key="6">
                <div style={{ color: color }} onClick={() => {
                  this.props.store.menuName.addKey({ name: "库存查询", key: "/nest/app/product/stock" }, { ...this.props });
                  this.props.store.menuName.addBread("库存查询");
                }}>
                  库存查询
                </div>
              </Menu.Item>
              <Menu.Item key="7">
                <div style={{ color: color }} onClick={() => {
                  this.props.store.menuName.addKey({ name: "SKU管理", key: "/nest/app/product/manage" }, { ...this.props });
                  this.props.store.menuName.addBread("SKU管理");
                }}>
                  SKU管理
                </div>
              </Menu.Item>
              <Menu.Item key="8">
                <div style={{ color: color }} onClick={() => {
                  this.props.store.menuName.addKey({ name: "警戒提醒", key: "/nest/app/product/alert" }, { ...this.props });
                  this.props.store.menuName.addBread("警戒提醒");
                }}>
                  警戒提醒
                </div>
              </Menu.Item>
            </SubMenu>
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
                    <Link to={x.path} onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (i == 0) {
                        this.props.store.menuName.addKey({ name: this.props.store.menuName.parent[1].name, key: this.props.store.menuName.parent[1].path }, { ...this.props });
                        return
                      }
                      this.props.store.menuName.addKey({ name: x.name, key: x.path }, { ...this.props });
                    }}>{x.name}</Link>
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
              <Route path="/nest/app" component={App} />
            </div>
          </Content>
        </Layout>
      </Layout >
    );
  }
}

export default Admin;