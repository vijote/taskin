// React specific
import { Outlet } from "react-router-dom";

// Styles
import './Layout.css'

function Layout() {
    return (
        <main className="main-container">
            <Outlet />
        </main>
    );
}

export default Layout