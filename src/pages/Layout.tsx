import { Outlet } from "react-router-dom";
import './Layout.css'

function Layout() {
    // Check logged user

    return (
        <main className="main-container">
            <Outlet />
        </main>
    );
}

export default Layout