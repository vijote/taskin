import APIService, { HTTPLib } from "./api.service";

export type RegisterResponse = {
    data: {
        id: string
    },
    message: string
}

class UsersService extends APIService {
    constructor(httpLib: HTTPLib) {
        super(httpLib)
    }

    async register(name: string): Promise<RegisterResponse> {
        try {
            const response = await this.http.request<RegisterResponse>({
                data: { name },
                method: 'POST',
                url: '/users'
            });

            if (!response.data) {
                throw new Error("Empty response!");
            }

            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
}

export default UsersService