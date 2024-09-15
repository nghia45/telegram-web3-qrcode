import { Drawer, Menu } from "antd";
import {
  QrcodeOutlined,
  ScanOutlined,
  HistoryOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import "./index.css";
import "antd/dist/reset.css";

type Props = {
  open: boolean;
  onClose: () => void;
};

const Sidebar = ({ open, onClose }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      key: "/generate",
      icon: <QrcodeOutlined className="text-xxl mr-3" />,
      label: "Generate QR Code",
    },
    {
      key: "/scan",
      icon: <ScanOutlined className="text-xxl mr-3" />,
      label: "Scan QR Code",
    },
    {
      key: "/history",
      icon: <HistoryOutlined className="text-xxl mr-3" />,
      label: "History",
    },
    {
      key: "/shop",
      icon: <ShoppingCartOutlined className="text-xxl mr-3" />,
      label: "Shop",
    },
  ];

  const handleClick = (e: any) => {
    navigate(e.key); // Navigate to the clicked route
    onClose(); // Close the drawer after navigation
  };

  return (
    <Drawer
      title={<h4 className="text-xl font-bold mb-0">Blockchain QR App</h4>}
      onClose={onClose}
      open={open}
      placement="left"
      width={300}
      styles={{ body: { padding: 0 } }}
    >
      <Menu
        mode="vertical"
        selectedKeys={[location.pathname]}
        style={{ height: "100%", borderRight: 0 }}
        onClick={handleClick}
        items={menuItems}
      />
    </Drawer>
  );
};

export default Sidebar;
