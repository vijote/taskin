// Services
import { defer } from "react-router-dom";
import createApiService from "../api/api.service";

async function apiLoader() {
    const apiStatusPromise = createApiService().checkApiStatus()

    return defer({
        apiStatus: apiStatusPromise,
    });
}

export default apiLoader