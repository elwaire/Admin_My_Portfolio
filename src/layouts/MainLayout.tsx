import { Layout, Menu, Avatar, Dropdown } from "antd";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
    ProjectOutlined,
    SettingOutlined,
    UserOutlined,
    LogoutOutlined,
    PlusOutlined,
    HomeOutlined,
    InfoCircleOutlined,
} from "@ant-design/icons";
import { memo, useMemo } from "react";
import PATHS from "../constants/paths";

const { Header, Sider, Content, Footer } = Layout;

const MENU_ITEMS = [
    {
        key: PATHS.HOME,
        icon: <HomeOutlined />,
        label: <Link to={PATHS.HOME}>Home</Link>,
    },
    {
        key: PATHS.ABOUT_US,
        icon: <InfoCircleOutlined />,
        label: <Link to={PATHS.ABOUT_US}>About</Link>,
    },
    {
        key: PATHS.PROJECT,
        icon: <ProjectOutlined />,
        label: <Link to={PATHS.PROJECT}>Projects</Link>,
    },
    {
        key: PATHS.PROJECT_ADD,
        icon: <PlusOutlined />,
        label: <Link to={PATHS.PROJECT_ADD}>Add Project</Link>,
    },
    {
        key: "/settings",
        icon: <SettingOutlined />,
        label: <Link to="/settings">Settings</Link>,
    },
];

// Dropdown user menu
const USER_MENU = {
    items: [
        { key: "profile", label: "Profile", icon: <UserOutlined /> },
        { key: "logout", label: "Logout", icon: <LogoutOutlined /> },
    ],
};

const MainLayout: React.FC = () => {
    const location = useLocation();
    const selectedKeys = useMemo(() => [location.pathname], [location.pathname]);

    return (
        <Layout style={{ minHeight: "100vh" }}>
            {/* Sidebar trắng */}
            <Sider
                width={220}
                style={{
                    background: "#fff",
                    borderRight: "1px solid #f0f0f0",
                }}
            >
                <div
                    style={{
                        textAlign: "center",
                        padding: "16px 0",
                        fontWeight: 600,
                        fontSize: "18px",
                    }}
                >
                    Admin
                </div>
                <Menu mode="inline" selectedKeys={selectedKeys} items={MENU_ITEMS} style={{ borderRight: 0 }} />
            </Sider>

            <Layout>
                {/* Header trắng */}
                <Header
                    style={{
                        background: "#fff",
                        padding: "0 16px",
                        borderBottom: "1px solid #f0f0f0",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <div className="font-semibold text-lg">My Portfolio Admin</div>

                    <Dropdown menu={USER_MENU} placement="bottomRight" arrow>
                        <Avatar style={{ backgroundColor: "#1677ff", cursor: "pointer" }} icon={<UserOutlined />} />
                    </Dropdown>
                </Header>

                {/* Content */}
                <Content style={{ margin: "16px" }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: "#fff",
                            borderRadius: 8,
                            border: "1px solid #f0f0f0",
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>

                {/* Footer */}
                <Footer style={{ textAlign: "center", background: "#fff" }}>
                    © {new Date().getFullYear()} My Portfolio Admin
                </Footer>
            </Layout>
        </Layout>
    );
};

export default memo(MainLayout);
