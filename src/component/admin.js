import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon, Switch, Tag } from 'antd';
import { Link, Route, Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import App from './app';
import './admin.css';

import logo from '../assets/logo.png';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const { CheckableTag } = Tag;

@inject("store")
/**
 * 加入observer监听状态的变化，如果其他地方修改了mobx store状态，会实时改变，否则状态会保存。
 * 在下次props或者路由发生变化重新render的时候状态才会更新到最新的
 */
@observer 
class Admin extends React.Component {

  state = {
    collapsed: false,
    theme: true,
    name: ""
  };


  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ name: nextProps.store.fetchData.name });
  }


  render() {
    console.log(this.props)
    // 随主题颜色变化
    const color = this.state.theme ? "rgba(255, 255, 255, 0.67)" : "rgba(0,0,0,0.67)";
    // 管理子页面的打开记录和状态
    const MenuC = this.props.store.menuName.routeKey.map((x, i) => {
      return (
        <Link to={x.key} key={i}>
          <div className={x.key == window.location.pathname ? "menuSelect" : "menuNo"} key={i} >
            <span>{x.name}</span>
            <span className="close" onClick={(e) => {
              e.stopPropagation()
              e.preventDefault();
              this.props.store.menuName.deleteKey(x, { ...this.props });
            }}>X</span>
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
            <span style={{ color: color }}>{this.props.store.fetchData.name}</span>
          </div>
          <Menu theme={this.state.theme ? "dark" : "light"} defaultSelectedKeys={['2']} mode="inline">
            <Menu.Item key="1" >
              <div
                style={{ color: color }}
                onClick={() => {
                  this.props.store.menuName.addKey({ name: "首页", key: "/home/app" }, { ...this.props })
                }}
              >
                <Icon type="pie-chart" />
                <span>首页</span>
              </div>
            </Menu.Item>
            <Menu.Item key="2">
              <div style={{ color: color }} onClick={() => {
                this.props.store.menuName.addKey({ name: "菜单页", key: "/home" }, { ...this.props })
              }}>
                <Icon type="desktop" />
                <span>菜单页</span>
              </div>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span>User</span></span>}
            >
              <Menu.Item key="3">
                <div style={{ color: color }} onClick={() => {
                  this.props.store.menuName.addKey({ name: "Tom", key: "/home/app/user/Tom" }, { ...this.props })
                }}>
                  Tom
                </div>
              </Menu.Item>
              <Menu.Item key="4">
                <div style={{ color: color }} onClick={() => {
                  this.props.store.menuName.addKey({ name: "Bill", key: "/home/app/user/Bill" }, { ...this.props })
                }}>
                  Bill
                </div>
              </Menu.Item>
              <Menu.Item key="5">
                <div style={{ color: color }} onClick={() => {
                  this.props.store.menuName.addKey({ name: "Alex", key: "/home/app/user/Alex" }, { ...this.props })
                }}>
                  Alex
                </div>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span>Team</span></span>}
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>File</span>
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
          <div className="contentTitle">
            <div
              className="_3sSwc"
              onClick={() => {
                let collapsed = this.state.collapsed;
                this.onCollapse(!collapsed);
              }}
            >
              <Icon type={!this.state.collapsed ? "menu-fold" : "menu-unfold"} />
            </div>
            <span>{this.state.name}</span>
          </div>
          <Content style={{ margin: '0 16px' }}>
            <div style={{ height: 50, padding: "10px 0" }}>
              {/* <div className="menuNo menuSelect" >
                <div></div>
                <span>菜单</span>
                <span className="close">X</span>
              </div> */}
              {MenuC}
            </div>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Route path="/home/app" component={App} />
            </div>
          </Content>
        </Layout>
      </Layout >
    );
  }
}

export default Admin;