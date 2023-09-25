// React specific
import { Outlet, useLoaderData, Await } from "react-router-dom";
import { Suspense } from 'react'

// Styles
import './Layout.css'
import LoadingService from "../components/LoadingService";
import ErrorBoundary from "./ErrorBoundary";

function Layout() {
    const data = useLoaderData() as { apiStatus: string };

    return (
        <Suspense
            fallback={<LoadingService message="Despertando servicio API"/>}>
            <Await
                resolve={data.apiStatus}
                errorElement={
                    <ErrorBoundary/>
                }>
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