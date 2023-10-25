// Testing utilities
import { describe, it, expect, vi, beforeAll, afterEach } from 'vitest';

// Service
import { APIService, HTTPLib } from './api.service';

describe('APIService', async () => {
    let apiService: APIService

    const mockedRequest = vi.fn()

    const mockedLib: HTTPLib = {
        request: mockedRequest
    }

    beforeAll(() => {
        apiService = new APIService(mockedLib)
    })

    afterEach(() => {
        vi.resetAllMocks()
    })

    it('checkApiStatus calls HTTPLib request', async () => {
        await apiService.checkApiStatus()

        expect(mockedRequest).toHaveBeenCalled();
    });
});