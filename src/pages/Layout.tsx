import { Outlet } from "react-router-dom";
import './Layout.css'

function Layout() {
    return (
        <main>
            <Outlet />
        </main>
    );
}

export default Layout