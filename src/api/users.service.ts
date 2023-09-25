import { HTTPLib, APIService } from "./api.service";
import AxiosImplementation from "./axiosImplementation";

class UsersService extends APIService {
    constructor(httpLib: HTTPLib) {
        super(httpLib)
    }

    async login(name: string): Promise<{ id: string}> {
        const response = await this.request<{ id: string}>({
            data: { name },
            method: 'POST',
            url: '/users'
        });

        if (!response.data) {
            throw new Error("Empty response!");
        }

        return response.data;
    }
}

export function createUsersService() {
    return new UsersService(AxiosImplementation.singleton)
}

export default UsersService