import { createBrowserRouter, Outlet } from "react-router-dom";
import App from "../App";
import { lazy, Suspense } from "react";
import Payment from "../views/Payment";

const ScanQr = lazy(() => import("../views/ScanQr"));
const GenerateQr = lazy(() => import("../views/GenerateQr"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Lazy loading...</div>}>
        <Outlet />
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
        ],
      },
    ],
  },
]);

export default routes;
