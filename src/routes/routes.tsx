import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";
import App from "../App";
import { lazy, Suspense } from "react";
import Payment from "../views/Payment";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import Shop from "../views/Shop";

const ScanQr = lazy(() => import("../views/ScanQr"));
const GenerateQr = lazy(() => import("../views/GenerateQr"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Lazy loading...</div>}>
        <TonConnectUIProvider manifestUrl="https://raw.githubusercontent.com/nghia45/telegram-web3-qrcode/master/tonconnect-manifest.json">
          {/* <TonConnectUIProvider manifestUrl="https://localhost:5173/tonconnect-manifest.json"> */}
          <Outlet />
        </TonConnectUIProvider>
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: <App />,
        children: [
          { path: "/scan", element: <ScanQr /> },
          { path: "/generate", element: <GenerateQr /> },
          { path: "/payment", element: <Payment /> },
          { path: "/shop", element: <Shop /> },

          // Add a redirect to /generate when visiting "/"
          { index: true, element: <Navigate to="/generate" /> },
        ],
      },
    ],
  },
]);

export default routes;
