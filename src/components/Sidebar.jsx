import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { MdFavorite, MdRecentActors, MdStoreMallDirectory } from 'react-icons/md';
import { Link, Outlet } from 'react-router-dom';
import { TbCategoryFilled } from 'react-icons/tb';
import { RiMovie2Line } from 'react-icons/ri';
const { Header, Sider, Content } = Layout;
const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Sider style={{height:"100vh"}} trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{
            paddingTop: "20px"
          }} 
          items={[
            {
              key: '1',
              icon: <MdRecentActors />,
              label: <Link to={"/travel"}>Actor</Link>,
            },
            {
              key: '2',
              icon: <TbCategoryFilled />,
              label: <Link to="/categorys">Category</Link>,
            },
            {
              key: '3',
              icon: <MdStoreMallDirectory />,
              label: <Link to={"/director"}>Director</Link>,
            },
            {
              key: '4',
              icon: <MdFavorite />,
              label: <Link to={"/favorite"}>Favorite</Link>,
            },
            {
             key: '5',
             label: ( <Link to="/genre" style={{ display: "flex", alignItems: "center", gap: 8 }}>
             <img style={{borderRadius:"50px"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrwSRPKVFKgCoOAG0zHW8jEzKTWkn68j39gg&s" alt="genre" style={{ width: 18, height: 18 }}/>
             <span>Genre</span>
            </Link> ),
            },

            {
              key: '6',
              icon: <RiMovie2Line />,
              label: <Link to={"/movie"}>Movie</Link>,
            },
          ]}   
            />
            
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            height: '80vh',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflowY: "auto"
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Sidebar;