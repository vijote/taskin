// Services
import createApiService from "../api/api.service";

async function apiLoader() {
    return createApiService().checkApiStatus()
}

export default apiLoader