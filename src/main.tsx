import "./index.css";

import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes.tsx";
import * as React from "react";
import * as ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);
