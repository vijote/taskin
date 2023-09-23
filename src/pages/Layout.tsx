import { Link, Outlet } from "react-router-dom";
import './Layout.css'

function Layout() {
    return (
        <main>
            {/* <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/nothing-here">Nothing Here</Link>
                    </li>
                </ul>
            </nav>

            <hr /> */}

            <Outlet />
        </main>
    );
}

export default Layout