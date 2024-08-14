import "./App.css";
import { NavLink, Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <nav>
        <ul className="flex flex-row gap-5 justify-center pb-5">
          <li>
            <NavLink
              to="/scan"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              Scan QR
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/generate"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              Generate QR
            </NavLink>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
}

export default App;
