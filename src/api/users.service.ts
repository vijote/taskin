import APIService, { HTTPLib } from "./api.service";

export type LoginResponse = {
    data: {
        id: string
    },
    message: string
}

class UsersService extends APIService {
    constructor(httpLib: HTTPLib) {
        super(httpLib)
    }

    async login(name: string): Promise<LoginResponse> {
        const response = await this.http.request<LoginResponse>({
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

export default UsersService