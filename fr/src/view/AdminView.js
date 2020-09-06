import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import ManageMember from "../components/ManageMember"

import 'antd/dist/antd.css';
import '../css/login.css'
import {Global} from "../utils/Global";
import {checklogin} from "../services/userService";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class AdminView extends React.Component{
    toindex=()=>{
        this.props.history.push("/index")
    }
    toadmin=()=>{
        this.props.history.push("/admin")
    }
    todashboard=()=>{
        this.props.history.push("/dashboard")
    }

    render(){
        return(
            <Layout>
                <Header style={{height:"50px"}} className="header">
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item  key="1" onClick={this.toindex.bind(this)}>Pedia Search</Menu.Item>
                    </Menu>
                </Header>
                <Layout >
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <SubMenu key="sub1" data-testid="label0" icon={<UserOutlined />} title="管理员面板">
                                <Menu.Item key="1" data-testid="label1" onClick={this.toadmin.bind(this)}>成员管理</Menu.Item>
                                <Menu.Item className="todashboard" data-testid="label2" key="2" onClick={this.todashboard.bind(this)}>热点词条</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px', height:"600px" }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>管理员面板</Breadcrumb.Item>
                            <Breadcrumb.Item >成员管理</Breadcrumb.Item>

                        </Breadcrumb>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            <div className="login-container">
                                <div className="login-box">
                                    <div className="login-content" style={{textAlign:"center"}}>
                                        <ManageMember style={{Marginleft:"200px"}} history={this.props.history}/>
                                    </div>
                                </div>
                            </div>
                         </Content>
                    </Layout>
                </Layout>
            </Layout>
        )

    }
}

export default AdminView;