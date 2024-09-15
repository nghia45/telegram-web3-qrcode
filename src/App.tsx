import "./App.css";
import { Outlet } from "react-router-dom";
import { CHAIN, TonConnectButton } from "@tonconnect/ui-react";
import { useState } from "react";
import Sidebar from "./layout/Sidebar";
import MenuButton from "./components/MenuButton";
import { useTonConnect } from "./hooks/useTonConnect";
import "@twa-dev/sdk";

function App() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const element = document.documentElement;

  const { network } = useTonConnect();

  const onOpenMenu = () => {
    setIsOpenMenu(true);
    element.toggleAttribute("menu-open");
  };

  const onCloseMenu = () => {
    setIsOpenMenu(false);
    element.toggleAttribute("menu-open");
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="flex justify-between p-4">
        <MenuButton onClick={onOpenMenu} />
      </div>

      <Sidebar open={isOpenMenu} onClose={onCloseMenu} />

      {/* Content section, flex-grow ensures it takes the remaining space */}
      <div className="flex-grow p-5">
        <Outlet />
      </div>

      {/* Fixed button and network status */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 text-center">
        <div className="mb-2 flex flex-row gap-3 items-center">
          <TonConnectButton />
          {network
            ? network === CHAIN.MAINNET
              ? "mainnet"
              : "testnet"
            : "N/A"}
        </div>
      </div>
    </div>
  );
}

export default App;
