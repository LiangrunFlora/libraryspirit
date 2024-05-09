import React from 'react';
import { useEffect,useState } from 'react';
import { Menu } from 'antd';
import {
  UserOutlined,
  BookOutlined,
  DatabaseOutlined,
  ReadOutlined,
  ProfileOutlined,
  SolutionOutlined,
  MailOutlined,
  FacebookOutlined,
  UploadOutlined,
  BellOutlined,
  AlertOutlined
} from '@ant-design/icons';
import { Outlet, useNavigate,useLocation } from "react-router-dom";
import './Personal.scss'

const { SubMenu } = Menu;

const Personal: React.FC = () => {
    const location = useLocation()
    const navigate = useNavigate();

    const [type, setType] = useState(['information'])
    const [openKeys,setOpenKeys] = useState(['sub1'])

    const handleClick = (e:any) => {
        setType([e.key])
        setOpenKeys([e.keyPath[1]])
        navigate(`/personal/${e.key}`);
    };

    return (
        <div style={{ display: 'flex' ,height:'90vh'}} >
            <Menu
                onClick={handleClick}
                style={{ width: '17%' }} 
                defaultSelectedKeys={type||['information']}
                defaultOpenKeys={openKeys||['sub1']}
                mode="inline"
            >
                <SubMenu
                    key="sub1"
                    title={
                        <span>
                        <UserOutlined />
                        <span>个人中心</span>
                        </span>
                    }
                >
                    <Menu.Item key="information"><span><SolutionOutlined /></span>个人信息</Menu.Item>
                    <Menu.Item key="mail"><span><MailOutlined /></span>我的消息</Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub2"
                    title={
                        <span>
                        <BookOutlined />
                        <span>借阅情况</span>
                        </span>
                    }
                >
                    <Menu.Item key="circulate"><span><ReadOutlined /></span>书籍借还</Menu.Item>
                    <Menu.Item key="record"><span><ProfileOutlined /></span>借阅记录</Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub3"
                    title={
                        <span>
                        <DatabaseOutlined />
                        <span>个人图书馆</span>
                        </span>
                    }
                >
                    <Menu.Item key="myResources"><span><FacebookOutlined /></span>我的图书</Menu.Item>
                    <Menu.Item key="upload"><span><UploadOutlined /></span>上传图书</Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub4"
                    title={
                        <span>
                        <AlertOutlined />
                        <span>信息专栏</span>
                        </span>
                    }
                >
                    <Menu.Item key="announcement"><span><BellOutlined /></span>系统公告</Menu.Item>
                </SubMenu>
            </Menu>
            <div style={{ width: '83%',height:'90vh' ,overflowY: 'auto' }}>
                <Outlet></Outlet>
            </div>
        </div>
    )
}

export default Personal;