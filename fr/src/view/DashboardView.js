import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import Hotwords from "../components/Hotwords"
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class DashboardView extends React.Component{
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
                            <SubMenu key="sub1" icon={<UserOutlined />} title="管理员面板">
                                <Menu.Item className="toadmin" key="2" onClick={this.toadmin.bind(this)}>权限管理</Menu.Item>
                                <Menu.Item key="1" onClick={this.todashboard.bind(this)}>热点词条</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px', height:"600px" }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>管理员面板</Breadcrumb.Item>
                            <Breadcrumb.Item>热点词条</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            <Hotwords style={{justifyContent: 'center'}}/>
                         </Content>
                    </Layout>
                </Layout>
            </Layout>
        )

    }
}

export default DashboardView;