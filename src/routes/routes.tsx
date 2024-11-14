import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";
import App from "../App";
import { lazy, Suspense } from "react";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

const ScanQr = lazy(() => import("../views/ScanQr"));
const GenerateQr = lazy(() => import("../views/GenerateQr"));
const Payment = lazy(() => import("../views/Payment"));
const History = lazy(() => import("../views/History"));
const Shop = lazy(() => import("../views/Shop"));

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
          { path: "/history", element: <History /> },

          // Add a redirect to /generate when visiting "/"
          { index: true, element: <Navigate to="/generate" /> },
        ],
      },
    ],
  },
]);

export default routes;
