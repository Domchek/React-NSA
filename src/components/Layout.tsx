import { Outlet } from "react-router-dom";
import "../styles/layout.css";
export default function Layout() {
    return <>
        <div className="container">
            <div className="container-main">
                <Outlet />
            </div>
        </div>
    </>;
}