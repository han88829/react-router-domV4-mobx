/*
 * @page:   首页
 * @Author: Han 
 * @Date: 2017-10-23 11:30:16 
 * @Last Modified by: Han
 * @Last Modified time: 2017-11-16 18:00:05
 */
import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon, Switch, Tag, Button, Tabs, Spin } from 'antd';
import { Link, Route, Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { action, toJS } from 'mobx';
import App from '../app';
import RouteData from '../../store/RouteData';
import './admin.css';
import logo from '../../assets/logo.png';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const { CheckableTag } = Tag;
const TabPane = Tabs.TabPane;

@inject("store")
@observer
class Admin extends React.Component {

  state = {
    collapsed: false,
    theme: true,
    name: ""
  };


  componentWillMount() {
    this.props.store.fetchData.getData({ ...this.props });
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
            <img src={logo} alt="logo" style={img} />
            <span style={{ color: color }}>manage</span>
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
              title={<span><Icon type="user" /><span>常用集合</span></span>}
            >
              <Menu.Item key="1">
                <div style={{ color: color }} onClick={() => {
                  this.props.store.menuName.addKey({ name: "个人", key: "/mobx/app/user" }, { ...this.props });
                  this.props.store.menuName.addBread("个人");
                }}>
                  个人
                  <div
                    className="Admin_add"
                    style={{ display: this.props.store.menuName.selectedKeys == 1 ? "" : "none" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault()
                      this.props.store.menuName.addKey({ name: "新建", key: "/mobx/app/newuser" }, { ...this.props });
                      this.props.store.menuName.addBread("新建");
                    }}>
                    新建
                  </div>
                </div>
              </Menu.Item>
              <Menu.Item key="2">
                <div style={{ color: color }} onClick={() => {
                  this.props.store.menuName.addKey({ name: "个人管理", key: "/mobx/app/useredit" }, { ...this.props });
                  this.props.store.menuName.addBread("个人管理");
                }}>
                  个人管理
                </div>
              </Menu.Item>
              <Menu.Item key="7">
                <div style={{ color: color }} onClick={() => {
                  this.props.store.menuName.addKey({ name: "table", key: "/mobx/app/table" }, { ...this.props });
                  this.props.store.menuName.addBread("table");
                }}>
                  Table
                </div>
              </Menu.Item>
              <Menu.Item key="3">
                <div style={{ color: color }} onClick={() => {
                  this.props.store.menuName.addKey({ name: "其他", key: "/mobx/app/else" }, { ...this.props });
                  this.props.store.menuName.addBread("其他");
                }}>
                  其他
                </div>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span>第三方</span></span>}
            >
              <Menu.Item key="4">
                <div style={{ color: color }} onClick={() => {
                  this.props.store.menuName.addKey({ name: "RTSP", key: "/mobx/app/rtsp" }, { ...this.props });
                  this.props.store.menuName.addBread("RTSP");
                }}>
                  RTSP
                </div>
              </Menu.Item>
              <Menu.Item key="5">
                <div style={{ color: color }} onClick={() => {
                  this.props.store.menuName.addKey({ name: "三级联动", key: "/mobx/app/area" }, { ...this.props });
                  this.props.store.menuName.addBread("三级联动");
                }}>
                  省市区三级联动
                </div>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="6">
              <Icon type="file" />
              <span onClick={() => {
                this.props.store.menuName.addKey({ name: "测试", key: "/mobx/app/test" }, { ...this.props });
                this.props.store.menuName.addBread("测试");
              }}>测试</span>
            </Menu.Item>
          </Menu>

          {/* 底部菜单主题修改 */}
          <div className="SilderEdit" style={{ display: this.state.collapsed ? "none" : "" }}>
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
          </div>

        </Sider>
        <Layout >
          <Spin spinning={this.props.store.menuName.loading} delay={200} >
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
              {/* <div style={{ height: 50, padding: "10px 0", marginLeft: -5 }}>
              {MenuTitle}
            </div> */}
              {/* 使用tab进行管理，页面标签过多时，便于切换 */}
              <Tabs style={{ height: 50 }} activeKey={window.location.pathname} a={window.location.pathname} className="homeTab">
                {this.props.store.menuName.routeKey.map((x, i) => {

                  return (
                    <TabPane
                      key={x.key}
                      tab={<Link to={x.key} key={x.key} onClick={() => {
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
                      </Link>}
                    >

                    </TabPane >
                  )
                })}
              </Tabs>
              <div style={{ background: '#fff', minHeight: 360 }}>
                <Route path="/mobx/app" component={App} />
              </div>
            </Content>
          </Spin>
        </Layout>
      </Layout >
    );
  }
}

export default Admin;