// React specific
import { Outlet, useLoaderData, Await } from "react-router-dom";
import { Suspense } from 'react'

// Styles
import './Layout.css'

// Components
import LoadingService from "../components/LoadingService";
import useApiServicePing from "../hooks/useApiServicePing";

function Layout() {
    // Constantly ping the api
    // to ensure it's active
    // while the user is using the app
    useApiServicePing()

    const data = useLoaderData() as { apiStatus: string };

    return (
        <Suspense
            fallback={<LoadingService message="Despertando servicio API" />}>
            <Await
                resolve={data.apiStatus}>
                {() => (
                    <main className="main-container">
                        <Outlet />
                    </main>
                )}
            </Await>
        </Suspense>
    );
}

export default Layout